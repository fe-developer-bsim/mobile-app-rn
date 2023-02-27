import {contentContainerStyle, fontSizeXLStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle, {
    backgroundColor: theme.white, 
    flexGrow: 1,
  }],
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 3
  },
  leftPart: {
    paddingRight: 35
  },
  midPart: {
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginVertical: 5
  },
  leftPart2: {
  },
  rightPart2: {
  },
  titleBuy: {
    marginVertical: 10
  },
  textBuy: [fontSizeXLStyle, {

  }]
};
