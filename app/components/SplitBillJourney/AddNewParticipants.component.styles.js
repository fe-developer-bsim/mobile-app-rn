import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import * as styles from '../../styles/common.styles';
const {width, height} = Dimensions.get('window');
const leftContainerWidth = (width / 2) + 30;
const rightContainerWidth = width - leftContainerWidth;
const bottomButton = height;
import {contentContainerStyle, fontSizeMediumStyle, bold} from '../../styles/common.styles';

export default {
  container: {
    flex: 1,
    backgroundColor: theme.superlightGrey
  },
  allContainer: [contentContainerStyle, {
  }],
  formManually: {
    width: width - 80
  },
  containerCountClear: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  containerClearAll: {
    marginRight: 15,
  },
  containerListView: {
    flex: 1,
    paddingBottom: 0,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  separator: {
    borderBottomColor: theme.separatorColor,
    borderBottomWidth: 1,
  },
  blockContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: rightContainerWidth,
  },
  leftContainer: {
    width: leftContainerWidth
  },
  lastRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  },
  textOperationalHour: {
    paddingRight: 5,
    color: theme.black,
    fontSize: theme.fontSizeNormal,
  },
  textStatusRed: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal
  },
  textStatusGreen: {
    color: theme.green,
    fontSize: theme.fontSizeNormal
  },
  outerContainer: {
    backgroundColor: theme.white,
    width: width - 0.1 * width,
    flex: 1
  },
  textFirstRow: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightRegular,
    lineHeight: 25,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchContainer: {
    backgroundColor: theme.white,
    borderRadius: 100,
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  searchInnner: {
    backgroundColor: theme.superlightGrey,
    paddingBottom: 20
  },
  searchInput: {
    alignItems: 'flex-start'
  },
  searchSplitBill: {
    paddingVertical: 16,
    paddingHorizontal: 10
    // alignItems: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: theme.white,
    borderRadius: 5,
    margin: 10,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  blockModalContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textFirstRowModal: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
    fontWeight: theme.fontWeightRegular,
    lineHeight: 25,
  },
  textOperationalHourModal: {
    paddingRight: 5,
    color: theme.black,
    fontSize: theme.fontSizeNormal,
  },
  textStatusRedModal: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal
  },
  textStatusGreenModal: {
    color: theme.green,
    fontSize: theme.fontSizeNormal
  },
  locateTextModal: {
    fontSize: theme.fontSizeSmall,
    color: theme.black
  },
  calloutStyle: {
    flex: 1,
    position: 'relative',
  },
  calloutContainer: {
    backgroundColor: theme.white,
    padding: 10,
    marginBottom: 5
  },
  textInput: {
    // width: width - 105,
    // height: 50,
    flex: 1,
    color: theme.darkBlue
  },
  emptyContainer: {
    padding: 20
  },
  emptyText: {
    alignSelf: 'center',
    fontSize: theme.fontSizeMedium
  },
  buttonNext: {
    paddingHorizontal: 20,
    backgroundColor: theme.white
  },
  buttonSpacing: {
    marginVertical: 10
  },
  // objectData: {
  //   paddingTop: 20,
  //   borderBottomWidth: 2,
  //   borderLeftWidth: 2,
  //   borderRightWidth: 2,
  //   borderTopWidth: 2,
  //   borderColor: theme.greyLine,
  //   marginBottom: 2
  // },
  objectData: {
    paddingTop: 10,
    borderTopWidth: 2,
    marginHorizontal: 20,
    borderColor: theme.greyLine,
    marginBottom: 10
  },
  greyLineContinue: {
    backgroundColor: theme.white,
    height: 2,
  },
  // containerButton: {
  //   flex: 1,
  // },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 2,
    margin: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  iconStore: {
    width: 40,
    height: 40,
    alignItems: 'flex-start'
  },
  rowAdditional: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingHorizontal: 10
  },
  bullet: {
    color: theme.white,
    backgroundColor: theme.red
  },
  flex: {
    flex: 2,
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  store: {
    borderRadius: 20,
    color: theme.black,
    backgroundColor: theme.white,
    alignItems: 'flex-end'
  },
  storeCheckList: {
    color: theme.white,
    backgroundColor: theme.white,
  },
  outterBullet: {
    color: theme.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBullet: {
    color: theme.white,
    padding: 7
  },
  bottomStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  innerContainerModal: {
    margin: 0,
  },
  contentBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: theme.textGrey
  },
  paddingHor10: [bold, {
    paddingHorizontal: 5,
    color: theme.blueSoftSplitBill,
  }],
  // containerCandidate: {
  //   paddingHorizontal: 20,
  // },
  candidateContact: {
    width: width,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  contactList: {
    height: height * 5
  },
  contactName: {
    paddingBottom: 5,
    fontWeight: theme.fontWeightMedium,
    fontFamily: theme.roboto,
    color: theme.darkBlue
  },
  bottomWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width,
  },
  bottomWrapperAdd: {
    paddingVertical: 20
  },
  countContainer: {
    marginLeft: 20,
    paddingBottom: 10,
  },
  countSelectedContacts: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.softGrey
  },
  clearAll: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.brand
  },
  space: {
    justifyContent: 'space-between'
  },
  containerSelected: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  contentContainer: {
    padding: 5,
    height: height * 0.98
  },
  fieldOverlay: {
    marginBottom: 30,
    marginTop: 20,
  },
  inputManualyText: {
    fontWeight: theme.fontWeightMedium,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium,
    color: theme.darkBlue
  },
  buttonLargeTextStyle: styles.buttonLargeTextStyle,

  contactContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.white
  },
  middleContactContainer: {
    // paddingHorizontal: 20,
    backgroundColor: theme.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  containerManually: {
    flexDirection: 'row',
  },
  rowContainerRender: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconTrans: {
    color: theme.darkBlue,
    paddingRight: 20
  },
  contactsText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium,
    color: theme.disabledGrey,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  profileIcon: {
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: theme.borderGrey
  },
  imageContact: {
    width: 40,
    height: 40,
    borderRadius: 30
  },
  containerContact: {
    paddingLeft: 20
  },
  addContact: [bold, {
    color: theme.darkBlue,
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium
  }],
  checkIcon: {
    color: theme.pinkBrand,
    paddingRight: 10,
  },
  mainSelectedContainer: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  textStyle: {
    marginHorizontal: 10,
    alignItems: 'flex-start'
  },
  closeIcon: {
    alignItems: 'flex-end'
  },
  rowColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panel: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  panelHeader: {
    alignItems: 'center',
  },
  subPanelHandle: {
    width: 60,
    height: 3,
    backgroundColor: theme.grey,
    marginBottom: 2,    
  },
  bottomNavigation: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    paddingVertical: 40,
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
  bottomButton,
  shadowContainer: {
    backgroundColor: '#000',
  },
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    marginHorizontal: 35,
    marginTop: 15
  },
  cancel: [fontSizeMediumStyle, {
    color: theme.brand
  }],
  save: [fontSizeMediumStyle, {
    color: theme.brand
  }],
  saveDisabled: [fontSizeMediumStyle, {
    color: theme.buttonDisabledBg
  }],
  inputManuallyContainer: {
    paddingTop: 10,
  },
  contactContainerNotice: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    height: width * 0.86
  },
  contactContainerNoticeTwo: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  splitbillNotice: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
  },
  contentBoxAddMember: {
    backgroundColor: theme.red
  },
  greyLineSelected: {
    backgroundColor: theme.greyLine,
    height: 2,
  },
  rowContainerContent: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  colorX: {
    color: theme.blueSoftSplitBill
  },
  contactPhone: {
    color: theme.textGreyBlue,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.roboto,
  },
  containerSearch: {
    paddingHorizontal: 10,
    paddingVertical: 18
  },
};