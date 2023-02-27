import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {bold} from '../../styles/common.styles';

export default {
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
  },
  title: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  title2: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeSmall,
    color: theme.black,
  },

  usd: {
    backgroundColor: theme.white,
    borderRadius: 10,
    width: width * 0.9,
    marginBottom: 30,
    borderColor: theme.greyLine,
    borderWidth: 1,
  },
  menu: {
    marginVertical: 20,
  },
  width: {
    width: 40
  },
  menuTitle: [bold, {
    fontSize: theme.fontSizeMedium,
  }],

  menuTxt: {
    fontWeight: theme.fontWeightLight,
  },
  pr80: {
    paddingRight: 1,
    flex: 5,
    justifyContent: 'space-between',
  },
  pr20: {
    color: theme.red
  },
  detailProduk: {
    textDecorationLine: 'underline',
    color: theme.blueAmount,
    fontSize: theme.fontSizeSmall,
    marginTop: 10,
  },
  limitedLabelstyle: {
    height: 90,
    width: 90,
  },
  descTittle: {
    paddingRight: 12,
    justifyContent: 'center',
  },
  imagePress: {
    paddingRight: 1,
    justifyContent: 'center',
  },
  textTittle: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10
  },
  flexIdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    borderRadius: 10,
    width: width * 0.95,
    borderColor: theme.greyLine,
    borderWidth: 1,
    paddingVertical: 10
  },
  flexUsd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    borderRadius: 10,
    width: width * 0.95,
    borderColor: theme.greyLine,
    borderWidth: 1,
    paddingVertical: 10,
    marginBottom: 30,
  },
};