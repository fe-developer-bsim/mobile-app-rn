import {flex_1, cardVerticalSpacingStyle, textLightGreyStyle, fontSizeMediumStyle, fontSizeNormalStyle, buttonLargeTextStyle, bold, fontSizeLargeStyle, fontSizeXLStyle, borderGreyStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {
    paddingVertical: 20
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40
  },

  title: [
    fontSizeMediumStyle,
    bold
  ],

  subTitle: [
    fontSizeNormalStyle,
    bold
  ],

  availableBalanceText: [
    fontSizeNormalStyle, textLightGreyStyle
  ],

  verticalSpacing: cardVerticalSpacingStyle,

  halfWidth: flex_1,

  nextButton: buttonLargeTextStyle,

  formHeader: {
    fontWeight: theme.fontWeightMedium,
    marginTop: 25,
    marginBottom: 0,
    fontSize: theme.fontSizeNormal,
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  rowItem: {flexDirection: 'row', paddingVertical: 10},
  titleText: [cardVerticalSpacingStyle, bold, fontSizeLargeStyle],
  halfWidthRow: {
    flex: 1
  },
  rowItemRight: {alignSelf: 'flex-end'},
  rightItemHeader: {fontWeight: theme.fontWeightMedium},
  blackMediumText: [fontSizeMediumStyle, {
    color: theme.black
  }],
  blackLargeText: [fontSizeLargeStyle, {
    color: theme.black
  }],
  greenLargeText: [fontSizeLargeStyle, {
    color: theme.qrCouponIcon
  }],
  redLargeText: [
    fontSizeLargeStyle,
    bold, {
      color: theme.brand
    }],
  redItalicLargeText: [
    fontSizeLargeStyle,
    bold, {
      fontStyle: 'italic',
      color: theme.brand
    }],
  rightItemContainer: {
    flexDirection: 'row'
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  buttonContainer: {
    paddingHorizontal: 20
  },
  greyLineFull: {
    width: width,
    height: 5,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  greyLine: {
    width: width - 40,
    height: 1,
    backgroundColor: theme.lightGrey
  },
  qrIcon: {
    color: theme.qrCouponIcon,
    textAlign: 'center'
  },
  qrCouponContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrAmountContainer: {
    paddingRight: 60
  },
  qrAmountText: [
    fontSizeXLStyle,
    bold,

  ],
  qrCouponBackBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.greyLine,
  },
  couponButtonDisabled: [
    fontSizeLargeStyle,
    bold,
    {
      color: theme.textGrey,
      paddingVertical: 20
    }
  ],
  couponButton: [
    fontSizeLargeStyle,
    bold,
    {
      paddingVertical: 20
    }
  ],
  couponText: {
    textAlign: 'center',
    paddingVertical: 20
  },
  selectedCouponText: [
    fontSizeXLStyle,
    bold,
    {
      color: theme.black
    }
  ]
  ,
  couponAmountText: [
    fontSizeXLStyle,
    bold,
    {
      color: theme.textGrey
    }
  ],
  couponPadding: {
    paddingHorizontal: 20
  },
  couponTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  couponTitle: {
    paddingBottom: 20
  },
  greenSmallText: [
    fontSizeMediumStyle,
    {
      color: theme.qrCouponIcon
    },
  ],
  redSmallText: [
    bold, {
      fontSize: theme.fontSizeSmall,
      color: theme.brand
    }
  ],
  qrCouponTitleBold: [bold, fontSizeLargeStyle, fontSizeXLStyle],
  qrCouponTitle: [fontSizeLargeStyle, fontSizeXLStyle],
  containerBorder:
    [borderGreyStyle, {borderWidth: 1, borderColor: theme.greyLine}],
  icon: {
    position: 'absolute',
    top: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80
  },
  qrIconText: [
    bold,
    {
      color: theme.qrCouponIcon,
      textAlign: 'center',
      fontSize: theme.fontSizeXL
    }
  ],
  iconContainer: {
    flex: 0.45,
    justifyContent: 'center',
    minHeight: 80
  },

};
