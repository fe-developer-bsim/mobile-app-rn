import {contentContainerStyle, fontSizeXLStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle, {
    backgroundColor: theme.cardGrey, 
    flexGrow: 1,
  }],
  titleTxt: [fontSizeXLStyle, bold, {
    paddingVertical: 20
  }],
  subtitleTxt: {
    color: theme.lightGrey,
    paddingVertical: 5
  }
};
