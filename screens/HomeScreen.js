import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext'; 

const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';

const calculateMetrics = (transactions, dailyLimit) => {
    const today = new Date().toISOString().split('T')[0]; 
    const dailyBalance = dailyLimit - spentToday;
    let spentToday = 0;
    
    transactions.forEach(t => {
        const transactionDate = t.date.split('T')[0];

        if (transactionDate === today && t.type === 'expense') {
            spentToday += t.amount;
        }
    });
    
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
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>
            Início
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="person-circle-outline" size={30} color={textColor} />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: dailyBalance >= 0 ? textColor : 'red' }}>
            {formatCurrency(dailyBalance)}
          </Text>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>
            Saldo diário (Limite: {formatCurrency(dailyLimit)})
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: textColor }}>
            {formatCurrency(spentToday)}
          </Text>
          <Text style={{ fontSize: 16, color: '#A9A9A9' }}>
            Total Gasto Hoje
          </Text>
        </View>

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