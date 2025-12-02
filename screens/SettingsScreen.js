import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import Global from '../style/Global';
import ArrowBack from '../components/ArrowBack';

export default function SettingsScreen({ navigation }) {
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const { resetAllData } = useFinance();

  const SettingSwitchItem = ({ label, value, onValueChange }) => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
    }}>
      <Text style={{ fontSize: 16, color: Global.colors.textColor, fontWeight: '500' }}>{label}</Text>
      <Switch
        trackColor={{ false: '#E9E9E9', true: Global.colors.switchColor }}
        thumbColor={'#fff'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  const handleResetToggle = (value) => {
    setIsResetEnabled(value);
    if (!value) return;

    Alert.alert(
      "Apagar tudo?",
      "Tem certeza que deseja deletar todos os dados? Essa ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          onPress: () => setIsResetEnabled(false),
        },
        {
          text: "Sim, apagar",
          onPress: async () => {
            try {
              await resetAllData();
              console.log('Dados apagados com sucesso.');

              // recarregar app
              navigation.replace('Main');

            } catch (e) {
              console.log("Erro ao limpar dados:", e);
              Alert.alert("Erro", "Não foi possível limpar os dados.");
            } finally {
              setIsResetEnabled(false);
            }
          },
        }
      ]
    )
  }

  return (
    <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
      <ScrollView style={{ padding: 20 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <ArrowBack
            style={{padding: 5}}
          />
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: Global.colors.textColor,
            marginLeft: 10
          }}>
            Configurações e Perfil
          </Text>
        </View>

        <View style={{
          backgroundColor: Global.colors.cardBg,
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}>
          
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 18,
            borderBottomWidth: 1,
            borderBottomColor: Global.colors.dividerColor,
          }}
            onPress={() => navigation.navigate('Goals')}
          >
            <View>
              <Text style={{ fontSize: 16, color: Global.colors.textColor, fontWeight: '500' }}>Mudar limite de gasto diário</Text>
            </View>
            <Ionicons name="cash-outline" size={24} color={Global.colors.mainColor} />
          </TouchableOpacity>

          <SettingSwitchItem
            label="Resetar dados"
            value={isResetEnabled}
            onValueChange={handleResetToggle}
          />

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 18,
          }}>
            <Text style={{ fontSize: 16, color: Global.colors.textColor, fontWeight: '500' }}>Atualizar notificações</Text>
            <Switch
              trackColor={{ false: '#E9E9E9', true: Global.colors.switchColor }}
              thumbColor={'#fff'}
              onValueChange={setIsNotificationsEnabled}
              value={isNotificationsEnabled}
            />
          </View>
        </View>

        <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16, color: '#A9A9A9', marginBottom: 15 }}>App version: 1.1.1</Text>
        </View>

        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 14, color: Global.colors.textColor }}>Version Credits</Text>
          <Text style={{ fontSize: 12, color: '#A9A9A9' }}>Faz-me Rir</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}