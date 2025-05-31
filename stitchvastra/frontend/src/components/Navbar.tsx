import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import Cart from "./Cart";
import { 
  ShoppingCart, 
  Truck, 
  User, 
  CircleDot,
  Heart,
  Bot,
  X,
  Menu,
  Search,
  Compass,
  ChevronDown
} from 'lucide-react';
import AuthModal from './auth/AuthModal';
import UserMenu from './UserMenu';
import SideMenu from './SideMenu';
import AIAssistant from './AIAssistant';

interface NavbarProps {
  isSignedIn?: boolean;
  user?: { name: string; email: string };
}

export default function Navbar({ 
  isSignedIn: initialIsSignedIn = false, 
  user = { name: "User Name", email: "user@example.com" } 
}: NavbarProps) {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(initialIsSignedIn);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowAccountMenu(false);
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    setShowAccountMenu(false);
  };

  const handleCartClick = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
    } else {
      navigate("/cart");
    }
  };

  const handleWishlistClick = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
    } else {
      setShowWishlistModal(true);
    }
  };

  const textColorClass = isScrolled ? 'text-gray-900' : 'text-white'; // Set text color based on scroll

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md text-black' : 'bg-transparent text-black'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSideMenu(true)}
                className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
              >
                <Menu className="h-6 w-6" />
              </button>
              <button 
                onClick={() => setShowAIAssistant(true)}
                className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
              >
                <Bot className="h-6 w-6" />
              </button>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
              >
                <Search className="h-6 w-6" />
              </button>
              <div className="relative">
                <button 
                  className={`p-2 rounded-full hover:bg-black/10 transition-colors flex items-center gap-1 ${textColorClass}`}
                  onClick={() => setShowExploreMenu(!showExploreMenu)}
                >
                  <Compass className="h-6 w-6" />
                  <ChevronDown className={`h-4 w-4 transition-transform ${showExploreMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {showExploreMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 text-sm font-medium text-gray-500">Shop</div>
                    <a href="/men" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Men</a>
                    <a href="/women" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Women</a>
                    <a href="/kids" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Kids</a>
                    <a href="/custom-orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Custom Orders</a>
                    
                    <div className="px-4 py-2 mt-2 text-sm font-medium text-gray-500">Services</div>
                    <a href="/tailoring" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Tailoring</a>
                    <a href="/maggam-work" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Maggam Work</a>
                    <a href="/embroidery" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Embroidery</a>
                    
                    <div className="border-t my-2"></div>
                    <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">About Us</a>
                    <a href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Contact</a>
                  </div>
                )}
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
                className={`h-12 w-48 flex items-center justify-center ${textColorClass}`}
              >
                <span className="text-xl font-serif cursor-pointer">StitchVastra</span>
              </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleWishlistClick}
                className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
              >
                <Heart className="h-5 w-5" />
              </button>

              <button 
                onClick={handleCartClick} 
                className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              
              <button 
                className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
              >
                <Truck className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => {
                    if (!isSignedIn) {
                      setShowAuthModal(true);
                    } else {
                      setShowAccountMenu(!showAccountMenu);
                    }
                  }}
                  className={`p-2 rounded-full hover:bg-black/10 transition-colors ${textColorClass}`}
                >
                  <User className="h-5 w-5" />
                </button>
                {!isSignedIn && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <CircleDot className="h-3 w-3 text-red-500 animate-pulse" />
                  </span>
                )}
                {isSignedIn && showAccountMenu && (
                  <UserMenu
                    isOpen={showAccountMenu}
                    onClose={() => setShowAccountMenu(false)}
                    user={user}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className={`w-full py-4 px-4 ${isScrolled ? 'bg-white' : 'bg-black/20 backdrop-blur-lg'}`}>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isScrolled ? 'text-gray-400' : 'text-white/60'
                } h-5 w-5`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-12 pr-4 py-3 rounded-full ${
                    isScrolled 
                      ? 'bg-gray-100 text-gray-900 placeholder-gray-500'
                      : 'bg-white/10 text-white placeholder-white/60'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSignIn={handleSignIn}
        />
      )}

      {showCartModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCartModal(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="text-center text-gray-600 py-8">
              Your cart is empty
            </div>
          </div>
        </div>
      )}

      {showWishlistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Wishlist</h2>
              <button onClick={() => setShowWishlistModal(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="text-center text-gray-600 py-8">
              No items in your wishlist
            </div>
          </div>
        </div>
      )}

      {/* Side Menu */}
      <SideMenu 
        isOpen={showSideMenu} 
        onClose={() => setShowSideMenu(false)} 
      />

      {/* AI Assistant */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />
    </>
  );
}
