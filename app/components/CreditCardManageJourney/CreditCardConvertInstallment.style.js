import {theme} from '../../styles/core.styles';
import {textLightGreyStyle, fontSizeSmallStyle, cardVerticalSpacingStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  container: {flex: 1, backgroundColor: theme.superlightGrey},
  containerContent: [{justifyContent: 'space-between'}],
  formContainer: {
    flex: 1,
    paddingBottom: 25
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal,
  },
  availableBalanceText: [
    textLightGreyStyle,
    {fontSize: theme.fontSizeNormal}
  ],
  information: [
    fontSizeSmallStyle,
    {
      color: theme.brand,
    }],
  titleText: [cardVerticalSpacingStyle, bold, fontSizeMediumStyle],
  subtext: [
    {fontWeight: theme.fontWeightLight},
    fontSizeSmallStyle,
    textLightGreyStyle
  ],
  top: {
    paddingHorizontal: 20,
    height: hp('70%')
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginVertical: Platform.OS === 'ios' ? width * 0.02 : 0.27,
    borderRadius: 15,
    width: width * 0.9,
    top: Platform.OS === 'ios' ? 95 : 105,
    flex: 1,
  },
  containerLeft: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    maxHeight: hp('70%'),
    marginBottom: 20,
    flexGrow: 0
  },
  containerLeftEm: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  containerLeftItem: {
    flexDirection: 'column',
    width: width * 0.9,
    maxHeight: hp('65%'),
    paddingHorizontal: 20,
  },
  bottomButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  halfWidth: {
    flex: 1
  },
  noText: {
    fontSize: theme.fontSizeLarge,
    paddingVertical: 10,
    color: theme.darkBlue,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  noText2: {
    fontSize: theme.fontSizeNormal,
    paddingVertical: 10,
    color: theme.darkBlue,
    fontWeight: 'bold',
  },
  imagestyleimg: {
    width: width,
    height: 105,
  },
  nextStyle: {
    backgroundColor: theme.brand,
    borderRadius: 15,
  },
  imagestyleimg2: {
    width: 48,
    height: 17
  },
  row1: {
    flexDirection: 'row',
    paddingTop: 15
  }
};
