import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Global from '../style/Global';
import CustomButton from '../components/CustomButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 30 }}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="wallet-outline" size={150} color={Global.colors.mainColor} style={{ opacity: 0.8 }} />
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: Global.colors.textColor,
            marginTop: 20
          }}>
            Faz-me Rir App
          </Text>
        </View>

        <View style={{ width: '100%', alignItems: 'center', marginBottom: 50 }}>
          <Text style={{ fontSize: 18, color: Global.colors.textColor, marginBottom: 10, fontWeight: '500' }}>
            Gerencie seus gastos e ganhe pontos!
          </Text>
          <Text style={{ fontSize: 14, color: '#A9A9A9', textAlign: 'center' }}>
            Acompanhe suas finanças e complete desafios para subir de nível.
          </Text>
        </View>

        <CustomButton
          title="Pressione Start"
          navigate="Main"
        />

      </View>
    </SafeAreaView>
  );
}