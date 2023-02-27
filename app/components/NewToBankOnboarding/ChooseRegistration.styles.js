import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  container: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    },
  ],
  titleTextContainer: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: theme.fontSizeExtraXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto
  },
  subtitleText: {
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto
  },
  boxContainerPink: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.pinkBrand,
    marginBottom: 15
  },

  boxContainerWhite: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.brand,
    backgroundColor: theme.white,
    marginBottom: 15
  },
  rowContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    alignItems: 'flex-start',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  txtWhiteBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.white,
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto,
  },
  txtWhiteLight: {
    marginRight: 80,
    marginTop: 5,
    fontWeight: theme.fontWeightLight,
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
  },
  bold: {
    fontWeight: theme.fontWeightBold
  },
  arrowIconWhite: {
    color: theme.white
  },
  txtBlackBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontFamily: theme.roboto,
  },
  txtBlackLight: {
    marginRight: 80,
    marginTop: 5,
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.robotoLight,
  },
  arrowIconBlack: {
    color: theme.black
  },
  pinkBg: {
    backgroundColor: theme.pinkBrand,
    flex: 1,
  },
  whiteBg: {
    backgroundColor: theme.white,
    height: height,
    flex: 1,
    padding: 30,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 0 : 10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
};