import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import AppImages from '../../constants/AppImages';
import styles from './styles';
export type PostSecondScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'PostSecondScreen'
>;

export type PostSecondScreenRouteProps = RouteProp<
  RootStackParams,
  'PostSecondScreen'
>;

interface Props {}

const PostSecondScreen: React.FC<Props> = () => {
  const navigation = useNavigation<PostSecondScreenNavigationProps>();
  const [data, setData] = useState([
    {name:'Used Cars for sale', id:1},
    {name:'Motorcycles', id:2},
    {name:'Auto Accessories & Parts', id:3},
    {name:'Heavy Vehicles', id:4},
    {name:'Boats', id:5}
  ])
  useEffect(() => {
  }, []);

  return (
    <View flex backgroundColor='white' paddingV-20>
         <View row paddingH-20>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.circle}>
                <Image
                  source={AppImages.ARROW_LEFT}
                  style={{width: 25, height: 25}}
                />
              </View>
            </TouchableOpacity>
            <View flex center>
            <Text style={styles.heading}>Vehicles</Text>
            <Text style={styles.subHeading}>Choose the category that your ad fits into.</Text>
            </View>
          </View>

          <FlatList
          data={data}
          contentContainerStyle={{flex:1,marginTop:20}}
          renderItem={({item})=>{
            return(
                <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.PlaceAdScreen)}>
               <View marginH-30 marginV-20>
                <Text style={[styles.subHeading,{fontSize:12}]}>{item.name}</Text>
                </View>
                <View style={{borderBottomColor:'#00000029',borderBottomWidth:1}}/>
                </TouchableOpacity>
            )
          }}/>
        </View>
    
  );
};

export default PostSecondScreen;