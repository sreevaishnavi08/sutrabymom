# StitchVastra Mobile App

A React Native mobile application for the StitchVastra fashion platform, built with Expo.

## Features

- **User Authentication**: Support for customers, admins, and vastrakars
- **Custom Clothing Design**: Interactive customization interface
- **Fabric Collection**: Browse and purchase premium fabrics
- **AI Assistant**: VastraAI for personalized fashion advice
- **Order Management**: Track orders and manage deliveries
- **Multi-role Dashboards**: Separate interfaces for different user types
- **Dark/Light Theme**: Automatic theme switching
- **Multi-language Support**: English, Hindi, Telugu, Tamil

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Paper** for UI components
- **Supabase** for backend services
- **AsyncStorage** for local data persistence
- **Expo Linear Gradient** for beautiful gradients
- **React Native Reanimated** for smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials.

### Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Run on specific platforms:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts for state management
│   ├── screens/            # Screen components
│   ├── theme/              # Theme configuration
│   └── lib/                # Utility libraries
├── assets/                 # Static assets (images, fonts)
├── App.tsx                 # Main app component
└── package.json
```

## Key Features

### Authentication
- Multi-role authentication (Customer, Admin, Vastrakar)
- Google Sign-In integration
- OTP-based authentication
- Secure token storage

### Customization
- Interactive clothing customization
- Real-time price calculation
- Multiple fabric and color options
- Custom measurements

### AI Assistant
- Personalized fashion recommendations
- Color matching suggestions
- Size and fit guidance
- Occasion-based styling

### Order Management
- Real-time order tracking
- Status updates and notifications
- Payment integration
- Delivery management

## Building for Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

## Deployment

The app can be deployed using Expo Application Services (EAS):

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for production:
```bash
eas build --platform all
```

4. Submit to app stores:
```bash
eas submit --platform all
```

## Environment Variables

Create a `.env` file with the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.