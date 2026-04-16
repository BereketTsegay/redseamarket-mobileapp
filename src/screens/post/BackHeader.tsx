import { TouchableOpacity } from "react-native"
import { Image, Text, View } from "react-native-ui-lib"
import styles from "./styles"
import AppImages from "../../constants/AppImages"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"

export const BackHeader = ({ title, sub, navigation, onBackPress }: { title: string; sub?: string; navigation: any; onBackPress?: () => void }) => {

    return (
        <View row centerV style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={onBackPress || (() => navigation.goBack())}>
                <View style={styles.backBtn}>
                    <Image
                        source={AppImages.ARROW_LEFT}
                        style={{ width: 18, height: 18, tintColor: '#111' }}
                    />
                </View>
            </TouchableOpacity>

            <View flex center>
                <Text style={styles.heading}>{title}</Text>
                {sub ? <Text style={styles.subHeading}>
                    {sub}
                </Text> : null}
            </View>
        </View>
    )
};