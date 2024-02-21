/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';



interface PaymentFooterProps {
    price: number,
    buttonTitle: string,
    buttonPressHandler: any
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({price, buttonTitle, buttonPressHandler}) => {
  return (
    <View style={styles.paymentFooterContainer}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Price</Text>
        <Text style={styles.totalPrice}><Text style={styles.dollarText}>$ </Text>{price}</Text>
      </View>
      <TouchableOpacity onPress={() => buttonPressHandler()} style={styles.button}>
        <Text style={styles.addToCartText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
    paymentFooterContainer:{
        paddingHorizontal:SPACING.space_28,
        paddingVertical:SPACING.space_20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    priceContainer:{
      marginRight:SPACING.space_10,
      width:140,
    },
    priceText:{
        color:COLORS.secondaryLightGreyHex,

    },
    totalPrice:{
        color:COLORS.primaryWhiteHex,
        fontFamily:FONTFAMILY.poppins_bold,
        fontSize:FONTSIZE.size_20,
    },
    dollarText:{
        color:COLORS.primaryOrangeHex,
        fontFamily:FONTFAMILY.poppins_bold,
        fontSize:FONTSIZE.size_20,

    },
    button:{
        backgroundColor:COLORS.primaryOrangeHex,
        flex:1,
        paddingVertical:SPACING.space_12,
        borderRadius:BORDERRADIUS.radius_15,
    },
    addToCartText:{
        color:COLORS.primaryWhiteHex,
        fontFamily:FONTFAMILY.poppins_bold,
        fontSize:FONTSIZE.size_16,
        textAlign:'center',
    },
});
