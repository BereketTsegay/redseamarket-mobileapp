import React from 'react';
import { Incubator } from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
const {TextField} = Incubator

type Props = {
  ref?: any;
  title : any;
  multiline? : any;
  height? : any;
  width? : any,
  type? : any;
  value: any;
  onChange: any;
  trailing? : any;
  editable? : any;
  lead? : any
}

const InputField = ({ref, title,multiline,height,width,type,value,onChange,trailing,editable, lead}: Props) => {
    return(
      <TextField
      ref={ref}
          placeholder={title}
          placeholderTextColor={"#000000"}
          color={"#000000"}
          style={AppStyles.fieldText}
          fieldStyle={[AppStyles.fieldStyle,{height:height, width:width}]}
          paddingH-15
          marginB-20
          multiline={multiline}
          keyboardType={type}
          value={value}
          onChangeText={onChange}
          trailingAccessory={trailing}
          editable={editable}
          leadingAccessory={lead}
          />
    )
  }

  export default InputField;