/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GradientBgIcon from './GradientBgIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';

interface ImageBgHeaderProps {
    EnableBackHandler:boolean;
    imagelink_portrait:ImageProps;
    type: string;
    id: string;
    favourite: string;
    name: string;
    special_ingredient:string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBgHeader: React.FC<ImageBgHeaderProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {

  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        resizeMode="cover"
        style={styles.imageBg}
      >
        <View style={styles.topButtonContainer}>
          {
            EnableBackHandler &&
            <TouchableOpacity onPress={() => BackHandler()}>
              <GradientBgIcon name="left" size={FONTSIZE.size_18} color={COLORS.primaryLightGreyHex} />
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => ToggleFavourite(type, id)}>
            <GradientBgIcon name="like" size={FONTSIZE.size_18} color={favourite ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContentContainer}>
              <View style={styles.bottomTopRowContainer}>
                  <View style={styles.titleContainer}>
                      <Text style={styles.nameStyle}>{name}</Text>
                      <Text style={styles.splIngredientText}>{special_ingredient}</Text>
                  </View>
                  <View style={styles.ingredientContainer}>
                    <View style={styles.ingrdientStyle}>
                      <GradientBgIcon name={type === 'Coffee' ? 'beans' : 'bean'} size={type === 'Coffee' ? FONTSIZE.size_28 : FONTSIZE.size_20} color={COLORS.primaryOrangeHex} title={type} />
                      <Text style={styles.ingredientText}>{type}</Text>
                    </View>
                    <View style={styles.ingrdientStyle}>
                      <GradientBgIcon name={type === 'Coffee' ? 'drop' : 'location'} size={FONTSIZE.size_20} color={COLORS.primaryOrangeHex} title={ingredients} />
                      <Text style={styles.ingredientText}>{ingredients}</Text>
                    </View>
                  </View>
              </View>
              <View style={styles.bottomBottomRowContainer}>
                    <View style={styles.ratingDetailContainer}>
                          <CustomIcon name="star" size={FONTSIZE.size_20} color={COLORS.primaryOrangeHex} />
                          <Text style={styles.ratingText}>{average_rating}</Text>
                          <Text style={styles.ratingCountText}>({ratings_count})</Text>
                    </View>
                    <LinearGradient
                      start={{x:0, y:0}}
                      end={{x:1, y:1}}
                      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                      style={styles.roastedDetailContainer}
                    >
                      <Text style={styles.roastedText}>{roasted}</Text>
                  </LinearGradient>
              </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBgHeader;

const styles = StyleSheet.create({
  imageBg:{
    aspectRatio: 4 / 5,
  },
  topButtonContainer:{
    flexDirection:'row',
    padding:SPACING.space_20,
    justifyContent:'space-between',
    alignItems:'center',
  },
  bottomContentContainer:{
    position:'absolute',
    bottom:0,
    backgroundColor:COLORS.secondaryBlackRGBA,
    left:0,
    right:0,
    borderTopLeftRadius:BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    padding:SPACING.space_20,
  },
  bottomTopRowContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  nameStyle:{
    color:COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_bold,
    fontSize:FONTSIZE.size_20,
  },
  splIngredientText:{
    color:COLORS.secondaryLightGreyHex,
    fontSize:FONTSIZE.size_12,
    marginTop:-6,
  },
  titleContainer:{

  },
  ingredientContainer:{
    flexDirection:'row',
    alignItems:'center',

  },
  ingredientText:{
    color:COLORS.secondaryLightGreyHex,
    fontSize:FONTSIZE.size_10,
    textAlign:'center',
  },
  ingrdientStyle:{
    padding:SPACING.space_10,
  },
  bottomBottomRowContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  ratingDetailContainer:{
    flexDirection:'row',
    gap:SPACING.space_4,
    alignItems:'center',
  },
  roastedDetailContainer:{
    paddingVertical:SPACING.space_10,
    paddingHorizontal:SPACING.space_18,
    borderRadius:BORDERRADIUS.radius_10,
  },
  ratingText:{
    color:COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_18,
  },
  ratingCountText:{
    color:COLORS.secondaryLightGreyHex,
    fontSize:FONTSIZE.size_12,
  },
  roastedText:{
    color:COLORS.secondaryLightGreyHex,
    fontSize:FONTSIZE.size_12,
  }
});
