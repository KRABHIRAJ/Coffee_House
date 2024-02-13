/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBgIcon from './GradientBgIcon';
import ProfilePic from './ProfilePic';

interface HeaderProps {
    title? : String
}
const Header:React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <GradientBgIcon name="menu" size={FONTSIZE.size_18} color={COLORS.primaryLightGreyHex} />
      <Text style={styles.titleText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
   container: {
        padding: SPACING.space_30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
   },
   titleText:{
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_20,
    color:COLORS.primaryWhiteHex,
   },
});
