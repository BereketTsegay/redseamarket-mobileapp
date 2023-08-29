import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, StyleSheet, ToastAndroid, View } from 'react-native';

interface props {
  latitudes? : any;
  longitudes? : any;
  onPress? : any
}

const MapComponent = ({latitudes, longitudes, onPress} : props) => {
  
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );


    useEffect(() => {
      if (latitudes && longitudes) {
        setLocation({ latitude: parseFloat(latitudes), longitude : parseFloat(longitudes) });
      } else {
        fetchLocation();
      }
    }, [latitudes, longitudes]);

    const fetchLocation = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.show(
              JSON.stringify('Location permission granted'),
              ToastAndroid.SHORT,
            );
            getCurrentLocation();
          } else {
            ToastAndroid.show(
              JSON.stringify('Location permission denied'),
              ToastAndroid.SHORT,
            );
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        // For other platforms, directly fetch location
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude: latitude, longitude: longitude });
          
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
  
    const handleMapPress = (event: any) => {
      if (!latitudes && !longitudes) {
        const coordinate = event.nativeEvent.coordinate;
        setLocation(coordinate);
        if (onPress) {
          onPress(coordinate);
        }
      }
    };
  
    return (
      <View style={{ flex: 1,height:200}}>
        <MapView style={{ flex: 1 }}
        region={{
          latitude: location?.latitude || 0, // Default latitude (or any value)
          longitude: location?.longitude || 0, // Default longitude (or any value)
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
         onPress={handleMapPress}>
        {location && <Marker coordinate={location} />}
      </MapView>
      </View>
    );
  };

export default MapComponent;
