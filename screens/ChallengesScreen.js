import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Importe a lógica de gamificação
import { useFinance } from '../context/FinanceContext'; 

// Cores
const backgroundColor = '#FDFBF6';
const mainColor = '#F09A5D';
const textColor = '#333';
const completedColor = '#82D4A3'; // Cor verde para completo

// Componente para um único desafio
const ChallengeItem = ({ challenge }) => {
    const iconName = challenge.completed ? "checkmark-circle" : "ellipse-outline";
    const iconColor = challenge.completed ? completedColor : mainColor;
    const titleColor = challenge.completed ? completedColor : textColor;
    
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            borderRadius: 15,
            padding: 20,
            marginBottom: 10,
            borderLeftWidth: 5,
            borderLeftColor: iconColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        }}>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: titleColor }}>
                    {challenge.title}
                </Text>
                <Text style={{ fontSize: 14, color: '#A9A9A9', marginTop: 4 }}>
                    {challenge.description}
                </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Ionicons name={iconName} size={28} color={iconColor} />
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: iconColor, marginTop: 5 }}>
                    +{challenge.points} XP
                </Text>
            </View>
        </View>
    );
};

export default function ChallengesScreen({ navigation }) {
    // 2. Obtém a lista de desafios
    const { challenges } = useFinance();
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: StatusBar.currentHeight || 0 }}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                
                {/* Header */}
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
                    Desafios
                </Text>

                {/* Lista de Desafios Mapeada */}
                <View>
                    {challenges.map((challenge) => (
                        <ChallengeItem key={challenge.id} challenge={challenge} />
                    ))}
                    
                    {challenges.length === 0 && (
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ color: '#A9A9A9' }}>Sem desafios disponíveis</Text>
                        </View>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}