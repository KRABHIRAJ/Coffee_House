/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
      {/* Header */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
