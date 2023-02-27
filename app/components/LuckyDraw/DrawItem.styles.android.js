import {theme} from '../../styles/core.styles';
import {fontSizeSmallStyle, fontSizeNormal, textLightGreyStyle, bold} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = trueWidth / 2.5;

export default {
  offerContainer: {
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: theme.contrast,
    justifyContent: 'space-between',

    elevation: 2,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  detailsContainer: {
    paddingRight: 5,
    paddingLeft: 15,
    paddingVertical: 10
  },
  headerContainer: {
    backgroundColor: theme.brand,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: theme.transparent,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  headingCode: [{
    fontFamily: 'Roboto',
    color: theme.white,
    backgroundColor: theme.transparent
  },
  fontSizeNormal,
  bold],
  transactionHeading: [{
    paddingBottom: 10,
  },
  fontSizeNormal,
  textLightGreyStyle,
  ],
  transactionDate: [{
    textDecorationLine: 'underline',
  },
  fontSizeSmallStyle,
  ],
  PeriodeDate: [{
    paddingBottom: 10,
  },
  fontSizeSmallStyle,
  textLightGreyStyle,
  ],
  containerItem: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 55
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.disabledGrey,
    paddingVertical: 5,
    marginHorizontal: 15
  },
  touchableRowUndian: {
    alignItems: 'center',
    height: 40,
    borderColor: theme.white,
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  touchableRowUnduh: {
    borderColor: theme.white,
    flex: 2,
    borderWidth: 0.5,
    paddingRight: 5,
    flexDirection: 'row',
  },
  textstyle: {
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  sumUndianstyle: {
    alignItems: 'flex-start',
  },
  styleMessage: [
    bold,
    {
      fontSize: 15,
      color: theme.black}
  ],
  iconStyle: {
    color: theme.black
  },
  styleTextNumber: [
    bold,
    {
      fontSize: 18,
      color: theme.brand}
  ],
  styleText: [
    fontSizeSmallStyle,
    textLightGreyStyle,
  ],
  styleText2: [{
    textDecorationLine: 'underline',
    marginTop: 3
  },
  fontSizeSmallStyle,
  textLightGreyStyle
  ],
  greyLineVertical: {
    borderRightWidth: 1,
    borderColor: theme.disabledGrey,
    paddingHorizontal: 5,
    marginBottom: 8
  },
  dialogStyle: {
    backgroundColor: theme.white,
  },
  modalStyle: {
    elevation: 2,
    backgroundColor: theme.black,
    opacity: 0.8,
  },
  iconContainer: {
    paddingHorizontal: 10,
    marginTop: 8
  },
  iconContainer2: {
    paddingHorizontal: 10
  },
  rowText: {
    flexDirection: 'row',
  },
  iconDetail: {
    color: theme.white
  },
  flexEnd: {
    flex: 1,
    alignItems: 'flex-end'
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  imageOffer2: {
    width: trueWidth,
    height: trueHeight
  },
  paddingRight: {
    paddingLeft: 10
  }
};
