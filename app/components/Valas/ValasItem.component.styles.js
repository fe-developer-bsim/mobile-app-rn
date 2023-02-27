import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold, fontSizeXSStyle, textBrandStyle, contentContainerStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = (width - 40);

export default {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white,
  },
  containerContent: {
    backgroundColor: theme.white,
  },
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
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 10,
  },
  imageSize: {
    alignItems: 'center',
    aspectRatio: 1.3,
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
  brandPadding: {
    paddingBottom: 10
  },
  brandContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  brand: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'Roboto',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  emptyCartImage: {
    height: 170,
    width: 230
  },
  content: {
    backgroundColor: 'transparent',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  wrapCoupon: {
    alignItems: 'center',
    width: trueWidth / 3,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 3,
    marginHorizontal: 20
  },
  descriptionHeading: [{
    color: theme.lightGrey,
    fontWeight: theme.fontWeightBold
  },
  fontSizeNormal,
  ],
  heading: {
    fontSize: theme.fontSize22,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  dateText: [{
    color: theme.lightGrey,
    paddingLeft: 20,
    paddingVertical: 20
  },
  fontSizeNormal,
  ],
  dateTextBold: [{
    color: theme.lightGrey,
    paddingVertical: 20
  },
  fontSizeNormal,
  bold
  ],
  container2: [contentContainerStyle],
  bottomSpacing: {
    paddingVertical: 30
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  explainIcon: {
    color: theme.black
  },
  containExplantionRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    width: width - 100,
    marginLeft: 10
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  buttonLargeTextStyle: {
    color: theme.white
  },
  spaceLine: {
    height: 40,
  },
  containerBanner: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerTrfTitle: {
    paddingVertical: 10,
    paddingBottom: 20
  },
  transferTitle: {
    color: theme.black,
    marginHorizontal: 20,
    fontSize: 16,
  },
};
