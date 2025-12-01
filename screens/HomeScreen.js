import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext'; 
import CustomButton from '../components/CustomButton';
import Colors from '../style/Colors';

const calculateMetrics = (transactions, dailyLimit) => {
    const today = new Date().toISOString().split('T')[0]; 
    let spentToday = 0;
    
    transactions.forEach(t => {
      const transactionDate = t.date.split('T')[0];
      
      if (transactionDate === today && t.type === 'expense') {
        spentToday += t.amount;
      }
    });
    
    const dailyBalance = dailyLimit - spentToday;

    return {
        spentToday,
        dailyBalance
    };
};

export default function HomeScreen({ navigation }) {
  const { transactions, dailyLimit } = useFinance(); 
  const { spentToday, dailyBalance } = useMemo(() => 
    calculateMetrics(transactions, dailyLimit)
  , [transactions, dailyLimit]);
  const formatCurrency = (value) => 
    `R$${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.textColor }}>
            Início
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="person-circle-outline" size={30} color={Colors.textColor} />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: dailyBalance >= 0 ? Colors.textColor : 'red' }}>
            {formatCurrency(dailyBalance)}
          </Text>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>
            Saldo diário (Limite: {formatCurrency(dailyLimit)})
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: Colors.textColor }}>
            {formatCurrency(spentToday)}
          </Text>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>
            Total Gasto Hoje
          </Text>
        </View>

        <CustomButton
          title = "Adicionar despesa"
          navigate="AddExpense"
        />

      </View>
    </SafeAreaView>
  );
}