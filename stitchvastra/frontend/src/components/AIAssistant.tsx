import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Ruler, 
  Palette, 
  Camera,
  Image as ImageIcon,
  Shirt,
  Leaf,
  History,
  Brush,
  Scissors,
  Calendar,
  ArrowLeft,
  HelpCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

type AIFeature = 
  | 'design' 
  | 'color-matching' 
  | 'virtual-try-on' 
  | 'custom-design' 
  | 'size-fit' 
  | 'occasion' 
  | 'sustainability' 
  | 'faq';

interface AIFeatureOption {
  id: AIFeature;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface CustomerPreferences {
  bodyType?: string;
  age?: number;
  skinTone?: string;
  stylePreferences?: string[];
  occasions?: string[];
  sustainabilityPreference?: boolean;
}

interface Design {
  id: number;
  name: string;
  image: string;
  description: string;
  occasion?: string;
  sustainabilityScore?: number;
  price?: number;
  colors?: string[];
  fabricTypes?: string[];
}

const mockDesigns: Design[] = [
  {
    id: 1,
    name: 'Contemporary Anarkali',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300',
    description: 'A modern take on the classic Anarkali with intricate embroidery.',
    occasion: 'Wedding',
    sustainabilityScore: 4.5,
    price: 299,
    colors: ['Royal Blue', 'Gold'],
    fabricTypes: ['Silk', 'Brocade']
  },
  {
    id: 2,
    name: 'Fusion Saree',
    image: 'https://images.unsplash.com/photo-1583391733975-0c070c6db46f?auto=format&fit=crop&w=300',
    description: 'Contemporary draping with traditional elements.',
    occasion: 'Party',
    sustainabilityScore: 4.8,
    price: 249,
    colors: ['Emerald Green', 'Silver'],
    fabricTypes: ['Organic Cotton', 'Zari']
  },
  {
    id: 3,
    name: 'Modern Lehenga',
    image: 'https://images.unsplash.com/photo-1583391733977-67f41e281b9b?auto=format&fit=crop&w=300',
    description: 'Lightweight and elegant lehenga with minimal embellishments.',
    occasion: 'Reception',
    sustainabilityScore: 4.2,
    price: 399,
    colors: ['Blush Pink', 'Rose Gold'],
    fabricTypes: ['Recycled Polyester', 'Silk']
  }
];

const mockFabrics = [
  {
    id: 1,
    name: 'Organic Cotton',
    image: 'https://images.unsplash.com/photo-1581363111676-e3b4cc2fb601?auto=format&fit=crop&w=300',
    properties: ['Breathable', 'Sustainable', 'Perfect for daily wear'],
    sustainabilityScore: 5,
    recommendedFor: ['Daily Wear', 'Summer Outfits']
  },
  {
    id: 2,
    name: 'Recycled Silk',
    image: 'https://images.unsplash.com/photo-1581363111676-e3b4cc2fb602?auto=format&fit=crop&w=300',
    properties: ['Luxurious', 'Eco-friendly', 'Ideal for formal wear'],
    sustainabilityScore: 4.8,
    recommendedFor: ['Wedding Wear', 'Party Wear']
  }
];

const mockColorPalettes = [
  {
    id: 1,
    name: 'Summer Brights',
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
    suitableFor: ['Light', 'Medium'],
    occasions: ['Casual', 'Beach Party']
  },
  {
    id: 2,
    name: 'Royal Evening',
    colors: ['#2C3E50', '#8E44AD', '#E74C3C'],
    suitableFor: ['Medium', 'Dark'],
    occasions: ['Evening Party', 'Reception']
  }
];

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const initialMessage: Message = {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm VastraAI, your personal fashion assistant. How can I help you today?",
    timestamp: new Date()
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [customerPreferences, setCustomerPreferences] = useState<CustomerPreferences>({});
  const [measurements, setMeasurements] = useState<Record<string, number>>({});
  const [orderHistory, setOrderHistory] = useState<Design[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const features: AIFeatureOption[] = [
    {
      id: 'design',
      icon: Sparkles,
      title: 'Design Recommendations',
      description: 'Get personalized design suggestions based on your style'
    },
    {
      id: 'color-matching',
      icon: Palette,
      title: 'Color & Fabric Matching',
      description: 'Find perfect color combinations and fabrics'
    },
    {
      id: 'virtual-try-on',
      icon: Shirt,
      title: 'Virtual Try-On',
      description: 'Visualize designs on yourself'
    },
    {
      id: 'custom-design',
      icon: Brush,
      title: 'Custom Design Creation',
      description: 'Create your own unique designs'
    },
    {
      id: 'size-fit',
      icon: Scissors,
      title: 'Size & Fit',
      description: 'Get perfect measurements and size recommendations'
    },
    {
      id: 'occasion',
      icon: Calendar,
      title: 'Occasion Wear',
      description: 'Find the perfect outfit for any event'
    },
    {
      id: 'sustainability',
      icon: Leaf,
      title: 'Sustainable Fashion',
      description: 'Discover eco-friendly options'
    },
    {
      id: 'faq',
      icon: HelpCircle,
      title: 'FAQ and Support',
      description: 'Ask for Help, FAQs & Customer Support'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeatureSelect = (feature: AIFeature) => {
    setSelectedFeature(feature);
    const assistantMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: getFeatureInitialMessage(feature),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const getFeatureInitialMessage = (feature: AIFeature): string => {
    switch (feature) {
      case 'design':
        return "I'll help you find the perfect design. First, let me understand your preferences:\n\n1. What's your preferred style? (Traditional/Modern/Fusion)\n2. What's the occasion?\n3. Any specific color preferences?";
      
      case 'color-matching':
        return "Let's find your perfect color palette! Could you tell me:\n\n1. Your skin tone (Light/Medium/Dark)\n2. The occasion\n3. Any colors you particularly like or want to avoid?";
      
      case 'virtual-try-on':
        return "Upload a full-length photo, and I'll help you visualize how different designs would look on you. Make sure to:\n\n- Stand against a plain background\n- Wear fitted clothing\n- Ensure good lighting";
      
      case 'custom-design':
        return "Let's create your dream outfit! What type of garment would you like to design?\n\n1. Saree\n2. Lehenga\n3. Anarkali\n4. Salwar Suit\n5. Indo-Western";
      
      case 'size-fit':
        return "For the perfect fit, I'll need your measurements. Would you prefer:\n\n1. Guided measurement process with camera\n2. Manual measurement input\n3. Size recommendation based on previous purchases";
      
      case 'occasion':
        return "What's the special occasion?\n\n1. Wedding\n2. Reception\n3. Festival\n4. Party\n5. Daily Wear\n\nI'll suggest designs perfect for your event!";
      
      case 'sustainability':
        return "Great choice for sustainable fashion! Would you like to:\n\n1. Browse eco-friendly fabrics\n2. See our sustainable collection\n3. Learn about our sustainability practices\n4. Get sustainable styling tips";
      
      case 'faq':
        return "Find answers to common questions about StitchVastra’s services, orders, and AI recommendations in our FAQ section";
      
      default:
        return "How can I assist you today?";
    }
  };

  const processUserInput = (input: string, feature: AIFeature | null): string => {
    const lowercaseInput = input.toLowerCase();
    
    switch (feature) {
      case 'design':
        if (lowercaseInput.includes('wedding') || lowercaseInput.includes('formal')) {
          const recommendations = mockDesigns
            .filter(design => design.occasion?.toLowerCase().includes('wedding'))
            .map(design => (
              `${design.name}\n` +
              `Description: ${design.description}\n` +
              `Price: $${design.price}\n` +
              `Colors: ${design.colors?.join(', ')}\n` +
              `Fabric: ${design.fabricTypes?.join(', ')}\n`
            )).join('\n');
          return `Here are some recommendations for your wedding:\n\n${recommendations}`;
        }
        return "Could you tell me more about your style preferences and the occasion?";
      
      case 'color-matching':
        if (lowercaseInput.includes('light') || lowercaseInput.includes('fair')) {
          const palettes = mockColorPalettes
            .filter(palette => palette.suitableFor.includes('Light'))
            .map(palette => (
              `${palette.name}\n` +
              `Perfect for: ${palette.occasions.join(', ')}\n`
            )).join('\n');
          return `Based on your skin tone, here are some flattering color palettes:\n\n${palettes}`;
        }
        return "Could you specify your skin tone for better color recommendations?";
      
      case 'virtual-try-on':
        if (selectedImage) {
          return "Great! I've processed your photo. Would you like to try:\n\n" +
            mockDesigns.map((design, index) => 
              `${index + 1}. ${design.name} - ${design.description}`
            ).join('\n');
        }
        return "Please upload a full-length photo to start the virtual try-on experience.";
      
      case 'custom-design':
        if (lowercaseInput.includes('lehenga')) {
          return "Let's design your lehenga! Choose your preferences:\n\n" +
            "1. Silhouette (A-line/Mermaid/Circle)\n" +
            "2. Embellishment type (Zari/Sequins/Thread work)\n" +
            "3. Color scheme\n" +
            "4. Dupatta style";
        }
        return "Which garment type would you like to customize?";
      
      case 'size-fit':
        if (lowercaseInput.includes('manual')) {
          return "Please provide your measurements (in inches):\n\n" +
            "- Bust:\n" +
            "- Waist:\n" +
            "- Hips:\n" +
            "- Height:\n" +
            "- Shoulder width:";
        }
        return "Would you like to use the camera for guided measurements?";
      
      case 'occasion':
        if (lowercaseInput.includes('party')) {
          const partyWear = mockDesigns
            .filter(design => design.occasion?.toLowerCase().includes('party'))
            .map(design => (
              `${design.name}\n` +
              `Style: ${design.description}\n` +
              `Price: $${design.price}\n`
            )).join('\n');
          return `Here are some party-perfect options:\n\n${partyWear}`;
        }
        return "What type of occasion are you shopping for?";
      
      case 'sustainability':
        if (lowercaseInput.includes('fabric')) {
          const sustainableFabrics = mockFabrics
            .map(fabric => (
              `${fabric.name}\n` +
              `Sustainability Score: ${fabric.sustainabilityScore}/5\n` +
              `Properties: ${fabric.properties.join(', ')}\n` +
              `Recommended for: ${fabric.recommendedFor.join(', ')}\n`
            )).join('\n');
          return `Here are our sustainable fabric options:\n\n${sustainableFabrics}`;
        }
        return "Would you like to explore our sustainable collection or learn about eco-friendly fabrics?";
      
        case 'faq':
          return "Here are some frequently asked questions:\n\n" +
                 "1. How do I place an order?\n" +
                 "2. What are the available payment options?\n" +
                 "3. Can I customize my design?\n" +
                 "4. How do I track my order?\n" +
                 "5. What is the return policy?\n\n" +
                 "Need more help? Type 'support' to get in touch!";
        
      default:
        return "I understand you need assistance. How can I help you today?";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      attachments: selectedImage ? [selectedImage] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = processUserInput(input, selectedFeature);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        if (selectedFeature === 'virtual-try-on') {
          const assistantMessage: Message = {
            id: Date.now().toString(),
            type: 'assistant',
            content: "Great! I've processed your photo. Which style would you like to try on?",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackToFeatures = () => {
    setSelectedFeature(null);
    setMessages([initialMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 flex flex-col max-h-[600px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {selectedFeature && (
            <button
              onClick={handleBackToFeatures}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors mr-2"
              aria-label="Back to features"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">VastraAI</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your Fashion Assistant</p>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedFeature(null);
            setMessages([initialMessage]);
            onClose();
          }}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedFeature ? (
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureSelect(feature.id)}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors group text-left"
              >
                <feature.icon className="h-6 w-6 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 mb-2" />
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  {message.attachments?.map((attachment, index) => (
                    <img
                      key={index}
                      src={attachment}
                      alt="Uploaded content"
                      className="mt-2 rounded-lg max-w-full h-auto"
                    />
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        {selectedImage && (
          <div className="mb-2 relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </form>
    </div>
  );
}