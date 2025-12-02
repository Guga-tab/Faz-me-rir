import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import { categories } from '../icons/categories';
import Global from '../style/Global';

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
    <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
      <View style={{ flex: 1, padding: 20 }}>

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: Global.colors.textColor, textAlign: 'center', marginVertical: 30 }}>
          Adicionar Despesa
        </Text>

        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{
            backgroundColor: Global.colors.inputBg,
            fontSize: 16,
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            borderColor: '#EFEFEF',
            borderWidth: 1,
          }}
        />

        <View style={{
          backgroundColor: Global.colors.inputBg,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          borderColor: '#EFEFEF',
          borderWidth: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: Global.colors.textColor, marginBottom: 10 }}>
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
                  backgroundColor: selectedCategory === cat.name ? Global.colors.mainColor : '#fff',
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: selectedCategory === cat.name ? Global.colors.mainColor : '#EFEFEF',
                  flexDirection: 'row',
                  alignItems: 'center',
                  minWidth: 100,
                  justifyContent: 'center',

                }}
              >
                <Ionicons
                  name={cat.icon}
                  size={18}
                  color={selectedCategory === cat.name ? '#fff' : Global.colors.textColor}
                  style={{ marginRight: 5 }}
                />
                <Text style={{
                  color: selectedCategory === cat.name ? '#fff' : Global.colors.textColor,
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
            backgroundColor: Global.colors.inputBg,
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
            backgroundColor: Global.colors.mainColor,
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