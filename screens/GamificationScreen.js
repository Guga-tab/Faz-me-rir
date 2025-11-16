import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Importe a lógica de gamificação
import { useFinance } from '../context/FinanceContext'; 

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';
const goldColor = '#FFD700'; // Cor para destaque (Level)

export default function GamificationScreen({ navigation }) {
  // 1. Obtém dados de gamificação
  const { points, currentLevel } = useFinance();
  
  // Fórmula simples para o progresso do XP
  // Por exemplo, de 100 para 400 (próximo nível)
  const requiredForNextLevel = currentLevel * currentLevel * 100; // Ponto necessário para o nível atual
  const requiredForCurrentLevel = (currentLevel - 1) * (currentLevel - 1) * 100;
  const currentProgress = points - requiredForCurrentLevel;
  const progressGoal = requiredForNextLevel - requiredForCurrentLevel;
  const progressRatio = currentProgress / progressGoal;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        
        {/* Header */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor, marginBottom: 40 }}>
          Gamification
        </Text>

        {/* Card Principal: Nível e Pontos */}
        <View style={{
          backgroundColor: mainColor,
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}>
          {/* Nível (Achievements.jpeg) */}
          <Text style={{ fontSize: 16, color: '#fff', opacity: 0.8, marginBottom: 5 }}>
            Your Level
          </Text>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: goldColor, marginBottom: 20 }}>
            {currentLevel}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>
            {points} XP
          </Text>
        </View>

        {/* Progresso para o Próximo Nível */}
        <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 14, color: textColor, marginBottom: 5 }}>
                XP for next level: {currentProgress} / {progressGoal}
            </Text>
            <View style={{ height: 10, backgroundColor: '#EFEFEF', borderRadius: 5 }}>
                <View style={{ 
                    width: `${progressRatio * 100}%`, 
                    height: 10, 
                    backgroundColor: mainColor, 
                    borderRadius: 5 
                }} />
            </View>
        </View>


        {/* Botão de Desafios (Challanges) */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Challenges')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#EFEFEF',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>
            View Challenges
          </Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color={mainColor} />
        </TouchableOpacity>
        
        {/* Adicione outras seções da Achievements.jpeg aqui, como Badges/Trophy List */}

      </ScrollView>
    </SafeAreaView>
  );
}