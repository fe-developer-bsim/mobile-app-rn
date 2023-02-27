import {fontSizeXLStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  row: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  containerText: {
    paddingHorizontal: 20,
    paddingVertical: 10

  },
  textTittle1: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingTop: 10
    }
  ],
  textTittle2: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingTop: 30
    }
  ],
  containerFieldACC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  textAccCashback: {
    paddingVertical: 8
  },
  textAccAmount: {
    color: theme.red,
    fontSize: 20
  },
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20
  },
  buttonNext: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 15,
    color: 'black'
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  containtextExplanation: {
    alignItems: 'center',
    paddingVertical: 20
  }
};
