import {StyleSheet, StatusBar} from 'react-native';

export default StyleSheet.create({ 
    colors: {
        backgroundColor: '#FDFBF6',
        mainColor:'#F09A5D',
        textColor:'#333',
        inputBg: '#fff',
        completedColor: '#82D4A3',
        redColor: '#E74C3C',
        goldColor: '#FFD700',
        greenColor: '#82D4A3',
        lightGray: '#EFEFEF',
        switchColor: '#82D4A3',
        dividerColor: '#F0F0F0',
        cardBg: '#fff'
    },
    safeAreaView: {
         flex: 1, 
         paddingTop: StatusBar.currentHeight || 0
    }
    
})