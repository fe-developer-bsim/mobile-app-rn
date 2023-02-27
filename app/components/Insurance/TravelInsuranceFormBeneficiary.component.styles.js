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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
  },
  buttonEdit: {
    paddingVertical: 17,
    backgroundColor: theme.white,
    paddingHorizontal: 40,
  },
  buttonTxt: {
    color: theme.brand,
    paddingVertical: 17,
  },
  padding: {
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  statusBar: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 15,
    paddingVertical: 17,
    paddingHorizontal: 40,
    color: theme.black,
  },
  tittleHeader: {
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    fontSize: 30,
    color: theme.black,
  },
  subTittle: {
    paddingVertical: 3,
  },
  barProggres: {
    backgroundColor: theme.brand,
    height: 7,
    width: 400,
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
    paddingBottom: 20,
  },
  buttonCheck: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 20,
  },
  labelCheck: {
    paddingHorizontal: 10,
    fontSize: 15,
  },
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  icon: {
    color: theme.brand,
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
  paddingGrey: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: theme.greyLine,
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.brand,
    height: 7,
    width: width * 6 / 7
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: 7,
    width: width
  },
  disclaimerIcon: {
    color: theme.black,
    paddingRight: 5,
    fontSize: theme.fontSizeSmall
  },
  disclaimerText: {
    fontFamily: theme.robotoLight,
    fontSize: 12,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  border: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    justifyContent: 'flex-start',
    padding: 10,
  },
  verticalPadding: {
    paddingVertical: 10,
  },
  tncUnderline: {color: theme.brand}, 
};
