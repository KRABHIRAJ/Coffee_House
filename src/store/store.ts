/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {create} from 'zustand';
import { produce } from 'immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';


export const useStore = create(
    persist(
        (set, get) => ({
            CoffeeList:CoffeeData,
            BeanList:BeansData,
            cartPrice:0,
            FavouriteList:[],
            CartList:[],
            OrderHistoryList:[],
            addToCart: (id: string, size: string, type: string)  => set(
                produce(state => {
                    if (type === 'Coffee'){
                        let found = false;
                        let coffeeToAdd = state.CoffeeList.filter((item : any) => item.id === id)[0];
                        if (state.CartList.length > 0 ){
                            for (let i = 0; i < state.CartList.length; i++){
                              if (state.CartList[i].id === id){
                                state.CartList[i]?.prices?.forEach((item: any) => {
                                      if (item.size === size){
                                        item.quantity += 1;
                                      }
                                  });
                                  found = true;
                                  break;
                              }
                          }
                        }
                        if (!found){
                            coffeeToAdd?.prices.forEach((item : any) => {
                                item.size === size ? (item.quantity = 1) : (item.quantity = 0);
                            });
                            state.CartList.unshift({...coffeeToAdd});
                        }
                    }
                    else if (type === 'Bean'){
                        let found = false;
                        let BeanToAdd = state.BeanList.filter((item : any) => item.id === id)[0];
                        if (state.CartList.length > 0 ){
                            for (let i = 0; i < state.CartList.length; i++){
                              if (state.CartList[i].id === id){
                                state.CartList[i]?.prices?.forEach((item: any) => {
                                      if (item.size === size){
                                        item.quantity += 1;
                                      }
                                  });
                                  found = true;
                                  break;
                              }
                          }
                        }
                        if (!found){
                            BeanToAdd?.prices.forEach((item : any) => {
                                item.size === size ? (item.quantity = 1) : (item.quantity = 0);
                            });
                            state.CartList.unshift({...BeanToAdd});
                        }
                    }
                }
                )
            ),
            incrementCartItem: (id: string, size: string) => set(
                produce(state => {
                    state.CartList.forEach((item: any) => {
                        if (item.id === id){
                            item.prices.forEach((currSize: any) => {
                                if (currSize.size === size){
                                    currSize.quantity += 1;
                                }
                            });
                        }
                    });
                })
            ),
            decrementCartItem: (id: string, size: string) => set(
                produce(state => {
                    state.CartList.forEach((item: any, index: number) => {
                        if (item.id === id){
                            let quanGreater = 0;
                            item.prices.forEach((currSize: any) => {
                                if (currSize.quantity >= 1){
                                    quanGreater += 1;
                                }
                            });
                            item.prices.forEach((currSize: any) => {
                                if (currSize.size === size && currSize.quantity > 1){
                                    currSize.quantity -= 1;
                                } else if (currSize.size === size && currSize.quantity === 1){
                                    currSize.quantity -= 1;
                                    if (quanGreater === 1){
                                        state.CartList.splice(index, 1);
                                    }
                                }
                            });
                        }
                    });
                })
            ),
            calculatePrice: () => set(
                produce(state => {
                    const totalPrice = state.CartList.reduce((acc: number, item: any) => {
                        const sum  = item.prices.reduce((priceAcc : number, price: any) => (priceAcc + (parseFloat(price.price) * price.quantity)), 0);
                        return (acc + sum);
                    },0);
                    state.cartPrice = totalPrice.toFixed(2);
                    console.log('totalPrice >>', state.cartPrice);
                })
            ),
            toggleFavouriteList : (type: string, id: string) => set(
                produce(state => {
                    if (type === 'Coffee'){
                        for (let i = 0; i < state.CoffeeList.length; i++){
                            if (state.CoffeeList[i].id === id){
                                if (state.CoffeeList[i].favourite === false){
                                    state.CoffeeList[i].favourite = true;
                                    state.FavouriteList.unshift(state.CoffeeList[i]);
                                }
                                else if (state.CoffeeList[i].favourite === true){
                                    state.CoffeeList[i].favourite = false;
                                    const index: number = state.FavouriteList.findIndex((item: any) => (item.id === id));
                                    state.FavouriteList.splice(index, 1);
                                }
                                break;
                            }
                        }
                    } else if ( type === 'Bean'){
                        for (let i = 0; i < state.BeanList.length; i++){
                            if (state.BeanList[i].id === id){
                                if (state.BeanList[i].favourite === false){
                                    state.BeanList[i].favourite = true;
                                    state.FavouriteList.unshift(state.BeanList[i]);
                                }
                                else if (state.BeanList[i].favourite === true){
                                    state.BeanList[i].favourite = false;
                                    const index: number = state.FavouriteList.findIndex((item: any) => (item.id === id));
                                    state.FavouriteList.splice(index, 1);

                                }
                                break;
                            }
                        }
                    }
                })
            ),

            placeOrder: () => set(
                produce(state => {
                    if (state.CartList.length > 0){
                        const orderHistoryObj = {
                            timestamp: new Date().toLocaleString(),
                            orderAmount: state.cartPrice,
                            orderedItem: state.CartList,
                        };
                        state.OrderHistoryList.unshift(orderHistoryObj);
                        state.CartList = [];
                        state.cartPrice = 0;
                    }
                })
            ),
        }),
        {
            name: 'coffee-app',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )

);
