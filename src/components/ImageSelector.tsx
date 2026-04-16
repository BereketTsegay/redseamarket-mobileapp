import React, {useRef, useState, useEffect} from 'react';
import {Chip, Image, Text, View} from 'react-native-ui-lib';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  PanResponder,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppStyles from '../constants/AppStyles';
import AppImages from '../constants/AppImages';
import * as ImagePicker from 'react-native-image-picker';
import {showToast} from '../constants/commonUtils';
import ImageResizer from 'react-native-image-resizer';
import AppColors from '../constants/AppColors';
import { pick, types } from '@react-native-documents/picker';
const deviceHeight = Dimensions.get('window').height;

const ImageSelector = (props: {
  close: any;
  isItem: any;
  multi?: any;
  document?: any;
}) => {
  const close = props.close;
  const isItem = props.isItem;
  const multi = props.multi;
  const document = props.document;

  useEffect(() => {
    openModal();
  }, []);

  const modalY = useRef(new Animated.Value(deviceHeight)).current;

  const openModal = () => {
    Animated.timing(modalY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalY, {
      toValue: 300,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      close();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          modalY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(modalY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

 const handleImagePicker = async (isImage: boolean) => {
  try {
    let pickerResult;

    if (isImage) {
      // Always use ImagePicker for images/videos
      const options = {
        title: 'Select Media',
        mediaType: 'mixed', // both images & videos
        includeBase64: false,
      };

      pickerResult = await new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary(options, response => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.errorCode) {
            reject(`ImagePicker Error: ${response.errorMessage}`);
          } else {
            const selectedImages = response.assets?.map(image => ({
              fileCopyUri: null,
              name: image.fileName,
              size: image.fileSize,
              type: image.type,
              uri: image.uri,
            })) || [];
            resolve(selectedImages);
          }
        });
      });
    } else {
      // Use DocumentPicker for PDF
      pickerResult = await pick({
        mode: 'open',
        // allowMultiSelection: multi === true,
        type: [types.allFiles],
      });
    }
    isItem(pickerResult[0]);
    closeModal();

  } catch (err) {
    console.log('Picker error:', err);
    showToast('User cancelled picker cancelled');
  }
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

  // Function to handle image capturing using the device's camera
  const handleCameraCapture = () => {
    Alert.alert(
      'Choose Media',
      'Would you like to take a photo or record a video?',
      [
        {
          text: 'Photo',
          onPress: () => launchCameraWithMediaType('photo'),
        },
        {
          text: 'Video',
          onPress: () => launchCameraWithMediaType('video'),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };
  
  const launchCameraWithMediaType = async (mediaType: 'photo' | 'video') => {
    const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    showToast('Camera permission denied');
    return;
  }
    const options = {
      title: mediaType === 'photo' ? 'Take a Photo' : 'Record a Video',
      mediaType,
      storageOptions: {
        skipBackup: true,
        path: mediaType === 'photo' ? 'images' : 'videos',
      },
    };
  
    ImagePicker.launchCamera(options, async response => {
      console.log('Camera response = ', response);
      if (response.didCancel) {
        showToast('User cancelled image picker');
      } else if (response.errorCode) {
        showToast(response.errorMessage || response.errorCode);
      } else {
        console.log('Response = ', response);
        const responses = response.assets[0];
  
        if (mediaType === 'photo') {
          ImageResizer.createResizedImage(
            responses.uri,
            800,
            800,
            'JPEG',
            80,
          )
            .then(resizedImage => {
              const selectedImage = {
                fileCopyUri: null,
                name: responses.fileName,
                size: responses.fileSize,
                type: responses.type,
                uri: resizedImage.uri,
              };
              isItem(Platform.OS == 'ios' ? [selectedImage] : selectedImage);
            })
            .catch(error => console.log('Image resizing error:', error));
        } else {
          // For video, return as is
          const selectedVideo = {
            fileCopyUri: null,
            name: responses.fileName,
            size: responses.fileSize,
            type: 'video/mp4',
            uri: responses.uri,
          };
          isItem(Platform.OS == 'ios' ? [selectedVideo] : selectedVideo);
        }
  
        closeModal();
      }
    });
  };

  return (
    <Animated.View
      style={[AppStyles.modal, {transform: [{translateY: modalY}]}]}
      {...panResponder.panHandlers}>
      <View padding-20 >
        <TouchableOpacity onPress={() => handleImagePicker(true)}>
          <View row centerV marginB-10>
            <View style={AppStyles.imgCont}>
              <Image
                source={AppImages.GALLERY}
                width={22}
                height={22}
                tintColor={AppColors.accentColor}
              />
            </View>
            <Text style={AppStyles.text}>Gallery</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCameraCapture}>
          <View row centerV marginB-10>
            <View style={AppStyles.imgCont}>
              <Image
                source={AppImages.CAMERA}
                width={22}
                height={22}
                tintColor={AppColors.accentColor}
              />
            </View>
            <Text style={AppStyles.text}>Camera</Text>
          </View>
        </TouchableOpacity>

        {document != false ? (
          <TouchableOpacity onPress={() => handleImagePicker(false)}>
            <View row centerV marginB-20>
              <View style={AppStyles.imgCont}>
                <Image
                  source={AppImages.DOCUMENT}
                  width={22}
                  height={22}
                  tintColor={AppColors.accentColor}
                />
              </View>
              <Text style={AppStyles.text}>Document</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </Animated.View>
  );
};

export default ImageSelector;
