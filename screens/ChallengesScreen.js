import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinance } from '../context/FinanceContext';
import Global from '../style/Global';
import ArrowBack from '../components/ArrowBack';
import ChallengeItem  from '../components/ChallengeItem';

export default function ChallengesScreen() {
    const { challenges } = useFinance();

    return (
        <SafeAreaView style={[Global.safeAreaView, Global.colors.backgroundColor]}>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <ArrowBack
                    style = {{padding: 5, marginBottom: 10, alignSelf: 'flex-start' }}
                />

                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: Global.colors.textColor,
                    marginBottom: 30,
                }}>
                    Desafios
                </Text>

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