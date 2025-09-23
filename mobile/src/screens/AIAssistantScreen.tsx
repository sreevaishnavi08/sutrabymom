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
  TextInput,
  Button,
  IconButton,
  Avatar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const aiFeatures = [
  {
    id: 'design',
    title: 'Design Recommendations',
    description: 'Get personalized design suggestions',
    icon: 'palette',
  },
  {
    id: 'color',
    title: 'Color Matching',
    description: 'Find perfect color combinations',
    icon: 'color-lens',
  },
  {
    id: 'size',
    title: 'Size & Fit',
    description: 'Get perfect measurements',
    icon: 'straighten',
  },
  {
    id: 'occasion',
    title: 'Occasion Wear',
    description: 'Find outfits for any event',
    icon: 'event',
  },
];

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm VastraAI, your personal fashion assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputText),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('design') || input.includes('style')) {
      return "I'd be happy to help with design recommendations! Could you tell me:\n\n1. What's the occasion?\n2. Your preferred style (Traditional/Modern/Fusion)?\n3. Any specific colors you like?\n\nThis will help me suggest the perfect design for you!";
    }
    
    if (input.includes('color') || input.includes('colour')) {
      return "Great choice! Color matching is crucial for a stunning look. To give you the best color recommendations:\n\n1. What's your skin tone (Light/Medium/Dark)?\n2. What's the occasion?\n3. Any colors you want to avoid?\n\nI'll suggest a perfect color palette for you!";
    }
    
    if (input.includes('size') || input.includes('fit') || input.includes('measurement')) {
      return "Perfect fit is essential! I can help you with:\n\n1. Taking accurate measurements\n2. Size recommendations based on your body type\n3. Fit adjustments for different styles\n\nWould you like me to guide you through the measurement process?";
    }
    
    if (input.includes('wedding') || input.includes('party') || input.includes('occasion')) {
      return "Wonderful! Let me help you find the perfect outfit for your special occasion. Could you share:\n\n1. What's the event type?\n2. Time of day?\n3. Season/weather?\n4. Your role in the event?\n\nI'll suggest appropriate styles and designs!";
    }
    
    return "I understand you're looking for fashion advice! I can help you with:\n\n• Design recommendations\n• Color matching\n• Size and fit guidance\n• Occasion-specific styling\n• Fabric suggestions\n\nWhat specific area would you like help with?";
  };

  const handleFeaturePress = (feature: any) => {
    const featureMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `Help me with ${feature.title.toLowerCase()}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, featureMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(feature.title),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>VastraAI Assistant</Text>
        <Text style={styles.headerSubtitle}>
          Your personal fashion advisor
        </Text>
      </LinearGradient>

      {messages.length === 1 && (
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>How can I help you today?</Text>
          <View style={styles.featuresGrid}>
            {aiFeatures.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                onPress={() => handleFeaturePress(feature)}
                style={styles.featureCard}
              >
                <IconButton
                  icon={feature.icon}
                  size={24}
                  iconColor={theme.colors.primary}
                />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.type === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            {message.type === 'assistant' && (
              <Avatar.Icon
                size={32}
                icon="robot"
                style={styles.assistantAvatar}
              />
            )}
            <View
              style={[
                styles.messageBubble,
                message.type === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.type === 'user' ? styles.userText : styles.assistantText,
                ]}
              >
                {message.content}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageContainer, styles.assistantMessage]}>
            <Avatar.Icon
              size={32}
              icon="robot"
              style={styles.assistantAvatar}
            />
            <View style={[styles.messageBubble, styles.assistantBubble]}>
              <Text style={styles.typingText}>VastraAI is typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about fashion..."
          style={styles.textInput}
          mode="outlined"
          multiline
          right={
            <TextInput.Icon
              icon="send"
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
            />
          }
        />
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
  featuresContainer: {
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 100,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  assistantMessage: {
    justifyContent: 'flex-start',
  },
  assistantAvatar: {
    backgroundColor: theme.colors.primaryContainer,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 4,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  assistantText: {
    color: theme.colors.onSurface,
  },
  typingText: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    padding: 16,
    elevation: 8,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    maxHeight: 100,
  },
});