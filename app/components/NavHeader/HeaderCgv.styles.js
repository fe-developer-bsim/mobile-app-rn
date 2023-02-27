import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const trueWidth = width / 7.68;
const trueHeight = (width * 7) / 79;

export default {
  container: {
    paddingRight: 10,
  },
  burger: {
    color: theme.black
  },
  imageCgv: {
    maxHeight: trueHeight,
    maxWidth: trueWidth
  }
};
