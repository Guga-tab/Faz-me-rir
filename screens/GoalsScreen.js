import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useFinance } from '../context/FinanceContext';
import ArrowBack from '../components/ArrowBack';
import Global from '../style/Global';

export default function GoalsScreen() {
  const { dailyLimit, updateDailyLimit } = useFinance();
  const [tempLimit, setTempLimit] = useState(dailyLimit);
  const formatCurrency = (value) =>
    `R$${Math.round(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  const progress = 3 / 7;

  useEffect(() => {
    setTempLimit(dailyLimit);
  }, [dailyLimit]);

  return (
    <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
      <ScrollView style={{ padding: 20 }}>

        <ArrowBack
          style={{ padding: 5, marginBottom: 10, alignSelf: 'flex-start' }}
        />

        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: Global.colors.textColor,
          marginBottom: 30,
        }}>
          Metas e Limite Diário
        </Text>

        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 16, color: Global.colors.textColor, fontWeight: '500', marginBottom: 5 }}>Definir limite de gasto diário</Text>
          <Text style={{ fontSize: 14, color: Global.colors.greenColor, marginBottom: 20, fontWeight: 'bold' }}>
            Limite atual: {formatCurrency(tempLimit)}
          </Text>

          <View style={{
            backgroundColor: '#fff',
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: Global.colors.lightGray,
          }}>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={1000}
              value={tempLimit}
              onValueChange={setTempLimit}
              onSlidingComplete={updateDailyLimit}
              minimumTrackTintColor={Global.colors.greenColor}
              maximumTrackTintColor={Global.colors.lightGray}
              thumbTintColor={'#fff'}
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 16, color: Global.colors.textColor, fontWeight: '500', marginBottom: 10 }}>
            3 de 7 dias dentro do objetivo
          </Text>
          <View style={{
            width: '100%',
            height: 12,
            backgroundColor: Global.colors.lightGray,
            borderRadius: 6
          }}>
            <View style={{
              width: `${progress * 100}%`,
              height: 12,
              backgroundColor: Global.colors.mainColor,
              borderRadius: 6
            }} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}