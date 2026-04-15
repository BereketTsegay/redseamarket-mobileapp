import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Dropdown} from 'react-native-element-dropdown';

interface props {
  value: any;
  data: any;
  add?: any;
  dropdownType?: any;
  onBlur?: any;
  error?: any;
}

const ItemDropdown = ({
  value,
  data = [],
  add,
  dropdownType,
  onBlur,
  error,
}: props) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );

  const strings = useSelector(
    (state: RootState) => state.language.resources[currentLanguage],
  );

  return (
    <View style={{marginBottom: 15}}>
      <Dropdown
        style={{
          height: 50,
          borderColor: error ? 'red' : '#ccc',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
        }}

        placeholderStyle={{
          fontSize: 14,
          color: '#999',
        }}

        selectedTextStyle={{
          fontSize: 14,
          color: '#000',
        }}

        inputSearchStyle={{
          height: 40,
          fontSize: 14,
          color: '#000',
        }}

        data={data}

        labelField="name"   // ✅ IMPORTANT
        valueField="id"     // ✅ IMPORTANT

        placeholder={`${strings.select} ${dropdownType}`}

        value={value}

        onChange={item => {
          add && add(item.id);
        }}

        onBlur={onBlur}

        // ✅ Enable search (extra feature)
        search
        searchPlaceholder={strings.search || 'Search...'}

        maxHeight={300}
      />

      {error && (
        <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
          * {strings.requiredField}
        </Text>
      )}
    </View>
  );
};

export default ItemDropdown;