import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  slideOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems,
    backgroundColor: 'yellow'
  },
  slideTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems
  },
  slideThree: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems
  },
  slideFour: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems
  },
  slideFive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: theme.alignItems
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: width,
    height: height + 40,
    paddingBottom: 30,
    paddingHorizontal: 35
  },
  textOne: {
    color: '#fff',
    fontSize: theme.fontSizeXL,
    paddingBottom: 60
  },
  textTwo: {
    color: '#fff',
    fontSize: theme.fontSizeXL,
    paddingBottom: 60
  },
  textThree: {
    color: '#fff',
    fontSize: theme.fontSizeXL,
    paddingBottom: 50
  },
  textFour: {
    color: '#fff',
    fontSize: theme.fontSizeXL,
    paddingBottom: 40
  },
  textFive: {
    color: '#fff',
    fontSize: theme.fontSizeXL,
    paddingBottom: 40
  },
  simobi: {
    width: 113,
    height: 45,
    alignItems: 'center',
    marginBottom: 20
  },
  whiteIcon: {
    width: 70,
    height: 70
  },
  rowIcon: {
    flexDirection: 'row',
  },

  mainImage: {
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? -30 : 0 : -30,
    width: width,
    height: Platform.OS === 'ios' ? normalIosphone === true ? height / 1.8 : height / 2.1 : height / 1.75,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    padding: 20,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? -5 : -10 : -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rowLogo: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  logo: {
    width: 85,
    height: 33,
    marginRight: 10
  },
  logo2: {
    width: 130,
    height: 30,
    marginLeft: 10
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  upperText: {
    fontFamily: theme.roboto,
    color: theme.black,
    fontSize: theme.fontSize22,
    textAlign: 'center'
  },
  boxContainerPink: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.brand,
    marginBottom: 15
  },
  boxContainerWhite: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.darkGrey,
    backgroundColor: theme.white,
    marginBottom: 15
  },
  txtWhiteBold: {
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center'
  },
  txtPinkBold: {
    fontFamily: theme.roboto,
    fontWeight: theme.fontWeightBold,
    color: theme.pinkBrand,
    fontSize: theme.fontSizeMedium,
    textAlign: 'center'
  },
  contentText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  textTerm: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey
  }
};
