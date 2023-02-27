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
    marginVertical: 10,
    backgroundColor: theme.contrast
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
  headingCode: [{
    paddingBottom: 5,
  },
  textBrandStyle,
  fontSizeNormal,
  bold
  ],
  transactionHeading: [{
    paddingBottom: 5,
  },
  fontSizeNormal,
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
    textLightGreyStyle, {
      fontFamily: 'Roboto'
    }
  ],
  informationVoucher: [{
    paddingTop: 20,
    fontFamily: 'Roboto'
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderRadius: 100,
  },
  noofferImage: {
    paddingTop: 110,
    alignItems: 'center',
    borderColor: theme.disabledGrey,
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  imageSize: {
    alignItems: 'center',
    aspectRatio: 1.35,
    height: 170,
    width: 170,
    justifyContent: 'center',
  },
  offerImage: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  imageSizeicon: {
    width: 70,
    height: 70
  },
  headerVoucher: [{
    paddingVertical: 10,
    paddingLeft: 10
  },
  fontSizeNormal,
  bold
  ],
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  pageContainer: {
    backgroundColor: theme.superlightGrey,
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
};
