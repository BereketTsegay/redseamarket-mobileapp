import React from "react";
import { Text, View } from "react-native-ui-lib";
import styles from "./styles";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const SaleAndRentDetails = ({details}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );
    return(
        <View marginT-10>
             <Text style={styles.subHeading}>{strings.details}</Text>
            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.furnished}</Text>
              <Text style={styles.motorText1}>{details?.furnished}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.building}</Text>
              <Text style={styles.motorText1}>{details?.building_type}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.size}</Text>
              <Text style={styles.motorText1}>{details?.size}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.rooms}</Text>
              <Text style={styles.motorText1}>{details?.room}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>{strings.parking}</Text>
              <Text style={styles.motorText1}>{details?.parking}</Text>
            </View>

        </View>
    )
}
export default SaleAndRentDetails;