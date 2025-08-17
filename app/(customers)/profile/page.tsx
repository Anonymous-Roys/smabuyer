'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Input from '@/components/ui/Input';
import { getUserProfile, updateUserProfile, uploadProfileImage } from '@/lib/utils/api';
import {  isAuthenticated, getProfileImage, storeProfileImage } from '@/lib/utils/auth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  points: number;
  profileImage?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>({
    id: '',
    name: '',
    email: '',
    phone: '',
    points: 0,
    profileImage: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Please login to access your profile');
      router.push('/login');
      return;
    }

    // Fetch user data from API
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserProfile();
        setUser(userData);
        
        // Set profile image from API or localStorage
        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        } else {
          const storedImage = getProfileImage();
          if (storedImage) setProfileImage(storedImage);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadProfileImage(selectedFile);
      
      // Update user state with new image URL
      setUser(prev => ({ ...prev, profileImage: result.imageUrl }));
      setProfileImage(result.imageUrl);
      storeProfileImage(result.imageUrl);
      setSelectedFile(null);
      
      toast.success('Profile image updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUpdating(true);
      
      // Prepare update data (only include changed fields)
      const updateData: Partial<UserProfile> = {};
      if (user.name) updateData.name = user.name;
      if (user.phone) updateData.phone = user.phone;
      
      const updatedUser = await updateUserProfile(updateData);
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <Card className="p-6 h-fit">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profileImage || undefined} />
              <AvatarFallback className="text-2xl">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="profile-pic" className="cursor-pointer text-green-600 hover:text-green-700">
                Change Photo
              </Label>
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              
              {selectedFile && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleImageUpload}
                    disabled={isUploading}
                    className="text-xs"
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setProfileImage(user.profileImage || null);
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-bold mt-2">{user.name || 'Unknown User'}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span>Reward Points</span>
              <span className="font-bold text-green-600">{user.points} pts</span>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input 
                        value={user.name} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input 
                        type="email" 
                        value={user.email} 
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input 
                      type="tel" 
                      value={user.phone || ''} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="mt-4"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Your Wishlist</h3>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => router.push('/products')}
                  >
                    Browse Products
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Order History</h3>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">You haven&#39;t placed any orders yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => router.push('/products')}
                  >
                    Start Shopping
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}