import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle} from '../../styles/common.styles';


export default {
  container: [{
    paddingVertical: 7.5,
    flex: 1
  },
  flexRow
  ],
  amountContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: 20,
    alignSelf: 'center',
    backgroundColor: '#f9f8fd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 2,
    paddingRight: 5,
  },
  transactionHeading: {
    paddingBottom: 5,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.robotoLight,
    color: theme.darkBlue,
  },
  transactionDate: [
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  statusSuccess: {
    fontFamily: 'roboto',
    color: theme.darkGreen,
    fontWeight: theme.fontWeightBold,
  },
  statusFailure: {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
  },
  iconSuccess: {
    fontFamily: 'roboto',
    color: theme.darkGreen,
    fontWeight: theme.fontWeightNormal,
    transform: [{rotate: '180deg'}],
  },
  iconFailure: {
    fontFamily: 'roboto',
    color: theme.radicalRed,
    fontWeight: theme.fontWeightNormal,
  },
  amount: [fontSizeNormal, {
    fontFamily: 'roboto'
  }],
  iconSecondPage: {
    alignSelf: 'center',
    paddingLeft: 25,
    paddingRight: 5
  },
  iconDetail: {
    color: theme.pinkBrand
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    flex: 1,
    height: 1,
    marginVertical: 10
  },
  amountSaving: [fontSizeNormal, {
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold
  }],
  iconFailedAutoDebit: {
    fontFamily: 'roboto',
    color: theme.radicalRed,
    fontWeight: theme.fontWeightBold,
    paddingHorizontal: 6,
  },
  successAutoDebitAmount: {
    fontFamily: 'roboto',
    color: theme.radicalRed,
    fontWeight: theme.fontWeightBold,
  },
  containerPosted: {
    paddingVertical: 7.5,
    flex: 1,
    flexDirection: 'column',
  },
  arrowIcon: {
    color: theme.brand
  },
  arrowContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 10
  },
  amountContainerCC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amountContainerCCP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 20
  },
};
