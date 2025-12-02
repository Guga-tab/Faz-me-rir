import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import { categories } from '../icons/categories';
import Global from '../style/Global';


export default function EditExpenseScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { transactions, editTransaction, deleteTransaction } = useFinance();
  const originalTransaction = transactions.find(t => t.id === itemId);
  const [amount, setAmount] = useState(originalTransaction?.amount.toString() || '0');
  const [description, setDescription] = useState(originalTransaction?.description || '');
  const [selectedCategory, setSelectedCategory] = useState(originalTransaction?.category || categories[0].name);
  
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
    };
    
    editTransaction(updatedTransaction);
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
            deleteTransaction(itemId);
            navigation.goBack();
          },
          style: "destructive"
        },
      ]
    );
  };
  
  if (!originalTransaction) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Transação não encontrada.</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: Global.colors.textColor, textAlign: 'center', marginVertical: 20 }}>
          Editar Despesa
        </Text>

        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={inputStyle}
          />

        <Text style={{ fontSize: 16, fontWeight: '500', color: Global.colors.textColor, marginBottom: 10 }}>
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
              backgroundColor: selectedCategory === cat.name ? '#FFEFD8' : Global.colors.inputBg,
              borderWidth: 1,
              borderColor: selectedCategory === cat.name ? Global.colors.mainColor : '#E0E0E0',
            }}                >
              <Ionicons name={cat.icon} size={18} color={selectedCategory === cat.name ? '#fff' : Global.colors.textColor} style={{ marginRight: 5 }} />
              <Text style={{ color: selectedCategory === cat.name ? '#fff' : Global.colors.textColor, fontWeight: '500' }}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          style={inputStyle}
          />

        <TouchableOpacity
          onPress={handleSaveEdit}
          style={{
            backgroundColor: Global.colors.mainColor,
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

        <TouchableOpacity
          onPress={handleDelete}
          style={{
            backgroundColor: Global.colors.redColor,
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

const inputStyle = {
  backgroundColor: Global.colors.inputBg,
  borderRadius: 15,
  padding: 18,
  fontSize: 16,
  color: Global.colors.textColor,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
};