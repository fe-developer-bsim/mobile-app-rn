import {theme} from '../../styles/core.styles';
import {bold, fontSizeNormalStyle, fontSizeXLStyle, fontSizeLargeStyle} from '../../styles/common.styles';

export default {
  infoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: theme.white,
    overflow: 'hidden'
  },
  additionalPadding: {
    padding: 10
  },
  indicator: {
    backgroundColor: theme.brand,
  },
  couponContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 0.45,
    justifyContent: 'center',
    minHeight: 60
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 60
  },
  iconText: {
    position: 'absolute',
    top: 0,
    right: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 60
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
    justifyContent: 'center'
  },
  couponValueText: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    width: 200,
    height: 60
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
    paddingBottom: 10,
    paddingTop: 15,
    backgroundColor: theme.greyLine
  },
  greenProgress: theme.qrCouponIcon,
  greyProgress: theme.greyLine,
  qrIcon: {
    color: theme.qrCouponIcon,
    textAlign: 'center'
  },
  borderedView: {
    borderWidth: 1,
    borderColor: theme.darkGrey,
    borderRadius: 3,
    overflow: 'hidden'
  },
  textContainer: {
    paddingVertical: 5
  },
  titleTextContainer: {
    paddingTop: 5,
    paddingBottom: 15
  },
  couponHave: [
    fontSizeNormalStyle,
    bold
  ],
  couponDontHave: [
    fontSizeNormalStyle,
    bold,
    {
      color: theme.textGrey
    }
  ],
  borderInfoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: theme.white,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: theme.darkGrey
  },
};
