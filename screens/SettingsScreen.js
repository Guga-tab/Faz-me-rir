import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Switch, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';
const cardBg = '#fff';
const switchColor = '#82D4A3'; // Verde (da imagem)
const dividerColor = '#F0F0F0';

export default function SettingsScreen({ navigation }) {
  // Estados para os switches
  const [isResetEnabled, setIsResetEnabled] = useState(true);
  const [isUpdateUserEnabled, setIsUpdateUserEnabled] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  // Componente para um item de configuração com switch
  const SettingSwitchItem = ({ label, value, onValueChange }) => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
    }}>
      <Text style={{ fontSize: 16, color: textColor, fontWeight: '500' }}>{label}</Text>
      <Switch
        trackColor={{ false: '#E9E9E9', true: switchColor }}
        thumbColor={'#fff'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: textColor, 
            marginLeft: 10 
          }}>
            Settings and Profile
          </Text>
        </View>

        {/* Card de Configurações */}
        <View style={{
          backgroundColor: cardBg,
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
          {/* Change Daily spending limit */}
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 18,
            borderBottomWidth: 1,
            borderBottomColor: dividerColor,
          }}>
            <View>
              <Text style={{ fontSize: 16, color: textColor, fontWeight: '500' }}>Change Daily spending limit</Text>
              <Text style={{ fontSize: 12, color: '#A9A9A9', paddingTop: 4 }}>womes peliceratiey</Text>
            </View>
            <Ionicons name="cash-outline" size={24} color={mainColor} />
          </TouchableOpacity>

          {/* Reset data */}
          <SettingSwitchItem
            label="Reset data"
            value={isResetEnabled}
            onValueChange={setIsResetEnabled}
          />
          
          {/* Update user name */}
          <SettingSwitchItem
            label="Update user name"
            value={isUpdateUserEnabled}
            onValueChange={setIsUpdateUserEnabled}
          />

          {/* Update notifications */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 18,
          }}>
             <Text style={{ fontSize: 16, color: textColor, fontWeight: '500' }}>Update notifications on/on Notons</Text>
             <Switch
                trackColor={{ false: '#E9E9E9', true: switchColor }}
                thumbColor={'#fff'}
                onValueChange={setIsNotificationsEnabled}
                value={isNotificationsEnabled}
              />
          </View>
        </View>

        {/* Informações da Versão */}
        <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16, color: '#A9A9A9', marginBottom: 15 }}>Aepp version</Text>
          <TouchableOpacity
            style={{
              backgroundColor: mainColor,
              paddingVertical: 18,
              borderRadius: 30,
              alignItems: 'center',
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              Faz-me Rir
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: textColor }}>Credios version</Text>
            <Text style={{ fontSize: 12, color: '#A9A9A9' }}>Credios: Faz-me Rir</Text>
            <Text style={{ fontSize: 12, color: '#A9A9A9' }}>repoistory</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}