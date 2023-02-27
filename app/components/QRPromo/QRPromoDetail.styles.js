import {theme} from '../../styles/core.styles';
import {bold, fontSizeMediumStyle, fontSizeXLStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width;
const trueHeight = (trueWidth * 7) / 16;

export default {
  container: {
    padding: 20,
    backgroundColor: theme.containerGrey
  },
  imageSize: {
    width: trueWidth - 40,
    height: trueHeight
  },
  subtitle: {
    fontSize: theme.fontSizeMedium,
  },
  details: {
    fontSize: theme.fontSizeNormal,
  },
  detailsGrey: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey
  },
  detailsBold: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightMedium
  },
  validDate: {
    fontSize: theme.fontSizeNormal,
    paddingVertical: 20
  },
  detailContainer: {
    backgroundColor: theme.white,
    flex: 1,
  },
  infoContainer: {
    padding: 20
  },
  additionalPadding: {
    padding: 10
  },
  additionalPaddingSmall: {
    padding: 5
  },
  additionalPaddingXS: {
    padding: 2
  },
  tabbar: {
    backgroundColor: theme.white,
  },
  indicator: {
    backgroundColor: theme.brand,
  },
  tabTextActive: {
    color: theme.black
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
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80
  },
  qrIconText: [
    bold,
    fontSizeLargeStyle,
    {
      color: theme.qrCouponIcon,
      textAlign: 'center'
    }
  ],
  couponValueContainer: {
    flex: 0.55,
    justifyContent: 'center',
    paddingTop: 20
  },
  couponValueText: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    width: 200,
    height: 80
  },
  qrIconAmount: [
    bold,
    fontSizeXLStyle,
    {
      textAlign: 'left'
    }
  ],
  pointsBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  greenProgress: theme.qrCouponIcon,
  greyProgress: theme.greyLine,
  couponGainedTextContainer: {
    paddingVertical: 20
  },
  qrIcon: {
    color: theme.qrCouponIcon,
    textAlign: 'center'
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    paddingTop: 20
  },
  greyLineFull: {
    borderTopWidth: 1,
    borderColor: theme.greyLine
  },
  outletsContainer: {
    backgroundColor: theme.white,
    flex: 1,
    paddingHorizontal: 5
  },
  outletAddress: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey
  },
  outletName: [
    bold,
    {
      color: theme.black,
    }
  ],
  outletContainer: {
    paddingTop: 15
  },
  outletDetailContainer: {
    paddingHorizontal: 10
  },
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1
  },
  couponPoints: [fontSizeMediumStyle, {
    flex: 1,
    textAlign: 'center',
    zIndex: 1
  }],
  promoAmountContainer: {
    backgroundColor: theme.brand,
    padding: 5,
    justifyContent: 'center',
  },
  discountType: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    fontWeight: theme.fontWeightMedium
  },
  discountAmount: {
    color: theme.white,
    fontWeight: theme.fontWeightBold
  },
  qrTag: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  qrTagText: {
    color: theme.qrPromoTurqoise,
    fontWeight: theme.fontWeightBold,
    fontStyle: 'italic'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  }
};
