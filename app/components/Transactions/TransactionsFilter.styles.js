import {fontSizeSmallStyle, fontSizeMediumStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');

export default {
  container: {
    height: height,
    backgroundColor: theme.superlightGrey,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  dropdownLabel: {
    ...bold,
    ...fontSizeMediumStyle,
    marginVertical: 15,
    marginHorizontal: 25,
    color: theme.darkBlue,
  },
  formInputWrapper: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 30
  },
  checkboxLabel: [
    {paddingBottom: 20},
    bold,
    fontSizeSmallStyle
  ],
  checkboxLabelStyle: {
    fontSize: theme.fontSizeNormal,
    color: theme.darkBlue,
    fontWeight: Platform.OS === 'android' ? '100' : '300'
  },
  checkboxStyle: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  checkboxContainerStyle: {
    marginBottom: 0,
  },
  radioButtonContainer: {
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  alertText: {
    ...fontSizeSmallStyle,
    fontWeight: 'normal',
    color: theme.softGrey
  },
  buttonContainer: {
    backgroundColor: theme.white,
    padding: 20,
  },
  buttonStyle: {
    borderRadius: 10,
  },
  disabledButtonStyle: {
    borderRadius: 10,
    backgroundColor: theme.buttonDisabledBg
  },
  pickerText: {
    color: theme.darkBlue
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  alertContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5
  },
  alertIcon: {
    marginRight: 5,
    color: theme.softGrey,
  },
  rowSeparator: {
    width: 20,
  },
  darkBlueArrow: {
    color: theme.darkBlue,
  },
  reduxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'space-between'
  },
  greyLine: {
    borderBottomWidth: 1.5,
    borderColor: theme.containerGrey,
    flex: 1,
    marginHorizontal: 20,
  },
  checkboxOptionContainer: {
    backgroundColor: theme.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.white,
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  alertHeader: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.darkBlue,
    marginBottom: 15,
  },
  alertContent: {
    textAlign: 'center',
    marginHorizontal: 50,
    color: theme.darkBlue,
    marginBottom: 30,
  },
  alertButtonStyle: {
    paddingHorizontal: 100
  },
  alertCancel: {
    marginTop: 20,
    color: theme.brand
  },
  infoBoxText: {
    marginRight: 10,
    color: theme.darkBlue,
    fontWeight: '300',
    padding: 10,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeSmall
  }, 
  infoBoxIcon: {
    color: theme.darkBlue,
    paddingLeft: 30
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    width: '90%',
    height: 60,
    borderRadius: 15
  },
};
