import {theme} from '../../styles/core.styles';
import {contentContainerStyle, fontSizeSmallStyle, textLightGreyStyle, textAlignCenter, fontSizeMediumStyle} from '../../styles/common.styles';
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
  container: [contentContainerStyle],

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  textInputContainerPadding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.softGrey,
    borderRadius: 5,
    height: 50,
    marginVertical: 20  
  },

  greyLine: {
    backgroundColor: theme.greyLine,
    height: 2,
    width: width,
    marginTop: 10
  },

  rpText: [bold, {
    fontSize: theme.fontSize20,
    marginLeft: 10,
    marginRight: -15,
    color: theme.black
  }],

  amountField: [bold, {
    textAlign: 'center',
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize,
    fontFamily: 'roboto',
    color: theme.black
  }],

  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    fontWeight: 'bold'
  },
  bgSearch: {
    marginTop: 20
  },
  searchTxtInput: {
    flex: 0.5,
  },
  titleText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSize22,
    color: theme.black
  },
  box: {
    borderWidth: 1,
    borderColor: theme.grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  amount: {
    color: theme.amount,
  },
  mr10: {
    marginRight: 10
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
    fontSize: theme.fontSizeMedium,
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
  rowDataMerchant: {
    marginTop: 10
  },
  spaceLabel: {
    paddingVertical: 10,
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
    padding: 20
  }
};
