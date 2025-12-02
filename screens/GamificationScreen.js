import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import Global from '../style/Global';

export default function GamificationScreen({ navigation }) {
  const { points, currentLevel } = useFinance();
  const requiredForNextLevel = currentLevel * currentLevel * 100;
  const requiredForCurrentLevel = (currentLevel - 1) * (currentLevel - 1) * 100;
  const currentProgress = points - requiredForCurrentLevel;
  const progressGoal = requiredForNextLevel - requiredForCurrentLevel;
  const progressRatio = currentProgress / progressGoal;

  return (
    <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: Global.colors.textColor, marginBottom: 40 }}>
          Jogatina
        </Text>

        <View style={{
          backgroundColor: Global.colors.mainColor,
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}>

          <Text style={{ fontSize: 16, color: '#fff', opacity: 0.8, marginBottom: 5 }}>
            Seu Nível
          </Text>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: Global.colors.goldColor, marginBottom: 20 }}>
            {currentLevel}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>
            {points} XP
          </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 14, color: Global.colors.textColor, marginBottom: 5 }}>
            XP para o próximo nível: {currentProgress} / {progressGoal}
          </Text>
          <View style={{ height: 10, backgroundColor: '#EFEFEF', borderRadius: 5 }}>
            <View style={{
              width: `${progressRatio * 100}%`,
              height: 10,
              backgroundColor: Global.colors.mainColor,
              borderRadius: 5
            }} />
          </View>
        </View>

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
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: Global.colors.textColor }}>
            Visualizar Desafios
          </Text>
          <Ionicons name="arrow-forward-circle-outline" size={24} color={Global.colors.mainColor} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}