import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import { FinanceProvider } from './context/FinanceContext';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import SummaryScreen from './screens/SummaryScreen';
import GamificationScreen from './screens/GamificationScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import GoalsScreen from './screens/GoalsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChallengesScreen from './screens/ChallengesScreen.js';
import EditExpenseScreen from './screens/EditExpenseScreen';
import Colors from './style/Colors.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: Colors.mainColor,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarActiveTintColor: Colors.mainColor, 
      }}
    >
      <Tab.Screen 
        name="Summary" 
        component={SummaryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Gamification" 
        component={GamificationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller-outline" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: { backgroundColor: Colors.backgroundColor },
          }}
        >

          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} 
          />

          <Stack.Screen 
            name="Main" 
            component={MainTabNavigator} 
            options={{ headerShown: false }}
          />
        
          <Stack.Screen 
            name="AddExpense" 
            component={AddExpenseScreen}
            options={{ 
              presentation: 'modal', 
              headerShown: false 
            }}
          />

          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ 
              headerShown: false
            }}
          />

          <Stack.Screen 
            name="Challenges" 
            component={ChallengesScreen}
            options={{ 
              headerShown: false
            }}
          />

          <Stack.Screen 
            name="Goals" 
            component={GoalsScreen}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="EditExpense" 
            component={EditExpenseScreen}
            options={{ 
                presentation: 'modal',
                headerShown: false 
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </FinanceProvider>
  );
}