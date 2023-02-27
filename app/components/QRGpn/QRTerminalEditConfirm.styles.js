import {fontSizeXLStyle, contentContainerStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],  
  row: {
    flexDirection: 'row',
  },
  containerText: {
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
  headText: {
    color: 'grey',
    marginBottom: 3,
  },
  titles2: [fontSizeXLStyle, {
    marginVertical: 20,
  }],
  titles3: [fontSizeXLStyle, {
    marginTop: 20,
  }],
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonNext: {
    paddingTop: 20,    
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 15,
    color: 'black'
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  titles: [fontSizeXLStyle, {
  }],
};
