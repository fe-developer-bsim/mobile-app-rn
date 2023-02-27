import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {fontSizeXLStyle} from '../../styles/common.styles';

const {width} = Dimensions.get('window');
const radius = width * 40 / 100;
const circlePadding = width * 3 / 100;

export default {
  container: {
    flex: 1,
    backgroundColor: theme.inputBackground,
  },
  preview: {
    flexGrow: 1,
    minHeight: radius,
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: theme.opacityBlack,
    width: width,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: width,
    backgroundColor: theme.opacityBlack,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  title: [
    fontSizeXLStyle,
    {
      color: theme.white
    }
  ],
  subtitle: {
    color: theme.black
  },
  info: {
    color: theme.white,
    textAlign: 'center'
  },
  photoInfo: {
    color: theme.white,
    textAlign: 'center',
    width: 70,
    backgroundColor: theme.transparent
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  infoTextContainer: {
    flex: 1
  },
  iconColor: {
    color: theme.textGrey
  },
  cameraInfo: {
    flex: 1,
    justifyContent: 'space-between'
  },
  circleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleLeft: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: circlePadding
  },
  circleRight: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: circlePadding
  },
  circle: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
    width: radius,
    height: radius,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
