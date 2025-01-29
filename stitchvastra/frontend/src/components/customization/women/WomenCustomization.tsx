import React, { useState } from 'react';
import { Sparkles, Scissors, Shirt, Palette, ArrowLeft, Plus, Check, Diamond, Gem} from 'lucide-react';

const categories = [
  {
    id: 'traditional',
    name: 'Traditional Wear',
    description: 'Timeless elegance with traditional craftsmanship',
    items: [
      {
        id: 'sarees',
        name: 'Sarees',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80',
        description: 'Elegant sarees with custom designs and embellishments',

        fabricTypes: [
          { id: 'silk', name: 'Pure Silk', price: '₹15,000' },
          { id: 'cotton', name: 'Cotton', price: '₹5,000' },
          { id: 'georgette', name: 'Georgette', price: '₹8,000' },
          { id: 'chiffon', name: 'Chiffon', price: '₹7,000' }
        ],
        colors: [
          { id: 'red', name: 'Royal Red', hex: '#D32F2F' },
          { id: 'blue', name: 'Royal Blue', hex: '#1976D2' },
          { id: 'green', name: 'Emerald Green', hex: '#388E3C' },
          { id: 'purple', name: 'Deep Purple', hex: '#7B1FA2' },
          { id: 'gold', name: 'Golden', hex: '#FFC107' },
          { id: 'pink', name: 'Rose Pink', hex: '#E91E63' }
        ],
        designs: [
          { id: 'plain', name: 'Plain', price: '₹0' },
          { id: 'bordered', name: 'Bordered', price: '₹2,000' },
          { id: 'embroidered', name: 'Embroidered', price: '₹5,000' }
        ],
        customizations: [
          { id: 'tassels', name: 'Tassels', price: '₹500' },
          { id: 'fall', name: 'Fall', price: '₹300' },
          { id: 'lace', name: 'Designer Lace', price: '₹1,000' },
          { id: 'kundan', name: 'Kundan Work', price: '₹3,000' },
          { id: 'maggam', name: 'Maggam Work', price: '₹4,000' }
        ],
        blouseOptions: {
          types: [
            { id: 'regular', name: 'Regular Fit', price: '₹1,000' },
            { id: 'princess', name: 'Princess Cut', price: '₹1,500' },
            { id: 'high-neck', name: 'High Neck', price: '₹2,000' }
          ],
          sleeves: [
            { id: 'short', name: 'Short Sleeves', price: '₹0' },
            { id: 'three-quarter', name: '3/4 Sleeves', price: '₹300' },
            { id: 'full', name: 'Full Sleeves', price: '₹500' }
          ],
          designs: [
            { id: 'plain', name: 'Plain', price: '₹0' },
            { id: 'embroidered', name: 'Embroidered', price: '₹2,000' },
            { id: 'maggam', name: 'Maggam Work', price: '₹3,000' }
          ]
        },
        matchingJewellery: [
          { id: 'necklace', name: 'Necklace Set', price: '₹5,000', image: 'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&q=80' },
          { id: 'earrings', name: 'Designer Earrings', price: '₹2,000', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80' },
          { id: 'bangles', name: 'Bangles Set', price: '₹3,000', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80' }
        ]
      },
      {
        id: 'blouses',
        name: 'Blouses',
        image: 'https://images.unsplash.com/photo-1602810317536-5d5e8a552d85?auto=format&fit=crop&q=80',
        description: 'Perfectly fitted blouses with intricate detailing',
        customizations: ['Maggam Work', 'Back Design', 'Sleeve Style']
      }
    ]
  },
  {
    id: 'casual',
    name: 'Casual Wear',
    description: 'Comfortable and stylish everyday wear',
    items: [
      {
        id: 'kurtis',
        name: 'Kurtis',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80',
        description: 'Contemporary kurtis with modern designs',
        customizations: ['Embroidery', 'Length', 'Style']
      },
      {
        id: 'dresses',
        name: 'Dresses',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80',
        description: 'Trendy dresses for every occasion',
        customizations: ['Length', 'Pattern', 'Sleeves']
      }
    ]
  },
  {
    id: 'western',
    name: 'Western Wear',
    description: 'Modern and trendy western fashion',
    items: [
      {
        id: 'tshirts',
        name: 'T-Shirts',
        image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80',
        description: 'Custom designed t-shirts with your personal touch',
        customizations: [
          'Custom Prints',
          'Text Design',
          'Artwork Placement',
          'Color Options',
          'Fabric Type'
        ]
      },
      {
        id: 'jeans',
        name: 'Jeans',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80',
        description: 'Perfect fit jeans with custom modifications',
        customizations: [
          'Distressing',
          'Patches',
          'Embroidery',
          'Length Adjustment',
          'Style (Skinny/Straight/Boot Cut)'
        ]
      }
    ]
  }
];
interface CustomizationState {
  fabricType: string;
  color: string;
  design: string;
  customizations: string[];
  blouse: {
    type: string;
    sleeves: string;
    design: string;
  };
  jewellery: string[];
}
export default function WomenCustomization() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [customizationStep, setCustomizationStep] = useState(0);
  const [customizationState, setCustomizationState] = useState<CustomizationState>({
    fabricType: '',
    color: '',
    design: '',
    customizations: [],
    blouse: {
      type: '',
      sleeves: '',
      design: ''
    },
    jewellery: []
  });

  const handleCustomizationChange = (field: string, value: any) => {
    setCustomizationState(prev => {
      if (field.startsWith('blouse.')) {
        const blouseField = field.split('.')[1];
        return {
          ...prev,
          blouse: {
            ...prev.blouse,
            [blouseField]: value
          }
        };
      }
      if (field === 'customizations') {
        const newCustomizations = prev.customizations.includes(value)
          ? prev.customizations.filter(item => item !== value)
          : [...prev.customizations, value];
        return { ...prev, customizations: newCustomizations };
      }
      if (field === 'jewellery') {
        const newJewellery = prev.jewellery.includes(value)
          ? prev.jewellery.filter(item => item !== value)
          : [...prev.jewellery, value];
        return { ...prev, jewellery: newJewellery };
      }
      return { ...prev, [field]: value };
    });
  };

  const renderCustomizationStep = () => {
    if (!selectedItem || selectedItem.id !== 'sarees') return null;

    const steps = [
      {
        title: 'Choose Fabric & Color',
        content: (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Select Fabric Type</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.fabricTypes.map((fabric: any) => (
                  <button
                    key={fabric.id}
                    onClick={() => handleCustomizationChange('fabricType', fabric.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      customizationState.fabricType === fabric.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{fabric.name}</span>
                      <span className="text-gray-600">{fabric.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Select Color</h4>
              <div className="grid grid-cols-3 gap-4">
                {selectedItem.colors.map((color: any) => (
                  <button
                    key={color.id}
                    onClick={() => handleCustomizationChange('color', color.id)}
                    className={`group p-4 rounded-lg border-2 transition-all ${
                      customizationState.color === color.id
                        ? 'border-indigo-600'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium">{color.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Select Design & Customizations',
        content: (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Choose Base Design</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.designs.map((design: any) => (
                  <button
                    key={design.id}
                    onClick={() => handleCustomizationChange('design', design.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      customizationState.design === design.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{design.name}</span>
                      <span className="text-gray-600">{design.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Additional Customizations</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.customizations.map((custom: any) => (
                  <button
                    key={custom.id}
                    onClick={() => handleCustomizationChange('customizations', custom.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      customizationState.customizations.includes(custom.id)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {customizationState.customizations.includes(custom.id) ? (
                          <Check className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Plus className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="font-medium">{custom.name}</span>
                      </div>
                      <span className="text-gray-600">{custom.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Customize Blouse',
        content: (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Blouse Type</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.blouseOptions.types.map((type: any) => (
                  <button
                    key={type.id}
                    onClick={() => handleCustomizationChange('blouse.type', type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      customizationState.blouse.type === type.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{type.name}</span>
                      <span className="text-gray-600">{type.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Sleeve Style</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.blouseOptions.sleeves.map((sleeve: any) => (
                  <button
                    key={sleeve.id}
                    onClick={() => handleCustomizationChange('blouse.sleeves', sleeve.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      customizationState.blouse.sleeves === sleeve.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{sleeve.name}</span>
                      <span className="text-gray-600">{sleeve.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Blouse Design</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedItem.blouseOptions.designs.map((design: any) => (
                  <button
                    key={design.id}
                    onClick={() => handleCustomizationChange('blouse.design', design.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      customizationState.blouse.design === design.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{design.name}</span>
                      <span className="text-gray-600">{design.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Matching Jewellery (Optional)',
        content: (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Select Matching Jewellery</h4>
            <div className="grid grid-cols-2 gap-6">
              {selectedItem.matchingJewellery.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => handleCustomizationChange('jewellery', item.id)}
                  className={`group relative rounded-lg overflow-hidden border-2 transition-all ${
                    customizationState.jewellery.includes(item.id)
                      ? 'border-indigo-600'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h5 className="font-semibold mb-2">{item.name}</h5>
                        <p className="text-sm">{item.price}</p>
                      </div>
                    </div>
                    {customizationState.jewellery.includes(item.id) && (
                      <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      }
    ];

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">{steps[customizationStep].title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Step {customizationStep + 1} of {steps.length}
          </div>
        </div>
        {steps[customizationStep].content}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => setCustomizationStep(prev => Math.max(0, prev - 1))}
            className={`px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${
              customizationStep === 0 ? 'invisible' : ''
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (customizationStep < steps.length - 1) {
                setCustomizationStep(prev => prev + 1);
              } else {
                // Handle final submission
                console.log('Final customization state:', customizationState);
              }
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {customizationStep === steps.length - 1 ? 'Complete Customization' : 'Next Step'}
          </button>
        </div>
      </div>
    );
  };

  if (!selectedItem) {
    return (
      <div className="space-y-12 py-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Women's Customization</h2>
          <p className="text-gray-600">Choose from our wide range of customizable clothing options</p>
        </div>
        
        {categories.map((category) => (
          <div key={category.id} className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                {category.name}
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </h3>
              <p className="text-gray-600 mt-2">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setCustomizationStep(0);
                  }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[16/10] relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 group-hover:from-black/80 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h4 className="text-2xl font-semibold mb-2">{item.name}</h4>
                      <p className="text-gray-200 mb-3">{item.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <button
        onClick={() => {
          setSelectedItem(null);
          setCustomizationStep(0);
          setCustomizationState({
            fabricType: '',
            color: '',
            design: '',
            customizations: [],
            blouse: {
              type: '',
              sleeves: '',
              design: ''
            },
            jewellery: []
          });
        }}
        className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 group"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Back to Categories
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          {renderCustomizationStep()}
        </div>
      </div>
    </div>
  );
}
  