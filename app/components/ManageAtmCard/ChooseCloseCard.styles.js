import {theme} from '../../styles/core.styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default {
  cardContainer: [
    {
      padding: 20,
      borderWidth: 1.5,
      borderColor: theme.greyLine,
      borderRadius: 10,
      marginVertical: 10
    }
  ],
  cardTxt: {

  },
  subcontainer: {
    padding: 20,
    backgroundColor: theme.white,
  },
  titleTxt: {
    fontSize: theme.fontSize20,
    color: theme.black
  },
  cardTxt2: {
    paddingVertical: 5,
    color: theme.black,
    fontSize: theme.fontSizeNormal
  },
  row: {
    paddingLeft: 20
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    fontSize: theme.fontSizeNormal,
    backgroundColor: 'red'
  },
  continueBtn: {
    color: theme.white
  },
  rateDisplay: {
    padding: 10,
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
  enabledTxt: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium
  },
  buttonWrapper: {
    marginTop: 30
  }
};