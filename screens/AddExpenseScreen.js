import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';
const inputBg = '#fff';

export default function AddExpenseScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, padding: 20 }}>

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: textColor, textAlign: 'center', marginVertical: 30 }}>
          Add Expense
        </Text>

        {/* Input Amount */}
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          style={{
            backgroundColor: inputBg,
            fontSize: 16,
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            borderColor: '#EFEFEF',
            borderWidth: 1,
          }}
        />

        {/* Input Category */}
        <View style={{
            backgroundColor: inputBg,
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>Category</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10 }}>Transport 🚗</Text>
            <Text>Leisure 🌳</Text>
          </View>
        </View>
        
        {/* Input Description */}
        <TextInput
          placeholder="Description (optional)"
          style={{
            backgroundColor: inputBg,
            fontSize: 16,
            padding: 20,
            borderRadius: 15,
            marginBottom: 40,
            borderColor: '#EFEFEF',
            borderWidth: 1,
          }}
        />

        {/* Botão Save */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
            Save
          </Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}