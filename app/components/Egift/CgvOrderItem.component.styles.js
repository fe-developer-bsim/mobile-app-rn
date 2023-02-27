import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold, fontSizeXSStyle, textBrandStyle} from '../../styles/common.styles';

export default {
  container: [{
    paddingVertical: 7.5,
    flex: 1
  },
  flexRow
  ],
  amountContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.disabledGrey,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: theme.contrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  icon: {
    paddingRight: 20,
    alignSelf: 'center',
    flex: .7
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingRight: 5,
    paddingLeft: 15,
    borderRadius: 3,
  },
  headingCode: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeXS,
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    paddingBottom: 10
  },
  code: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeXS,
    fontWeight: theme.fontWeightLight,
    color: theme.brand
  },
  bookingHeading: [{
    paddingBottom: 5,
    fontSize: 18
  },
  textBrandStyle,
  bold
  ],
  datePurchase: [{
    alignItems: 'flex-end',
    paddingLeft: 50,
    paddingRight: 5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  fontSizeXSStyle,
  textLightGreyStyle,
  ],
  transactionDate: [
    fontSizeSmallStyle,
    textLightGreyStyle,
  ],
  informationVoucher: [{
    paddingTop: 20,
  },
  fontSizeSmallStyle,
  textLightGreyStyle,
  ],
  statusSuccess: {
    color: theme.green
  },
  statusFailure: {
    color: theme.primaryUnHighlighted
  },
  amount: fontSizeNormal,
  iconSecondPage: {
    alignItems: 'flex-end',
    paddingLeft: 190,
    paddingRight: 5
  },

  iconDetail: {
    color: theme.black
  },
  offerImage: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  imageSizeicon: {
    width: 75,
    height: 50,
  },
  voucherNameHeading: [{
    paddingTop: 10,
    paddingBottom: 5,
  },
  fontSizeNormal,
  bold
  ],
  LocationName: [{
    paddingBottom: 5,
  },
  fontSizeSmallStyle,
  ],
};
