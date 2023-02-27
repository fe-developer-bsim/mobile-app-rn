import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  bottomPad: {paddingBottom: 20},
  header: {fontSize: theme.fontSizeXL, fontFamily: theme.robotoLight, fontWeight: theme.fontWeightMedium},
  body: {fontFamily: theme.roboto},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: -10},
  textContainer: {padding: 10},
  yesButton: {color: theme.brand, paddingLeft: width / 8},
  buttonLeft: {paddingRight: width / 8},
};