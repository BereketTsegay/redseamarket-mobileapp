import React from "react";
import { Text, View } from "react-native-ui-lib";
import styles from "./styles";
import moment from "moment";
import { ScrollView } from "react-native";

const MotorDetails = ({features,details}) => {
    return(
        <View marginT-10>
            <ScrollView horizontal>
                {features.map(item=>(
                    <View key={item.id} marginB-10 center paddingH-10 paddingV-2 backgroundColor="#7070703D" marginH-5 style={{borderRadius:8}}>
                    <Text style={styles.featureText}>{item.value}</Text>
                    </View>
                ))}
            </ScrollView>
             <Text style={styles.subHeading}>Details</Text>
            <View style={styles.row}>
              <Text style={styles.motorText}>Registration Year</Text>
              <Text style={styles.motorText1}>{details?.registration_year}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Fuel type</Text>
              <Text style={styles.motorText1}>{details?.fuel_type}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Transmission</Text>
              <Text style={styles.motorText1}>{details?.transmission}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Mileage</Text>
              <Text style={styles.motorText1}>{details?.milage}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Make</Text>
              <Text style={styles.motorText1}>{details?.make.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Model</Text>
              <Text style={styles.motorText1}>{details?.model.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Variant</Text>
              <Text style={styles.motorText1}>{details?.variant.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Condition</Text>
              <Text style={styles.motorText1}>{details?.condition}</Text>
            </View>

        </View>
    )
}
export default MotorDetails;