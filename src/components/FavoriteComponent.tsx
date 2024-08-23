import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, View } from "react-native-ui-lib";
import AppColors from "../constants/AppColors";
import AppImages from "../constants/AppImages";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite, reset } from "../api/favorites/FavCreateSlice";
import styles from "../screens/details/styles";
import { showToast } from "../constants/commonUtils";

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
          showToast('An error occurred');
        }
      };

      useEffect(()=>{
    
      if (FavData != null) {
        if (!loadingFav && !FavError && FavData.status == 'success') {
          showToast(FavData.message);
        }
          else{
            showToast(FavData.message);
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