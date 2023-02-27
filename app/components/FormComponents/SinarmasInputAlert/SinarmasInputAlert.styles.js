import {theme} from '../../../styles/core.styles';
import {fontSizeMediumStyle, textAlignCenter, fontSizeXLStyle, fontSizeSmallStyle} from '../../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');
const trueWidth = width - 40;
const trueHeight = (trueWidth * 27) / 32;

export default {
  heading: [fontSizeXLStyle,
    textAlignCenter,
    {
      paddingTop: 10,
      color: theme.text,
      marginBottom: 10
    }
  ],
  text: [textAlignCenter,
    {
      paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 20
    }
  ],
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  redText: [fontSizeMediumStyle,
    {color: theme.primary}
  ],
  blackText: [fontSizeMediumStyle,
    {color: theme.black}
  ],
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonAlign: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  additionalPadding: {
    paddingBottom: 20
  },
  iconURL: {
    justifyContent: 'center',
    width: 100
  },
  imageBanner: {
    width: 320,
    height: 470
  },
  checkboxStyle: {
    width: 20,
    height: 20
  },
  checkboxLabel: [
    fontSizeSmallStyle,
    {
      color: theme.textGrey
    }
  ],
  buttonAlignTop: {
    flex: 1,
    alignItems: 'center'
  },
  buttonContainerTop: {
    flexDirection: 'row',
    padding: 5,
  },
  checkboxLabelTop: [
    fontSizeSmallStyle,
    {
      color: theme.textGrey
    }
  ],
  containerTextTop: {
    height: 100,
  },
  containerTextTopColorMedium: {
    color: theme.white,
    fontSize: 20,
  },
  containerTextTopColorLarge: {
    color: theme.white,
    fontSize: 30,
  },
  backgroundImage: {
    width: trueWidth,
    height: trueHeight,
    padding: 20,
  },
  checkboxAlignTop: {
    paddingBottom: 10,
  },
  containerTextTopColorMediumBlack: {
    color: theme.black,
    fontSize: 20,
  },
  searchContainer: {
    backgroundColor: theme.greyLine,
    borderRadius: 100,
    height: 50,
    paddingHorizontal: 20,
    margin: 20,
    flexDirection: 'row'
  },
  searchInput: {
    alignItems: 'flex-start',
    paddingBottom: 30
  },
  textInput: {
    width: width - 105,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLine
  },
  textInput2: {
    width: width - 105,
    height: 40,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 1,
    borderBottomColor: Platform.OS === 'android' ? null : theme.greyLine, 
  },
  labelWarning: {
    paddingTop: 5,
    color: theme.darkOrange,
  },
  chooseFav: {
    paddingVertical: 10,
    width: width - 80
  },
  chooseFavText: {
    alignItems: 'flex-start'
  },
  greyLine: {
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLine
  },
  headingFav: [fontSizeXLStyle,
    textAlignCenter,
    {
      color: theme.text,
      marginBottom: 10
    }
  ],
  containerStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkIcon: {
    color: theme.red,
    paddingRight: 10
  },
  headingStatus: 
  {
    fontSize: 15,
    paddingTop: 10,
    color: theme.grey,
    // marginBottom: 10
  },
  chooseStatusText: {
    alignItems: 'flex-start',
    color: theme.darkBlue,
  },
  splitbillContainer: {
    borderRadius: 50
  },
  headingStatusSPlitBill: 
  {
    fontSize: 15,
    paddingTop: 10,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    marginBottom: 10
  },
  whiteText: [fontSizeMediumStyle,
    {
      color: theme.white,
    }
  ],
  buttonAlignSplitBill: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.pinkBrand
  },
  buttonAlignNew: {
    alignItems: 'center',
    paddingHorizontal: 80,
    backgroundColor: theme.primary,
    borderRadius: 20,
    paddingVertical: 10
  },
  buttonAlignNewCancel: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 20,
    paddingVertical: 5
  },
  containerButton: {
    paddingTop: 30,
  }
};
