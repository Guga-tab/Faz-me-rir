import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; 
// 1. Importe o hook
import { useFinance } from '../context/FinanceContext'; 

// Cores (Reutilizadas do Contexto e outras telas)
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const greenColor = '#82D4A3';
const textColor = '#333';
const lightGray = '#EFEFEF';

export default function GoalsScreen({ navigation }) {
  // 2. Use o hook para obter e atualizar o limite
  const { dailyLimit, updateDailyLimit } = useFinance();
  
  // 3. Estado local para o slider: 
  // O slider manipula um valor temporário antes de salvar no contexto.
  const [tempLimit, setTempLimit] = useState(dailyLimit); 

  // 4. Efeito para sincronizar o estado local com o global
  // Garante que se o dailyLimit for alterado em outro lugar, o slider se atualize.
  useEffect(() => {
      setTempLimit(dailyLimit);
  }, [dailyLimit]);
  
  // Função de formatação para moeda (reutilizada)
  const formatCurrency = (value) => 
    `R$${Math.round(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

  // Progresso (Simulando 3 de 7 dias dentro da meta, como na imagem)
  const progress = 3 / 7; 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>
        
        {/* Header (Manteve o estilo da imagem) */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={{ padding: 5, marginBottom: 10, alignSelf: 'flex-start' }}
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: textColor, 
          marginBottom: 30,
        }}>
          Goals and Daily Limit
        </Text>

        {/* Seção do Limite Diário */}
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 16, color: textColor, fontWeight: '500', marginBottom: 5 }}>Set daily spending limit</Text>
          <Text style={{ fontSize: 14, color: greenColor, marginBottom: 20, fontWeight: 'bold' }}>
            Current Limit: {formatCurrency(tempLimit)}
          </Text>
          
          {/* Container do Slider */}
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 15, 
            paddingVertical: 10, 
            paddingHorizontal: 15, 
            borderWidth: 1, 
            borderColor: lightGray,
            // ... outros estilos de sombra
          }}>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={500} 
              // 5. O Slider é conectado ao estado local temporário
              value={tempLimit} 
              onValueChange={setTempLimit}
              // 6. Ao soltar o slider, salvamos no estado global
              onSlidingComplete={updateDailyLimit} 
              minimumTrackTintColor={greenColor}
              maximumTrackTintColor={lightGray}
              thumbTintColor={'#fff'} 
            />
          </View>
        </View>

        {/* Ícones de Categoria (Estáticos) */}
        <View style={{ flexDirection: 'row', marginBottom: 40 }}>
            {/* ... Códigos dos TouchableOpacitys para os ícones ... */}
        </View>

        {/* Seção do Progresso (Estático/Simulado) */}
        <View>
          <Text style={{ fontSize: 16, color: textColor, fontWeight: '500', marginBottom: 10 }}>
            3 of 7 days within goal
          </Text>
          <View style={{ 
            width: '100%', 
            height: 12, 
            backgroundColor: lightGray, 
            borderRadius: 6 
          }}>
            <View style={{ 
              width: `${progress * 100}%`, 
              height: 12, 
              backgroundColor: mainColor, 
              borderRadius: 6 
            }} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}