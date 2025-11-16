import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores
const backgroundColor = '#FDFBF6';
const cardBg = '#fff';
const textColor = '#333';
const greenColor = '#82D4A3';
const yellowColor = '#F7D06F';

// Componente reutilizável para um item de desafio
const ChallengeItem = ({ iconName, iconColor, title, subTitle, points }) => (
  <View style={{
    backgroundColor: cardBg,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name={iconName} size={24} color={iconColor} style={{ marginRight: 15 }} />
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>{title}</Text>
        <Text style={{ fontSize: 12, color: '#A9A9A9' }}>{subTitle}</Text>
      </View>
    </View>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>{points}</Text>
  </View>
);

export default function ChallengesScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, zIndex: 10 }}>
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: textColor, 
            textAlign: 'center',
            flex: 1,
            marginLeft: -30 // Ajuste para centralizar
          }}>
            Challenges
          </Text>
        </View>

        {/* Seção Ativos */}
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: textColor, 
          marginBottom: 10,
          textTransform: 'uppercase',
          color: '#A9A9A9'
        }}>
          Active
        </Text>
        <ChallengeItem
          iconName="checkmark-circle"
          iconColor={greenColor}
          title="Tleakand Completed"
          subTitle="Cometating"
          points="+50 points"
        />

        {/* Seção Completos */}
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          color: textColor, 
          marginBottom: 10,
          marginTop: 20,
          textTransform: 'uppercase',
          color: '#A9A9A9'
        }}>
          Completed
        </Text>
        <ChallengeItem
          iconName="hourglass-outline"
          iconColor={yellowColor}
          title="Challenges"
          subTitle="Pomand Progress"
          points="+50 points"
        />
        <ChallengeItem
          iconName="hourglass-outline"
          iconColor={yellowColor}
          title="Quartard Incitving"
          subTitle="Comaiting"
          points="+50 points"
        />
        
      </ScrollView>

      {/* Botão flutuante (como na imagem) */}
      <TouchableOpacity style={{
        position: 'absolute',
        bottom: 110, // Acima da tab bar
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: yellowColor, // Cor do ícone no centro
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}>
        <Ionicons name="happy-outline" size={30} color={textColor} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}