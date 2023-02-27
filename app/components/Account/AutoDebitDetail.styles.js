import {fontSizeMediumStyle, fontSizeXLStyle, bold, textAlignCenter} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: {
    backgroundColor: theme.superlightGrey,
    minHeight: '100%',
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
    backgroundColor: 'red',
    width: 80,
    height: 120,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  whiteIcon: {
    color: theme.white,
    paddingRight: 5
  },
  historyItem: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    // borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingHorizontal: 20
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
    width: '100%',
    alignSelf: 'center'
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
    justifyContent: 'space-between',
    marginVertical: 10,
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
    borderRadius: 10,
    borderColor: theme.softGrey,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: theme.contrast,
    justifyContent: 'space-between',

    elevation: 2,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    paddingRight: 10,
    paddingVertical: 5
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
    alignItems: 'flex-end',
    flex: 1,
  },
  amount: [bold, {
    fontSize: theme.fontSizeMedium
  }],
  subNo: [bold, fontSizeMediumStyle, {
    paddingBottom: 10,
    color: theme.darkBlue
  }],
  accountName: [bold,

  ],
  period: [bold,

  ],
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(56, 146, 252, 0.1)',
    borderRadius: 20,
    marginBottom: 20,
  },
  optionButton: {
    width: 150,
    height: 30,
    borderRadius: 45,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  optionText: [bold, {
    color: theme.blueAmount
  }],
  optionButtonBrand: {
    backgroundColor: theme.brand,
  },
  optionButtonWhite: {
    backgroundColor: theme.white,
  },
  optionTextGrey: {
    color: theme.softGrey,
  },
  optionTextWhite: {
    color: theme.white,
  },
  arrowIcon: {
    color: theme.black,
    paddingRight: 5
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: 90,
    width: '100%'
  },
  containerBox: {
    marginTop: -70,
    backgroundColor: theme.white,
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  topText: {
    textAlign: 'center',
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium
  },
  subText: {
    textAlign: 'center',
    color: theme.darkBlue,
    fontSize: theme.fontSizeXL,
    fontWeight: 'bold',
    marginVertical: 5
  },
  subText2: {
    textAlign: 'center',
    color: theme.softGrey,
    marginBottom: 10,
  },
  leftText: {
    color: theme.darkBlue,
    textAlign: 'left'
  },
  rightText: {
    color: theme.darkBlue,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  bottom: {
    backgroundColor: theme.white,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flex: 1,
  },
  historyTitle: {
    color: theme.darkBlue,
    fontWeight: 'bold',
    fontSize: theme.fontSizeMedium,
  },
  filterButton: {
    padding: 10,
    backgroundColor: 'red'
  },
  filterIcon: {
    fontWeight: 'bold',
    color: theme.darkBlue,
    transform: [{
      rotate: '90deg'
    }]
  },
  historyHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10,
  },
  seeAllButton: {
    alignItems: 'center',
    padding: 10,
  },
  seeAllText: {
    color: theme.dark,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
  sourceAccContainer: {
    maxWidth: '50%'
  }
};
