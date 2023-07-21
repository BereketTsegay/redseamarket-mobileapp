import React from 'react';
import { Incubator } from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
const {TextField} = Incubator

const InputField = ({title,multiline,height,type,value,onChange}) => {
    return(
      <TextField
          placeholder={title}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={AppStyles.fieldText}
          fieldStyle={[AppStyles.fieldStyle,{height:height}]}
          paddingH-15
          marginB-20
          multiline={multiline}
          keyboardType={type}
          value={value}
          onChangeText={onChange}
          />
    )
  }

  export default InputField;