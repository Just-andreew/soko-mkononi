import React, { createContext, useContext, useState, useEffect } from 'react';

interface BusinessSettings {
  name: string;
  ownerName: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  operatingHours: {
    weekdays: { open: string; close: string };
    weekends: { open: string; close: string };
  };
}

interface BusinessContextType {
  businessSettings: BusinessSettings;
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    name: 'Soko Mtaani',
    ownerName: 'Brian Owino',
    address: 'Parklands Road, Nairobi',
    phone: '+254712345678',
    email: 'info@sokomotaani.co.ke',
    whatsapp: '+254712345678',
    operatingHours: {
      weekdays: { open: '07:00', close: '20:00' },
      weekends: { open: '08:00', close: '18:00' }
    }
  });

  // Load business settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('soko-business-settings');
    if (savedSettings) {
      try {
        setBusinessSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading business settings from localStorage:', error);
      }
    }
  }, []);

  // Save business settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('soko-business-settings', JSON.stringify(businessSettings));
  }, [businessSettings]);

  const updateBusinessSettings = (newSettings: Partial<BusinessSettings>) => {
    setBusinessSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <BusinessContext.Provider
      value={{
        businessSettings,
        updateBusinessSettings,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};