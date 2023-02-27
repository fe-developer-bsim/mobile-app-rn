import {theme} from '../../styles/core.styles';
import {contentContainerStyle, textLightGreyStyle, textAlignCenter} from '../../styles/common.styles';

const formHeader = {
  fontWeight: theme.fontWeightMedium,
  paddingBottom: 0,
  fontSize: theme.fontSizeNormal
};

const row = {
  paddingVertical: 10
};

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', paddingBottom: 10}],
  formContainer: {
    flex: 1,
    paddingBottom: 10
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
  row,
  interestInfoStyles: {
    borderWidth: 1,
    paddingVertical: 15,
    borderColor: theme.grey,
    marginTop: 20
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
  buttonNext: {
    paddingVertical: 10,
    paddingBottom: 30
  },
  textTermCondition: {
    textDecorationLine: 'underline',
    paddingLeft: 20,
    paddingVertical: 10,
  },
  rowCheckbox: {
    marginTop: 10,
    flexDirection: 'row'

  },
  colorCheckbox: {
    color: theme.brand,
  },
  containerBanner: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerTrfTitle: {
    paddingVertical: 10
  },
  transferTitle: {
    color: theme.black,
    marginHorizontal: 20,
    fontSize: 16,
  },
};
