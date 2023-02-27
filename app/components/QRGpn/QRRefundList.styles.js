import {fontSizeXLStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
  },
  bgWhiteList: {
    backgroundColor: theme.white,        
    paddingHorizontal: 15,
    height: 120,
    justifyContent: 'center',  
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textAmount: [fontSizeXLStyle, bold, {
    marginVertical: 5,
  }],
  date: {
    marginTop: 10,
    color: theme.softGrey
  },
  arrowIcon: {
    color: theme.brand,
    marginTop: 20,
  },
  txtAmount: [fontSizeXLStyle, bold, {
    marginVertical: 5,
    color: theme.softGrey
  }],
  txtUsed: {
    backgroundColor: theme.opacityBrand,
    color: theme.white,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  txtRefund: {
    color: theme.softGrey
  },
  arrowIconUsed: {
    color: theme.opacityBrand,
    marginTop: 20,
  },
};