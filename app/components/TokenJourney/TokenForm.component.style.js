import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, textLightGreyStyle, textAlignCenter, contentContainerStyle} from '../../styles/common.styles';
import {bold, fontSizeLargeStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const formHeader = {
  fontWeight: theme.fontWeightMedium,
  paddingBottom: 0,
  fontSize: theme.fontSizeNormal
};

const row = {
  paddingVertical: 0
};

export default {
  rowAcc: {
    marginTop: 0

  },
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  container: [contentContainerStyle],
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeLarge,
    color: theme.black
    
  },
  titleText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
    color: theme.black
  },
  labelSpacing: {
    paddingVertical: 10
  },
  box: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  greyLineLast: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7
  },
  robotoLight: {
    fontFamily: theme.robotoLight,
    color: theme.black
  },
  dateText: [bold, {
    fontFamily: 'Roboto',
    color: theme.black
  }],
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  wallet: {
    color: theme.wallet
  },
  mr10: {
    marginRight: 10
  },
  accNo: [bold, {
    color: theme.black
  }],
  product: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  more: {
    color: theme.grey,
    marginLeft: 3,
    marginBottom: 5
  },
  purchase: {
    color: theme.purchase,
  },
  amount: {
    color: theme.amount,
  },
  amountText: [bold, fontSizeLargeStyle, {
    fontFamily: 'Roboto',
    color: theme.black
  }],
  plus: {
    color: theme.black
  },
  subHeader: {
    fontFamily: theme.robotoLight,
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  value: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  formHeader,
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall
  },
  formHeaderWithSpace: [
    formHeader
  ],
  availableBalanceText: [
    textLightGreyStyle,
    {
      fontSize: theme.fontSizeNormal,
      paddingTop: 5
    }
  ],
  noteMarker: {
    color: theme.red,
    fontSize: theme.fontSizeLarge,
    paddingTop: 10,
    paddingRight: 10
  },
  note: {
    flexDirection: 'row'
  },
  textInfoCenter: [
    textAlignCenter, {
      color: theme.textGrey
    }
  ],
  warningHoliday: [
    row, {
      height: 90,
    }
  ],
  rowCheckbox: {
    marginTop: 10,
    flexDirection: 'row'
    
  },
  colorCheckbox: {
    color: theme.brand,
    
  },
  spaceLabel: {
    paddingVertical: 10,
  },
  spaceBot: {
    paddingVertical: 7,
  },

  buttonNext: {
    marginBottom: 20
  },
  nextButton: {
    color: 'white'
  },
  redText: [fontSizeSmallStyle, {
    color: theme.brand,
    fontFamily: 'Roboto'
  }],
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  rowError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  mt5: {
    marginTop: 5
  },
  verticalSpacing: {
    marginBottom: 20,
    paddingVertical: 20
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
    marginTop: 20
  },
  explainIcon: {
    color: theme.black
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 10,
    width: width - 100,
  },
  roboto: {
    fontFamily: 'roboto',
  },
};
