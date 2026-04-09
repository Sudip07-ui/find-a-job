// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import { useAuthStore } from './src/store/authStore';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Not logged in → show Login
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Logged in → we'll add Home later
          <Stack.Screen 
            name="Home" 
            component={() => <LoginScreen />} // Temporary placeholder
            options={{ headerShown: true, title: 'Home' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
