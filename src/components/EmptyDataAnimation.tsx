/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZE } from '../theme/theme';
import LottieView from 'lottie-react-native';

interface EmptyDataAnimationProps {
    title: string
}
const EmptyDataAnimation: React.FC<EmptyDataAnimationProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
        style={styles.lottieStyle}
      />
      <Text style={styles.lottieText}>{title}</Text>
    </View>
  );
};

export default EmptyDataAnimation;

const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor: COLORS.primaryBlackHex,
        justifyContent:'center',
    },
    lottieStyle:{
        height:300,
    },
    lottieText: {
        color:COLORS.primaryOrangeHex,
        textAlign:'center',
        fontSize:FONTSIZE.size_16,
    }
});
