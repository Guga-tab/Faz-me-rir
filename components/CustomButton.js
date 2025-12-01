import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../style/Colors';

export default function CustomButton({title, navigate}){
    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => navigation.navigate(navigate)} style={styles.button}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.mainColor,
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