import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {  Text, View } from 'react-native-ui-lib';
import { Dimensions, FlatList, Image } from 'react-native';
import AppImages from '../constants/AppImages';


const CarouselView = ({data}) => {
    const width = Dimensions.get('window').width;
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!data || data.length === 0) {
        return (
            <View center paddingB-20>
                <Image
                    source={AppImages.PLACEHOLDER} 
                    style={{ width: '100%', height: width / 2 }}
                    resizeMode='contain'
                />
            </View>
        );
    }

    return (
        <View center paddingB-20>
        <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
            <View
                style={{
                    flex: 1,
                    alignItems:'center'
                }}
            >
                <Image source={{uri:'https://admin-jamal.prompttechdemohosting.com/' + item.image}} 
                style={{width:'100%',height:'100%'}}
                />
            </View>
        )}
    />
    
    </View>
    )
}

export default CarouselView;