import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Global from '../style/Global';

export default function ArrowBack({style}){
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={style}>
            <Ionicons name="arrow-back" size={24} color={Global.colors.textColor} />
        </TouchableOpacity>
    )
}