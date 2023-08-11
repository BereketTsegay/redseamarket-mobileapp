import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {  Text, View } from 'react-native-ui-lib';
import { Dimensions, FlatList, Image } from 'react-native';
import AppFonts from '../constants/AppFonts';


const HomeScreenSlider = ({data}) => {
    const width = Dimensions.get('window').width;
    const [currentIndex, setCurrentIndex] = useState(0);
console.log(currentIndex)
    return (
        <View >
        <Carousel
        loop
        width={width}
        height={140}
        autoPlay={true}
        data={data}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
            <View row marginH-30 style={{justifyContent:'space-between'}}>
                <Text style={{fontSize:14, fontFamily:AppFonts.POPPINS_BOLD,color:'white',
                // transform: [{ rotate: '-5deg' }],
                top:20}}>{item.title}</Text>
                <Image source={{uri:'https://admin-jamal.prompttechdemohosting.com/' + item.file}} 
                style={{width:220,height:100,top:40}}/>
            </View>
        )}
    />
     <FlatList
    data={data}
    horizontal
    renderItem={({item,index})=>(
        currentIndex == index ?
     <View center marginH-3 style={{ width: 10,height: 10,borderRadius: 6,borderColor: 'white',borderWidth:1}}>
        <View marginH-3 style={{ width: 5,height: 5,borderRadius: 6,backgroundColor: 'white'}}/>
        </View>
     : <View marginH-3 style={{ width: 10,height: 10,borderRadius: 6,backgroundColor: 'white'}}/>
    )}/>
    </View>
    )
}

export default HomeScreenSlider;