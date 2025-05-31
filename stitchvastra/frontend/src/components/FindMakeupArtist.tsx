import React, { useState } from 'react';
import { X, Search, Calendar, Star, MapPin, Palette, Filter, Heart, Clock, Plus } from 'lucide-react';
import Modal from './common/Modal';

interface FindMakeupArtistProps {
  isOpen: boolean;
  onClose: () => void;
}

const makeupArtists = [
  {
    id: 1,
    name: 'Anjali Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialties: ['Bridal', 'Party', 'Editorial'],
    priceRange: '₹5,000 - ₹25,000',
    portfolio: [
      'https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2442900/pexels-photo-2442900.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 2,
    name: 'Priya Malhotra',
    location: 'Delhi, NCR',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialties: ['Bridal', 'Celebrity', 'Fashion'],
    priceRange: '₹8,000 - ₹30,000',
    portfolio: [
      'https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1926619/pexels-photo-1926619.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1987344/pexels-photo-1987344.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 3,
    name: 'Karan Patel',
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    reviews: 83,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialties: ['Fashion', 'Party', 'Photoshoot'],
    priceRange: '₹4,000 - ₹20,000',
    portfolio: [
      'https://images.pexels.com/photos/2382297/pexels-photo-2382297.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2058051/pexels-photo-2058051.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 4,
    name: 'Meera Reddy',
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    reviews: 141,
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialties: ['Bridal', 'South Indian', 'Party'],
    priceRange: '₹6,000 - ₹25,000',
    portfolio: [
      'https://images.pexels.com/photos/1306791/pexels-photo-1306791.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/457701/pexels-photo-457701.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4325645/pexels-photo-4325645.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  }
];

const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];

const specialties = ['Bridal', 'Party', 'Editorial', 'Fashion', 'Celebrity', 'Photoshoot', 'South Indian'];

const FindMakeupArtist: React.FC<FindMakeupArtistProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  const filteredArtists = makeupArtists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'All Locations' || artist.location.includes(selectedLocation);
    const matchesSpecialties = selectedSpecialties.length === 0 || 
      selectedSpecialties.some(specialty => artist.specialties.includes(specialty));
    const matchesPriceRange = true; // Simplified for this example
    
    return matchesSearch && matchesLocation && matchesSpecialties && matchesPriceRange;
  });

  const handleSelectArtist = (id: number) => {
    setSelectedArtist(id);
    setActiveStep(2);
  };

  const handleDateSelection = () => {
    setActiveStep(3);
  };

  const handleSubmit = () => {
    // In a real app, this would send the booking data to the server
    alert('Makeup artist booked successfully!');
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setActiveStep(1);
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedSpecialties([]);
    setPriceRange([0, 30000]);
    setSelectedArtist(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedService('');
    setSpecialRequests('');
  };

  const selectedArtistData = selectedArtist 
    ? makeupArtists.find(artist => artist.id === selectedArtist) 
    : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Palette className="mr-2 h-6 w-6 text-purple-600" />
            Find a Makeup Artist
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="mb-8">
          <div className="flex">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1">
                <div className="relative flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  <div 
                    className={`flex-1 h-1 ${
                      activeStep > step ? 'bg-purple-600' : 'bg-gray-200'
                    } ${step === 3 ? 'hidden' : ''}`}
                  ></div>
                </div>
                <div className="text-xs text-center mt-2">
                  {step === 1 && 'Find Artist'}
                  {step === 2 && 'Select Date & Time'}
                  {step === 3 && 'Confirm Booking'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Find Makeup Artist */}
        {activeStep === 1 && (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="search"
                    className="block w-full p-3 ps-10 text-sm rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Search makeup artists..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                </div>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="p-3 bg-purple-100 rounded-lg text-purple-600 hover:bg-purple-200 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Filters */}
              {isFilterOpen && (
                <div className="bg-purple-50 p-4 rounded-lg mb-6 animate-fadeIn">
                  <h3 className="font-medium text-gray-900 mb-3">Filters</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map(specialty => (
                        <button
                          key={specialty}
                          onClick={() => handleSpecialtyToggle(specialty)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedSpecialties.includes(specialty)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Makeup Artist List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredArtists.length > 0 ? (
                filteredArtists.map(artist => (
                  <div 
                    key={artist.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-60 md:h-auto relative">
                        <img 
                          src={artist.image} 
                          alt={artist.name} 
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white rounded-full text-rose-500 shadow-sm hover:bg-rose-50 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="p-4 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{artist.name}</h3>
                            <div className="flex items-center bg-purple-100 px-2 py-1 rounded-md">
                              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                              <span className="text-sm font-medium">{artist.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({artist.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{artist.location}</span>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                              {artist.specialties.map(specialty => (
                                <span 
                                  key={specialty} 
                                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-800 mb-2">
                            <span className="font-medium">Price Range:</span> {artist.priceRange}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div className="flex -space-x-2">
                            {artist.portfolio.map((photo, idx) => (
                              <div key={idx} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                                <img 
                                  src={photo} 
                                  alt={`Portfolio ${idx + 1}`} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                            <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-medium">
                              +{artist.portfolio.length - 3}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleSelectArtist(artist.id)}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="flex justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No makeup artists found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {activeStep === 2 && selectedArtistData && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden bg-purple-50 p-4">
                  <div className="flex items-center mb-4">
                    <img 
                      src={selectedArtistData.image} 
                      alt={selectedArtistData.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedArtistData.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm">{selectedArtistData.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedArtistData.location}
                    </p>
                    <p className="flex items-center">
                      <Palette className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedArtistData.specialties.join(', ')}
                    </p>
                    <p className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-gray-500" />
                      {selectedArtistData.reviews} reviews
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                    Select Date
                  </h3>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-purple-600" />
                    Select Time
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'].map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedTime === time
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'border-gray-300 hover:border-purple-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Service</h3>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select a service</option>
                    {selectedArtistData.specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty} Makeup</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Booking */}
        {activeStep === 3 && selectedArtistData && (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Makeup Artist</p>
                  <p className="font-medium">{selectedArtistData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-medium">{selectedService}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{selectedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{selectedArtistData.location}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests (optional)
              </label>
              <textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Any specific requirements or references..."
              ></textarea>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Price Details</h4>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge</span>
                  <span>₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travel Fee</span>
                  <span>₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹825</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>₹6,325</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the terms and conditions and cancellation policy
              </label>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(activeStep - 1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {activeStep < 3 ? (
            <button
              type="button"
              onClick={activeStep === 1 ? handleSelectArtist.bind(null, makeupArtists[0].id) : handleDateSelection}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              disabled={
                (activeStep === 1 && !filteredArtists.length) ||
                (activeStep === 2 && (!selectedDate || !selectedTime || !selectedService))
              }
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FindMakeupArtist;