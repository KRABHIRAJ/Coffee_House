/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import Header from '../components/Header';
import CustomIcon from '../components/CustomIcon';

const getCategoriesFromCoffeeData = (coffeeData: any) => {
  let tempCategory: any = ['All'];
  coffeeData.forEach((data:any) => {
    !tempCategory.includes(data.name) && tempCategory.push(data.name);
  });
  return tempCategory;
};

const getCoffeeList = (category: String, data: any) => {
  if (category === 'All'){
    return data;
  }
  return data.filter((item: any) => item.name === category);
};

const HomeScreen = () => {
  const CoffeeList =  useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(getCategoriesFromCoffeeData(CoffeeList));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
       >
      <Header />
      <Text style={styles.bestTitleText}>{'Find the best\ncoffee for you'}</Text>
      <View style={styles.searchContainer}>
        <CustomIcon style={{marginRight:10}} name="search" size={20} color={COLORS.primaryLightGreyHex} />
        <TextInput
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder="Find Your Coffee..."
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.searchText}
         />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainerStyle}
      >
        {
          categories.map((category: any, index: any) => (
            <TouchableOpacity
              onPress={() => {
                setCategoryIndex({
                  index: index,
                  category: categories[index],
                });
                setSortedCoffee(getCoffeeList(categoryIndex.category, CoffeeList));
              }}
              key={index}
              style={styles.currCategory}
            >
              <Text style={[styles.categoryText, categoryIndex.index === index ? {color:COLORS.primaryOrangeHex} : {color:COLORS.secondaryLightGreyHex}]}>{category}</Text>
              {categoryIndex.index === index ? <View style={styles.activeItem} /> : <></>}
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:COLORS.primaryBlackHex,
    flex:1,
  },
  scrollViewStyle:{
    flexGrow:1,
  },
  bestTitleText: {
    color:COLORS.primaryWhiteHex,
    paddingHorizontal:SPACING.space_28,
    fontSize:FONTSIZE.size_24,
    fontWeight:'700',
  },
  searchContainer: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:COLORS.primaryGreyHex,
    marginHorizontal:SPACING.space_28,
    marginVertical:SPACING.space_24,
    paddingHorizontal:SPACING.space_15,
    borderRadius:BORDERRADIUS.radius_25,
  },
  searchText:{
    color:COLORS.primaryWhiteHex,
  },
  categoryText:{
    fontSize:FONTSIZE.size_18,
    fontWeight:'600',
  },
  currCategory:{
    paddingHorizontal:10,
  },
  activeItem:{
    height:SPACING.space_10,
    width:SPACING.space_10,
    backgroundColor:COLORS.primaryOrangeHex,
    borderRadius:BORDERRADIUS.radius_25,
    alignSelf:'center',
    marginTop:SPACING.space_8,
  },
  categoryContainerStyle:{
    paddingHorizontal:SPACING.space_10,
  },
});
