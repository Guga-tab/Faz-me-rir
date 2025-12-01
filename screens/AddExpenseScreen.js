import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext'; 
import Colors from '../style/Colors';

const categories = [
    { name: 'Shopping', icon: 'bag-handle-outline' },
    { name: 'Comida & Bebida', icon: 'fast-food-outline' },
    { name: 'Transporte', icon: 'car-outline' },
    { name: 'Lazer', icon: 'leaf-outline' },
    { name: 'Casa', icon: 'home-outline' },
];

export default function AddExpenseScreen({ navigation }) {
  const { addTransaction } = useFinance(); 
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  
  const handleSaveExpense = () => {
      const numericAmount = parseFloat(amount.replace(',', '.'));

      if (isNaN(numericAmount) || numericAmount <= 0) {
          alert("Por favor, insira um valor válido.");
          return;
      }

      const newTransaction = {
          amount: numericAmount,
          description: description || 'Sem descrição',
          type: 'expense',
          category: selectedCategory, 
      };

      addTransaction(newTransaction);
      navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, padding: 20 }}>

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: Colors.textColor, textAlign: 'center', marginVertical: 30 }}>
          Adicionar Despesa
        </Text>

        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount} 
          style={{
            backgroundColor: Colors.inputBg,
            fontSize: 16,
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            borderColor: '#EFEFEF',
            borderWidth: 1,
          }}
        />

        <View style={{
            backgroundColor: Colors.inputBg,
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.textColor, marginBottom: 10 }}>
            Selecionar Categoria:
          </Text>
            <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                marginBottom: 30,
                justifyContent: 'space-between'
            }}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.name}
                        onPress={() => setSelectedCategory(cat.name)}
                        style={{
                            backgroundColor: selectedCategory === cat.name ? Colors.mainColor : '#fff',
                            padding: 12,
                            borderRadius: 10,
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: selectedCategory === cat.name ? Colors.mainColor : '#EFEFEF',
                            flexDirection: 'row',
                            alignItems: 'center',
                            minWidth: 100,
                            justifyContent: 'center',
                            
                        }}
                    >
                        <Ionicons 
                            name={cat.icon} 
                            size={18} 
                            color={selectedCategory === cat.name ? '#fff' : Colors.textColor} 
                            style={{ marginRight: 5 }} 
                        />
                        <Text style={{ 
                            color: selectedCategory === cat.name ? '#fff' : Colors.textColor, 
                            fontWeight: '500' 
                        }}>
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <TextInput
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          style={{
            backgroundColor: Colors.inputBg,
            fontSize: 16,
            padding: 20,
            borderRadius: 15,
            marginBottom: 40,
            borderColor: '#EFEFEF',
            borderWidth: 1,
          }}
        />

        <TouchableOpacity
          onPress={handleSaveExpense} 
          style={{
            backgroundColor: Colors.mainColor,
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
            Salvar
          </Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}