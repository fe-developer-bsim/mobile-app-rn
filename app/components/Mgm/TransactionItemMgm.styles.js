import {theme} from '../../styles/core.styles';
import {flexRow, fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');


export default {
  container: [{
    paddingVertical: 7.5,
    flex: 1
  },
  flexRow
  ],
  amountContainer: {
    // flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  icon: {
    paddingRight: 20,
    alignSelf: 'center',
    flex: .7
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 2,
    paddingRight: 5,
    marginHorizontal: width * 0.029,
  },
  transactionHeading: {
    // paddingBottom: 5,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.robotoLight,
    color: theme.darkBlue
  },
  transactionDate: [{
    paddingTop: 5
  },
  fontSizeSmallStyle,
  textLightGreyStyle,
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
    marginRight: 10
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
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconDetail: {
    color: theme.black,
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
  row: {
    flexDirection: 'row',
  },
  pictureIcon: {
    // alignSelf: 'center',
    width: 35,
    height: 35,
  },
  rowIcon: {
    flexDirection: 'row',
  },
  detailsTextContainer: {
    paddingLeft: 15
  },
  secondPage: {
    paddingRight: 15,
  },
  detailsContainerInviting: {
    justifyContent: 'center',
    flex: 2,
    paddingRight: 5,
    marginHorizontal: width * 0.049,
  },
  poinContainer: {
    justifyContent: 'center',
  },
  poinCredit: {
    color: theme.green
  },
  poinDebit: {
    color: theme.red
  }
};
