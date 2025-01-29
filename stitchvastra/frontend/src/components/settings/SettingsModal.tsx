import React from 'react';
import { X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from './../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' }
] as const;

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, language, toggleTheme, setLanguage } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Theme</h3>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-400" />
              )}
              <span className="text-gray-700 dark:text-gray-200">
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </button>
        </div>

        {/* Language Selection */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Language</h3>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                  language === lang.code
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className={`h-5 w-5 ${
                    language === lang.code
                      ? 'text-indigo-500'
                      : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <span className={`${
                    language === lang.code
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}>
                    {lang.name}
                  </span>
                </div>
                {language === lang.code && (
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}