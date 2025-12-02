import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Global from '../style/Global';

export default function CustomButton({ title, navigate, style}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigate)} style={[thisStyles.button, style]}>
            <Text style={thisStyles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const thisStyles = StyleSheet.create({
    button: {
        backgroundColor: Global.colors.mainColor,
        paddingVertical: 18,
        paddingHorizontal: 80,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    buttonText: {
        color: '#fff', fontSize: 18, fontWeight: 'bold'
    }
});