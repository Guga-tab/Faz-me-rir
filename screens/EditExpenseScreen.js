import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext'; 

// Lista de Categorias (Reutilizada de AddExpenseScreen)
const categories = [
    { name: 'Shopping', icon: 'bag-handle-outline' },
    { name: 'Comida & Bebida', icon: 'fast-food-outline' },
    { name: 'Transporte', icon: 'car-outline' },
    { name: 'Lazer', icon: 'leaf-outline' },
    { name: 'Casa', icon: 'home-outline' },
];

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const inputBg = '#fff';
const textColor = '#333';
const redColor = '#E74C3C'; // Vermelho para o botão Deletar

const inputStyle = {
    backgroundColor: inputBg,
    borderRadius: 15,
    padding: 18, // Aumenta o padding para deixar o input mais alto
    fontSize: 16, // Um tamanho de fonte confortável
    color: textColor,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
};

export default function EditExpenseScreen({ route, navigation }) {
  // Recebe o ID da transação a ser editada
  const { itemId } = route.params; 
  
  // 1. Obter dados e funções do contexto
  const { transactions, editTransaction, deleteTransaction } = useFinance();
  
  // 2. Encontrar a transação original
  const originalTransaction = transactions.find(t => t.id === itemId);

  // 3. Estados locais preenchidos com os dados originais
  const [amount, setAmount] = useState(originalTransaction?.amount.toString() || '0');
  const [description, setDescription] = useState(originalTransaction?.description || '');
  const [selectedCategory, setSelectedCategory] = useState(originalTransaction?.category || categories[0].name); 

  // --- Lógica de Ações ---

  const handleSaveEdit = () => {
      const numericAmount = parseFloat(amount.replace(',', '.'));

      if (isNaN(numericAmount) || numericAmount <= 0) {
          Alert.alert("Erro", "Por favor, insira um valor válido.");
          return;
      }
      
      const updatedTransaction = {
          ...originalTransaction,
          amount: numericAmount,
          description: description || 'Sem descrição',
          category: selectedCategory,
          // Mantém o ID e a data originais
      };

      editTransaction(updatedTransaction); // Salva a edição no contexto
      navigation.goBack(); 
  };

  const handleDelete = () => {
      Alert.alert(
          "Confirmar Exclusão",
          "Tem certeza de que deseja deletar esta transação?",
          [
              { text: "Cancelar", style: "cancel" },
              { 
                  text: "Deletar", 
                  onPress: () => {
                      deleteTransaction(itemId); // Deleta do contexto
                      navigation.goBack(); 
                  },
                  style: "destructive"
              },
          ]
      );
  };
  
  // Se a transação não for encontrada, algo deu errado
  if (!originalTransaction) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Transação não encontrada.</Text>
          </View>
      );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: textColor, textAlign: 'center', marginVertical: 20 }}>
          Editar Despesa
        </Text>

        {/* Input Amount (preenchido) */}
        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={inputStyle}
        />
        
        {/* Seção de Seleção de Categoria (reutilizada) */}
        <Text style={{ fontSize: 16, fontWeight: '500', color: textColor, marginBottom: 10 }}>
            Categoria:
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30, justifyContent: 'space-between' }}>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat.name}
                    onPress={() => setSelectedCategory(cat.name)}
                    style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 12,
                        borderRadius: 25,
                        marginBottom: 10,
                        minWidth: '48%',
                        justifyContent: 'center',
                        backgroundColor: selectedCategory === cat.name ? '#FFEFD8' : inputBg, // Fundo leve
                        borderWidth: 1,
                        borderColor: selectedCategory === cat.name ? mainColor : '#E0E0E0', // Borda em mainColor
                    }}                >
                    <Ionicons name={cat.icon} size={18} color={selectedCategory === cat.name ? '#fff' : textColor} style={{ marginRight: 5 }} />
                    <Text style={{ color: selectedCategory === cat.name ? '#fff' : textColor, fontWeight: '500' }}>
                        {cat.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* Input Description (preenchido) */}
        <TextInput
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          style={inputStyle}
        />

        {/* Botão SALVAR EDIÇÃO */}
        <TouchableOpacity
          onPress={handleSaveEdit} 
          style={{
            backgroundColor: mainColor,
            paddingVertical: 18,
            borderRadius: 30,
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Salvar Mudanças
          </Text>
        </TouchableOpacity>
        
        {/* Botão DELETAR */}
        <TouchableOpacity
          onPress={handleDelete} 
          style={{
            backgroundColor: redColor,
            paddingVertical: 18,
            borderRadius: 30,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Deletar Despesa
          </Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}