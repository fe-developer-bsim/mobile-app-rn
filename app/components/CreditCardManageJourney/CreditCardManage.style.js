import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: {flex: 1, backgroundColor: theme.superlightGrey},

  containerContent: [{
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: theme.superlightGrey}
  ],
  navItemsContainer: {
    flex: 1,
    paddingRight: 20,
    marginLeft: 20
  },
  selectLanguageStyle: {
    justifyContent: 'center',
    marginTop: -10,
    marginBottom: -10,
    borderWidth: 0
  },
  arrowPickerStyle: {
    paddingRight: 15,
    paddingLeft: 15
  },
  textPickerStyle: {
    textAlign: 'right'
  },
  optionsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.borderGrey
  },
  titleContainer: {
    flex: 6
  },
  optionText: [styles.stylefontSizeMediumStyle],
  infoContainer: {
    flex: 4
  },

  top: {
    alignItems: 'center',
    height: hp('90%'),
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: 5,
    flex: 1
  },
  containerLeft: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
  },
  icon: {
    color: theme.pinkBrand,
    marginRight: 20
  },
  rightItemContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.black,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  halfWidth: {
    flex: 1
  },
};
