import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// 1. Importe o hook para usar o estado global
import { useFinance } from '../context/FinanceContext'; 

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';
const inputBg = '#fff';

export default function AddExpenseScreen({ navigation }) {
  // Use o hook para acessar a função de adicionar transação
  const { addTransaction } = useFinance(); 
  
  // 2. Defina os estados locais para o formulário
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  // 3. Crie a função que faz a lógica
  const handleSaveExpense = () => {
      // Tenta converter o valor para número
      const numericAmount = parseFloat(amount.replace(',', '.'));

      if (isNaN(numericAmount) || numericAmount <= 0) {
          alert("Por favor, insira um valor válido.");
          return;
      }
      
      // Objeto da transação
      const newTransaction = {
          amount: numericAmount,
          description: description || 'Sem descrição',
          type: 'expense', // Assume que é um gasto (você pode adicionar um seletor no futuro)
          category: 'Transporte', // Valor de exemplo
      };

      addTransaction(newTransaction); // SALVA OS DADOS no Contexto/AsyncStorage
      navigation.goBack();           // FECHA O MODAL
  };

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
          value={amount}
          onChangeText={setAmount} // Conecta ao estado
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

        {/* Input Category (Deixamos estático por enquanto) */}
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
          value={description}
          onChangeText={setDescription} // Conecta ao estado
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
          // AQUI ESTÁ A MUDANÇA: AGORA CHAMA A FUNÇÃO DE SALVAR
          onPress={handleSaveExpense} 
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