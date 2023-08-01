import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

interface props {
  latitudes? : any;
  longitudes? : any;
  onPress? : any
}

const MapComponent = ({latitudes, longitudes, onPress} : props) => {
  
    const [location, setLocation] = useState(null);

    useEffect(() => {
      if (latitudes && longitudes) {
        setLocation({ latitude: parseFloat(latitudes), longitude : parseFloat(longitudes) });
      }
    }, [latitudes, longitudes]);
  
    const handleMapPress = (event) => {
      if (!latitudes && !longitudes){
      setLocation(event.nativeEvent.coordinate)
      onPress(event.nativeEvent.coordinate)
      }
      else 
      null;
    };
    return (
      <View style={{ flex: 1,height:200}}>
        <MapView style={{ flex: 1 }} onPress={handleMapPress}>
        {location && <Marker coordinate={location} />}
      </MapView>
      </View>
    );
  };

export default MapComponent;
