import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

// Importe suas telas
import HomeScreen from './screens/HomeScreen';
import SummaryScreen from './screens/SummaryScreen';
import GamificationScreen from './screens/GamificationScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
// (Importe as outras telas quando as criar)
// ...outras importações
import SettingsScreen from './screens/SettingsScreen';
import ChallengesScreen from './screens/ChallengesScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Cor principal (laranja)
const mainColor = '#F09A5D';
// Cor de fundo
const backgroundColor = '#FDFBF6';

// Botão central customizado da TabBar
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
      backgroundColor: mainColor, // Laranja
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

// Componente para a Navegação Principal (Tabs)
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
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
        tabBarInactiveTintColor: '#A9A9A9', // Cinza
        tabBarActiveTintColor: mainColor, // Laranja
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
      
      {/* Tela Home com botão customizado */}
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" color={focused ? '#fff' : '#eee'} size={30} />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
               <Ionicons name="home" color={'#fff'} size={30} />
            </CustomTabBarButton>
          ),
        }}
      />
      
      <Tab.Screen 
        name="Gamification" 
        component={GamificationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen 
        name="Challenges" 
        component={ChallengesScreen}
        options={{ 
          headerShown: false // O header customizado está na própria tela
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          headerShown: false // O header customizado está na própria tela
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal do App (Stack)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: backgroundColor },
        }}
      >
        {/* As telas da TabBar */}
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        
        {/* Telas "Modais" (que abrem por cima) */}
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
            title: 'Settings and Profile',
            headerStyle: { backgroundColor: backgroundColor },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}