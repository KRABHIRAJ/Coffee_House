/* eslint-disable prettier/prettier */
import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/store';

interface CoffeeCardProps {
    id: string,
    index: number,
    type: string,
    roasted: string,
    imagelink_square:ImageProps,
    name:string,
    special_ingredient:string,
    average_rating: number,
    price: any,
    buttonPressHandler: any,
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard: React.FC<CoffeeCardProps> = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}) => {
const navigation = useNavigation();
const addToCart = useStore((state: any) => state.addToCart);
const calculatePrice = useStore((state: any) => state.calculatePrice);

  return (
    <TouchableOpacity onPress={() => {
        navigation.navigate('Details', {
            id: id,
            type: type,
            index: index,
        });
    }} style={styles.cardContainer}>
        <LinearGradient
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.LinearGradientCard}
        >
            <ImageBackground
                source={imagelink_square}
                style={styles.cardImageBG}
                resizeMode="cover"
            >
                <View style={styles.cardRatingContainer}>
                    <CustomIcon name="star" size={FONTSIZE.size_14} color={COLORS.primaryOrangeHex}/>
                    <Text style={styles.ratingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.specialIngredientText}>{special_ingredient}</Text>

            <View style={styles.priceDetailContainer}>
                <Text style={styles.priceTextParent}>$ <Text style={styles.priceTextChild}>{price.price}</Text></Text>
                <TouchableOpacity onPress={() => {
                    addToCart(id, price.size, type);
                    calculatePrice();
                    ToastAndroid.show(`${name} added to cart`, ToastAndroid.SHORT);
                    }}>
                    <BGIcon name="add" size={FONTSIZE.size_12} color={COLORS.primaryWhiteHex} bgColor={COLORS.primaryOrangeHex}  />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </TouchableOpacity>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
    cardContainer: {
        padding:SPACING.space_12,
    },
    LinearGradientCard:{
        borderRadius:BORDERRADIUS.radius_15,
        padding:SPACING.space_15,
        paddingBottom:SPACING.space_4,
    },
    cardImageBG:{
        height:CARD_WIDTH,
        width:CARD_WIDTH,
        borderRadius:BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow:'hidden',
        position:'relative',
    },
    cardRatingContainer: {
        flexDirection:'row',
        gap:SPACING.space_10,
        paddingHorizontal:SPACING.space_12,
        backgroundColor:COLORS.primaryBlackHex,
        top:0,
        right:0,
        position:'absolute',
        borderBottomLeftRadius:BORDERRADIUS.radius_20,
        opacity:0.6,
        alignItems:'center',
        justifyContent:'center',
    },
    ratingText:{
        color:COLORS.primaryWhiteHex,
        fontFamily:FONTFAMILY.poppins_bold,
    },
    nameText:{
        color:COLORS.primaryWhiteHex,
        fontSize:FONTSIZE.size_16,
        letterSpacing:1,
    },
    specialIngredientText:{
        color:COLORS.secondaryLightGreyHex,
        fontSize:FONTSIZE.size_12,
        letterSpacing:1,
    },
    priceTextParent:{
        color:COLORS.primaryOrangeHex,
        fontSize:FONTSIZE.size_18,
        fontWeight:'600',
    },
    priceTextChild:{
        color:COLORS.primaryWhiteHex,
    },
    priceDetailContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:SPACING.space_15,
    },
});
