import {fontSizeXLStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  row: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  textTittle: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingVertical: 20
    }
  ],
  textTittle1: [
    fontSizeXLStyle,
    {
      color: theme.black,
      paddingVertical: 20
    }
  ],
  textMessage: [
    fontSizeLargeStyle,
    {
      color: theme.black,
      paddingVertical: 20
    }
  ],
  textFooter: [
    fontSizeLargeStyle,
    {
      // color: theme.black,
    }
  ],
  viewFooter: {
    paddingTop: 150,
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonNext: {
    marginTop: 40
  },
  viewTittle1: {
    alignItems: 'center',
  },
  imageTop: {
    alignItems: 'center',
  },
  viewMessage: {
    alignItems: 'center',
  }

};
