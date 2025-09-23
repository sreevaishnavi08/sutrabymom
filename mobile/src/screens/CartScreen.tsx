import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  IconButton,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { useCart } from '../contexts/CartContext';

export default function CartScreen() {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getItemCount } = useCart();

  const handleQuantityChange = (id: string, change: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout screen (to be implemented)
    console.log('Proceeding to checkout...');
  };

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </LinearGradient>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Start shopping to add items to your cart
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Customize' as never)}
            style={styles.shopButton}
          >
            Start Shopping
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerSubtitle}>
          {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <Card key={item.id} style={styles.cartItem}>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                
                {item.customizations && Object.keys(item.customizations).length > 0 && (
                  <View style={styles.customizations}>
                    {Object.entries(item.customizations).map(([key, value]) => (
                      <Text key={key} style={styles.customizationText}>
                        {key}: {value}
                      </Text>
                    ))}
                  </View>
                )}
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <IconButton
                icon="delete"
                size={20}
                onPress={() => removeFromCart(item.id)}
                iconColor={theme.colors.error}
              />
            </View>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Divider />
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>
            ₹{getTotalPrice().toLocaleString()}
          </Text>
        </View>
        
        <Button
          mode="contained"
          onPress={handleCheckout}
          style={styles.checkoutButton}
          contentStyle={styles.checkoutButtonContent}
        >
          Proceed to Checkout
        </Button>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cartItem: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: 8,
  },
  customizations: {
    marginBottom: 12,
  },
  customizationText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    paddingHorizontal: 24,
  },
  footer: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checkoutButton: {
    borderRadius: 12,
  },
  checkoutButtonContent: {
    paddingVertical: 8,
  },
});