import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  FAB,
  Portal,
  Modal,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&q=80',
    title: 'Traditional Elegance',
    subtitle: 'Handcrafted with Love',
  },
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    title: 'Modern Heritage',
    subtitle: 'Where Tradition Meets Style',
  },
  {
    url: 'https://media.istockphoto.com/id/493626860/photo/colorful-saree-background.jpg?s=612x612&w=0&k=20&c=3buwZCcNoW-nZITKAAEonZBD6onlrOPq1yDH_lAuegc=',
    title: 'Timeless Beauty',
    subtitle: 'Crafted for Generations',
  },
];

const services = [
  { name: 'Tailoring', icon: 'scissors', color: '#6366f1' },
  { name: 'Maggam Work', icon: 'star', color: '#ec4899' },
  { name: 'Embroidery', icon: 'grid', color: '#10b981' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleSchedulePickup = () => {
    setShowScheduleModal(true);
  };

  const handleCustomize = () => {
    navigation.navigate('Customize' as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>
              Welcome back, {user?.name || 'Guest'}!
            </Text>
            <Text style={styles.headerSubtitle}>
              Discover beautiful custom clothing
            </Text>
          </View>
        </LinearGradient>

        {/* Hero Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentSlide(slideIndex);
          }}
          style={styles.carousel}
        >
          {carouselImages.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image.url }} style={styles.slideImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.slideOverlay}
              >
                <Text style={styles.slideTitle}>{image.title}</Text>
                <Text style={styles.slideSubtitle}>{image.subtitle}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        {/* Slide Indicators */}
        <View style={styles.indicators}>
          {carouselImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlide === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            onPress={handleSchedulePickup}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            icon="truck"
          >
            Schedule Pickup
          </Button>
          <Button
            mode="contained"
            onPress={handleCustomize}
            style={[styles.actionButton, styles.customizeButton]}
            contentStyle={styles.actionButtonContent}
            icon="palette"
          >
            Customize Clothes
          </Button>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <Card key={index} style={styles.serviceCard}>
                <Card.Content style={styles.serviceContent}>
                  <View
                    style={[
                      styles.serviceIcon,
                      { backgroundColor: service.color + '20' },
                    ]}
                  >
                    <IconButton
                      icon={service.icon}
                      size={24}
                      iconColor={service.color}
                    />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>
                    Professional {service.name.toLowerCase()} services
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('Fabrics' as never)}
            >
              <IconButton icon="grid" size={24} iconColor={theme.colors.primary} />
              <Text style={styles.quickActionText}>Browse Fabrics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('Orders' as never)}
            >
              <IconButton icon="package" size={24} iconColor={theme.colors.primary} />
              <Text style={styles.quickActionText}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate('AIAssistant' as never)}
            >
              <IconButton icon="robot" size={24} iconColor={theme.colors.primary} />
              <Text style={styles.quickActionText}>AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Schedule Pickup Modal */}
      <Portal>
        <Modal
          visible={showScheduleModal}
          onDismiss={() => setShowScheduleModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Schedule Pickup</Text>
          <Text style={styles.modalText}>
            This feature will allow you to schedule a pickup for your garments.
            Coming soon in the next update!
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowScheduleModal(false)}
            style={styles.modalButton}
          >
            Got it
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  carousel: {
    height: 250,
  },
  slide: {
    width,
    height: 250,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  slideSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.outline,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
  },
  customizeButton: {
    backgroundColor: theme.colors.secondary,
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: theme.colors.surface,
  },
  serviceContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
  },
  quickActionText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 20,
    lineHeight: 24,
  },
  modalButton: {
    borderRadius: 8,
  },
});