import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        
        {/* Header */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>
            Home
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="person-circle-outline" size={30} color={textColor} />
          </TouchableOpacity>
        </View>

        {/* Daily Balance */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: textColor }}>
            24,00
          </Text>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>
            Daily Balance
          </Text>
        </View>

        {/* Total Spent */}
        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: textColor }}>
            15,000
          </Text>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>
            Total Spent Today
          </Text>
        </View>

        {/* Botão Add Expense */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddExpense')}
          style={{
            backgroundColor: mainColor,
            paddingVertical: 18,
            paddingHorizontal: 80,
            borderRadius: 30,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Adicionar Despesa
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}