import React from "react";
import { Text, View } from "react-native-ui-lib";
import styles from "./styles";
import moment from "moment";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const CustomDetails = ({details}) => {
    const currentLanguage = useSelector(
        (state: RootState) => state.language.currentLanguage,
      );
      const strings = useSelector(
        (state: RootState) => state.language.resources[currentLanguage],
      );
    return(
        <View marginT-10>
             <Text style={styles.subHeading}>{strings.details}</Text>

             <FlatList
             data={details}
             renderItem={({item})=>{
                return(
             <View style={styles.row}>
              <Text style={styles.motorText}>{item.name}</Text>
              <Text style={styles.motorText1}>{item.value}</Text>
            </View>
                )}}/>
               
           
        </View>
    )
}
export default CustomDetails;