import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 9,
    alignItems: 'center',
  },
  content: [
    styles.contentContainerStyle
  ],
  number: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageTitle: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle,
    {
      marginBottom: 20,
    }
  ],
  confirmSubtitle: [
    styles.fontSizeLargeStyle,
    {
      marginBottom: 20,
      textAlign: 'center'
    }
  ],
  confirmTitle: [
    styles.fontSizeNormalStyle,
    {textAlign: 'center'}
  ],
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, {borderTopWidth: 10, marginHorizontal: 30}
  ],
  rowGreyPadding: [
    {paddingBottom: 10}
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
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width / 1
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width / 1
  },
  icon: {
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    paddingBottom: Platform.OS === 'ios' ? 0 : 30,
  },
  iconFail: {
    color: theme.red,

  },
  contentCenter: [
    styles.contentContainerStyle, {
      alignItems: 'center',
    }
  ],
  confirmSubtitleXL: [
    styles.fontSizeXLStyle,
    {
      marginBottom: 20,
      textAlign: 'center'
    }
  ],
  rowPadding: [styles.fontSizeLargeStyle, styles.bold,
    {paddingHorizontal: 10, color: theme.red}
  ],
  rowDetail: {
    flexDirection: 'row',
  },
  subTitle: [
    styles.fontSizeNormalStyle,
    styles.bold
  ],
  verticalSpacing: [
    {marginBottom: 40},
    styles.cardVerticalSpacingStyle
  ],
  billDetailTitle: styles.textLightGreyStyle,

  billDetailTitle2: [styles.textLightGreyStyle, styles.bold,
    {color: theme.red}],
  rowGrey2: [
    styles.borderGreyStyle,
    styles.rowGray, {borderTopWidth: 5}
  ],
};
