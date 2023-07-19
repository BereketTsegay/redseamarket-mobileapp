import React from "react";
import { Text, View } from "react-native-ui-lib";
import styles from "./styles";
import moment from "moment";
import { FlatList } from "react-native";

const CustomDetails = ({details}) => {
    return(
        <View marginT-10>
             <Text style={styles.subHeading}>Details</Text>

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