import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Image } from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import AppStyles from '../constants/AppStyles';
import AppColors from '../constants/AppColors';
import { PlaceAdContext } from '../api/placeAd/PlaceAdContext';

const AdsCountrySelect = ({ countryLists, Id }) => {
  const { placeAdInput, setPlaceAdInput } = useContext(PlaceAdContext);

  const initiallySelectedCountry = countryLists.filter(country => Id.includes(country.id));
  const [selectedItems, setSelectedItems] = useState(initiallySelectedCountry);
  const [dropdownOptions, setDropdownOptions] = useState(countryLists.filter(country => !Id.includes(country.id)));

  useEffect(() => {
    setPlaceAdInput({
      ...placeAdInput,
      adsCountry: selectedItems.map(item => item.id),
    });
  }, [selectedItems]);

  const selectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setDropdownOptions(dropdownOptions.filter(option => option.id !== item.id));
  };

  const removeChip = (item) => {
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    setDropdownOptions([...dropdownOptions, item]);
  };

  const renderChip = (item) => (
    <TouchableOpacity key={item.id}
      style={styles.chip}
      onPress={() => removeChip(item)}
    >
      <Text style={{ marginRight: 8 }}>{item.name}</Text>
      <Image source={AppImages.DELETE} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={dropdownOptions}
        onSelect={(selectedItem) => selectItem(selectedItem)}
        defaultButtonText="Please select countries"
        buttonTextAfterSelection={(selectedItem) => 'Please select countries'}
        rowTextForSelection={(item) => item.name}
        buttonStyle={AppStyles.dropdown1BtnStyle}
        buttonTextStyle={AppStyles.dropdown1BtnTxtStyle}
        renderDropdownIcon={(isOpened) => (
          <Image source={AppImages.ARROW_DOWN} />
        )}
        dropdownStyle={AppStyles.dropdown1DropdownStyle}
        rowStyle={AppStyles.dropdown1RowStyle}
        rowTextStyle={AppStyles.dropdown1RowTxtStyle}
      />
      <View style={styles.selectedChips}>
        {selectedItems.map(item => renderChip(item))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    bottom: 10,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    backgroundColor: AppColors.lightBlue,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AdsCountrySelect;





// import React, { useContext, useEffect, useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';
// import AppImages from '../constants/AppImages';
// import { Image } from 'react-native-ui-lib';
// import AppStyles from '../constants/AppStyles';
// import AppColors from '../constants/AppColors';
// import { PlaceAdContext } from '../api/placeAd/PlaceAdContext';

// const AdsCountrySelect = ({countryLists,Id}) => {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [dropdownOptions, setDropdownOptions] = useState(countryLists);
//     const {placeAdInput, setPlaceAdInput} = useContext(PlaceAdContext)


//       useEffect(() => {
//     const initiallySelectedCountry = countryLists.filter(country => Id.includes(country.id));

//     console.log(initiallySelectedCountry,'------------')
//         if (initiallySelectedCountry) {
//           setSelectedItems([initiallySelectedCountry]);
//           setDropdownOptions(dropdownOptions.filter((option) => option !== initiallySelectedCountry));
//         }
//       }, []);

//       useEffect(() => {
//         setPlaceAdInput({
//           ...placeAdInput,
//           adsCountry: selectedItems.map((item) => item.id),
//         });
//       }, [selectedItems]);

//   const selectItem = (item) => {
    
//     setSelectedItems([...selectedItems, item]);
//     setDropdownOptions(dropdownOptions.filter(option => option !== item));

//   };
//   const removeChip = (item) => {
    
//     setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
//     setDropdownOptions([...dropdownOptions, item]);
//   };


//   const renderChip = (item) => (
//     <TouchableOpacity key={item.id}
//       style={styles.chip}
//       onPress={() => removeChip(item)}
//     >
//       <Text style={{ marginRight: 8 }}>{item.name}</Text>
//       <Image source={AppImages.DELETE} />
//     </TouchableOpacity>
//   );


//   return (
//     <View style={styles.container}>
//       <SelectDropdown
//         data={dropdownOptions}
//         onSelect={(selectedItem) => selectItem(selectedItem)}
//          defaultButtonText="Please select countries"
//          buttonTextAfterSelection={(selectedItem) => 'Please select countries'}
//          rowTextForSelection={(item) => item.name}
//          buttonStyle={AppStyles.dropdown1BtnStyle}
//          buttonTextStyle={AppStyles.dropdown1BtnTxtStyle}
//          renderDropdownIcon={(isOpened) => (
//            <Image source={AppImages.ARROW_DOWN} />
//          )}
//          dropdownStyle={AppStyles.dropdown1DropdownStyle}
//          rowStyle={AppStyles.dropdown1RowStyle}
//          rowTextStyle={AppStyles.dropdown1RowTxtStyle}
//       />
//        <View style={styles.selectedChips}>
//         {selectedItems.map(item => renderChip(item))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   textInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     justifyContent: 'center', // Align text vertically
//   },
//   dropdownList: {
//     maxHeight: 200,
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
//   dropdownItemText: {
//     padding: 10,
//   },
//   selectedChips: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     bottom:10
//   },
//   chip: {
//     paddingVertical: 5,
//     paddingHorizontal:10,
//     margin: 5,
//     backgroundColor: AppColors.lightBlue,
//     borderRadius: 16,
//     flexDirection:'row',
//     alignItems:'center'
//   },
// });

// export default AdsCountrySelect;
