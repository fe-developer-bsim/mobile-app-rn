import {bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  wrapProfile: {
    height: hp(25),
  },
  wrapPicture: {
    top: hp(5)
  },
  shadowImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  }, 
  editIcon: {
    color: theme.black
  },
  wrapNames: {
    flexDirection: 'column',
    alignItems: 'center',
    top: hp(15),
  },
  names: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  subNames: {
    fontWeight: theme.fontWeightMedium
  },
  picture: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  button: {
    left: 5, 
    alignSelf: 'center',
    backgroundColor: theme.white,
    borderRadius: 50,
    padding: 5,
    shadowColor: theme.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 3},
    marginTop: -33,
    marginRight: -68,
    elevation: 4,
  },
  roboto: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  editCategories: {
    marginTop: 20,
  },
  isiEditCat: {
    alignItems: 'center',
  },
  categories: {
    height: hp(10),
    width: wp(80),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.borderGrey,
    padding: 12,
    flexDirection: 'row',
    marginTop: 10
  },
  iconCat: {
    height: hp(6),
    width: wp(10),
    backgroundColor: theme.lightPink,
    borderRadius: 13,
    padding: 8,
    textAlign: 'center',
    color: theme.pinkBrand
  },
  txtCat: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue
  },
  enabledTxt: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium
  },
  continueBtn: {
    marginTop: 30
  },
  disabledTxt: {
    color: theme.textGrey,
    fontWeight: theme.fontWeightMedium
  },
  disabledBtn: {
    alignSelf: 'center',
    width: wp(90),
    backgroundColor: theme.superLightpurple,
  },
  enabledBtn: {
    alignSelf: 'center',
    width: wp(90),
    backgroundColor: theme.pinkBrand,
  },

  btnSukses: {
    height: hp(10),
    width: wp(80),
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: theme.bluePastel
  },
  iconSukses: {
    color: theme.white,
    padding: 15,
    textAlign: 'center',
    fontSize: 15
  },
  txtSukses: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: theme.fontWeightBold,
    color: theme.white
  },
  
};