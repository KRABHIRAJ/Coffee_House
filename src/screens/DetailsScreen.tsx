/* eslint-disable prettier/prettier */
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import ImageBgHeader from '../components/ImageBgHeader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useStore } from '../store/store';
import PaymentFooter from '../components/PaymentFooter';


const DetailsScreen = ({navigation, route} : any) => {
  const BackHandler = () => {
    navigation.pop();
  };
  const toggleFavouriteList = useStore((state: any) => state.toggleFavouriteList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculatePrice = useStore((state: any) => state.calculatePrice);
  const ItemOfIndex = useStore((state: any) =>
  route?.params?.type === 'Bean' ? state.BeanList : state.CoffeeList,)[route?.params?.index];
  console.log('route >>', ItemOfIndex);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [selectedSize, setSelectedSize] = useState(ItemOfIndex.prices[0]);
  return (
    <View style={styles.detailContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <ImageBgHeader
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id = {ItemOfIndex.id}
          favourite = {ItemOfIndex.favourite}
          name = {ItemOfIndex.name}
          special_ingredient = {ItemOfIndex.special_ingredient}
          ingredients = {ItemOfIndex.ingredients}
          average_rating = {ItemOfIndex.average_rating}
          ratings_count = {ItemOfIndex.ratings_count}
          roasted = {ItemOfIndex.roasted}
          BackHandler = {BackHandler}
          ToggleFavourite = {toggleFavouriteList}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.headingText}>Description</Text>
          <View>
              {
                showFullDesc ?
                (
                <TouchableWithoutFeedback onPress={() => setShowFullDesc(false)}>
                  <Text style={styles.descriptionText}>{ItemOfIndex.description}</Text>
                </TouchableWithoutFeedback>
                )
                :
                (
                  <TouchableWithoutFeedback onPress={() => setShowFullDesc(true)}>
                    <Text numberOfLines={3} style={styles.descriptionText}>{ItemOfIndex.description}</Text>
                  </TouchableWithoutFeedback>
                )
              }
          </View>
        </View>
        <View style={styles.sizeDetailContainer}>
            <Text style={styles.headingText}>Size</Text>
            <View style={styles.sizesContainer}>
              {
                ItemOfIndex.prices.map((item: any, index: number) => (
                  <TouchableOpacity key={index} onPress={() => setSelectedSize(item)} style={[styles.sizeBox, selectedSize.size === item.size ? {borderColor: COLORS.primaryOrangeHex} : {borderColor: COLORS.secondaryLightGreyHex}]}>
                    <Text style={[styles.sizeText , selectedSize.size === item.size ? {color: COLORS.primaryOrangeHex} : {color: COLORS.secondaryLightGreyHex} ]}>{item.size}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
        </View>
        <PaymentFooter price = {selectedSize} buttonTitle={'Add to Cart'} buttonPressHandler={() => {
          addToCart(ItemOfIndex.id, selectedSize.size, ItemOfIndex.type);
          calculatePrice();
          navigation.navigate('Cart');
        }}
         />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  detailContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex,
  },
  scrollViewContainer:{
    flexGrow: 1,
  },
  descriptionContainer:{
    padding:SPACING.space_20,
  },
  headingText:{
    color:COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_bold,
    fontSize:FONTSIZE.size_16,
  },
  descriptionText:{
    color:COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_light,
  },
  sizeDetailContainer:{
    paddingHorizontal:SPACING.space_20,
  },
  sizesContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    gap:SPACING.space_15,
    marginTop: SPACING.space_10,
  },
  sizeBox:{
    flex:1,
    borderWidth:1,
    paddingVertical:SPACING.space_10,
    borderRadius:BORDERRADIUS.radius_10,
  },
  sizeText:{
    textAlign:'center',
  },
});
