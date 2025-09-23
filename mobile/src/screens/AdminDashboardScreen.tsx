import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  DataTable,
  Button,
  Portal,
  Modal,
  Divider,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const mockData = {
  orders: [
    { id: 'ORD001', customer: 'Rama Devi', amount: 1500, status: 'Completed' },
    { id: 'ORD002', customer: 'Lohith Kumar', amount: 2500, status: 'In Progress' },
    { id: 'ORD003', customer: 'Alia Sharma', amount: 1800, status: 'Pending' },
  ],
  employees: [
    { id: 'EMP001', name: 'Priya Mehta', role: 'Tailor', orders: 15, earnings: 6000, status: 'Active' },
    { id: 'EMP002', name: 'Rahul Kumar', role: 'Embroidery', orders: 8, earnings: 3500, status: 'Active' },
    { id: 'EMP003', name: 'Anita Singh', role: 'Maggam Work', orders: 12, earnings: 4800, status: 'Active' },
  ],
  customers: [
    { id: 'CUST001', name: 'Rama Devi', orders: 3, totalSpent: 4500, status: 'Active' },
    { id: 'CUST002', name: 'Lohith Kumar', orders: 2, totalSpent: 3000, status: 'Active' },
    { id: 'CUST003', name: 'Alia Sharma', orders: 1, totalSpent: 1800, status: 'New' },
  ],
};

export default function AdminDashboardScreen() {
  const { user, signOut } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const totalRevenue = mockData.orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = mockData.orders.length;
  const totalCustomers = mockData.customers.length;
  const totalEmployees = mockData.employees.length;

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>₹{totalRevenue.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statChange}>+12.5%</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{totalOrders}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
            <Text style={styles.statChange}>+8.2%</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{totalCustomers}</Text>
            <Text style={styles.statLabel}>Customers</Text>
            <Text style={styles.statChange}>+15.3%</Text>
          </Card.Content>
        </Card>
        
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text style={styles.statNumber}>{totalEmployees}</Text>
            <Text style={styles.statLabel}>Employees</Text>
            <Text style={styles.statChange}>+2.1%</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <Text style={styles.activityItem}>• New order from Rama Devi - ₹1,500</Text>
            <Text style={styles.activityItem}>• Priya Mehta completed order #ORD001</Text>
            <Text style={styles.activityItem}>• Payment received for order #ORD002</Text>
            <Text style={styles.activityItem}>• New customer registration: Alia Sharma</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderOrders = () => (
    <Card style={styles.tableCard}>
      <Card.Content>
        <Text style={styles.cardTitle}>Orders Management</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Order ID</DataTable.Title>
            <DataTable.Title>Customer</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
          {mockData.orders.map((order) => (
            <DataTable.Row
              key={order.id}
              onPress={() => handleItemPress(order)}
            >
              <DataTable.Cell>{order.id}</DataTable.Cell>
              <DataTable.Cell>{order.customer}</DataTable.Cell>
              <DataTable.Cell numeric>₹{order.amount.toLocaleString()}</DataTable.Cell>
              <DataTable.Cell>{order.status}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card.Content>
    </Card>
  );

  const renderEmployees = () => (
    <Card style={styles.tableCard}>
      <Card.Content>
        <Text style={styles.cardTitle}>Employee Management</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Role</DataTable.Title>
            <DataTable.Title numeric>Orders</DataTable.Title>
            <DataTable.Title numeric>Earnings</DataTable.Title>
          </DataTable.Header>
          {mockData.employees.map((employee) => (
            <DataTable.Row
              key={employee.id}
              onPress={() => handleItemPress(employee)}
            >
              <DataTable.Cell>{employee.name}</DataTable.Cell>
              <DataTable.Cell>{employee.role}</DataTable.Cell>
              <DataTable.Cell numeric>{employee.orders}</DataTable.Cell>
              <DataTable.Cell numeric>₹{employee.earnings.toLocaleString()}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card.Content>
    </Card>
  );

  const renderCustomers = () => (
    <Card style={styles.tableCard}>
      <Card.Content>
        <Text style={styles.cardTitle}>Customer Management</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Orders</DataTable.Title>
            <DataTable.Title numeric>Total Spent</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
          {mockData.customers.map((customer) => (
            <DataTable.Row
              key={customer.id}
              onPress={() => handleItemPress(customer)}
            >
              <DataTable.Cell>{customer.name}</DataTable.Cell>
              <DataTable.Cell numeric>{customer.orders}</DataTable.Cell>
              <DataTable.Cell numeric>₹{customer.totalSpent.toLocaleString()}</DataTable.Cell>
              <DataTable.Cell>{customer.status}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Admin Dashboard</Text>
          <Text style={styles.userType}>Welcome, {user?.name}</Text>
        </View>
        <IconButton
          icon="logout"
          size={24}
          iconColor="white"
          onPress={signOut}
          style={styles.logoutButton}
        />
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'orders', label: 'Orders' },
            { id: 'employees', label: 'Employees' },
            { id: 'customers', label: 'Customers' },
          ].map((tab) => (
            <Button
              key={tab.id}
              mode={selectedTab === tab.id ? 'contained' : 'outlined'}
              onPress={() => setSelectedTab(tab.id)}
              style={styles.tabButton}
              compact
            >
              {tab.label}
            </Button>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'orders' && renderOrders()}
        {selectedTab === 'employees' && renderEmployees()}
        {selectedTab === 'customers' && renderCustomers()}
      </ScrollView>

      {/* Detail Modal */}
      <Portal>
        <Modal
          visible={showDetailModal}
          onDismiss={() => setShowDetailModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          {selectedItem && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Details</Text>
              
              {Object.entries(selectedItem).map(([key, value]) => (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Text>
                  <Text style={styles.detailValue}>{value}</Text>
                </View>
              ))}

              <View style={styles.modalActions}>
                <Button
                  mode="outlined"
                  onPress={() => setShowDetailModal(false)}
                  style={styles.modalButton}
                >
                  Close
                </Button>
                <Button
                  mode="contained"
                  onPress={() => console.log('Edit item')}
                  style={styles.modalButton}
                >
                  Edit
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
  tabContainer: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
  },
  tabButton: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  overviewContainer: {
    gap: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: (width - 60) / 2,
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
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: theme.colors.tertiary,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 12,
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  tableCard: {
    backgroundColor: theme.colors.surface,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  detailValue: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
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