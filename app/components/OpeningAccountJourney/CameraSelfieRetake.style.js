import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {fontSizeXLStyle, fontSizeNormalStyle} from '../../styles/common.styles';

const {width, height} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
  },
  preview: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: theme.opacityBlack,
    width: width,
  },
  topContainer: {
    width: width,
    height: 10 / 100 * height,
    backgroundColor: theme.opacityBlack,
    alignSelf: 'flex-start',
  },
  sideContainer: {
    width: 15 / 100 * width,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  rightText: [
    fontSizeXLStyle,
    {
      transform: [{rotate: '90deg'}],
      width: 50 / 100 * height,
      color: theme.white,
      textAlign: 'center'
    }
  ],
  leftText: [
    fontSizeNormalStyle,
    {
      transform: [{rotate: '90deg'}],
      width: 50 / 100 * height,
      color: theme.white,
      textAlign: 'center'
    }
  ],
  normalText: [
    fontSizeXLStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
  sideContainerSelfie: {
    paddingHorizontal: 20,
    width: width,
    height: height / 7,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mb20: {
    marginBottom: 20
  },
  footerText: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      textAlign: 'center'
    }
  ],
};
