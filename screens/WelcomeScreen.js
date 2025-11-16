import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D'; // Laranja
const textColor = '#333';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 30 }}>
        
        {/* Espaço para o Gráfico de Fundo (como na imagem) */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="wallet-outline" size={150} color={mainColor} style={{ opacity: 0.8 }} />
            <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: textColor, 
                marginTop: 20 
            }}>
                Faz-me Rir App
            </Text>
        </View>

        {/* Informações de Introdução */}
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 50 }}>
            <Text style={{ fontSize: 18, color: textColor, marginBottom: 10, fontWeight: '500' }}>
                Gerencie seus gastos e ganhe pontos!
            </Text>
            <Text style={{ fontSize: 14, color: '#A9A9A9', textAlign: 'center' }}>
                Acompanhe suas finanças e complete desafios para subir de nível.
            </Text>
        </View>
        
        {/* Botão Start */}
        <TouchableOpacity
          // Ao clicar, navegamos para a rota 'Main' (que é o nosso TabNavigator)
          onPress={() => navigation.replace('Main')}
          style={{
            backgroundColor: mainColor,
            paddingVertical: 18,
            paddingHorizontal: 80,
            borderRadius: 30,
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