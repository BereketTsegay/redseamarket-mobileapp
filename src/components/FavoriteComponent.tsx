import React, { useEffect, useState } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { Image, View } from "react-native-ui-lib";
import AppColors from "../constants/AppColors";
import AppImages from "../constants/AppImages";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite, reset } from "../api/favorites/FavCreateSlice";
import styles from "../screens/details/styles";

const FavoriteComponent = ({id,status}) => {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const {FavData,loadingFav,FavError} = useSelector(
      (state: RootState) => state.FavCreate,
    );
    const [localStatus, setLocalStatus] = useState(status); 

    useEffect(() => {
      setLocalStatus(status); 
    }, [status]);
    

      const toggleFavorite = async () => {
        try {
          let request = JSON.stringify({
            ads_id: id,
            action: localStatus ? 'remove' : 'store',
          });
          dispatch(createFavorite({requestBody: request}))
            .then(() => { 
              setLocalStatus(!localStatus);
              dispatch(reset());
            })
        } catch (error) {
          ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
        }
      };

      useEffect(()=>{
    
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
      },[FavData])

    return(
        <TouchableOpacity onPress={toggleFavorite}>
        <View style={[styles.circle, {elevation: 10}]}>
          <Image
            source={localStatus ? AppImages.HEART_FILL : AppImages.HEART}
            style={{width: 20, height: 20}}
            tintColor={AppColors.blue}
          />
        </View>
        </TouchableOpacity>
    )
}

export default FavoriteComponent;