import {fontSizeMediumStyle, fontSizeXLStyle, bold, textAlignCenter} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {
    padding: 10,
    backgroundColor: theme.newLightGrey,
    minHeight: '100%',
    paddingBottom: 90,
  },
  filterBox: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 15,
    borderWidth: 1,
    borderColor: theme.softGrey,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  filterTextInput: {
    flex: 1,
    fontSize: fontSizeMediumStyle.fontSize
  },
  iconStyle: {
    justifyContent: 'center'
  },
  searchIcon: {
    fontFamily: 'roboto',
    color: theme.black,
  },
  trash: {
    backgroundColor: theme.red,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15
  },
  edit: {
    backgroundColor: theme.orange,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  whiteIcon: {
    color: theme.white,
  },
  editIcon: {
    color: theme.white,
    paddingLeft: 5,
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 1,
  },
  desc: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
    marginBottom: 3
  }],
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.white,
    paddingVertical: 10
  },
  flex: {
    flex: 2,
    flexWrap: 'wrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  billerDetails: {

    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 5,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1,
  },
  billerName: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    marginRight: 5,
    flex: 1,
    textAlign: 'right'
  },
  redArrow: {
    marginLeft: 10,
  },
  chooseFav: {
    width: width - 80
  },
  chooseFavText: {
    alignItems: 'flex-start',
    marginVertical: 10
  },
  greyLine: {
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLine,
  },
  headingFav: [fontSizeXLStyle,
    textAlignCenter,
    {
      color: theme.text,
      marginBottom: 20
    }
  ],
  searchInput: {
    width: width - 80
  },
  searchInput2: {
    marginTop: 5
  },
  rowSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  newFav: [bold, {
    alignSelf: 'flex-end',
    color: theme.brand,
    marginVertical: 15
  }],
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: [bold, {
    color: theme.brand
  }],
  activityContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey
  },
  reloadText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.brand
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
  chooseText: [fontSizeMediumStyle, {
  }],
  sideRow: {
    flex: 1, 
    alignItems: 'flex-end', 
    justifyContent: 'center'
  },
  objectData: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: theme.white,
    elevation: 1,
  },
  store: {
    borderRadius: 20,
    color: theme.red,
    backgroundColor: theme.white,
  },
  iconStore: {
    paddingRight: 10,
    width: 40,
    height: 40
  },
  textTrash: {
    color: theme.white,
    fontSize: theme.fontSizeSmall,
    paddingLeft: 10,
    paddingRight: 10
  },
  rowAdditional: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingHorizontal: 10
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
  slider: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 15,
  },
  amount: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  subNo: [bold, {
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium,
  }],
  bold: [bold,

  ],
  period: {
    color: theme.grey,
  },
  createButton: {
    backgroundColor: theme.pinkBrand,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    margin: 10,
    justifySelf: 'flex-end'
  },
  subtext: {
    color: theme.darkBlue,
    paddingVertical: 5
  },
  buttonDetail: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: '35%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: theme.newLightGrey
  },
  arrowIcon: {
    color: theme.black,
  },
  categoryContainer: {
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  categoryButtonUnselected: {
    backgroundColor: theme.white,
    margin: 5,
    borderRadius: 15,
    padding: 7,
    width: '45%',
    alignItems: 'center'
  },
  categoryButtonSelected: {
    backgroundColor: theme.pinkBrand,
    margin: 5,
    borderRadius: 15,
    padding: 7,
    width: '45%',
    alignItems: 'center'
  },
  overlayContent: {
    width: '100%'
  },
  editTitle: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 10,
  },
  labelTextStyle: {
    color: theme.grey,
    marginTop: 10,
    marginBottom: -10,
  },
  textPickerStyle: {
    color: theme.darkBlue,
    fontWeight: 'normal',
  },
  arrowPickerStyle: {
    color: theme.darkBlue,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: theme.pinkBrand,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 5,
  },
  saveButtonDisabled: {
    backgroundColor: theme.buttonDisabledBg,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 5,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 5,
    width: '50%',
    alignSelf: 'center',
  },
  cancelText: {
    color: theme.pinkBrand,
  }
};

