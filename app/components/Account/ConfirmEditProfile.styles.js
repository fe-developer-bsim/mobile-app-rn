import {theme} from '../../styles/core.styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default {
  baseCf: {
    padding: 20,
    backgroundColor: theme.white,
  },
  titleForm: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.darkBlue,
       
  },
  titleFields: {
    fontWeight: theme.fontWeightMedium,
    fontSize: theme.fontSize26,
    color: theme.darkBlue
  },
  enabledBtn: {
    alignSelf: 'center',
    width: wp(90),
    backgroundColor: theme.pinkBrand,
  },
  txtBtn: {
    color: theme.white,
    fontWeight: theme.fontWeightMedium
  },
  editCategories: {
    marginTop: 10,
    marginBottom: 60
  },
  confirmBtn: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    alignSelf: 'center',
  },
  isiFields: {
    backgroundColor: theme.superlightGrey,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.superlightGrey,
    padding: 12,
    flexDirection: 'column',
    marginTop: 10,
    fontFamily: theme.robotoLight
  },
  baseFields: {
    alignItems: 'center'

  },
  txtFields: {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
        
  },
  lblFields: {
    color: theme.grey,
    fontWeight: theme.fontWeightBold,
  }
};
