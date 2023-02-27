import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 9
  },
  content: {
    paddingBottom: 30,
    backgroundColor: theme.white
  },
  number: [
    styles.fontSizeLargeStyle,
  ],
  pageTitle: [
    styles.fontSizeLargeStyle,
  ],
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 40,
    paddingRight: 30
  },
  eachRow: {
    paddingBottom: 20
  },
  mainTitle: {
    paddingLeft: 40,
    paddingRight: 100,
    paddingVertical: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  buttonNext: {
    paddingTop: 25,
    paddingHorizontal: width / 11,
    position: 'relative',
    width: width
  },
  buttonPayment: {
    marginTop: 5
  },
  buttonIhaveMakePayment: {
    color: theme.white
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partTwo: {
    backgroundColor: theme.borderGrey,
    height: 3,
    width: width
  },
  rowPromo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 40,
    paddingRight: 30,
    paddingVertical: 5,
  },
};
