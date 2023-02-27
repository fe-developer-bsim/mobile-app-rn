import {contentContainerStyle, fontSizeMediumStyle, fontSizeXLStyle, bold, textAlignCenter} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle, {
  }],
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
    backgroundColor: theme.pinkBrand,
    width: 54,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  whiteIcon: {
    color: theme.white
  },
  historyItem: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
    paddingVertical: 15,
    paddingLeft: 3
  },
  desc: [bold, {
    fontFamily: 'roboto',
    color: theme.black,
    marginBottom: 3
  }],
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 2,
    flexWrap: 'wrap',
  },
  subNo: {
    fontFamily: 'roboto',
    color: theme.black
  },
  billerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    flexWrap: 'wrap',
    flex: 3,
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
    alignSelf: 'flex-end',
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
  }]
};
