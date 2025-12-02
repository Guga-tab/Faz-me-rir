import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Global from '../style/Global';


export default function ChallengeItem ({ challenge }) {
    const iconName = challenge.completed ? "checkmark-circle" : "ellipse-outline";
    const iconColor = challenge.completed ? Global.colors.completedColor : Global.colors.mainColor;
    const titleColor = challenge.completed ? Global.colors.completedColor : Global.colors.textColor;

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
