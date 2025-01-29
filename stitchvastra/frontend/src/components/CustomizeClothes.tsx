import React, { useState } from 'react';
import { X, Users, Sparkles } from 'lucide-react';
import WomenCustomization from './customization/women/WomenCustomization';

interface CustomizeClothesProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1585914924626-15adac1e6402?auto=format&fit=crop&q=80',
    description: 'Traditional & Modern Wear for Women'
  },
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80',
    description: 'Classic & Contemporary Men\'s Fashion'
  },
  {
    id: 'girls',
    name: 'Girls',
    image: 'https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?auto=format&fit=crop&q=80',
    description: 'Adorable Outfits for Young Girls'
  },
  {
    id: 'boys',
    name: 'Boys',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80',
    description: 'Stylish Wear for Young Boys'
  }
];

export default function CustomizeClothes({ isOpen, onClose }: CustomizeClothesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              {selectedCategory && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory ? `Customize ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}'s Wear` : 'Choose Category'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {!selectedCategory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 group-hover:from-black/70 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {selectedCategory === 'women' && <WomenCustomization />}
              {selectedCategory !== 'women' && (
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">We're working on bringing you amazing customization options for this category!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}