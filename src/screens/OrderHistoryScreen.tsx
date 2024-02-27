/* eslint-disable prettier/prettier */
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useStore } from '../store/store';
import EmptyDataAnimation from '../components/EmptyDataAnimation';
import LinearGradient from 'react-native-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PopUpAnimation from '../components/PopUpAnimation';

const OrderHistoryScreen = () => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);
  const calculateCurrentItemTotal = (prices: any) => {
    return prices.reduce((acc: number, price: any ) => acc + (parseFloat(price.price) * price.quantity),0);
  };
  const showDownloadAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1800);
  };
  return (
    <View style={styles.container}>
      {showAnimation && <PopUpAnimation source={require('../lottie/download.json')} style={styles.popUpAnimation}/>}
      {
        OrderHistoryList.length === 0 ? <EmptyDataAnimation title={'No Orders Placed'} /> :
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsHorizontalScrollIndicator={false}>
        {
          OrderHistoryList.map((item :  any, index: number) => (
            <View key={index}>
              <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.headingText}>Order Time</Text>
                    <Text style={styles.timestampText}>{item.timestamp}</Text>
                </View>
                <View>
                    <Text style={styles.headingText}>Total Amount</Text>
                    <Text style={styles.orderAmountText}>$ {item.orderAmount}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                  {
                    item.orderedItem.map((order: any, orderindex: number) => (
                    <LinearGradient
                      key={orderindex}
                      start={{x:0, y:0}}
                      end={{x:1, y:1}}
                      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                      style={styles.LinearGradientBG}
                    >
                      <View style={styles.itemDescriptionContainer}>
                        <View style={styles.itemDescriptionContainerLeft}>
                            <Image source={order.imagelink_square} style={styles.cartItemImage} />
                            <View style={styles.cartItemDesciption}>
                                <View style={styles.nameTextContainer}>
                                  <Text style={styles.itemNameText}>{order.name}</Text>
                                  <Text style={styles.specialGradientText}>{order.special_ingredient}</Text>
                                </View>
                            </View>
                          </View>
                          <Text style={styles.totalPriceText}><Text style={styles.dollarSign}>$ </Text>{calculateCurrentItemTotal(order.prices).toFixed(2)}</Text>
                      </View>
                      <View style={styles.orderedItemConatiner}>
                        {
                          order.prices.map((price: any, tempIndex: number) => (
                            price.quantity > 0 &&
                            <View key={(tempIndex + 5).toString()} style={styles.currItemContainer}>
                              <View style={styles.sizeAndPriceContainer}>
                                <View style={styles.sizeContainer}>
                                  <Text style={styles.sizeText}>{price.size}</Text>
                                </View>

                                <View style={styles.priceConatiner}>
                                  <Text style={styles.priceText}><Text style={styles.dollarSign}>$ </Text>{price.price}</Text>
                                </View>
                              </View>
                              <Text style={styles.qunatityText}><Text style={styles.xText}>X </Text>{price.quantity}</Text>
                              <Text style={styles.itemTotalText}>$ {(price.quantity * price.price).toFixed(2)}</Text>
                            </View>
                          ))
                        }
                      </View>
                    </LinearGradient>
                    ))
                  }
              </View>
            </View>
          ))
        }
        <TouchableOpacity onPress={() => showDownloadAnimation()} style={styles.downloadBtn}>
          <Text style={styles.downloadBtnText}>Download</Text>
        </TouchableOpacity>
        <View style={{marginBottom: tabBarHeight}}/>
        </ScrollView>
      }
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_20,
  },
  popUpAnimation:{
    flex:1,
  },
  scrollViewContainer:{
    gap: SPACING.space_30,
  },
  headerDetails:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headingText:{
    color:COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
  },
  timestampText:{
    color:COLORS.primaryWhiteHex,
  },
  orderAmountText:{
    color:COLORS.primaryOrangeHex,
    fontFamily:FONTFAMILY.poppins_bold,
    textAlign:'right',
  },
  itemContainer:{
    gap:SPACING.space_15,
    marginTop: SPACING.space_15,
  },
  LinearGradientBG:{
    padding:SPACING.space_15,
    borderRadius:BORDERRADIUS.radius_15,
  },
  itemDescriptionContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  itemDescriptionContainerLeft:{
    flexDirection:'row',
    alignItems:'center',
  },
  cartItemDesciption:{
    marginLeft:SPACING.space_20,
    justifyContent:'space-between',
  },
  itemNameText:{
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_18,
    fontFamily:FONTFAMILY.poppins_bold,
  },
  specialGradientText:{
    color:COLORS.secondaryLightGreyHex,
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.poppins_regular,
  },
  cartItemImage:{
    height:75,
    width:75,
    borderRadius:SPACING.space_15,
    resizeMode:'cover',
  },
  nameTextContainer:{
    paddingHorizontal: SPACING.space_10,
  },
  dollarSign:{
    color: COLORS.primaryWhiteHex,
  },
  totalPriceText:{
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
  },
  sizeText:{
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    textAlign:'center',
  },
  priceText:{
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_14,
    textAlign:'center',

  },
  orderedItemConatiner:{
    gap: SPACING.space_15,
    marginTop: SPACING.space_15,
  },
  sizeAndPriceContainer:{
    flexDirection: 'row',
    gap: SPACING.space_4,
  },
  sizeContainer:{
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_4,
    paddingHorizontal: SPACING.space_15,
    width: 80,
    borderTopLeftRadius:BORDERRADIUS.radius_8,
    borderBottomLeftRadius: BORDERRADIUS.radius_8,
  },
  priceConatiner:{
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_4,
    paddingHorizontal: SPACING.space_15,
    width: 80,
    borderTopRightRadius:BORDERRADIUS.radius_8,
    borderBottomRightRadius: BORDERRADIUS.radius_8,
  },
  currItemContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  qunatityText:{
    color: COLORS.primaryWhiteHex,
  },
  xText:{
    color:COLORS.primaryOrangeHex,
  },
  itemTotalText:{
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  downloadBtn:{
    backgroundColor:COLORS.primaryOrangeHex,
    flex:1,
    paddingVertical:SPACING.space_15,
    borderRadius: SPACING.space_10,
  },
  downloadBtnText:{
    color: COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_bold,
    textAlign:'center',
  },
});
