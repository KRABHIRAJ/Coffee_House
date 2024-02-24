/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBgIcon from '../components/GradientBgIcon';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import PaymentFooter from '../components/PaymentFooter';
import { useStore } from '../store/store';


const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];


const PaymentScreen = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState('Wallet');
  const cartPrice = useStore((state: any) => state.cartPrice);
  const placeOrder = useStore((state: any) => state.placeOrder);

  return (
    <View style={styles.paymentContainer}>
      <View style={styles.paymentHeader}>
        <GradientBgIcon name="menu" size={FONTSIZE.size_18} color={COLORS.primaryLightGreyHex} />
        <Text style={styles.paymentText}>Payments</Text>
        <View style={styles.emptyView} />
      </View>
      <View style={styles.paymentBody}>
        <View style={styles.paymentTypeContainer}>
          <TouchableOpacity onPress={() => setSelectedMethod('Credit Card')} style={[styles.creditContainer, selectedMethod === 'Credit Card' ? { borderColor:COLORS.primaryOrangeHex, borderWidth: 2} : { borderColor:COLORS.secondaryLightGreyHex}]}>
              <Text style={styles.creditCardText}>Credit Card</Text>
              <LinearGradient
                  start={{x:0, y:0}}
                  end={{x:1, y:1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.LinearGradientCreditCard}
                >
                  <View style={styles.creditCardChipContainer}>
                    <CustomIcon name='chip' size={30} color={COLORS.primaryOrangeHex} />
                    <CustomIcon name='visa' size={60} color={COLORS.primaryWhiteHex} />
                  </View>
                  <View style={styles.creditCardNumber}>
                      <Text style={styles.creditCardNumberText}>6969</Text>
                      <Text style={styles.creditCardNumberText}>6969</Text>
                      <Text style={styles.creditCardNumberText}>6969</Text>
                      <Text style={styles.creditCardNumberText}>6969</Text>
                  </View>
                  <View style={styles.creditCardFooter}>
                    <View style={styles.cardHolderDetail}>
                        <Text style={styles.subTitleText}>Card Holder Name</Text>
                        <Text style={styles.titleText}>Jhonny Sins</Text>
                    </View>
                    <View style={styles.cardExpiryDetail}>
                        <Text style={styles.subTitleText}>Expiry Date</Text>
                        <Text style={styles.titleText}>06/69</Text>
                    </View>
                  </View>
                </LinearGradient>
          </TouchableOpacity>
          {
            PaymentList.map((item: any) => (
              item.isIcon ?
              <TouchableOpacity onPress={() => setSelectedMethod(item.name)} key={item.name} style={styles.paymentType}>
              <LinearGradient
              start={{x:0, y:0}}
              end={{x:1, y:1}}
              colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
              style={[styles.LinearGradientBG, item.name === selectedMethod ? { borderColor:COLORS.primaryOrangeHex, borderWidth: 2} : { borderColor:COLORS.secondaryLightGreyHex}]}
            >
                <View style={styles.withIconParentContainer}>
                  <View style={styles.withIconChildContainer}>
                    <CustomIcon name="wallet" size={28} color={COLORS.primaryOrangeHex}/>
                    <Text style={styles.typeText}>{item.name}</Text>
                  </View>
                  <Text style={[styles.typeText, {color:COLORS.secondaryLightGreyHex}]}>$ 69</Text>
                </View>
          </LinearGradient>
          </TouchableOpacity> :
                <TouchableOpacity onPress={() => setSelectedMethod(item.name)} key={item.name} style={styles.paymentType}>
                <LinearGradient
                  start={{x:0, y:0}}
                  end={{x:1, y:1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={[styles.LinearGradientBG, item.name === selectedMethod ? { borderColor:COLORS.primaryOrangeHex, borderWidth: 2} : { borderColor:COLORS.secondaryLightGreyHex}]}
                >
                  <Image source={item.icon} style={styles.iconImg} />
                  <Text style={styles.typeText}>{item.name}</Text>
              </LinearGradient>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.footerPayment}>
          <PaymentFooter price={cartPrice} buttonTitle={`Pay with ${selectedMethod}`} buttonPressHandler={() => {
            placeOrder();
            navigation.navigate('History');
          }}/>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  paymentContainer:{
    backgroundColor:COLORS.primaryBlackHex,
    flex:1,
    padding:SPACING.space_20,
  },
  paymentBody:{
    justifyContent:'space-between',
    flex:1,
  },
  paymentHeader:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  paymentText:{
    color: COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_bold,
    fontSize:FONTSIZE.size_18,
  },
  emptyView:{
    height:SPACING.space_18,
    width:SPACING.space_36,
  },
  paymentTypeContainer:{
    marginTop:SPACING.space_20,
  },
  paymentType:{
  },
  iconImg:{
    height: 30,
    width:30,
    resizeMode:'cover',
  },
  typeText:{
    color:COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  LinearGradientBG:{
    flexDirection:'row',
    alignItems:'center',
    gap:SPACING.space_30,
    paddingVertical:SPACING.space_10,
    paddingHorizontal:SPACING.space_15,
    margin:SPACING.space_10,
    borderWidth:1,
    borderRadius:BORDERRADIUS.radius_25,
  },
  withIconParentContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
  },
  withIconChildContainer:{
    flexDirection:'row',
    gap:SPACING.space_30,
    alignItems:'center',

  },
  footerPayment:{
  },
  creditContainer:{
    borderWidth:1,
    borderColor: COLORS.secondaryLightGreyHex,
    padding:SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15,
    marginBottom: SPACING.space_15,
    marginHorizontal:SPACING.space_10,
  },
  LinearGradientCreditCard:{
    padding:SPACING.space_15,
    borderRadius:BORDERRADIUS.radius_15,
  },
  creditCardChipContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
  creditCardText:{
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_10,
  },
  creditCardNumber:{
    flexDirection:'row',
    gap:10,
    alignItems:'center',
  },
  creditCardNumberText:{
    color:COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    letterSpacing:2,
    fontSize:FONTSIZE.size_16,
  },
  creditCardFooter:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop: SPACING.space_15,
  },
  cardHolderDetail:{

  },
  cardExpiryDetail:{

  },
  subTitleText:{
    color:COLORS.secondaryLightGreyHex,
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.poppins_regular,
  },
  titleText:{
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_16,
    fontFamily:FONTFAMILY.poppins_semibold,
  }
});
