import {contentContainerStyle, fontSizeXLStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],
  titles: [fontSizeXLStyle, {
  }],
  titles2: [fontSizeXLStyle, {
    marginBottom: 15,    
  }],
  formContainer: {
    flex: 1,
  },
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'flex-end',
  },
  grey: {
    color: 'grey',
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  gray: {
    color: 'grey',
  },
  containerBtn: {
    paddingTop: 20,    
    paddingHorizontal: 20,
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
};
