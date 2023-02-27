import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  statusBarRow: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
  },
  statusBarProgress: {
    flexDirection: 'row',
  },
  buttonEdit: {
    paddingVertical: 17,
    backgroundColor: theme.white,
    paddingHorizontal: 40,
  },
  buttonTxt: {
    color: theme.brand,
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontSize: 17,
  },
  paddingGrey: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: theme.greyLine,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    paddingVertical: 17,
    paddingHorizontal: 40,
    backgroundColor: theme.greyLine,
  },
  tittleHeader: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 30,
    paddingBottom: 10,
    color: theme.black,
  },
  subTittle: {
    paddingVertical: 3,
  },
  radioTittle: {
    fontSize: 20,
    color: theme.black,
  },
  radioSubTittle: {
    fontSize: 18,
  },
  radio: {
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
    backgroundColor: theme.white,
  },
  buttonContinue: {
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  icon: {
    color: theme.red,
  },
  header: {
    fontFamily: theme.robotoLight,
  },
  subHeader: {
    fontFamily: theme.roboto,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 50,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: 7,
    width: width * 4 / 7
  },
  partTwo: {
    backgroundColor: theme.greyLine,
    height: 7,
    width: width
  },
};
