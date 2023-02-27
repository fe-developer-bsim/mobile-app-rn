import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  borderGrey: {
    backgroundColor: theme.greyLine,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  contentContainer: {
    flex: 9
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width * 3 / 7
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  iconCurvePA: {
    paddingRight: 20,
    paddingTop: 10,
  },
  optionTittle: {
    fontSize: 15,
    color: 'black'
  },
  borderText: {
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7.5
  },
  arrowIconContainer: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  arrowIcon: {
    color: theme.red,
  },
  pageTitle: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle,
  ],
  content: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  subheaderPadding: {
    paddingBottom: 10,
  },
  detailContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingLeft: 20,
    borderRadius: 3,
  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  column: {
    justifyContent: 'space-between',
    paddingVertical: 5
  },
};
