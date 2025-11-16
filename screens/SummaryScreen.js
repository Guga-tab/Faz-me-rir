import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores
const backgroundColor = '#FDFBF6';
const greenColor = '#D4EFE7';
const orangeColor = '#FBE7D7';

const ExpenseItem = ({ icon, category, description, amount, color, iconName }) => (
  <View style={{
    backgroundColor: color,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ 
        width: 40, 
        height: 40, 
        borderRadius: 10, 
        backgroundColor: 'rgba(0,0,0,0.05)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 10 
      }}>
        <Ionicons name={iconName} size={20} color="#333" />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{category}</Text>
        <Text style={{ fontSize: 12, color: '#555' }}>{description}</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 10 }}>${amount}</Text>
        <TouchableOpacity>
            <Ionicons name="trash-outline" size={20} color="#555" />
        </TouchableOpacity>
    </View>
  </View>
);

export default function SummaryScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
          Expense List and Edit
        </Text>

        {/* Filtros */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity style={{ 
            backgroundColor: greenColor, 
            paddingVertical: 10, 
            paddingHorizontal: 20, 
            borderRadius: 20, 
            marginRight: 10 
          }}>
            <Text>Category ⌄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ 
            backgroundColor: orangeColor, 
            paddingVertical: 10, 
            paddingHorizontal: 20, 
            borderRadius: 20 
          }}>
            <Text>Date ⌄</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Despesas */}
        <ExpenseItem 
          iconName="restaurant-outline" 
          category="$2,0000" 
          description="Corieth Eategtion" 
          amount="2,000" 
          color={orangeColor} 
        />
        <ExpenseItem 
          iconName="car-sport-outline" 
          category="$12,000" 
          description="Toderry Arpa" 
          amount="12,000" 
          color={greenColor} 
        />
        <ExpenseItem 
          iconName="mail-outline" 
          category="666000" 
          description="Corierh Description" 
          amount="666,000" 
          color="#fff" 
        />
         <ExpenseItem 
          iconName="leaf-outline" 
          category="46,0000" 
          description="Sorierh Excegtion" 
          amount="46,000" 
          color={greenColor} 
        />
        
        {/* Adicione mais itens aqui */}

      </ScrollView>
    </SafeAreaView>
  );
}