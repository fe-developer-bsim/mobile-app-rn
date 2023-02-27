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
  textTittle1: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingTop: 10,
    }
  ],
  textTittle2: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingTop: 30,
    },
  ],
  containerFieldACC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  textAccCashback: {
    paddingVertical: 8
  },
  textAccAmount: {
    color: theme.red,
    fontSize: 20,
  },
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20
  },
  buttonNext: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  smallText: {
    fontSize: 10,
  }
};
