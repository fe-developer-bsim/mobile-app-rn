import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  flex: {
    backgroundColor: theme.superlightGrey,
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 12.5,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    // marginBottom: height * 1,
    position: 'absolute',
    // paddingBottom: 30
    // marginBottom: height * 0.02,


  },
  containerBanner: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    marginBottom: height * 0.04,
    marginTop: height * 0.02,

  },
  contentProfile: {
    marginVertical: 10,
    marginHorizontal: width * 0.049,

  },
  pictureIcon: {
    width: 45,
    height: 45,
  },
  lastReward: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.029,
    paddingBottom: 10,
    paddingTop: 15
  },
  rowIcon: {
    flexDirection: 'row',
    marginHorizontal: width * 0.029,
    
  },
  detailsTextContainer: {
    paddingLeft: 15
  },
  textPoinType: {
    color: theme.darkBlue,
  },
  textRedeemPoin: {
    color: theme.green,
    paddingTop: 5
    
  },
  textDetailReward: {
    padding: 10,
    color: theme.darkBlue,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightBold,
    
  },
  containerReferralUser: {
    borderRadius: 15,
    backgroundColor: theme.cardGrey,
    marginHorizontal: width * 0.029,
    padding: 15,
  },
  textReferralUser: {
    color: theme.grey,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeSmall,

  },
  valueReferralUser: {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    paddingTop: 5,
    fontSize: theme.fontSizeSmall,
  },
  containerLine: {
    paddingTop: 10
  },
 
  textSimasPoin: {
    fontSize: theme.fontSizeSmall,
    paddingTop: 5
  }
};