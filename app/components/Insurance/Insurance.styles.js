import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const steps = 7;

export default {
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 9,
    marginBottom: 5
  },
  content: {
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  number: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageTitle: [
    styles.fontSizeLargeStyle,
    styles.bold,
    {
      paddingBottom: 10,
    }
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle,
  ],
  pageSubtitleDetail: [
    styles.fontSizeNormalStyle,
    {
      color: theme.red,
      marginTop: 7.5,
    }
  ],
  confirmSubtitle: [
    styles.fontSizeLargeStyle,
    styles.bold,
    {
      marginBottom: 20,
    }
  ],
  confirmTitle: [
    styles.fontSizeNormalStyle,

  ],
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7.5
  },
  column: {
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, 
    {borderTopWidth: 2}
  ],
  formContainer: {
    flex: 1,
    paddingBottom: 10
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    textAlign: 'center',
    color: theme.white
  },
  iconCurvePA: {
    paddingRight: 10,
    paddingBottom: 80

  },
  iconCurve: {
    borderColor: theme.grey,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 130

  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: steps,
    width: width / steps
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: steps,
    width: width
  },
  arrowIconContainer: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  arrowIcon: {
    color: theme.red,
  },
  border: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  webView: {
    width: width,
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
  containerBanner: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerTrfTitle: {
    paddingVertical: 10
  },
  transferTitle: {
    color: theme.black,
    marginHorizontal: 20,
    fontSize: 16,
  },
};
