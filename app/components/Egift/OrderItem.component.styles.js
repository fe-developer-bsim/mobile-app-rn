import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold, fontSizeXSStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  amountContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  offerContainer: {
    borderColor: theme.greyLine,
    marginVertical: 10,
    backgroundColor: theme.white,
    paddingTop: 10,
    borderRadius: 10,
    width: width - 40,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    alignItems: 'center',
  },
  icon: {
    paddingRight: 20,
    alignSelf: 'center',
    flex: .7
  },
  detailsContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    width: width - 130,
    flex: 1,
  },
  headingCode: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeXS,
    fontWeight: theme.fontWeightLight,
    color: theme.darkBlue,
    paddingBottom: 10
  },
  code: {
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeXS,
    fontWeight: theme.fontWeightLight,
    color: theme.darkBlue,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  transactionHeading: [{
    color: theme.darkBlue,
  },
  fontSizeNormal,
  ],
  transactionHeading2: [{
    color: theme.darkBlue,
    flex: 1,
  },
  fontSizeNormal,
  ],
  transactionHeadingEvoucher: [{
    width: 175,
    color: theme.darkBlue,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDetail: {
    color: theme.black,
    paddingRight: 10,
  },
  offerImage: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: theme.greyLine,
    borderRadius: 5

  },
  imageSizeicon: {
    width: 80,
    height: 80
  },
  imageSizeIconContain: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  codePin: {
    borderRadius: 10,
    backgroundColor: theme.greyLine,
    borderColor: theme.greyLine,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyIcon: {
    color: theme.red,
    paddingRight: 5,
    paddingVertical: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 10,
  },
  row2: {
    flexDirection: 'row',
    flex: 1,
  },
  textPin: [{
    maxWidth: 150,
    paddingHorizontal: 10,
    color: theme.darkBlue,
  },     
  fontSizeNormal,
  bold
  ],
  offerDetails: {
    margin: 10,
    paddingTop: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.greyLine,
    justifyContent: 'space-between',
  },
  label: {
    marginHorizontal: 10,
    fontSize: theme.fontSizeSmall
  },
  labelValidDate: {
    color: theme.white,
    maxWidth: '95%',
  },
  rowDate: {
    flexDirection: 'row'
  },
  uriImage: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  imageSizeiconURL: {
    width: 80,
    height: 80,
    justifyContent: 'center'
  },
  whiteText: {
    color: theme.white,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5B52B',
    borderRadius: 20,
    padding: 5,
    paddingRight: 10,
    maxWidth: '95%',
  },
  timeIcon: {
    color: theme.white,
    marginRight: 5,
  },
  moreButton: {
    padding: 5,
  },
  moveButton2: {
    position: 'absolute',
    right: 15,
    top: 25,
    padding: 5,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: theme.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 1,
  },
  expireBadge: {
    resizeMode: 'contain',
    width: 91, // original: 364
    height: 30, // original: 120
    position: 'absolute',
    top: 10,
    left: -8.5,
  }
};
