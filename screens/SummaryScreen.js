import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import Colors from '../style/Colors';

const formatCurrency = (value) =>
    `R$${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

const TransactionItem = ({ item, navigation }) => {
    const date = new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const isExpense = item.type === 'expense';
    const amountColor = isExpense ? Colors.redColor : Colors.mainColor;
    const sign = isExpense ? '-' : '+';
    const iconName = item.category === 'Transporte' ? 'car-outline' : 'basket-outline';

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('EditExpense', { itemId: item.id })}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 15,
                marginBottom: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: Colors.mainColor + '30',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10
                }}>
                    <Ionicons name={iconName} size={20} color={Colors.mainColor} />
                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.textColor }}>
                        {item.description}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#A9A9A9', paddingTop: 2 }}>
                        {date} - {item.category}
                    </Text>
                </View>
            </View>

            <Text style={{ fontSize: 16, fontWeight: 'bold', color: amountColor }}>
                {sign}{formatCurrency(item.amount)}
            </Text>
        </TouchableOpacity>
    );
};


export default function SummaryScreen({ navigation }) {
    const { transactions } = useFinance();
    const totalSpent = useMemo(() => {
        return transactions.reduce((sum, t) => (t.type === 'expense' ? sum + t.amount : sum), 0);
    }, [transactions]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingTop: 10, marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.textColor }}>
                        Sumário
                    </Text>
                </View>

                <View style={{
                    backgroundColor: Colors.mainColor,
                    borderRadius: 20,
                    padding: 30,
                    marginBottom: 30,
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, color: '#fff', opacity: 0.8, marginBottom: 5 }}>
                        Total Gasto
                    </Text>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>
                        {formatCurrency(totalSpent)}
                    </Text>
                </View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.textColor, marginBottom: 15 }}>
                    Despesas Recentes
                </Text>

                {transactions.length > 0 ? (
                    transactions.map(item => (
                        <TransactionItem
                            key={item.id}
                            item={item}
                            navigation={navigation}
                        />
                    ))
                ) : (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Ionicons name="alert-circle-outline" size={30} color="#A9A9A9" />
                        <Text style={{ color: '#A9A9A9', marginTop: 10 }}>Nenhuma transação encontrada.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}