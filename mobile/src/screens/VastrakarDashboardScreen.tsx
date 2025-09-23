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
  Button,
  Chip,
  Portal,
  Modal,
  Divider,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';

const mockOrders = [
  {
    id: 'ORD001',
    customerName: 'Rama Devi',
    orderType: 'Tailoring',
    status: 'In Progress',
    paymentStatus: 'Paid',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-25',
    amount: 1500,
    items: ['Blouse', 'Petticoat'],
    specialInstructions: 'Please add lace work on sleeves',
    customerContact: '+91 9876543210',
  },
  {
    id: 'ORD002',
    customerName: 'Lohith Kumar',
    orderType: 'Maggam Work',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    orderDate: '2024-01-16',
    deliveryDate: '2024-01-30',
    amount: 2500,
    items: ['Saree Blouse'],
    specialInstructions: 'Traditional peacock design',
    customerContact: '+91 9876543211',
  },
  {
    id: 'ORD003',
    customerName: 'Alia Sharma',
    orderType: 'Tailoring',
    status: 'Completed',
    paymentStatus: 'Paid',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-20',
    amount: 1800,
    items: ['Princess Cut Blouse'],
    specialInstructions: 'High neck design',
    customerContact: '+91 9876543212',
  },
];

export default function VastrakarDashboardScreen() {
  const { user, signOut } = useAuth();
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

  const handleAcceptOrder = (orderId: string) => {
    console.log('Accepting order:', orderId);
    // Update order status logic here
  };

  const handleRejectOrder = (orderId: string) => {
    console.log('Rejecting order:', orderId);
    // Update order status logic here
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    console.log('Updating order status:', orderId, newStatus);
    // Update order status logic here
  };

  const activeOrders = mockOrders.filter(order => order.status !== 'Completed');
  const completedOrders = mockOrders.filter(order => order.status === 'Completed');
  const totalEarnings = mockOrders
    .filter(order => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + order.amount, 0);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome, {user?.name}!</Text>
          <Text style={styles.userType}>Vastrakar Dashboard</Text>
        </View>
        <IconButton
          icon="logout"
          size={24}
          iconColor="white"
          onPress={signOut}
          style={styles.logoutButton}
        />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>{activeOrders.length}</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>{completedOrders.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>₹{totalEarnings.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Total Earnings</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Today's Tasks */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <View style={styles.tasksList}>
              <Text style={styles.taskItem}>• Complete Rama's blouse stitching</Text>
              <Text style={styles.taskItem}>• Buy new threads and needles</Text>
              <Text style={styles.taskItem}>• Call Alia for measurement confirmation</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Orders Management */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Order Management</Text>
            {mockOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                onPress={() => handleOrderPress(order)}
                style={styles.orderItem}
              >
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
                
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.orderType}>{order.orderType}</Text>
                <Text style={styles.orderAmount}>₹{order.amount.toLocaleString()}</Text>
                
                {order.status === 'Pending' && (
                  <View style={styles.orderActions}>
                    <Button
                      mode="contained"
                      onPress={() => handleAcceptOrder(order.id)}
                      style={styles.acceptButton}
                      compact
                    >
                      Accept
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() => handleRejectOrder(order.id)}
                      style={styles.rejectButton}
                      compact
                    >
                      Reject
                    </Button>
                  </View>
                )}
                
                {order.status === 'In Progress' && (
                  <Button
                    mode="contained"
                    onPress={() => handleUpdateStatus(order.id, 'Completed')}
                    style={styles.completeButton}
                    compact
                  >
                    Mark Complete
                  </Button>
                )}
              </TouchableOpacity>
            ))}
          </Card.Content>
        </Card>
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
                <Text style={styles.modalSectionTitle}>Customer Information</Text>
                <Text style={styles.modalText}>Name: {selectedOrder.customerName}</Text>
                <Text style={styles.modalText}>Contact: {selectedOrder.customerContact}</Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Order Information</Text>
                <Text style={styles.modalText}>Order ID: #{selectedOrder.id}</Text>
                <Text style={styles.modalText}>Type: {selectedOrder.orderType}</Text>
                <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
                <Text style={styles.modalText}>Payment: {selectedOrder.paymentStatus}</Text>
                <Text style={styles.modalText}>Amount: ₹{selectedOrder.amount.toLocaleString()}</Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Items</Text>
                {selectedOrder.items.map((item, index) => (
                  <Text key={index} style={styles.modalText}>• {item}</Text>
                ))}
              </View>

              <Divider style={styles.divider} />

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Special Instructions</Text>
                <Text style={styles.modalText}>{selectedOrder.specialInstructions}</Text>
              </View>

              <View style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setShowOrderModal(false)}
                  style={styles.modalButton}
                >
                  Close
                </Button>
                {selectedOrder.status === 'In Progress' && (
                  <Button
                    mode="contained"
                    onPress={() => {
                      handleUpdateStatus(selectedOrder.id, 'Completed');
                      setShowOrderModal(false);
                    }}
                    style={styles.modalButton}
                  >
                    Mark Complete
                  </Button>
                )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userType: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  logoutButton: {
    margin: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: theme.colors.surface,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  sectionCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 12,
  },
  tasksList: {
    gap: 8,
  },
  taskItem: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  orderItem: {
    padding: 16,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 8,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  statusChip: {
    height: 28,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  orderType: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 12,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: theme.colors.tertiary,
  },
  rejectButton: {
    flex: 1,
    borderColor: theme.colors.error,
  },
  completeButton: {
    backgroundColor: theme.colors.primary,
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