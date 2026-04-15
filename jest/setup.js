import 'react-native-gesture-handler/jestSetup';
import {jest} from '@jest/globals';

jest.mock('react-native/src/private/animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
