import {fontSizeNormalStyle, bold, containerWhiteStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  scrollViewContent: [containerWhiteStyle, {flex: 1}],
  pickPayeeHeader: [fontSizeNormalStyle, bold],
  inputContainer: {
    flexDirection: 'row',
    // paddingTop: 50,
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
    marginLeft: 10,
    height: 20,
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
    marginRight: 15,
    marginLeft: -15,
    backgroundColor: theme.borderGrey,
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
    marginTop: Platform.OS === 'ios' ? 0 : 12,
    paddingHorizontal: 10
  },
  paddingHeader: {
    padding: 30
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
    marginHorizontal: width * 0.049,
  },
  pictureIcon: {
    width: 35,
    height: 35,
  },
  flexRow: {
    flexDirection: 'row',
  },
  pageTitle: {
    alignSelf: 'center',
    marginLeft: 15,
    color: theme.black
  },
  borderItem: {
    borderWidth: 1,
    borderColor: theme.dashLine,
    borderStyle: 'dashed',
    marginBottom: 15,
    borderRadius: 1
  },
  rowRecomenSearch: {
    marginTop: 10
  },
  textRecomen: {
    color: theme.black,
    backgroundColor: theme.disabledGrey,
  },
  contentBox: {
    borderWidth: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: theme.disabledGrey,
  },
  rowSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20
  },
  filterBox: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    // borderColor: theme.grey,
    // borderRadius: 20,
    justifyContent: 'space-between',
    // backgroundColor: theme.grey,
    // width: width - 140,
    alignSelf: 'center'
  },
  filterTextInput: {
    fontSize: 12
  },
  buttonSearch: {
    backgroundColor: theme.brand,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15
  },

};
