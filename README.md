# Shopify Storefront Product Browser

A React Native application that displays products from the Shopify Storefront API, allowing users to browse products, view details, and manage a shopping cart.

## 🎯 Features

- **Product Browsing**: 2-column grid layout displaying products with images, titles, and prices
- **Product Details**: Full product information with variant selection and availability status
- **Shopping Cart**: Add/remove items, quantity management, and real-time total calculation
- **Custom Navigation**: Shop app-inspired floating pill bottom tab navigation
- **TypeScript**: Fully typed navigation, state management, and components
- **Accessibility**: VoiceOver (iOS) and TalkBack (Android) support

## 🛠 Tech Stack

- **React Native** version `0.83.1` (without Expo)
- **React** version `19.2.0`
- **TypeScript**
- **React Navigation** (Bottom Tabs + Native Stack)
- **React Context API** (State Management)

## 📋 Prerequisites

- Node.js (`v16` or higher)
- npm
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/sfondeur-88/shopify-storefront-product-browser.git

cd shopify-storefront-product-browser
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install iOS dependencies

```bash
cd ios
pod install
cd ..
```

### 4. Start Metro bundler

```bash
npm start
```

### 5. Run on iOS

```bash
npm run ios
```

### 6. Run on Android

```bash
npm run android
```

## 📁 Project Structure

```
src/
├── components/
│   ├── cart/
│   │   ├── CartItemRow.tsx
│   │   └── QuantityStepper.tsx
│   ├── icons/
│   │   ├── CartIcon.tsx
│   │   └── GridIcon.tsx
│   └── products/
│       └── ProductCard.tsx
├── context/
│   └── CartContext.tsx      # Global cart state management
├── hooks/
│   └── api/
│       └── products/
│           └── useGetProducts.ts
├── navigation/
│   ├── BottomTabNavigator.tsx
│   ├── CollectionStackNavigator.tsx
│   ├── CustomBottomTabBar.tsx
│   ├── RootNavigator.tsx
│   └── types.ts             # Navigation type definitions
├── screens/
│   ├── CartScreen.tsx
│   ├── ProductDetailsScreen.tsx
│   └── ProductListScreen.tsx
└── utils/
    ├── cart/
    │   └── cart.ts          # Cart calculation utilities
    └── products/
        ├── getDefaultVariant.ts
        └── pricing.ts
```

## 🏗 Architecture & Implementation

### Navigation Structure

- **Bottom Tab Navigator**: Custom-styled floating pill design with Collection and Cart tabs
- **Collection Stack**: Nested stack navigator for ProductList → ProductDetails flow
- **Type Safety**: Full TypeScript typing for all routes and parameters

### State Management

- **React Context**: Global cart state accessible across all screens
- **Cart Operations**: Add, remove, update quantity with duplicate prevention
- **Pure Functions**: Cart calculations extracted into testable utility functions

### Data Layer

- **Network**: `axios` API for retrieving product JSON
- **Error Handling**: Loading and error states for network requests
- **Data Transformation**: Shopify API response mapped to app-specific types
- **Custom Hooks**: `useGetProducts` hook for data fetching logic

### UI/UX Highlights

- **2-Column Grid**: FlatList with optimized rendering for product lists
- **Safe Areas**: Proper notch/safe area handling across devices
- **Variant Selection**: Expandable section with availability indicators
- **Shop App Design**: Matches Shopify's Shop app design patterns including accent colour (`#5433EB`) for interactive elements and bottom navigation
- **Custom Tab Bar**: Floating pill navigation styled to match the Android Shop app aesthetic

## 🤖 AI-Assisted Development

This project was built with assistance from AI development tools:

**Tools Used:**

- Claude (Anthropic) - Architecture decisions and trade-offs, debugging and custom navigation implementation

**How AI Helped:**

- Quick prototyping of navigation structure and custom bottom tab bar component
- Scaffolding the API's TypeScript type definitions
- Debugging React Navigation styling conflicts
- Best practices for configuring the custom API hook (useGetProducts.ts) as well as Jest tests

**Validation Approach:**

- Manual testing on both iOS and Android simulators
- Code review of AI-generated suggestions before implementation
- Jest unit tests for cart logic validation

## 🧪 Testing

Run tests with Jest:

```bash
npm test
```

**Test Coverage:**

- **Cart Context Tests**: Add to cart, quantity updates, item removal, duplicate handling
- **Cart Utility Tests**: Total price calculation, total items calculation, quantity edge cases

Example test run:

```bash
npx jest __tests__/cart.test.ts
npx jest __tests__/CartContext.test.ts
```

## ♿️ Accessibility

- Screen reader support (VoiceOver/TalkBack)
- Proper accessibility labels on custom bottom nav elements
- Focus management for navigation flows

## 📝 Notes

- Product data fetched from: [Test Products JSON](<https://mock.shop/api?query={products(first:20){edges{node{id%20title%20description%20featuredImage{id%20url}%20variants(first:3){edges{node{id%20title%20availableForSale%20price{amount%20currencyCode}}}}}}}>)
- No external component libraries used (custom implementations)

## 🎨 Design Reference

UI/UX inspired by the official Shopify Shop app, featuring:

- Clean 2-column product grid
- Floating pill navigation with Shop app accent colour
- Minimal, focused product detail views
