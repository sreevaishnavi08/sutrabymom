import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  RadioButton,
  Checkbox,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
  const { signIn, signUp, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      if (isLogin) {
        await signIn(formData.email, formData.password, userType);
      } else {
        if (!formData.name) {
          Alert.alert('Error', 'Please enter your name');
          return;
        }
        await signUp(formData.email, formData.password, formData.name);
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.appName}>StitchVastra</Text>
        <Text style={styles.tagline}>Your Fashion, Your Way</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.authCard}>
          <Card.Content>
            <View style={styles.tabContainer}>
              <Button
                mode={isLogin ? 'contained' : 'outlined'}
                onPress={() => setIsLogin(true)}
                style={styles.tab}
                compact
              >
                Sign In
              </Button>
              <Button
                mode={!isLogin ? 'contained' : 'outlined'}
                onPress={() => setIsLogin(false)}
                style={styles.tab}
                compact
              >
                Sign Up
              </Button>
            </View>

            <View style={styles.form}>
              {!isLogin && (
                <TextInput
                  label="Full Name"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  style={styles.input}
                  mode="outlined"
                />
              )}

              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                style={styles.input}
                mode="outlined"
                secureTextEntry
              />

              {!isLogin && (
                <TextInput
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  style={styles.input}
                  mode="outlined"
                  secureTextEntry
                />
              )}

              {isLogin && (
                <View style={styles.userTypeContainer}>
                  <Text style={styles.userTypeLabel}>User Type</Text>
                  <RadioButton.Group
                    onValueChange={setUserType}
                    value={userType}
                  >
                    <View style={styles.radioOption}>
                      <RadioButton value="customer" />
                      <Text style={styles.radioLabel}>Customer</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="admin" />
                      <Text style={styles.radioLabel}>Admin</Text>
                    </View>
                    <View style={styles.radioOption}>
                      <RadioButton value="vastrakar" />
                      <Text style={styles.radioLabel}>Vastrakar</Text>
                    </View>
                  </RadioButton.Group>
                </View>
              )}

              {isLogin && (
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </View>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                loading={isLoading}
                disabled={isLoading}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="outlined"
                onPress={() => {
                  // Google Sign In implementation
                  Alert.alert('Coming Soon', 'Google Sign In will be available soon!');
                }}
                style={styles.googleButton}
                icon="google"
              >
                Continue with Google
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Text style={styles.footer}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  authCard: {
    marginTop: -20,
    backgroundColor: theme.colors.surface,
    elevation: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  userTypeContainer: {
    marginVertical: 8,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioLabel: {
    fontSize: 16,
    color: theme.colors.onSurface,
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: theme.colors.onSurface,
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 4,
  },
  divider: {
    marginVertical: 16,
  },
  googleButton: {
    borderColor: theme.colors.outline,
  },
  footer: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});