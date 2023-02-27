import {fontSizeLargeStyle, contentContainerStyle, fontSizeXLStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  halfWidth: {
    flex: 1
  },
  bgGrey: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.cardGrey,
  },
  scrollContainer: {
    paddingTop: 5,
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.cardGrey,        
  },
  txt: {
    color: theme.lightGrey,
    alignSelf: 'center',
  },
  buttonText: {
    color: theme.white
  },
  buttonAgree: {
    paddingHorizontal: 20
  },
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
  containerBtn: {
    paddingTop: 20,    
    paddingHorizontal: 20,
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  txtUsed: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  txtBold: [bold],
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  merchantText4: [fontSizeLargeStyle, {
    color: theme.white    
  }],
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.cardGrey
  },
  tabContainerEmpty: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.cardGrey
  },
  tabText: {
    fontWeight: theme.fontWeightBold,
    fontSize: 16,
  },
  emptyText: {
    paddingTop: 250,
  },
  containerEmpty: {
    backgroundColor: theme.white
  }
};
