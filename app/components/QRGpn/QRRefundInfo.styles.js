import {contentContainerStyle, fontSizeXLStyle, fontSizeLargeStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],    
  container: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  infoTxt1: [fontSizeXLStyle, {
  }],
  txtContainer: {
    marginVertical: 5
  },
  infoTxt3: {
    color: theme.lightGrey,
  },
  infoTxt4: [bold, {
    marginTop: 3,
    marginBottom: 20
  }],
  boxTxt2: {
    marginVertical: 3
  },
  boxCode: [fontSizeLargeStyle, {
    backgroundColor: theme.cardGrey,
    padding: 13,
    marginVertical: 18
  }],
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  copyIcon: {
    color: theme.red,
    padding: 10,
    marginVertical: 15,
  },
  copyIconUsed: {
    color: theme.grey,
    padding: 10,
    marginVertical: 15,
  },
  redTxt: [bold, {
    color: theme.red,
  }],

};
