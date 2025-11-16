import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cores
const backgroundColor = '#FDFBF6';

export default function GamificationScreen({ navigation }) {
  const totalPoints = 2500;
  const progress = 0.6; // 60%

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
          Gamification and Achievements
        </Text>

        {/* Total de Pontos */}
        <Text style={{ fontSize: 16, color: '#A9A9A9', textAlign: 'center' }}>Total Points</Text>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 }}>
          {totalPoints}
        </Text>

        {/* Barra de Progresso */}
        <View style={{ width: '100%', height: 10, backgroundColor: '#EFEFEF', borderRadius: 5, marginBottom: 5 }}>
          <View style={{ width: `${progress * 100}%`, height: 10, backgroundColor: '#82D4A3', borderRadius: 5 }} />
        </View>
        <Text style={{ fontSize: 14, color: '#A9A9A9', marginBottom: 30 }}>Current Level</Text>

        {/* Conquistas */}
        <TouchableOpacity style={{ 
            backgroundColor: '#fff', 
            padding: 20, 
            borderRadius: 15, 
            marginBottom: 20,
            borderColor: '#EFEFEF',
            borderWidth: 1,
        }}>
            <Text style={{ fontSize: 16, color: '#333' }}>Unlocked achievements</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
            <View style={{ width: 60, height: 60, backgroundColor: '#F09A5D', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                 <Ionicons name="lock-closed" size={24} color="#fff" />
            </View>
            <View style={{ width: 60, height: 60, backgroundColor: '#F7D06F', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                 <Ionicons name="lock-closed" size={24} color="#fff" />
            </View>
             <View style={{ width: 60, height: 60, backgroundColor: '#E87A7A', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                 <Ionicons name="lock-closed" size={24} color="#fff" />
            </View>
            <View style={{ width: 60, height: 60, backgroundColor: '#82D4A3', borderRadius: 15 }} />
        </View>

        {/* Próximos Objetivos */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
          Upcoming goals
        </Text>
        <View style={{ 
            backgroundColor: '#fff', 
            padding: 20, 
            borderRadius: 15, 
            borderColor: '#EFEFEF',
            borderWidth: 1,
        }}>
          <Text style={{ fontSize: 16, color: '#333' }}>Save 3 days in a row level up!</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}