import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingTop: 25,
    paddingBottom: 15,
  },
  nextButton: styles.buttonLargeTextStyle,
  buttonContainer: {
    backgroundColor: theme.white,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20
  },

  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerTnc: {
    marginTop: Platform.OS === 'OS' ? 50 : 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
};
