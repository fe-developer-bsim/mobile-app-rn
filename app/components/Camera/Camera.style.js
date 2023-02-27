import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {fontSizeXLStyle, textLightGreyStyle} from '../../styles/common.styles';

const {width} = Dimensions.get('window');
const boxSize = width * 70 / 100;

export default {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.inputBackground,
  },
  cameraView: {
    alignSelf: 'center',
    width: width,
    flex: 1,
    backgroundColor: theme.grayLight,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: theme.white
  },
  borderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  border: {
    width: boxSize,
    height: boxSize,
    borderWidth: 1,
    borderColor: theme.brand,
    alignItems: 'center',
    alignSelf: 'center'
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.white
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.inputBackground
  },
  title: [
    fontSizeXLStyle,
  ],
  subtitle: {
    color: theme.black
  },
  info: [textLightGreyStyle],
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
  }
};
