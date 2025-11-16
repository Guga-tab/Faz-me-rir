import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // Importe o slider que acabamos de instalar

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D'; // Laranja
const greenColor = '#82D4A3'; // Verde
const textColor = '#333';
const lightGray = '#EFEFEF';
const midGray = '#A9A9A9';
const darkGray = '#B0B0B0';

export default function GoalsScreen({ navigation }) {
  // Estado para guardar o valor do slider
  const [dailyLimit, setDailyLimit] = useState(50);
  // Progresso para a barra (3 de 7)
  const progress = 3 / 7;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>
        
        {/* Header com botão de voltar */}
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
          <Text style={{ fontSize: 14, color: midGray, marginBottom: 20 }}>Daily spending limit</Text>
          
          {/* Container do Slider */}
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 15, 
            paddingVertical: 10, 
            paddingHorizontal: 15, 
            borderWidth: 1, 
            borderColor: lightGray,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={500} // Você pode ajustar o valor máximo
              value={dailyLimit}
              onValueChange={(value) => setDailyLimit(value)}
              minimumTrackTintColor={greenColor} // Cor da parte preenchida (verde)
              maximumTrackTintColor={lightGray} // Cor da parte não preenchida
              thumbTintColor={'#fff'} // Cor da bolinha (branca)
              // O iOS adiciona sombra na bolinha por padrão.
            />
          </View>
        </View>

        {/* Ícones de Categoria */}
        <View style={{ flexDirection: 'row', marginBottom: 40 }}>
          <TouchableOpacity style={{
            width: 45, height: 45, borderRadius: 10, 
            backgroundColor: mainColor, marginRight: 15,
            justifyContent: 'center', alignItems: 'center',
            opacity: 0.8 // Cor laranja da imagem
          }}>
            {/* Você pode trocar o ícone */}
            <Ionicons name="flame-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 45, height: 45, borderRadius: 10, 
            backgroundColor: greenColor, marginRight: 15,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Ionicons name="checkmark" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 45, height: 45, borderRadius: 10, 
            backgroundColor: lightGray, // Cor cinza da imagem
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Ionicons name="ellipsis-horizontal" size={24} color={darkGray} />
          </TouchableOpacity>
        </View>

        {/* Seção do Progresso */}
        <View>
          <Text style={{ fontSize: 16, color: textColor, fontWeight: '500', marginBottom: 10 }}>
            3 of 7 days within goal
          </Text>
          {/* Barra de Progresso */}
          <View style={{ 
            width: '100%', 
            height: 12, 
            backgroundColor: lightGray, 
            borderRadius: 6 
          }}>
            {/* Progresso atual */}
            <View style={{ 
              width: `${progress * 100}%`, 
              height: 12, 
              backgroundColor: mainColor, // A barra de progresso é laranja na imagem
              borderRadius: 6 
            }} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}