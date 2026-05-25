import { useTheme } from 'next-themes';
import { useState } from 'react';

export const useSettings = () => {
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    courseUpdates: true,
    showDeleteModal: false,
    showPasswordModal: false,
    showTwoFactor: false,
  });

  const [language, setLanguage] = useState('en');

  const toggleSettings = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
  };

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return {
    toggleSettings,
    handleChangeLanguage,
    handleChangeTheme,
    theme,
    language,
    settings,
  };
};
