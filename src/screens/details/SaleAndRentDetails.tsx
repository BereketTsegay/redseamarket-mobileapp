import React from "react";
import { Text, View } from "react-native-ui-lib";
import styles from "./styles";
import moment from "moment";

const SaleAndRentDetails = ({details}) => {
    return(
        <View marginV-10>
             <Text style={styles.subHeading}>Details</Text>
            <View style={styles.row}>
              <Text style={styles.motorText}>Furnished</Text>
              <Text style={styles.motorText1}>{details?.furnished}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Building_type</Text>
              <Text style={styles.motorText1}>{details?.building_type}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Size</Text>
              <Text style={styles.motorText1}>{details?.size}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Rooms</Text>
              <Text style={styles.motorText1}>{details?.room}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Parking</Text>
              <Text style={styles.motorText1}>{details?.parking}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Posted On</Text>
              <Text style={styles.motorText1}>{moment(details?.created_at).format('DD-MMM-YYYY')}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.motorText}>Updated at</Text>
              <Text style={styles.motorText1}>{moment(details?.updated_at).format('DD-MMM-YYYY')}</Text>
            </View>
        </View>
    )
}
export default SaleAndRentDetails;