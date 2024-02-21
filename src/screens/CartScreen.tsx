/* eslint-disable prettier/prettier */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useStore } from '../store/store';
import EmptyDataAnimation from '../components/EmptyDataAnimation';
import { COLORS } from '../theme/theme';

const CartScreen = () => {
  const CartList = useStore((state: any) => state.CartList);
  return (
    <View style={styles.containerStyle}>
      {
        CartList.length === 0 ? <EmptyDataAnimation title={'Cart is Empty'} /> :
        <View style={styles.cartItemContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
         >
          {
            CartList.map((item : any) => (
              item.prices.map((currItemPrice: any, index: number) => (
                currItemPrice.quantity > 0 && <View key={index}>
                  <Text>{currItemPrice.price}</Text>
                </View>
              ))
            ))
          }
         </ScrollView>
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
  },
  cartItemContainer:{

  }
});
