import { View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Global from '../style/Global';

const formatCurrency = (value) => `R$${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

export function TransactionItem({ item, navigation }) {
    const date = new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const isExpense = item.type === 'expense';
    const amountColor = isExpense ? Global.colors.redColor : Global.colors.mainColor;
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
                    backgroundColor: Global.colors.mainColor + '30',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10
                }}>
                    <Ionicons name={iconName} size={20} color={Global.colors.mainColor} />
                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: Global.colors.textColor }}>
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