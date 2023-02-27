import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
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
  rightText: {
    transform: [{rotate: '90deg'}],
    width: 50 / 100 * height,
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeXL,
  },
  leftText: {
    transform: [{rotate: '90deg'}],
    width: 50 / 100 * height,
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeNormal,
  },
  sideContainerSelfie: {
    paddingHorizontal: 20,
    width: width,
    height: height / 7,
    backgroundColor: theme.opacityBlack,
    alignItems: 'center',
    justifyContent: 'center'
  },
  normalText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeXL
  },
  mb20: {
    marginBottom: 20
  },
  footerText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeNormal
  }
};
