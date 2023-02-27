import {fontSizeNormalStyle, bold, containerWhiteStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  containerGrey: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  scrollViewContent: [containerWhiteStyle, {flex: 1}],
  pickPayeeHeader: [fontSizeNormalStyle, bold],
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 50,
    alignItems: 'center'
  },
  inputContainerSrc: {
    paddingRight: 20,
    paddingBottom: 10,
  },
  input: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  NButtonTrfs: {
    paddingRight: 20,
    bottom: Platform.OS === 'ios' ? 33 : 45,
  },
  inputAcc: {
    flex: 1,
    paddingLeft: 20,
    bottom: 40,
    marginLeft: 20,
    height: 50,
  },
  inputTxt: {
    textAlignVertical: 'bottom',
    flex: 1,
    fontSize: fontSizeNormalStyle.fontSize,
    bottom: 4.5,
  },
  inputWithPaddingHorizontal: {
  },
  inputWithPaddingHorizontalAcc: {
  },
  NButtonAcc: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  NButton: {
    paddingRight: 20,
  },
  ErrorTextIndicator: {
    paddingHorizontal: 20
  },
  headerContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputContainerHide: {
    height: 0,
    width: 0,
  },
  bgSearch: {
    backgroundColor: theme.transparent,
    borderWidth: 1,
    borderColor: theme.softGrey,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchInput: {
    paddingLeft: 20,
    height: 50,
    fontSize: fontSizeNormalStyle.fontSize
  },
  searchTxtInput: {
    flex: 0.5
  },
  searchIcon: {
    paddingTop: 15,
    paddingRight: 10,
    height: 50,
  },
  imgSearch: {
    fontFamily: 'Roboto',
    color: theme.black
  },
  tittle: [
    styles.featureTitleStyle,
    styles.fontSizeLargeStyle,
    {
      marginBottom: 5,
      fontWeight: theme.fontWeightBold
    }
  ],
  inputHeader: [fontSizeNormalStyle, bold],
  listHeader: [fontSizeNormalStyle, bold, {paddingVertical: 20, paddingHorizontal: 20}],
  contact: {
    paddingHorizontal: 10,
    bottom: 40,
    justifyContent: 'center'
  },
  textInputContainer: {
    marginRight: 25,
    marginLeft: -20,
  },
  tittleTrf: [
    styles.featureTitleStyle,
    styles.fontSizeXLStyle,
    {
      marginBottom: 5,
      fontWeight: theme.fontWeightBold,
      color: theme.white
    }
  ],
  textInputContainerTrf: {
    marginRight: 25,
    marginLeft: -20,
    marginBottom: 20
  },
  bankPickerContainer: {
    marginBottom: 20
  },
  accNumberContainer: {
    marginBottom: 10,
  },
  bankContainer: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: theme.grey,
  },
  swiftCodeField1: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: 76
  },
  swiftCodeField2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.orange,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingTop: 50,
    height: 76
  },
  payeeName: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  textInputContainerPadding: {
    marginRight: 25,
    marginLeft: -20,
    justifyContent: 'space-between'
  },
  contacts: {
    paddingLeft: 10,
    paddingVertical: 20
  },
  lineRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  lineText: {
    fontSize: theme.fontSizeSmall,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: theme.softGrey
  },
  greyLineLeft: {
    backgroundColor: theme.softGrey,
    height: 1,
    marginTop: 20,
    right: 20,
    width: 135
  },
  greyLineRight: {
    backgroundColor: theme.softGrey,
    height: 1,
    marginTop: 20,
    left: 20,
    width: 135
  },
  search: {
    color: theme.black,
  },
  black: {
    color: theme.grey
  },
  grey: {
    color: theme.grey
  },
  contactIcon: {
    position: 'absolute',
    marginTop: 12,
    right: 10
  },
  flex: {
    flexGrow: 1,
    backgroundColor: theme.superlightGrey,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  merchantPayContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: theme.grey,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: theme.white,
    padding: 10,
    alignItems: 'center',
    marginVertical: 0,
    marginHorizontal: 20,
    marginTop: 20
  },
  merchantPayRp: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: theme.lightBlue,
    borderWidth: 1,
    borderColor: theme.grey,
    alignItems: 'center',
  },
  rpText: {
    color: theme.white,
    fontWeight: 'bold',
  },
  merchantPayAt: {
    fontWeight: 'bold',
    fontSize: 15
  },
  merchantPayMargin: {
    margin: 10,
    width: 57 * width / 100,
  },
  merchantPayWith: {
    fontSize: 12,
    paddingTop: 5
  },
  merchantPayIcon: {
    alignItems: 'flex-end',
    paddingLeft: 10,
    width: 7 * width / 100,
  },
  arrowIcon: {
    color: theme.grey
  },
  iconRp: {
    color: theme.red,
    paddingHorizontal: 1
  },
  iconMerch: {
    width: 35,
    height: 30,
  },
  iconContact: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 10 : 5, 
    marginTop: Platform.OS === 'ios' ? 0 : 3, 
    paddingHorizontal: 10
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.18
  },
  containerTransfer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginHorizontal: 0,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.22,
    borderRadius: 15,
    top: width * -0.23
  },
  containerLeft: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white
  },
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  border: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.white,
    marginHorizontal: -2
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  arrowDownStyle: {
    color: theme.black,
  },
  bankTitle: {
    marginBottom: 10,
    fontFamily: 'Roboto',
    color: theme.black
  },
  marginTop: {
    marginTop: 50
  },
  buttonBottom: {
    paddingVertical: 20,
    width: width * 0.9,
  },
  nextButton: {
    fontWeight: 'bold'
  },


  // REMITTANCE

  explainIcon: {
    color: theme.darkBlue
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 10,
    width: width - 100,
    color: theme.textSoftDarkBlue
  },
  containtextExplanation: {
    borderColor: theme.grey,
    flexDirection: 'row',
    paddingTop: 20
  },
  containerUtama: {
    flex: 1
  },
  flexGrey: {
    backgroundColor: theme.superlightGrey,
    alignItems: 'center'
  },
  backgroundColorPink: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 12,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'absolute',
  },
  containerBannerWhite: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
  },
  rowInformation: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: height * 0.015
  },
  paddingBox: {
    marginHorizontal: width * 0.04,
    paddingVertical: 20
  },
};

