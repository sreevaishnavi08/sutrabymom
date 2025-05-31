import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight, Star, Scissors, Shirt, ArrowRight, Mail } from 'lucide-react-native'; // Use appropriate icons for React Native
import SchedulePickup from './SchedulePickup'; // Adjust the import path as necessary
import CustomizeClothes from './CustomizeClothes'; // Adjust the import path as necessary

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
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Carousel */}
      <View style={styles.carousel}>
        {carouselImages.map((image, index) => (
          <View key={index} style={[styles.slide, currentSlide === index ? styles.activeSlide : styles.inactiveSlide]}>
            <Image source={{ uri: image.url }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{image.title}</Text>
              <Text style={styles.subtitle}>{image.subtitle}</Text>
            </View>
          </View>
        ))}
        <Button title="Previous" onPress={prevSlide} />
        <Button title="Next" onPress={nextSlide} />
      </View>

      {/* Main CTA Buttons */}
      <View style={styles.ctaContainer}>
        <Button title="Schedule Pickup" onPress={() => setIsSchedulePickupOpen(true)} />
        <Button title="Customize Your Clothes" onPress={() => setIsCustomizeOpen(true)} />
      </View>

      {/* Schedule Pickup Modal */}
      <SchedulePickup isOpen={isSchedulePickupOpen} onClose={() => setIsSchedulePickupOpen(false)} />
      <CustomizeClothes isOpen={isCustomizeOpen} onClose={() => setIsCustomizeOpen(false)} />

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <service.icon style={styles.serviceIcon} />
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>Professional {service.name.toLowerCase()} services tailored to your needs</Text>
          </View>
        ))}
      </View>

      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Image source={{ uri: review.image }} style={styles.reviewImage} />
            <Text style={styles.reviewName}>{review.name}</Text>
            <Text style={styles.reviewText}>{review.review}</Text>
          </View>
        ))}
      </View>

      {/* Special Offers */}
      <View style={styles.offersSection}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        {/* Add offer cards here */}
      </View>

      {/* Newsletter & Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Stay Updated</Text>
        {/* Add newsletter subscription form here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  carousel: {
    height: 300,
    position: 'relative',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  activeSlide: {
    opacity: 1,
  },
  inactiveSlide: {
    opacity: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  servicesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  serviceIcon: {
    height: 48,
    width: 48,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: '#666',
  },
  reviewsSection: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  reviewImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  reviewName: {
    fontWeight: 'bold',
  },
  reviewText: {
    color: '#666',
  },
  offersSection: {
    padding: 16,
  },
  footer: {
    backgroundColor: '#333',
    padding: 16,
    color: '#fff',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
