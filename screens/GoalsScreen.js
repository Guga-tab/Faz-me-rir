import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; 
import { useFinance } from '../context/FinanceContext'; 
import Colors from '../style/Colors';

export default function GoalsScreen({ navigation }) {
  const { dailyLimit, updateDailyLimit } = useFinance();
  const [tempLimit, setTempLimit] = useState(dailyLimit); 
  const formatCurrency = (value) => 
    `R$${Math.round(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  const progress = 3 / 7; 

  useEffect(() => {
      setTempLimit(dailyLimit);
  }, [dailyLimit]);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>

        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={{ padding: 5, marginBottom: 10, alignSelf: 'flex-start' }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textColor} />
        </TouchableOpacity>
        
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: Colors.textColor, 
          marginBottom: 30,
        }}>
          Metas e Limite Diário
        </Text>

        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 16, color: Colors.textColor, fontWeight: '500', marginBottom: 5 }}>Definir limite de gasto diário</Text>
          <Text style={{ fontSize: 14, color: Colors.greenColor, marginBottom: 20, fontWeight: 'bold' }}>
            Limite atual: {formatCurrency(tempLimit)}
          </Text>
          
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 15, 
            paddingVertical: 10, 
            paddingHorizontal: 15, 
            borderWidth: 1, 
            borderColor: Colors.lightGray,
          }}>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={500} 
              value={tempLimit} 
              onValueChange={setTempLimit}
              onSlidingComplete={updateDailyLimit} 
              minimumTrackTintColor={Colors.greenColor}
              maximumTrackTintColor={Colors.lightGray}
              thumbTintColor={'#fff'} 
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 40 }}>
            {/* ... Códigos dos TouchableOpacitys para os ícones ... */}
        </View>

        <View>
          <Text style={{ fontSize: 16, color: Colors.textColor, fontWeight: '500', marginBottom: 10 }}>
            3 de 7 dias dentro do objetivo
          </Text>
          <View style={{ 
            width: '100%', 
            height: 12, 
            backgroundColor: Colors.lightGray, 
            borderRadius: 6 
          }}>
            <View style={{ 
              width: `${progress * 100}%`, 
              height: 12, 
              backgroundColor: Colors.mainColor, 
              borderRadius: 6 
            }} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}