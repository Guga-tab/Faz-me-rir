import React, { useMemo } from 'react';
// IMPORTANTE: Mudar FlatList para ScrollView
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext'; 

// Cores (Reutilizadas)
const backgroundColor = '#FDFBF6';
const textColor = '#333';
const mainColor = '#F09A5D';
const redColor = '#E74C3C'; 

// Função de formatação para moeda
const formatCurrency = (value) => 
    `R$${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

// Componente para renderizar cada item da lista (Sem padding horizontal aqui)
const TransactionItem = ({ item }) => {
    const date = new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const isExpense = item.type === 'expense';
    const amountColor = isExpense ? redColor : mainColor; 
    const sign = isExpense ? '-' : '+';
    const iconName = item.category === 'Transporte' ? 'car-outline' : 'basket-outline';
    
    return (
        <View style={{
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
            {/* Ícone e Descrição */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 10, 
                    backgroundColor: mainColor + '30', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginRight: 10
                }}>
                    <Ionicons name={iconName} size={20} color={mainColor} />
                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: textColor }}>
                        {item.description}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#A9A9A9', paddingTop: 2 }}>
                        {date} - {item.category}
                    </Text>
                </View>
            </View>

            {/* Valor */}
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: amountColor }}>
                {sign}{formatCurrency(item.amount)}
            </Text>
        </View>
    );
};


export default function SummaryScreen({ navigation }) {
    const { transactions } = useFinance(); 

    // Calcula o saldo total para o card no topo
    const totalSpent = useMemo(() => {
        return transactions.reduce((sum, t) => (t.type === 'expense' ? sum + t.amount : sum), 0);
    }, [transactions]);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
            {/* O ScrollView substitui o View e gerencia a rolagem de todo o conteúdo */}
            <ScrollView 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header (Título principal) */}
                <View style={{ paddingTop: 10, marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor }}>
                        Sumário
                    </Text>
                </View>

                {/* Card de Saldo Total (TOTAL SPENT) */}
                <View style={{ 
                    backgroundColor: mainColor, 
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

                {/* Título da Lista de Transações */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor, marginBottom: 15 }}>
                    Despesas Recentes
                </Text>
                
                {/* MAP: Mapeia as transações dentro do ScrollView */}
                {transactions.length > 0 ? (
                    transactions.map(item => (
                        <TransactionItem key={item.id} item={item} />
                    ))
                ) : (
                    // Componente de Lista Vazia
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Ionicons name="alert-circle-outline" size={30} color="#A9A9A9" />
                        <Text style={{ color: '#A9A9A9', marginTop: 10 }}>Nenhuma transação encontrada.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}