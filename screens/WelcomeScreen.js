import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../style/Colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 30 }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="wallet-outline" size={150} color={Colors.mainColor} style={{ opacity: 0.8 }} />
            <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: Colors.textColor, 
                marginTop: 20 
            }}>
                Faz-me Rir App
            </Text>
        </View>

        <View style={{ width: '100%', alignItems: 'center', marginBottom: 50 }}>
            <Text style={{ fontSize: 18, color: Colors.textColor, marginBottom: 10, fontWeight: '500' }}>
                Gerencie seus gastos e ganhe pontos!
            </Text>
            <Text style={{ fontSize: 14, color: '#A9A9A9', textAlign: 'center' }}>
                Acompanhe suas finanças e complete desafios para subir de nível.
            </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.replace('Main')}
          style={{
            backgroundColor: Colors.mainColor,
            paddingVertical: 10,
            paddingHorizontal: 80,
            borderRadius: 30,
            bottom: 25,
            width: '80%',
            alignItems: 'center',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Pressione Start
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}