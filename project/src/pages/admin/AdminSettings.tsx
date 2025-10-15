import React, { useState } from 'react';
import { Save, TestTube, Smartphone, MessageCircle, CreditCard, MapPin, User, Eye, EyeOff, Upload } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../lib/context/ToastContext';
import { useBusiness } from '../../lib/context/BusinessContext';
import { useAuth } from '../../lib/context/AuthContext';

const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const { businessSettings, updateBusinessSettings } = useBusiness();
  const { user } = useAuth();
  
  const [localBusinessSettings, setLocalBusinessSettings] = useState(businessSettings);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [deliverySettings, setDeliverySettings] = useState({
    freeDeliveryThreshold: 1000,
    deliveryFee: 50,
    areas: [
      { name: 'Parklands', fee: 50 },
      { name: 'Highridge', fee: 50 },
      { name: 'Westlands', fee: 100 },
      { name: 'Kasarani', fee: 150 }
    ]
  });

  const [paymentSettings, setPaymentSettings] = useState({
    mpesaConsumerKey: '',
    mpesaConsumerSecret: '',
    mpesaShortcode: '',
    mpesaPasskey: '',
    mpesaEnvironment: 'sandbox'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    smsProvider: 'twilio',
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: '',
    whatsappBusinessApiKey: '',
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true
  });

  const [promoCodes, setPromoCodes] = useState([
    { code: 'WELCOME5', discount: 5, type: 'percentage', active: true },
    { code: 'FIRST100', discount: 100, type: 'fixed', active: true }
  ]);

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock profile update - replace with actual API call
    showToast('Profile updated successfully!', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    
    if (profileData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }
    
    // Mock password change - replace with actual API call
    showToast('Password changed successfully!', 'success');
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        showToast('Profile picture updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBusinessSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessSettings(localBusinessSettings);
    showToast('Business settings saved successfully!', 'success');
  };

  const handleSaveDeliverySettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - replace with actual API call
    showToast('Delivery settings saved successfully!', 'success');
  };

  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - replace with actual API call
    showToast('Payment settings saved successfully!', 'success');
  };

  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - replace with actual API call
    showToast('Notification settings saved successfully!', 'success');
  };

  const testMpesaConnection = () => {
    // Mock M-Pesa test - replace with actual test
    showToast('Testing M-Pesa connection...', 'info');
    setTimeout(() => {
      showToast('M-Pesa connection test successful!', 'success');
    }, 2000);
  };

  const testSmsService = () => {
    // Mock SMS test - replace with actual test
    showToast('Sending test SMS...', 'info');
    setTimeout(() => {
      showToast('Test SMS sent successfully!', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Settings
        </h1>
      </div>

      {/* Profile Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-lg mb-6 flex items-center">
            <User className="h-5 w-5 mr-2 text-primary-500" />
            Profile Information
          </h3>
          
          {/* Profile Picture */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-image-upload"
              />
              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 text-gray-600" />
              </label>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{user?.name}</h4>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                Click the upload icon to change your profile picture
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <Button type="submit" icon={Save}>
              Update Profile
            </Button>
          </form>
        </Card>

        {/* Change Password */}
        <Card>
          <h3 className="font-semibold text-lg mb-6">Change Password</h3>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={profileData.currentPassword}
                  onChange={handleProfileInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleProfileInputChange}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleProfileInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Password Requirements:</strong>
              </p>
              <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                <li>At least 6 characters long</li>
                <li>Use a strong, unique password</li>
                <li>Don't reuse passwords from other accounts</li>
              </ul>
            </div>

            <Button type="submit" icon={Save}>
              Change Password
            </Button>
          </form>
        </Card>
      </div>

      {/* Business Information */}
      <Card>
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary-500" />
          Business Information
        </h3>
        
        <form onSubmit={handleSaveBusinessSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={localBusinessSettings.name}
                onChange={(e) => setLocalBusinessSettings(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={localBusinessSettings.phone}
                onChange={(e) => setLocalBusinessSettings(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Address
            </label>
            <input
              type="text"
              value={localBusinessSettings.address}
              onChange={(e) => setLocalBusinessSettings(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={localBusinessSettings.email}
                onChange={(e) => setLocalBusinessSettings(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={localBusinessSettings.whatsapp}
                onChange={(e) => setLocalBusinessSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating Hours
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Weekdays (Mon-Sat)</p>
                <div className="flex space-x-2">
                  <input
                    type="time"
                    value={localBusinessSettings.operatingHours.weekdays.open}
                    onChange={(e) => setLocalBusinessSettings(prev => ({
                      ...prev,
                      operatingHours: {
                        ...prev.operatingHours,
                        weekdays: { ...prev.operatingHours.weekdays, open: e.target.value }
                      }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="time"
                    value={localBusinessSettings.operatingHours.weekdays.close}
                    onChange={(e) => setLocalBusinessSettings(prev => ({
                      ...prev,
                      operatingHours: {
                        ...prev.operatingHours,
                        weekdays: { ...prev.operatingHours.weekdays, close: e.target.value }
                      }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={localBusinessSettings.ownerName}
                  onChange={(e) => setLocalBusinessSettings(prev => ({ ...prev, ownerName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Brian Mwangi"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Sunday</p>
                <div className="flex space-x-2">
                  <input
                    type="time"
                    value={localBusinessSettings.operatingHours.weekends.open}
                    onChange={(e) => setLocalBusinessSettings(prev => ({
                      ...prev,
                      operatingHours: {
                        ...prev.operatingHours,
                        weekends: { ...prev.operatingHours.weekends, open: e.target.value }
                      }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="time"
                    value={localBusinessSettings.operatingHours.weekends.close}
                    onChange={(e) => setLocalBusinessSettings(prev => ({
                      ...prev,
                      operatingHours: {
                        ...prev.operatingHours,
                        weekends: { ...prev.operatingHours.weekends, close: e.target.value }
                      }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" icon={Save}>
            Save Business Settings
          </Button>
        </form>
      </Card>

      {/* M-Pesa Payment Settings */}
      <Card>
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <Smartphone className="h-5 w-5 mr-2 text-green-500" />
          M-Pesa Payment Settings
        </h3>
        
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Setup Instructions:</strong> Get your M-Pesa credentials from Safaricom Developer Portal. 
            For production, you'll need to register your business and get approved for M-Pesa integration.
          </p>
        </div>

        <form onSubmit={handleSavePaymentSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Environment
            </label>
            <select
              value={paymentSettings.mpesaEnvironment}
              onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaEnvironment: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="sandbox">Sandbox (Testing)</option>
              <option value="production">Production (Live)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consumer Key
              </label>
              <input
                type="text"
                value={paymentSettings.mpesaConsumerKey}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaConsumerKey: e.target.value }))}
                placeholder="Enter M-Pesa Consumer Key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consumer Secret
              </label>
              <input
                type="password"
                value={paymentSettings.mpesaConsumerSecret}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaConsumerSecret: e.target.value }))}
                placeholder="Enter M-Pesa Consumer Secret"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shortcode
              </label>
              <input
                type="text"
                value={paymentSettings.mpesaShortcode}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaShortcode: e.target.value }))}
                placeholder="e.g., 174379"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passkey
              </label>
              <input
                type="password"
                value={paymentSettings.mpesaPasskey}
                onChange={(e) => setPaymentSettings(prev => ({ ...prev, mpesaPasskey: e.target.value }))}
                placeholder="Enter M-Pesa Passkey"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button type="submit" icon={Save}>
              Save M-Pesa Settings
            </Button>
            <Button
              type="button"
              variant="outline"
              icon={TestTube}
              onClick={testMpesaConnection}
            >
              Test Connection
            </Button>
          </div>
        </form>
      </Card>

      {/* SMS/WhatsApp Notifications */}
      <Card>
        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
          SMS & WhatsApp Notifications
        </h3>
        
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Setup Instructions:</strong> For SMS, create a Twilio account and get your credentials. 
            For WhatsApp Business API, you'll need to apply for access through Meta.
          </p>
        </div>

        <form onSubmit={handleSaveNotificationSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Types
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm">Email Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm">SMS Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.whatsappNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, whatsappNotifications: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm">WhatsApp Notifications</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twilio Account SID
              </label>
              <input
                type="text"
                value={notificationSettings.twilioAccountSid}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, twilioAccountSid: e.target.value }))}
                placeholder="Enter Twilio Account SID"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twilio Auth Token
              </label>
              <input
                type="password"
                value={notificationSettings.twilioAuthToken}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, twilioAuthToken: e.target.value }))}
                placeholder="Enter Twilio Auth Token"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twilio Phone Number
              </label>
              <input
                type="tel"
                value={notificationSettings.twilioPhoneNumber}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, twilioPhoneNumber: e.target.value }))}
                placeholder="e.g., +1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Business API Key
              </label>
              <input
                type="password"
                value={notificationSettings.whatsappBusinessApiKey}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, whatsappBusinessApiKey: e.target.value }))}
                placeholder="Enter WhatsApp Business API Key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button type="submit" icon={Save}>
              Save Notification Settings
            </Button>
            <Button
              type="button"
              variant="outline"
              icon={TestTube}
              onClick={testSmsService}
            >
              Test SMS
            </Button>
          </div>
        </form>
      </Card>

      {/* Delivery Settings */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Delivery Settings</h3>
        
        <form onSubmit={handleSaveDeliverySettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Free Delivery Threshold (KES)
              </label>
              <input
                type="number"
                value={deliverySettings.freeDeliveryThreshold}
                onChange={(e) => setDeliverySettings(prev => ({ ...prev, freeDeliveryThreshold: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Delivery Fee (KES)
              </label>
              <input
                type="number"
                value={deliverySettings.deliveryFee}
                onChange={(e) => setDeliverySettings(prev => ({ ...prev, deliveryFee: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Areas & Fees
            </label>
            <div className="space-y-2">
              {deliverySettings.areas.map((area, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={area.name}
                    onChange={(e) => {
                      const newAreas = [...deliverySettings.areas];
                      newAreas[index].name = e.target.value;
                      setDeliverySettings(prev => ({ ...prev, areas: newAreas }));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">KES</span>
                  <input
                    type="number"
                    value={area.fee}
                    onChange={(e) => {
                      const newAreas = [...deliverySettings.areas];
                      newAreas[index].fee = parseInt(e.target.value);
                      setDeliverySettings(prev => ({ ...prev, areas: newAreas }));
                    }}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" icon={Save}>
            Save Delivery Settings
          </Button>
        </form>
      </Card>

      {/* Promo Codes */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Promo Codes</h3>
        
        <div className="space-y-3">
          {promoCodes.map((promo, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">{promo.code}</p>
                <p className="text-sm text-gray-600">
                  {promo.type === 'percentage' ? `${promo.discount}% off` : `KES ${promo.discount} off`}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  promo.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {promo.active ? 'Active' : 'Inactive'}
                </span>
                <button className="text-primary-600 hover:text-primary-700 text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="outline">
            Add New Promo Code
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;