import {contentContainerStyle, fontSizeXLStyle, fontSizeLargeStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle, {
    backgroundColor: theme.white, 
    flexGrow: 1,
  }],
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 3
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftPart: {
    paddingRight: 35
  },
  midPart: {
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginVertical: 20
  },
  leftPart2: {
  },
  rightPart2: {
  },
  titleBuy: {
    marginVertical: 10
  },
  textBuy: [fontSizeXLStyle, {
  }],
  rightPart3: [fontSizeXLStyle, {
  }],
  leftPart3: [fontSizeLargeStyle, {
  }],
  depreturn: [fontSizeLargeStyle, {
    color: theme.lightGrey,
    paddingVertical: 5,
  }],
  iconView: {
    marginRight: 10
  },
  imageFlight: {
    width: 40,
    height: 40
  },
  airlineTxt: {},
  typeTxt: {
    color: theme.lightGrey,
    marginVertical: 2
  },
  mv5: {marginVertical: 5},
  flNumberTxt: [bold, {
    marginTop: -19,
  }],
};
