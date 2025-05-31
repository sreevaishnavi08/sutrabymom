import React, { useState, useEffect, useMemo } from 'react';
import { Scissors, Calendar, MessageSquare, LogOut, Search, Bell, Filter, ArrowUpDown, Clock, CheckCircle, XCircle, AlertTriangle, TrendingUp, IndianRupee } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Order {
  id: number;
  customerName: string;
  orderType: string;
  status: string;
  paymentStatus: string;
  orderDate: string;
  deliveryDate: string;
  amount: number;
  measurements?: {
    [key: string]: number;
  };
  specialInstructions?: string;
  fabricDetails?: string;
  customerContact?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface EarningsData {
  date: string;
  earnings: number;
}

export default function VastrakarDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vastrakarType, vastrakarId } = location.state || {};

  // Enhanced state management
  const [activeOrders, setActiveOrders] = useState({
    pending: 3,
    inProgress: 2,
    completed: 5,
  });

  const [earnings, setEarnings] = useState({
    daily: 2500,
    weekly: 15000,
    monthly: 60000,
  });

  const [tasks, setTasks] = useState([
    "Complete Rama's blouse stitching by tomorrow",
    "Buy new threads and needles",
    "Call Alia for measurement confirmation"
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "New order received from Alia",
      type: "info",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: 2,
      message: "Payment received for Order #1",
      type: "success",
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);

  const [orderHistory, setOrderHistory] = useState<Order[]>([
    {
      id: 1,
      customerName: 'Rama',
      orderType: 'Tailoring',
      status: 'Completed',
      paymentStatus: 'Paid',
      orderDate: '2024-03-15',
      deliveryDate: '2024-03-20',
      amount: 1500,
      measurements: {
        bust: 36,
        waist: 28,
        hip: 38
      },
      specialInstructions: 'Please add lace work on sleeves',
      fabricDetails: 'Cotton silk with zari border',
      customerContact: '+91 9876543210'
    },
    {
      id: 2,
      customerName: 'Lohith',
      orderType: 'Maggam Work',
      status: 'In Progress',
      paymentStatus: 'Unpaid',
      orderDate: '2024-03-16',
      deliveryDate: '2024-03-25',
      amount: 2500,
      specialInstructions: 'Traditional peacock design',
      fabricDetails: 'Raw silk',
      customerContact: '+91 9876543211'
    },
    {
      id: 3,
      customerName: 'Alia',
      orderType: 'Tailoring',
      status: 'Pending',
      paymentStatus: 'Unpaid',
      orderDate: '2024-03-17',
      deliveryDate: '2024-03-22',
      amount: 1800,
      measurements: {
        bust: 34,
        waist: 26,
        hip: 36
      },
      specialInstructions: 'Princess cut blouse',
      fabricDetails: 'Banarasi silk',
      customerContact: '+91 9876543212'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterConfig, setFilterConfig] = useState({
    orderType: '',
    status: '',
    paymentStatus: ''
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample earnings data for chart
  const earningsData: EarningsData[] = [
    { date: 'Mon', earnings: 2500 },
    { date: 'Tue', earnings: 3000 },
    { date: 'Wed', earnings: 2800 },
    { date: 'Thu', earnings: 3500 },
    { date: 'Fri', earnings: 3200 },
    { date: 'Sat', earnings: 4000 },
    { date: 'Sun', earnings: 3800 }
  ];

  // Filtered orders based on search and filters
  const filteredOrders = useMemo(() => {
    return orderHistory.filter(order => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        (!filterConfig.orderType || order.orderType === filterConfig.orderType) &&
        (!filterConfig.status || order.status === filterConfig.status) &&
        (!filterConfig.paymentStatus || order.paymentStatus === filterConfig.paymentStatus);

      return matchesSearch && matchesFilter;
    });
  }, [orderHistory, searchQuery, filterConfig]);

  // Update active orders count
  useEffect(() => {
    const counts = orderHistory.reduce((acc, order) => {
      acc[order.status.toLowerCase()] = (acc[order.status.toLowerCase()] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setActiveOrders({
      pending: counts.pending || 0,
      inProgress: counts['in progress'] || 0,
      completed: counts.completed || 0
    });
  }, [orderHistory]);

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAcceptOrder = (orderId: number) => {
    setOrderHistory(prevHistory =>
      prevHistory.map(order =>
        order.id === orderId
          ? { ...order, paymentStatus: 'Paid', status: 'In Progress' }
          : order
      )
    );

    // Add notification
    const newNotification: Notification = {
      id: Date.now(),
      message: `Order #${orderId} accepted and marked as in progress`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleRejectOrder = (orderId: number) => {
    setOrderHistory(prevHistory =>
      prevHistory.map(order =>
        order.id === orderId
          ? { ...order, status: 'Rejected' }
          : order
      )
    );

    // Add notification
    const newNotification: Notification = {
      id: Date.now(),
      message: `Order #${orderId} has been rejected`,
      type: 'error',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrderHistory(prevHistory =>
      prevHistory.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    // Add notification
    const newNotification: Notification = {
      id: Date.now(),
      message: `Order #${orderId} status updated to ${newStatus}`,
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Modal Component
  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Details #{order.id}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Customer Information</h3>
              <p>Name: {order.customerName}</p>
              <p>Contact: {order.customerContact}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Order Information</h3>
              <p>Type: {order.orderType}</p>
              <p>Status: {order.status}</p>
              <p>Payment: {order.paymentStatus}</p>
            </div>

            {order.measurements && (
              <div className="col-span-2">
                <h3 className="font-semibold mb-2">Measurements</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(order.measurements).map(([key, value]) => (
                    <p key={key}>{key}: {value}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="col-span-2">
              <h3 className="font-semibold mb-2">Special Instructions</h3>
              <p>{order.specialInstructions}</p>
            </div>

            <div className="col-span-2">
              <h3 className="font-semibold mb-2">Fabric Details</h3>
              <p>{order.fabricDetails}</p>
            </div>

            <div className="col-span-2 mt-4">
              <h3 className="font-semibold mb-2">Update Status</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => updateOrderStatus(order.id, 'In Progress')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Completed')}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Vastrakar Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {vastrakarType} - {vastrakarId}
              </span>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Orders or Tasks"
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                      {notifications.length > 0 ? (
                        <div className="space-y-2">
                          {notifications.map(notification => (
                            <div
                              key={notification.id}
                              className={`p-2 rounded ${
                                notification.read ? 'bg-gray-50' : 'bg-blue-50'
                              }`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(notification.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No notifications</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Active Orders</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-yellow-600">Pending:</span>
                    <span>{activeOrders.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">In Progress:</span>
                    <span>{activeOrders.inProgress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Completed:</span>
                    <span>{activeOrders.completed}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Earnings Overview</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Daily:</span>
                    <span>₹{earnings.daily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly:</span>
                    <span>₹{earnings.weekly}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly:</span>
                    <span>₹{earnings.monthly}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <IndianRupee className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Weekly Earnings</h3>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="earnings" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tasks Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Tasks</h3>
          {tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <input type="checkbox" className="rounded text-indigo-600" />
                  <span className="text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tasks for today</p>
          )}
        </div>

        {/* Order Management */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Order Management</h3>
            <div className="flex gap-2">
              <select
                className="rounded-md border-gray-300"
                onChange={(e) => setFilterConfig(prev => ({ ...prev, orderType: e.target.value }))}
              >
                <option value="">All Types</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Maggam Work">Maggam Work</option>
              </select>
              <select
                className="rounded-md border-gray-300"
                onChange={(e) => setFilterConfig(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Order Type</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Delivery Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customerName}</td>
                    <td className="px-4 py-2">{order.orderType}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">₹{order.amount}</td>
                    <td className="px-4 py-2">{order.deliveryDate}</td>
                    <td className="px-4 py-2">
                      {order.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcceptOrder(order.id);
                            }}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRejectOrder(order.id);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {order.status === 'In Progress' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, 'Completed');
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Mark Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </main>
    </div>
  );
}