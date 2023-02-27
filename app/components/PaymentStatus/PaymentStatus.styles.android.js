import {theme} from '../../styles/core.styles';
import {bold, contentContainerStyle, fontSizeMediumStyle, fontSizeSmallStyle, fontSizeXLStyle, light, fontSizeNormalStyle, fontSizeLargeStyle, fontSizeXXLStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  lineDiv: {
    borderBottomWidth: 1,
    borderColor: theme.grey,
    paddingBottom: 10,
    marginBottom: 10
  },
  scrollContainer: [contentContainerStyle],
  container: {
    flex: 1
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 56 // header height - page padding, 56-20
  },
  middleContainer: [contentContainerStyle],
  detailContainer:
  {
    flex: 1,
    justifyContent: 'center'
  },
  bottomText: [fontSizeSmallStyle, {
    flex: 1,
    textAlign: 'center'
  }],
  status: [fontSizeXLStyle, {
    textAlign: 'center'
  }],
  successIcon: {
    color: theme.green,
    alignSelf: 'center'
  },
  failureIcon: {
    color: theme.errorColor,
    alignSelf: 'center'
  },
  textContainer: {
    flexDirection: 'row'
  },
  heading: [fontSizeMediumStyle, {
    flex: 1,
    textAlign: 'center',
  }, bold],
  subHeading: [fontSizeSmallStyle, {
    flex: 1,
    textAlign: 'center',
  }],
  
  amount: [fontSizeMediumStyle, bold, {
    flex: 1,
    paddingBottom: 25,
    paddingTop: 20,
    textAlign: 'center'
  }],
  transactionDetails: [fontSizeMediumStyle, bold, {
    flex: 1,
    paddingTop: 25,
    textAlign: 'center'
  }],
  spinnerColor: theme.textLightGrey,
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    right: 0,
    left: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.brand,
    zIndex: 1
  },
  header: [fontSizeMediumStyle, {
    textAlignVertical: 'center',
    color: theme.white,
    paddingHorizontal: 10
  }],
  row: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  halfWidth: {
    flex: 1
  },
  lightText: [light, fontSizeNormalStyle],
  boldCard: [bold, fontSizeNormalStyle],
  greenProgress: theme.qrCouponIcon,
  greyProgress: theme.greyLine,
  greenXXlText: [
    bold,
    fontSizeXXLStyle,
    {
      color: theme.qrCouponIcon,
      textAlign: 'center'
    }
  ],
  couponPointGet: [fontSizeMediumStyle, bold, {
    flex: 1,
    textAlign: 'center'
  }],
  couponPoints: [fontSizeMediumStyle, {
    flex: 1,
    textAlign: 'center'
  }],
  couponGet: [fontSizeLargeStyle, bold, {
    textAlign: 'center',
    color: theme.qrCouponIcon,
  }],
  couponGetBlack: [fontSizeLargeStyle, bold, {
    textAlign: 'center',
    color: theme.black,
  }],
  qrIcon: {
    color: theme.qrCouponIcon,
    textAlign: 'center'
  },
  qrIconText: [
    bold,
    fontSizeLargeStyle,
    {
      color: theme.qrCouponIcon,
      textAlign: 'center'
    }
  ],
  qrIconAmount: [
    bold,
    fontSizeXLStyle,
    {
      textAlign: 'left'
    }
  ],
  greyLineFull: {
    width: width,
    height: 5,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  pointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomContainer: {
    paddingHorizontal: 20
  },
  pointsBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  couponContainer: {
    flexDirection: 'row',
    flex: 1
  },
  iconContainer: {
    flex: 0.45,
    justifyContent: 'center',
    minHeight: 100
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80
  },
  couponValueContainer: {
    flex: 0.55,
    justifyContent: 'center',
    paddingTop: 20,
    minWidth: 200
  },
  couponValueText: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    width: 200,
    height: 80
  },
  additionalPadding: {
    paddingTop: 10
  },
  couponGainedTextContainer: {
    paddingVertical: 20
  },
  errorText: [bold, fontSizeMediumStyle, {
    color: theme.brand,
    flex: 1,
    textAlign: 'center',
  }],
  errorContainer: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  contentWidth: {
    paddingVertical: 20,
    marginTop: -10,

  },
  subHeadingCustom: [fontSizeSmallStyle, {
    flex: 1,
    textAlign: 'center',
  }],

};
