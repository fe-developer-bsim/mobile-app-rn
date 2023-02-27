import {contentContainerStyle, fontSizeXLStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: [contentContainerStyle, {
    backgroundColor: theme.cardGrey,
    flexGrow: 1,
  }],
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  titleTxt: [bold, {
    fontSize: theme.fontSize22
  }],
  subtitleTxt: { 
    color: theme.lightGrey,
    paddingVertical: 10
  },
  simasText: [bold, {
  }],

  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  bgWhite: {
    backgroundColor: theme.white,
    marginVertical: 5,
    paddingVertical: 10
  },
  bgWhiteSimpo: {
    backgroundColor: theme.white,
    marginVertical: 5,
    paddingVertical: 15
  },
  bgGreySimpo: {
    backgroundColor: theme.white,
    marginVertical: 5,
    paddingVertical: 15,
    opacity: 0.4
  },
  iconContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1.7,
  },
  simasTxt: [fontSizeMediumStyle, {
    color: theme.brand,
    fontWeight: '900'
  }],
  imageOffer: {
    width: 50,
    height: 18
  },
  poinImage: {
    height: 15,
    width: 40
  },
  pad2: {
    paddingVertical: 1
  },
  pad2new: {
    flex: 1,
    alignItems: 'flex-start', 
    paddingVertical: 1,
    flexDirection: 'row'
  },
  accTxt: [fontSizeXLStyle, {
    fontWeight: '800'
  }],
  balanceTxt: {
    color: theme.lightGrey,
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardIcon: {
    color: theme.red
  },
  arrowIcon: {
    paddingRight: 15,
    color: theme.red,
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accTxt2: [bold, {
  }],
  imageOffer2: {
    width: 85,
    height: 85
  },
  imageOfferEmoney: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  typeTxtNew: {
    color: theme.white,
    fontWeight: 'bold',
    bottom: 2    
  },
  typeTxt2: {
    justifyContent: 'center',
    backgroundColor: theme.red,
    borderRadius: 20,
  },
  typeTxt1: {
    fontWeight: 'bold',
    color: theme.black
  },
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    // height: height,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 5 : 5 : 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerTrfTitle: {
    paddingVertical: 20,
    justifyContent: 'space-between',

  },
  containerTransferType: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  textChooseTransferType: {
    fontSize: theme.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.darkBlue
  },
  transferTitle: {
    color: theme.white,
    fontSize: 20,
    // alignSelf: 'center',
    paddingRight: 70,
    fontWeight: 'bold',
  },
  headerBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  menu: {
    marginVertical: 25,
  },
  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backHeader: {
    color: theme.white,
    paddingLeft: 50,
    transform: [{rotate: '180deg'}],
  },
  containerNew: {
    paddingHorizontal: 30,
    paddingVertical: 10
  },
};
