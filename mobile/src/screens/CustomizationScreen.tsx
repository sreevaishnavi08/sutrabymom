import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  Portal,
  Modal,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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
        basePrice: 15000,
        customizations: [
          { id: 'fabric', name: 'Fabric Type', options: ['Silk', 'Cotton', 'Georgette'] },
          { id: 'color', name: 'Color', options: ['Red', 'Blue', 'Green', 'Gold'] },
          { id: 'work', name: 'Work Type', options: ['Plain', 'Embroidered', 'Maggam'] },
        ],
      },
      {
        id: 'blouses',
        name: 'Blouses',
        image: 'https://images.unsplash.com/photo-1602810317536-5d5e8a552d85?auto=format&fit=crop&q=80',
        description: 'Perfectly fitted blouses with intricate detailing',
        basePrice: 3000,
        customizations: [
          { id: 'style', name: 'Style', options: ['Regular', 'Princess Cut', 'High Neck'] },
          { id: 'sleeves', name: 'Sleeves', options: ['Short', '3/4', 'Full'] },
          { id: 'work', name: 'Work Type', options: ['Plain', 'Embroidered', 'Maggam'] },
        ],
      },
    ],
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
        basePrice: 2500,
        customizations: [
          { id: 'length', name: 'Length', options: ['Short', 'Medium', 'Long'] },
          { id: 'style', name: 'Style', options: ['A-Line', 'Straight', 'Anarkali'] },
          { id: 'neck', name: 'Neck Style', options: ['Round', 'V-Neck', 'Boat'] },
        ],
      },
    ],
  },
];

export default function CustomizationScreen() {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setCustomizations({});
    setShowCustomizationModal(true);
  };

  const handleCustomizationChange = (customizationId: string, value: string) => {
    setCustomizations(prev => ({
      ...prev,
      [customizationId]: value,
    }));
  };

  const calculatePrice = () => {
    if (!selectedItem) return 0;
    let price = selectedItem.basePrice;
    
    // Add customization costs (simplified)
    Object.keys(customizations).forEach(key => {
      if (customizations[key] === 'Embroidered') price += 2000;
      if (customizations[key] === 'Maggam') price += 4000;
      if (customizations[key] === 'Silk') price += 5000;
    });
    
    return price;
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    const cartItem = {
      id: `${selectedItem.id}-${Date.now()}`,
      name: selectedItem.name,
      price: `₹${calculatePrice().toLocaleString()}`,
      image: selectedItem.image,
      customizations,
    };
    
    addToCart(cartItem);
    setShowCustomizationModal(false);
    setSelectedItem(null);
    
    // Navigate to cart
    navigation.navigate('Cart' as never);
  };

  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Customize Your Style</Text>
          <Text style={styles.headerSubtitle}>Choose from our collections</Text>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryCard}
            >
              <LinearGradient
                colors={['rgba(99, 102, 241, 0.1)', 'rgba(236, 72, 153, 0.1)']}
                style={styles.categoryGradient}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <View style={styles.categoryFooter}>
                  <Text style={styles.itemCount}>
                    {category.items.length} items available
                  </Text>
                  <IconButton icon="arrow-right" size={20} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => setSelectedCategory(null)}
        />
        <Text style={styles.subHeaderTitle}>{selectedCategory.name}</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsGrid}>
          {selectedCategory.items.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              <TouchableOpacity onPress={() => handleItemSelect(item)}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Card.Content style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>
                    Starting from ₹{item.basePrice.toLocaleString()}
                  </Text>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Customization Modal */}
      <Portal>
        <Modal
          visible={showCustomizationModal}
          onDismiss={() => setShowCustomizationModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Customize {selectedItem?.name}</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setShowCustomizationModal(false)}
              />
            </View>

            {selectedItem?.customizations.map((customization) => (
              <View key={customization.id} style={styles.customizationSection}>
                <Text style={styles.customizationTitle}>{customization.name}</Text>
                <View style={styles.optionsContainer}>
                  {customization.options.map((option) => (
                    <Chip
                      key={option}
                      selected={customizations[customization.id] === option}
                      onPress={() => handleCustomizationChange(customization.id, option)}
                      style={styles.optionChip}
                    >
                      {option}
                    </Chip>
                  ))}
                </View>
              </View>
            ))}

            <View style={styles.priceSection}>
              <Text style={styles.totalPrice}>
                Total: ₹{calculatePrice().toLocaleString()}
              </Text>
            </View>

            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={() => setShowCustomizationModal(false)}
                style={styles.modalButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleAddToCart}
                style={styles.modalButton}
              >
                Add to Cart
              </Button>
            </View>
          </ScrollView>
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
    alignItems: 'center',
  },
  headerTitle: {
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
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryCard: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryGradient: {
    padding: 20,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  itemsGrid: {
    paddingVertical: 16,
    gap: 16,
  },
  itemCard: {
    backgroundColor: theme.colors.surface,
    elevation: 4,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemContent: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  customizationSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  customizationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    marginBottom: 8,
  },
  priceSection: {
    padding: 20,
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});