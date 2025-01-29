import React from 'react';
import { Link } from 'react-router-dom';  // Add this import for routing
import { Shirt, Scissors, PaintBucket, Users, Phone, ChevronRight, Sparkles, Ruler, Palette, UserPlus } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    {
      title: 'Shop',
      items: [
        { icon: Shirt, label: 'Ready to Wear', href: '/ready-to-wear' },
        { icon: Scissors, label: 'Custom Tailoring', href: '/custom-tailoring' },
        { icon: PaintBucket, label: 'Fabric Collection', href: '/fabrics' }
      ]
    },
    {
      title: 'Services',
      items: [
        { icon: Ruler, label: 'Measurements', href: '/measurements' },
        { icon: Palette, label: 'Design Consultation', href: '/consultation' },
        { icon: Sparkles, label: 'Embroidery & Embellishments', href: '/embroidery' }
      ]
    },
    {
      title: 'About',
      items: [
        { icon: Users, label: 'Our Team', href: '/team' },
        { icon: Phone, label: 'Contact Us', href: '/contact' },
        { icon: UserPlus, label: 'Join Us', href: '/joinus' }  // "Join Us" will navigate to /joinus
      ]
    }
  ];

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50"
      onClick={handleClickOutside}
    >
      <div className="w-80 h-full bg-white overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-serif mb-8">StitchVastra</h2>

          <div className="space-y-8">
            {menuItems.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.href}  // Use 'Link' to navigate to routes
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}