import React from "react";
import { Text, View } from "react-native-ui-lib";
import styles from "./styles";
import moment from "moment";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const MotorDetails = ({features,details}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
    return(
        <View marginT-10>
            <ScrollView horizontal>
                {features.map(item=>(
                    <View key={item.id} marginB-10 center paddingH-10 paddingV-2 backgroundColor="#7070703D" marginH-5 style={{borderRadius:8}}>
                    <Text style={styles.featureText}>{item.value}</Text>
                    </View>
                ))}
            </ScrollView>
             <Text style={styles.subHeading}>{strings.details}</Text>
            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.registration}</Text>
              <Text style={styles.motorText1}>{details?.registration_year}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.FuelType}</Text>
              <Text style={styles.motorText1}>{details?.fuel_type}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.transmission}</Text>
              <Text style={styles.motorText1}>{details?.transmission}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.mileage}</Text>
              <Text style={styles.motorText1}>{details?.milage}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.make}</Text>
              <Text style={styles.motorText1}>{details?.make.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.model}</Text>
              <Text style={styles.motorText1}>{details?.model.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.variant}</Text>
              <Text style={styles.motorText1}>{details?.variant.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.condition}</Text>
              <Text style={styles.motorText1}>{details?.condition}</Text>
            </View>

        </View>
    )
}
export default MotorDetails;