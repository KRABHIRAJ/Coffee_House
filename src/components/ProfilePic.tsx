/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        style={styles.profileImg}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  ImageContainer:{
    height:SPACING.space_36,
    width:SPACING.space_36,
    borderRadius:SPACING.space_12,
    borderWidth:2,
    borderColor:COLORS.secondaryDarkGreyHex,
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden',
  },
  profileImg:{
    height:SPACING.space_36,
    width:SPACING.space_36,
    borderRadius:SPACING.space_12,
  },
});
