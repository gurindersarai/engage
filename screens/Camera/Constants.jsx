import { Dimensions, Platform } from 'react-native';
// import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: 10,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: 2 + CONTENT_SPACING,
  paddingTop:2 + CONTENT_SPACING,
  paddingRight: 2 + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 20;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select({
  android: Dimensions.get('screen').height - 20,
  ios: Dimensions.get('window').height,
});

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;