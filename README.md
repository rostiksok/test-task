# 💱 Currency Tracker
A mobile application built with React Native and Expo that allows users to view up-to-date currency exchange rates. Key features include adding currencies to favorites, offline mode with cached data, theme switching (light/dark), and searching currencies by code.

## 🛠 Technical Description
### ⚙️ How to Build and Run the App

Clone the repository:
```bash
git clone https://github.com/your-username/currency-tracker.git
cd currency-tracker
```
Install dependencies:
```bash
yarn install
```
Rename the **.env.example** file in the root directory to **.env** and insert your API key:
```bash
API_KEY="YOUR_API_KEY"
```
Start the app:
```bash
yarn start
```

### 🧱 App Architecture
The app is built using a **modular architecture**, where each functional block is organized in a separate directory. This approach enables a clear **Separation of Concerns**, which greatly simplifies development, testing, and scalability.

#### Advantages:
- **Clarity and scalability**. Each part of the project has a clear responsibility and can be extended easily.
- **Code reusability**. Components and hooks are decoupled and can be reused across the app without duplication.
- **Separation of concerns**. Logic, UI, state, and navigation are structured in isolated modules.
```bash
src/
│
├── api/         - Handles API communication               
├── components/  - Reusable visual UI components        
├── context/     - Centralized state management          
├── hooks/       - Reusable business logic (custom hooks)        
├── screens/     - Displays app screens             
├── navigation/  - App navigation setup         
└── theme/       - Theme, colors, and typography              
```

### 📶 Offline Mode
Offline support is implemented using:
- **@react-native-community/netinfo** – to monitor the network status.
- **AsyncStorage** – to cache the latest fetched exchange rates, which are shown when the internet connection is unavailable.
- Logic that automatically checks the connection status and displays cached data when offline.

To test offline mode:
- Open the app with an active internet connection.
- Turn off the internet and reopen the app — previously cached rates will be shown.

### 💡 Features
- 📊 View live exchange rates
- ⭐ Add currencies to favorites
- 🌙 Switch between light and dark themes
- 📶 Offline mode with cached data
- 🔍 Search by currency code (e.g., USD, EUR)

## 📦 Technologies
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo)
- [Fixer.io API](https://fixer.io/)
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) 

## 🧑‍💻 Author
Created by **Rostyslav Sokalskyi**
