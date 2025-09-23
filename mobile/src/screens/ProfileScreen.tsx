import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  List,
  Switch,
  Button,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function ProfileScreen() {
  const { user, signOut, updateProfile } = useAuth();
  const { themeMode, setThemeMode, language, setLanguage } = useTheme();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(editForm);
      setShowEditModal(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const menuItems = [
    {
      title: 'My Orders',
      description: 'View your order history',
      icon: 'package-variant',
      onPress: () => console.log('Navigate to orders'),
    },
    {
      title: 'Measurements',
      description: 'Manage your body measurements',
      icon: 'ruler',
      onPress: () => console.log('Navigate to measurements'),
    },
    {
      title: 'Addresses',
      description: 'Manage delivery addresses',
      icon: 'map-marker',
      onPress: () => console.log('Navigate to addresses'),
    },
    {
      title: 'Payment Methods',
      description: 'Manage payment options',
      icon: 'credit-card',
      onPress: () => console.log('Navigate to payments'),
    },
    {
      title: 'Notifications',
      description: 'Notification preferences',
      icon: 'bell',
      onPress: () => console.log('Navigate to notifications'),
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      onPress: () => console.log('Navigate to support'),
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <Avatar.Text
            size={80}
            label={user?.name?.charAt(0) || 'U'}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <Button
            mode="outlined"
            onPress={() => setShowEditModal(true)}
            style={styles.editButton}
            textColor="white"
          >
            Edit Profile
          </Button>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Settings Section */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <List.Item
              title="Dark Mode"
              description="Toggle dark theme"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={themeMode === 'dark'}
                  onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
                />
              )}
            />
            
            <List.Item
              title="Language"
              description={`Current: ${language.toUpperCase()}`}
              left={(props) => <List.Icon {...props} icon="translate" />}
              onPress={() => {
                // Show language selection modal
                Alert.alert(
                  'Select Language',
                  'Choose your preferred language',
                  [
                    { text: 'English', onPress: () => setLanguage('en') },
                    { text: 'हिंदी', onPress: () => setLanguage('hi') },
                    { text: 'తెలుగు', onPress: () => setLanguage('te') },
                    { text: 'தமிழ்', onPress: () => setLanguage('ta') },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }}
            />
          </Card.Content>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Account</Text>
            {menuItems.map((item, index) => (
              <List.Item
                key={index}
                title={item.title}
                description={item.description}
                left={(props) => <List.Icon {...props} icon={item.icon} />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={item.onPress}
                style={styles.menuItem}
              />
            ))}
          </Card.Content>
        </Card>

        {/* Sign Out */}
        <Card style={styles.signOutCard}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleSignOut}
              style={styles.signOutButton}
              buttonColor={theme.colors.error}
              icon="logout"
            >
              Sign Out
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>StitchVastra v1.0.0</Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Portal>
        <Modal
          visible={showEditModal}
          onDismiss={() => setShowEditModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Edit Profile</Text>
          
          <TextInput
            label="Name"
            value={editForm.name}
            onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Email"
            value={editForm.email}
            onChangeText={(text) => setEditForm(prev => ({ ...prev, email: text }))}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
          />
          
          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={() => setShowEditModal(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleUpdateProfile}
              style={styles.modalButton}
            >
              Save
            </Button>
          </View>
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
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 16,
  },
  editButton: {
    borderColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  settingsCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  menuCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  signOutCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  menuItem: {
    paddingVertical: 4,
  },
  signOutButton: {
    borderRadius: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
  },
});