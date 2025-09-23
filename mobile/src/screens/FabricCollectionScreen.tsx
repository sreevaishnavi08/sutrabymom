import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Chip,
  Button,
  Searchbar,
  Portal,
  Modal,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const fabricData = [
  {
    id: 'silk-1',
    name: 'Pure Silk',
    image: 'https://m.media-amazon.com/images/I/91Oi1ZMTp4L.jpg',
    description: 'High-quality pure silk fabric',
    price: 1599,
    originalPrice: 4999,
    discount: 68,
    rating: 4.3,
    reviews: 1500,
    category: 'Silk',
    colors: ['Red', 'Blue', 'Green', 'Gold'],
  },
  {
    id: 'georgette-1',
    name: 'Georgette Fabric',
    image: 'https://www.fabvoguestudio.com/cdn/shop/files/pr-pg-0-ta08834p18-110-coffee-floral-printed-pure-georgette-fabric-material-1.jpg?v=1687257047',
    description: 'Lightweight georgette fabric',
    price: 780,
    originalPrice: 1500,
    discount: 48,
    rating: 4.1,
    reviews: 890,
    category: 'Georgette',
    colors: ['Pink', 'Yellow', 'White', 'Black'],
  },
  {
    id: 'denim-1',
    name: 'Premium Denim',
    image: 'https://fabricdekho.com/cdn/shop/products/010_63c6adfb-30ba-4f33-b550-6819bbf98c3c.jpg?v=1661359461',
    description: 'High-quality denim fabric',
    price: 1200,
    originalPrice: 2400,
    discount: 50,
    rating: 4.5,
    reviews: 2100,
    category: 'Denim',
    colors: ['Blue', 'Black', 'Grey'],
  },
  {
    id: 'cotton-1',
    name: 'Cotton Fabric',
    image: 'https://justfabric.in/cdn/shop/files/Khadi-Cotton-Fabric-44-Inch-Width-Ready-to-Dye-Fabrics-JUST-FABRIC-204.jpg?v=1685790142',
    description: 'Soft and breathable cotton',
    price: 1979,
    originalPrice: 3000,
    discount: 34,
    rating: 4.2,
    reviews: 1200,
    category: 'Cotton',
    colors: ['White', 'Cream', 'Beige'],
  },
];

const categories = ['All', 'Silk', 'Cotton', 'Georgette', 'Denim'];

export default function FabricCollectionScreen() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [showFabricModal, setShowFabricModal] = useState(false);

  const filteredFabrics = fabricData.filter(fabric => {
    const matchesSearch = fabric.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fabric.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || fabric.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFabricPress = (fabric: any) => {
    setSelectedFabric(fabric);
    setShowFabricModal(true);
  };

  const handleAddToCart = (fabric: any) => {
    const cartItem = {
      id: fabric.id,
      name: fabric.name,
      price: `₹${fabric.price.toLocaleString()}`,
      image: fabric.image,
    };
    
    addToCart(cartItem);
    setShowFabricModal(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Fabric Collection</Text>
        <Text style={styles.headerSubtitle}>
          Premium fabrics for your custom designs
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search fabrics..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.fabricGrid}>
          {filteredFabrics.map((fabric) => (
            <Card key={fabric.id} style={styles.fabricCard}>
              <TouchableOpacity onPress={() => handleFabricPress(fabric)}>
                <Image source={{ uri: fabric.image }} style={styles.fabricImage} />
                <Card.Content style={styles.fabricContent}>
                  <Text style={styles.fabricName} numberOfLines={1}>
                    {fabric.name}
                  </Text>
                  <Text style={styles.fabricDescription} numberOfLines={2}>
                    {fabric.description}
                  </Text>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{fabric.price}</Text>
                    <Text style={styles.originalPrice}>₹{fabric.originalPrice}</Text>
                  </View>
                  
                  <View style={styles.discountContainer}>
                    <Text style={styles.discount}>{fabric.discount}% OFF</Text>
                  </View>
                  
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {fabric.rating}</Text>
                    <Text style={styles.reviews}>({fabric.reviews})</Text>
                  </View>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Fabric Details Modal */}
      <Portal>
        <Modal
          visible={showFabricModal}
          onDismiss={() => setShowFabricModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          {selectedFabric && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={{ uri: selectedFabric.image }}
                style={styles.modalImage}
              />
              
              <View style={styles.modalDetails}>
                <Text style={styles.modalTitle}>{selectedFabric.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedFabric.description}
                </Text>
                
                <View style={styles.modalPriceContainer}>
                  <Text style={styles.modalPrice}>
                    ₹{selectedFabric.price.toLocaleString()}
                  </Text>
                  <Text style={styles.modalOriginalPrice}>
                    ₹{selectedFabric.originalPrice.toLocaleString()}
                  </Text>
                  <Text style={styles.modalDiscount}>
                    {selectedFabric.discount}% OFF
                  </Text>
                </View>
                
                <View style={styles.modalRating}>
                  <Text style={styles.modalRatingText}>
                    ⭐ {selectedFabric.rating} ({selectedFabric.reviews} reviews)
                  </Text>
                </View>
                
                <View style={styles.colorsSection}>
                  <Text style={styles.colorsTitle}>Available Colors:</Text>
                  <View style={styles.colorsContainer}>
                    {selectedFabric.colors.map((color, index) => (
                      <Chip key={index} style={styles.colorChip}>
                        {color}
                      </Chip>
                    ))}
                  </View>
                </View>
                
                <View style={styles.modalActions}>
                  <Button
                    mode="outlined"
                    onPress={() => setShowFabricModal(false)}
                    style={styles.modalButton}
                  >
                    Close
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => handleAddToCart(selectedFabric)}
                    style={styles.modalButton}
                  >
                    Add to Cart
                  </Button>
                </View>
              </View>
            </ScrollView>
          )}
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fabricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  fabricCard: {
    width: cardWidth,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  fabricImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  fabricContent: {
    padding: 12,
  },
  fabricName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  fabricDescription: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textDecorationLine: 'line-through',
  },
  discountContainer: {
    marginBottom: 4,
  },
  discount: {
    fontSize: 12,
    color: theme.colors.tertiary,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: theme.colors.onSurface,
    marginRight: 4,
  },
  reviews: {
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalDetails: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16,
    lineHeight: 24,
  },
  modalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: 12,
  },
  modalOriginalPrice: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  modalDiscount: {
    fontSize: 14,
    color: theme.colors.tertiary,
    fontWeight: '600',
  },
  modalRating: {
    marginBottom: 16,
  },
  modalRatingText: {
    fontSize: 16,
    color: theme.colors.onSurface,
  },
  colorsSection: {
    marginBottom: 20,
  },
  colorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorChip: {
    marginBottom: 4,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});