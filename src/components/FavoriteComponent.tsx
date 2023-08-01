import React from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { Image, View } from "react-native-ui-lib";
import AppColors from "../constants/AppColors";
import AppImages from "../constants/AppImages";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite, reset } from "../api/favorites/FavCreateSlice";
import styles from "../screens/details/styles";

const FavoriteComponent = ({id,status,done}) => {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {FavData,loadingFav,FavError} = useSelector(
      (state: RootState) => state.FavCreate,
    );
    
    const Favorite = async (id,status) => {
        let request = JSON.stringify({
          ads_id: id,
          action: status ? 'remove' : 'store',
        });
        dispatch(createFavorite({requestBody: request}))
          .then(() => { 
            done()
            dispatch(reset());
           
          })
          .catch((err: any) => console.log(err));
      };
    
      if (FavData != null) {
        if (!loadingFav && !FavError && FavData.status == 'success') {
          ToastAndroid.show(
            JSON.stringify(FavData.message),
            ToastAndroid.SHORT,
          );
        }
          else{
            ToastAndroid.show(
              JSON.stringify(FavData.message),
              ToastAndroid.SHORT,
            );
          }
         
        }
    return(
        <TouchableOpacity onPress={()=>Favorite(id, status)}>
        <View style={[styles.circle, {elevation: 10}]}>
          <Image
            source={status ? AppImages.HEART_FILL : AppImages.HEART}
            style={{width: 20, height: 20}}
            tintColor={AppColors.blue}
          />
        </View>
        </TouchableOpacity>
    )
}

export default FavoriteComponent;