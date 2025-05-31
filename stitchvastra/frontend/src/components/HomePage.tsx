import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Scissors, Shirt, ArrowRight, Mail, Palette } from 'lucide-react';
import SchedulePickup from '../components/SchedulePickup';
import CustomizeClothes from '../components/CustomizeClothes';
import FindMakeupArtist from '../components/FindMakeupArtist';

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&q=80",
    title: "Traditional Elegance",
    subtitle: "Handcrafted with Love"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Modern Heritage",
    subtitle: "Where Tradition Meets Style"
  },
  {
    url: "https://media.istockphoto.com/id/493626860/photo/colorful-saree-background.jpg?s=612x612&w=0&k=20&c=3buwZCcNoW-nZITKAAEonZBD6onlrOPq1yDH_lAuegc=",
    title: "Timeless Beauty",
    subtitle: "Crafted for Generations"
  }
];

const services = [
  { name: "Tailoring", icon: Scissors },
  { name: "Maggam Work", icon: Star },
  { name: "Embroidery", icon: Shirt }
];

const reviews = [
  {
    name: "Priya S.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    review: "The tailoring service was exceptional! My wedding lehenga fits perfectly.",
    rating: 5
  },
  {
    name: "Rahul M.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    review: "Amazing craftsmanship on my custom-designed kurta. Highly recommended!",
    rating: 5
  },
  {
    name: "Anjali P.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    review: "The Maggam work on my saree blouse was absolutely stunning.",
    rating: 5
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSchedulePickupOpen, setIsSchedulePickupOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false); // Add this line
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isFindMakeupArtistOpen, setIsFindMakeupArtistOpen] = useState(false);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // Change every 3 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <div className="text-center text-white mb-12">
                <h1 className="text-6xl font-bold mb-4 font-serif">{image.title}</h1>
                <p className="text-2xl">{image.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main CTA Buttons */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button 
              onClick={() => setIsSchedulePickupOpen(true)}
              className="px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Scissors className="h-5 w-5" />
              Schedule Pickup
            </button>
            <button 
              onClick={() => setIsCustomizeOpen(true)}
              className="px-8 py-4 bg-rose-600 text-white rounded-full hover:bg-rose-700 transform hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Shirt className="h-5 w-5" />
              Customize Your Clothes
            </button>
            <button 
              onClick={() => setIsFindMakeupArtistOpen(true)}
              className="px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 font-medium text-lg shadow-lg flex items-center justify-center gap-2">
              <Palette className="h-5 w-5" />
              Find a Makeup Artist
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Pickup Modal */}
      <SchedulePickup 
        isOpen={isSchedulePickupOpen}
        onClose={() => setIsSchedulePickupOpen(false)}
      />
      <CustomizeClothes
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
      <FindMakeupArtist
        isOpen={isFindMakeupArtistOpen}
        onClose={() => setIsFindMakeupArtistOpen(false)}
      />

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <service.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600">Professional {service.name.toLowerCase()} services tailored to your needs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Referral Program</h3>
              <p className="text-gray-600 mb-4">Refer a friend and get 20% off on your next order!</p>
              <button className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">First Order Discount</h3>
              <p className="text-gray-600 mb-4">Get 15% off on your first custom order!</p>
              <button className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                Shop Now <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Footer */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Newsletter */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Subscribe
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                  <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
