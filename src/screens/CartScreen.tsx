/* eslint-disable prettier/prettier */
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useStore } from '../store/store';
import EmptyDataAnimation from '../components/EmptyDataAnimation';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import PaymentFooter from '../components/PaymentFooter';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import BGIcon from '../components/BGIcon';

const CartScreen = ({navigation}: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const cartPrice = useStore((state: any) => state.cartPrice);
  const calculatePrice = useStore((state: any) => state.calculatePrice);
  const incrementCartItem = useStore((state: any) => state.incrementCartItem);
  const decrementCartItem = useStore((state: any) => state.decrementCartItem);
  
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.containerStyle}>
      {
        CartList.length === 0 ? <EmptyDataAnimation title={'Cart is Empty'} /> :
        <View style={styles.cartItemContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewStyle}
         >
          <Header title={'Cart'} />
          {
            CartList.map((item : any, parIndex: number) => (
              <View style={styles.cartItem} key={parIndex}>
                <LinearGradient
                  start={{x:0, y:0}}
                  end={{x:1, y:1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.LinearGradientBG}
                >
                  <View style={styles.cartItemDetails}>
                    <TouchableOpacity onPress={() => navigation.navigate('Details', {
                      id: item.id,
                      type: item.type,
                      index: item.index,
                  })} 
              style={styles.touchableOpacityContainer}>
                      <Image source={item.imagelink_square} style={styles.cartItemImage} />
                      <View style={styles.cartItemDesciption}>
                          <View style={styles.nameTextContainer}>
                            <Text style={styles.itemNameText}>{item.name}</Text>
                            <Text style={styles.specialGradientText}>{item.special_ingredient}</Text>
                          </View>
                          <View style={styles.roastedContainer}>
                            <Text style={styles.roastedText}>{item.roasted}</Text>
                          </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cartItemSizeDetailContainer}>
                    {
                    item.prices.map((currItemPrice: any, index: number) => (
                      <View style={styles.cartItemSizeDetail} key={index}>
                        <View style={styles.sizeContainer}>
                              <Text style={styles.roastedText}>{currItemPrice.size}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                          <Text style={styles.dollarText}>$ <Text style={styles.itemPriceText}>{currItemPrice.price}</Text></Text>
                          <View style={styles.quantityContainerChild}>
                            <TouchableOpacity onPress={() => {
                              decrementCartItem(item.id, currItemPrice.size);
                              calculatePrice();
                              }}
                              disabled={currItemPrice.quantity <= 0}
                            >
                              <BGIcon name="minus" size={10} color={COLORS.primaryWhiteHex} bgColor={currItemPrice.quantity > 0 ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex} />
                            </TouchableOpacity>
                            <View style={styles.qunatityTextContainer}>
                              <Text style={styles.quantityText}>{currItemPrice.quantity}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                              incrementCartItem(item.id, currItemPrice.size);
                              calculatePrice();
                              }}
                            >
                              <BGIcon name="add" size={10} color={COLORS.primaryWhiteHex} bgColor={COLORS.primaryOrangeHex} />
                            </TouchableOpacity>
                          </View>

                        </View>
                      </View>
                    ))
                    }
                  </View>
                </LinearGradient>
              </View>
            ))
          }
         <View style={{marginBottom:tabBarHeight + 90}} />
         </ScrollView>
         <View style={[styles.paymentFooter, {bottom: tabBarHeight}]}>
            <PaymentFooter price={cartPrice} buttonTitle={'Pay'} buttonPressHandler={() => {}} />
         </View>
        </View>
      }
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    backgroundColor:COLORS.primaryBlackHex,
    position:'relative',

  },
  cartItemContainer:{
    flex:1,
  },
  LinearGradientBG:{
    borderRadius:BORDERRADIUS.radius_15,
    padding:SPACING.space_10,
  },
  scrollViewStyle:{
    marginHorizontal:SPACING.space_15,
    gap:SPACING.space_15,
  },
  cartItem:{
    borderRadius:BORDERRADIUS.radius_15,
  },
  cartItemImage:{
    height:100,
    width:100,
    borderRadius:SPACING.space_15,
    resizeMode:'cover',
  },
  cartItemDetails:{
    flexDirection:'row',
  },
  touchableOpacityContainer:{
    flexDirection:'row',
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
  roastedContainer:{
    backgroundColor:COLORS.primaryBlackHex,
    padding:10,
    borderRadius:BORDERRADIUS.radius_10,
  },
  roastedText:{
    fontSize:FONTSIZE.size_12,
    color:COLORS.primaryWhiteHex,
    textAlign:'center',
  },
  nameTextContainer:{
    paddingHorizontal: SPACING.space_10,
  },
  paymentFooter:{
    position:'absolute',
    left:0,
    right:0,
    backgroundColor:COLORS.primaryBlackHex,
  },
  sizeContainer:{
    backgroundColor:COLORS.primaryBlackHex,
    padding:10,
    borderRadius:BORDERRADIUS.radius_10,
    marginVertical:SPACING.space_4,
    width:100,
  },
  cartItemSizeDetailContainer:{
    marginVertical:SPACING.space_10,
  },
  cartItemSizeDetail:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  dollarText:{
    color:COLORS.primaryOrangeHex,
    marginLeft:SPACING.space_10,
    fontFamily:FONTFAMILY.poppins_semibold,
  },
  itemPriceText:{
    color:COLORS.primaryWhiteHex,
  },
  quantityContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  quantityContainerChild:{
    marginLeft:SPACING.space_20,
    flexDirection:'row',
    alignItems:'center',
    gap:20,
  },
  quantityText:{
    color:COLORS.primaryWhiteHex,
  },
  qunatityTextContainer:{
    borderWidth:1,
    borderColor:COLORS.primaryOrangeHex,
    paddingHorizontal:SPACING.space_24,
    paddingVertical:SPACING.space_4,
    borderRadius:BORDERRADIUS.radius_8,
  },

});
