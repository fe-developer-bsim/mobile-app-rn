import {fontSizeNormalStyle, bold, containerWhiteStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  scrollViewContent: [containerWhiteStyle, {flex: 1}],
  pickPayeeHeader: [fontSizeNormalStyle, bold],
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 60,
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
    bottom: 33,
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
    paddingRight: 20,
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
    flexDirection: 'row',
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
    color: theme.black
  },
  contactIcon: {
    position: 'absolute',
    marginTop: 12,
    right: 10
  },
  flex: {
    flex: 1,
    backgroundColor: theme.white,
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
    marginTop: 70
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
    marginTop: Platform.OS === 'ios' ? 0 : 12,
    paddingHorizontal: 10
  },
  paddingHeader: {
    padding: 5
  },
  scrollStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 0
  },
  biFastDisclaimer: {
    backgroundColor: theme.newGreyPalete,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    marginTop: 20,
    width: width * 0.90,
    right: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 15,
    marginBottom: Platform.OS === 'ios' ? 20 : 0
  },
  biFastCaution: {
    color: theme.darkBlue,
    fontSize: 13,
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 5,
    paddingHorizontal: Platform.OS === 'ios' ? 2 : 0
  },
  cautinIcon: {
    color: theme.darkBlue,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 10,
    marginLeft: 15,
  }
};
