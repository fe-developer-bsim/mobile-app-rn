import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold, flexRow} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey,
    marginTop: 20,
    textAlign: 'center'
  },
  containerBillpay3: {
    backgroundColor: theme.white,
    borderRadius: 10,
    marginHorizontal: width * 0.049,
    marginBottom: 100

  },
  containerRowServiceBillpay: {
    borderColor: theme.disabledGrey,
    marginHorizontal: 5,
    marginBottom: -10,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textBillPayStyleBL: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    textstyle: bold,
    marginBottom: 36,
    marginTop: 10,
    fontSize: theme.fontSizeMedium
  },
  styleMessage: [
    bold,
    {
      fontSize: 16,
      color: theme.darkBlue}
  ],
  icon: {
    paddingRight: 20,
    alignSelf: 'center',
    flex: .7
  },
  statusSuccess: {
    fontFamily: 'roboto',
    color: theme.darkGreen,
    fontWeight: theme.fontWeightNormal,
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingRight: 5,
  },
  transactionHeading: {
    paddingBottom: 5,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.robotoLight
  },
  transactionDate: [
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  amountContainer: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  amountSaving: [fontSizeNormal, {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold
  }],
  greyLine: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 10
  },
  container: [{
    paddingVertical: 7.5,
    flex: 1,
    marginHorizontal: 20
  },
  flexRow
  ],
  statusFailure: {
    fontFamily: 'roboto',
    color: theme.brand,
    fontWeight: theme.fontWeightNormal,
  },
  textBillPayStyleBL2: {
    paddingHorizontal: 5,
    paddingLeft: 10,
    textstyle: bold,
    marginBottom: 36,
    marginTop: 10,
    fontSize: theme.fontSizeMedium,
    alignSelf: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 10
  },
  filterIcon: {
    paddingLeft: 10,
    color: theme.darkBlue,
    marginRight: 5
  },
  exportIcon: {
    paddingLeft: 10,
    color: theme.darkBlue
  },
  iconSuccess: {
    fontFamily: 'roboto',
    color: theme.darkGreen,
    fontWeight: theme.fontWeightNormal,
    transform: [{rotate: '180deg'}]
  },
  iconFailure: {
    fontFamily: 'roboto',
    color: theme.radicalRed,
    fontWeight: theme.fontWeightNormal,
  },
};
