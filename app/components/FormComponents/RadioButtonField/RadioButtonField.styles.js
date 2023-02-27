import {theme} from '../../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  optionStyle: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  buttonStyleSelect: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.brand,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDisabled: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.textGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailContainer: {
    paddingTop: 10,
    paddingLeft: 20
  },
  buttonActive: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.brand
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: '100'
  },
  textStyleDisabled: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    color: theme.textGrey,
    fontWeight: '100'
  },
  smallGreyText: {
    color: theme.textGrey,
    fontSize: theme.fontSizeSmall,
    paddingRight: 5,
    fontWeight: '100',
    textAlign: 'right'
  },
  smallText: {
    fontSize: theme.fontSizeSmall,
    paddingRight: 5,
    fontWeight: '100',
    textAlign: 'right'
  },
  subtextStyle: {
    fontSize: theme.fontSizeSmall,
    paddingRight: 5
  },
  boldTextStyle: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: theme.fontWeightBold
  },
  boldTextDisabled: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: theme.fontWeightBold
  },
  greyLineFull: {
    borderTopWidth: 2,
    borderColor: theme.greyLine,
    marginTop: 20,
    paddingBottom: 10
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 15,
    marginBottom: 10,
  },
  webViewContainer: {
    paddingLeft: 20,
  },
  webViewStyle: {
    height: 90,
  },
  halfWidth: {
    width: (width - 40) / 2
  },
  renderContainerRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  renderContainer: {
    flexWrap: 'wrap',
  },
  optionContainer: {
    paddingHorizontal: 20
  },
  flex2: {
    flex: 2
  },
  flex1: {
    flex: 1
  },
  subtextGreyStyle: {
    fontSize: theme.fontSizeSmall,
    paddingLeft: 5,
    color: theme.lightGrey,
    fontFamily: 'roboto'
  },
  label: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontFamily: 'roboto'
  },
  flex1Skn: {
    flex: 1,
    alignItems: 'flex-end', 
  },
  skn: {
    backgroundColor: theme.brand,
    width: 60,
    height: 20,
    marginBottom: 5,
    alignItems: 'center',     
  },
  sknText: {
    color: theme.white,
    fontFamily: 'roboto',
    textAlign: 'center',    
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightBold
  }
};
