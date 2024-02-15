/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import { BORDERRADIUS, SPACING } from '../theme/theme';

interface BGIconProps {
    name: string,
    size: number,
    color: string,
    bgColor: string,
}

const BGIcon: React.FC<BGIconProps> = ({name, size, color, bgColor}) => {
  return (
    <View style={[styles.IconContainer, {backgroundColor: bgColor}]}>
      <CustomIcon name={name} size={size} color={color}/>
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
    IconContainer:{
        height:SPACING.space_30,
        width: SPACING.space_30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: BORDERRADIUS.radius_8,
    },
});
