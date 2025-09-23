import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Chip,
  Button,
  Portal,
  Modal,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

const mockOrders = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    status: 'In Progress',
    items: ['Custom Saree', 'Matching Blouse'],
    total: 18500,
    estimatedDelivery: '2024-01-25',
    tailor: 'Priya Mehta',
    progress: 60,
  },
  {
    id: 'ORD002',
    date: '2024-01-10',
    status: 'Completed',
    items: ['Designer Kurti'],
    total: 3500,
    deliveredOn: '2024-01-20',
    tailor: 'Rahul Kumar',
    progress: 100,
  },
  {
    id: 'ORD003',
    date: '2024-01-08',
    status: 'Pending',
    items: ['Wedding Lehenga', 'Dupatta'],
    total: 45000,
    estimatedDelivery: '2024-02-15',
    tailor: 'Anita Singh',
    progress: 20,
  },
];

export default function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return theme.colors.tertiary;
      case 'In Progress':
        return theme.colors.primary;
      case 'Pending':
        return theme.colors.secondary;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  const handleOrderPress = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>
          Track your custom clothing orders
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockOrders.map((order) => (
          <Card key={order.id} style={styles.orderCard}>
            <TouchableOpacity onPress={() => handleOrderPress(order)}>
              <Card.Content style={styles.orderContent}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>#{order.id}</Text>
                  <Chip
                    style={[
                      styles.statusChip,
                      { backgroundColor: getStatusColor(order.status) + '20' },
                    ]}
                    textStyle={{ color: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </Chip>
                </View>

                <Text style={styles.orderDate}>
                  Ordered on {new Date(order.date).toLocaleDateString()}
                </Text>

                <View style={styles.itemsList}>
                  {order.items.map((item, index) => (
                    <Text key={index} style={styles.itemText}>
                      • {item}
                    </Text>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.totalAmount}>
                    ₹{order.total.toLocaleString()}
                  </Text>
                  <Text style={styles.tailorName}>
                    By {order.tailor}
                  </Text>
                </View>

                {order.status === 'In Progress' && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${order.progress}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {order.progress}% Complete
                    </Text>
                  </View>
                )}

                <Text style={styles.deliveryInfo}>
                  {order.status === 'Completed'
                    ? `Delivered on ${new Date(order.deliveredOn).toLocaleDateString()}`
                    : `Expected delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}`
                  }
                </Text>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>

      {/* Order Details Modal */}
      <Portal>
        <Modal
          visible={showOrderModal}
          onDismiss={() => setShowOrderModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          {selectedOrder && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Order Details</Text>
              
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Order Information</Text>
                <Text style={styles.modalText}>Order ID: #{selectedOrder.id}</Text>
                <Text style={styles.modalText}>
                  Date: {new Date(selectedOrder.date).toLocaleDateString()}
                </Text>
                <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
                <Text style={styles.modalText}>Tailor: {selectedOrder.tailor}</Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Items</Text>
                {selectedOrder.items.map((item, index) => (
                  <Text key={index} style={styles.modalText}>
                    • {item}
                  </Text>
                ))}
              </View>

              <Divider style={styles.divider} />

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Payment</Text>
                <Text style={styles.modalText}>
                  Total Amount: ₹{selectedOrder.total.toLocaleString()}
                </Text>
                <Text style={styles.modalText}>
                  Payment Status: {selectedOrder.status === 'Completed' ? 'Paid' : 'Pending'}
                </Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Delivery</Text>
                <Text style={styles.modalText}>
                  {selectedOrder.status === 'Completed'
                    ? `Delivered on ${new Date(selectedOrder.deliveredOn).toLocaleDateString()}`
                    : `Expected: ${new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}`
                  }
                </Text>
              </View>

              <View style={styles.modalActions}>
                {selectedOrder.status !== 'Completed' && (
                  <Button
                    mode="outlined"
                    onPress={() => console.log('Track order')}
                    style={styles.modalButton}
                  >
                    Track Order
                  </Button>
                )}
                <Button
                  mode="contained"
                  onPress={() => setShowOrderModal(false)}
                  style={styles.modalButton}
                >
                  Close
                </Button>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  orderCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  orderContent: {
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  statusChip: {
    height: 28,
  },
  orderDate: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
  },
  itemsList: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  tailorName: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.outline,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  deliveryInfo: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    margin: 20,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    padding: 20,
    textAlign: 'center',
  },
  modalSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  divider: {
    marginVertical: 8,
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