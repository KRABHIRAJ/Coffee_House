/* eslint-disable prettier/prettier */
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useStore } from '../store/store';
import EmptyDataAnimation from '../components/EmptyDataAnimation';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBgHeader from '../components/ImageBgHeader';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const FavouritesScreen = () => {
  const FavouriteList = useStore((state: any) => state.FavouriteList);
  const toggleFavouriteList = useStore((state: any) => state.toggleFavouriteList);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.favouriteListContainer}>
      {
        FavouriteList.length === 0 ? <EmptyDataAnimation title={'No Favourites'}/> :
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewStyle}
          >
          <Header title={'Favourite'} />
            {
              FavouriteList.map((item: any, index: number) => (
                <View key={index} style={styles.favouriteItem}>
                  <TouchableOpacity style={styles.favouriteItemTouchableOpacity}>
                    <ImageBgHeader
                        EnableBackHandler={false}
                        imagelink_portrait = {item.imagelink_portrait}
                        type = {item.type}
                        id = {item.id}
                        favourite = {item.favourite}
                        name = {item.name}
                        special_ingredient = {item.special_ingredient}
                        ingredients = {item.ingredients}
                        average_rating = {item.average_rating}
                        ratings_count = {item.ratings_count}
                        roasted = {item.roasted}
                        BackHandler = {item.BackHandler}
                        ToggleFavourite = {toggleFavouriteList}
                    />
                  </TouchableOpacity>
                  <LinearGradient
                     start={{x:0, y:0}}
                     end={{x:1, y:1}}
                     colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                     style={styles.LinearGradientBG}
                  >
                    <Text style={styles.headingText}>Description</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                  </LinearGradient>
                </View>
              ))
            }
            <View style={{marginBottom: tabBarHeight}}/>
          </ScrollView>
      }
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  favouriteListContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex,
  },
  scrollViewStyle:{
    flexGrow:1,
    gap:SPACING.space_15,
    marginHorizontal:SPACING.space_15,
  },
  LinearGradientBG:{
    padding:SPACING.space_15,
    borderBottomLeftRadius: BORDERRADIUS.radius_15,
    borderBottomRightRadius: BORDERRADIUS.radius_15,
  },
  headingText:{
    color:COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
  },
  descriptionText:{
    color:COLORS.secondaryLightGreyHex,
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_12,
  },
  favouriteItem:{
  },
  favouriteItemTouchableOpacity:{
    borderTopLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
    overflow:'hidden',
  },
});
