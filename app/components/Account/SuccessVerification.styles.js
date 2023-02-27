import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  bgSukses: {
    padding: 20,
  },
  wrapAtas: {
    height: hp(75)
  },
  imgSukses: {
    width: ((width - 40) * 0.9),
    height: ((width - 40) * 0.7),
    alignSelf: 'center',
    marginTop: 20    
  },
  contHeader: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20
  },
  txtHeader: {
    fontSize: theme.fontSizeExtraXL,
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightMedium,
    color: theme.darkBlue,
    textAlign: 'center'
  },
  continueBtn: {
    marginTop: 60,
    fontFamily: theme.roboto,
  },
  txtSub: {
    fontFamily: theme.roboto,
    color: theme.darkBlue,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
    fontSize: theme.fontSizeNormal
  },
  txtReport: {
    fontFamily: theme.robotoLight,
    fontWeight: theme.fontWeightMedium,
    color: theme.darkBlue,
    textAlign: 'center',
    fontSize: theme.fontSizeMedium,
    marginTop: 30
  },
  txtBtn: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium
  },
  contText: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  }
};