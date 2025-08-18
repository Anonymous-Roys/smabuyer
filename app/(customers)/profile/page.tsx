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
import { isAuthenticated, getProfileImage, storeProfileImage } from '@/lib/utils/auth';
import { UserProfile, KYCStatus } from '@/types/users';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>({
    id: '',
    name: '',
    email: '',
    role: 'customer',
    kycStatus: 'not_started',
    points: 0,
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const [isSubmittingKYC, setIsSubmittingKYC] = useState(false);
  // const [kycDocuments, setKycDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    image?: string;
    kyc?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please login to access your profile');
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserProfile();
                if (userData.success && userData.data) {
          setUser(userData.data);
          
          if (userData.data.profileImage) {
            setProfileImage(typeof userData.data.profileImage === 'string' ? userData.data.profileImage : null);
          } else {
            const storedImage = getProfileImage();
            if (storedImage) setProfileImage(storedImage);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
  }, [router]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!user.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (user.phone && !/^[0-9]{10,15}$/.test(user.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
      return;
    }
    
    setSelectedFile(file);
    setErrors(prev => ({ ...prev, image: undefined }));
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setErrors(prev => ({ ...prev, image: 'Please select an image first' }));
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadProfileImage(selectedFile);
      
      if (result.success && result.data) {
        setUser(prev => ({ ...prev, profileImage: result.data.imageUrl }));
        setProfileImage(result.data.imageUrl);
        storeProfileImage(result.data.imageUrl);
      }
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
    
    if (!validateForm()) return;
    
    try {
      setIsUpdating(true);
      
      const updateData: Partial<UserProfile> = {};
      if (user.name) updateData.name = user.name;
      if (user.phone) updateData.phone = user.phone;
      if (user.address) updateData.address = user.address;
      
      const updatedUser = await updateUserProfile(updateData);
      if (updatedUser.success && updatedUser.data) {
        setUser(updatedUser.data);
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };



  const renderKYCStatusBadge = (status: KYCStatus) => {
    const statusClasses = {
      not_started: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const statusText = {
      not_started: 'Not Started',
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
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
    <div className="container py-12 mt-20 px-4">
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
              
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}
              
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
                       setProfileImage(typeof user.profileImage === 'string' ? user.profileImage : null);
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
            <div className="mt-2">
              {renderKYCStatusBadge(user.kycStatus || 'not_started')}
            </div>
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
              <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
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
                        onChange={(e) => {
                          setUser({...user, name: e.target.value});
                          setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Enter your full name"
                        error={errors.name}
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
                      onChange={(e) => {
                        setUser({...user, phone: e.target.value});
                        setErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="Enter your phone number"
                      error={errors.phone}
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input 
                      value={user.address || ''} 
                      onChange={(e) => {
                        setUser({...user, address: e.target.value});
                      }}
                      placeholder="Enter your address"
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

            <TabsContent value="kyc">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">KYC Verification</h3>
                {user.kycStatus === 'approved' ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">Your KYC verification is complete</p>
                    <p className="text-muted-foreground">Your account is fully verified</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        {user.kycStatus === 'pending'
                          ? 'Your KYC documents are under review. This process may take 1-3 business days.'
                          : 'Please upload the required documents for identity verification.'}
                      </p>
                      
                      {user.kycStatus === 'not_started' && (
                        <div className="space-y-4">
                          <div>
                            <Label>Upload Documents (ID Proof, Address Proof)</Label>
                            <input
                              type="file"
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                // if (e.target.files) {
                                  // setKycDocuments(Array.from(e.target.files));
                                // }
                              }}
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-green-50 file:text-green-700
                                hover:file:bg-green-100"
                            />
                            {errors.kyc && (
                              <p className="mt-1 text-sm text-red-500">{errors.kyc}</p>
                            )}
                          </div>
                                                     <Button
                             disabled={true}
                             className="opacity-50"
                           >
                             KYC Submission Unavailable
                           </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
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