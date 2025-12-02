import { useMemo } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import { TransactionItem } from '../components/TransactionItem';
import Global from '../style/Global';

export default function SummaryScreen({ navigation }) {
    const formatCurrency = (value) => `R$${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
    const { transactions } = useFinance();
    const totalSpent = useMemo(() => {
        return transactions.reduce((sum, t) => (t.type === 'expense' ? sum + t.amount : sum), 0);
    }, [transactions]);

    return (
        <SafeAreaView style={Global.safeAreaView}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingTop: 10, marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: Global.colors.textColor }}>
                        Sumário
                    </Text>
                </View>

                <View style={{
                    backgroundColor: Global.colors.mainColor,
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

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Global.colors.textColor, marginBottom: 15 }}>
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