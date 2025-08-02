'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Input from '@/components/ui/Input';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    points: 0,
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const router = useRouter();

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      try {
        // Replace with actual API call
        const mockUser = {
          name: 'UnKnown User',
          email: 'anonymous email',
          phone: '+000000000',
          points: 0,
        };
        setUser(mockUser);
        console.log(selectedFile);
        // Load profile image from localStorage
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) setProfileImage(storedImage);
      } catch {
        toast.error('Failed to load profile');
      }
    };
    
    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    toast.success('Profile updated successfully');
  };

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <Card className="p-6 h-fit">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profileImage || undefined} />
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Label htmlFor="profile-pic" className="cursor-pointer text-green-600 mb-2">
              Change Photo
            </Label>
            <input
              id="profile-pic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <h2 className="text-xl font-bold">{user.name}</h2>
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
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input 
                        type="email" 
                        value={user.email} 
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input 
                      type="tel" 
                      value={user.phone} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, phone: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="mt-4">
                    Save Changes
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Your Wishlist</h3>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                  <Button variant="outline" className="mt-4">
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
                  <Button variant="outline" className="mt-4">
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