import {theme} from '../../styles/core.styles';
import * as styles from '../../styles/common.styles';
import {fontSizeMediumStyle, fontSizeSmallStyle, fontSizeNormalStyle, bold} from '../../styles/common.styles';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  containerGradient: {
    alignItems: 'center',
  },
  mainContainer: {
    flexGrow: 1,
    backgroundColor: theme.transparent,
    paddingBottom: 68,
  },
  greyLineBottom: {
    backgroundColor: theme.greyLine,
    height: 1,
    marginBottom: 10
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  nextButton: styles.buttonLargeTextStyle,
  imageContainer: {
    height: 180,
    width: width - 30,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    margin: 2,
    borderRadius: 15,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch'
  },
  arrowIconContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  icon: {
    color: theme.white
  },
  valueTitle: [
    fontSizeSmallStyle,
    {
      color: theme.darkBlue,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingTop: 30
    }
  ],
  productName: [
    fontSizeMediumStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightMedium,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  value: 
  {
    color: theme.darkBlue,
    fontWeight: theme.fontWeightMedium,
    marginBottom: 17,
    fontFamily: 'roboto',
    fontSize: theme.fontSize22
  },
  iconTitle: [
    fontSizeSmallStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingHorizontal: 45,      
    }
  ],
  leftDetail: [
    fontSizeSmallStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingTop: 10,

    }
  ],
  leftDetail2: {
    paddingRight: 15,
  },
  leftValue: [
    fontSizeSmallStyle,
    {
      color: theme.textGrey,     
      fontFamily: 'roboto',
    }
  ],
  leftValueDownload: [
    fontSizeSmallStyle,
    {
      color: theme.black,     
      fontFamily: 'roboto',
      marginTop: 10,
      textDecorationLine: 'underline',
    }
  ],
  rightDetail: [
    fontSizeSmallStyle,
    {
      color: theme.black,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingTop: 10
    }
  ],
  rightValue: [
    fontSizeSmallStyle,
    {
      color: theme.black,     
      fontFamily: 'roboto',
    }
  ],
  historyHeader: [
    fontSizeMediumStyle, bold,
    {    
      fontFamily: 'roboto',
      color: theme.darkBlue,
    }
  ],
  contactSelected: {
    marginRight: 10,
  },
  memberLength: [
    fontSizeMediumStyle,
    {    
      fontFamily: 'roboto',
      color: theme.blueText,
      fontSize: 12,
      marginTop: 4,
      marginRight: 5,
      paddingLeft: 5
    }
  ],
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  visibility: {
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 17
  },
  visibilityPadding: {
    paddingLeft: 10
  },
  accountHiddenText: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  hideIcon: {
    width: 25,
    height: 25,
    zIndex: 1,
  },
  eyeFillColor: {
    color: theme.opacityWhite
  },
  eyeStrokeColor: {
    color: theme.white
  },
  cardContainer: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center'
  },
  historyContainer: {
    // paddingHorizontal: 20,
    marginTop: 50,
    // paddingTop: 85,
    backgroundColor: theme.white, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingBottom: width * 0.22
  },
  historyContainerTop: {
    flex: 2, 
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10
    // paddingTop: 20
  },
  historyDetailContainer: {
    paddingTop: 10
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginHorizontal: 20,
    // borderBottomWidth: 1,
    // borderColor: theme.greyLine,
    backgroundColor: theme.white
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailRow: {
    flexDirection: 'row',
    flex: 2, 
    flexWrap: 'wrap',

  },
  detailContainer: {
    flex: 1,
  },
  arrowContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    justifyContent: 'space-between',
    position: 'absolute',
    right: 0,
    bottom: 15,   
  },

  iconBuySell: {
    paddingHorizontal: 40,
    color: theme.white    
  },

  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    opacity: 0.5
  },
  greyLineDownloadEN: {
    backgroundColor: theme.white,
    height: 1,
    marginRight: 38
  },
  greyLineDownloadID: {
    backgroundColor: theme.white,
    height: 1,
    marginRight: 64
  },
  greyLineVertical: {
    top: 7,
    borderRightWidth: 1,
    borderColor: theme.greyLine,
    marginVertical: 1,
    opacity: 0.5,
  },

  valueHistoryDetail: {
    fontFamily: 'roboto',
    color: theme.softGrey,
    fontSize: theme.fontSizeSmall,
    marginRight: 5,
    flex: 1,
    textAlign: 'right'
  },
  historyTitle: {
    fontFamily: 'roboto',
    color: theme.darkBlue,
  },
  historyAmount: {
    fontFamily: 'roboto',
    color: theme.darkBlue,
    textAlign: 'right'

  },
  leftHistory: {
    flex: 1,
    // justifyContent: 'space-between',
    marginHorizontal: 0

  },
  subTitle: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.blueText,
    fontFamily: 'roboto',

  },
  subTitleStatus: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.black,
    fontFamily: 'roboto',
    backgroundColor: theme.white,
    textAlign: 'right'
  },
  gradientYellow: [
    '#D52F61', '#F57F67',
  ],
  gradientEdit: [
    '#FF9C00', '#FF6300',
  ],
  gradientTwoR: [
    '#E35607', '#EA371B', '#F31133',
  ],
  succesText: {
    backgroundColor: theme.softBlue,
    width: 60,
    height: 15,
    borderRadius: 20,
    top: 10
  },
  notPaidYetText: {
    backgroundColor: theme.softPink,
    width: 80,
    height: 15,
    borderRadius: 28,
    marginTop: 4,
    marginLeft: 50
  },
  declineText: {
    backgroundColor: theme.softPink,
    width: 60,
    height: 15,
    borderRadius: 28,
    marginTop: 4,
    marginLeft: 50
  },
  aprovedTextColor: {
    color: theme.pinkBrand,
    fontSize: theme.fontSizeXS,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },
  aprovedTextColorPaid: {
    color: theme.lightBlue,
    fontSize: theme.fontSizeXS,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },
  trash: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.redSplitbill,
  },
  editContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: theme.orangeSplitbill
  },
  trashReject: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: theme.redSplitbill,
  },
  whiteIcon: {
    color: theme.white,
  },
  statusText: {
    color: theme.white,
    fontSize: 10,
  },
  greyLineList: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  statusTextEdit: {
    color: theme.white,
    fontSize: 10,
    marginTop: 5,
  },
  statusTextRequest: {
    color: theme.white,
    fontSize: 10,
    marginTop: 5,
  },

  // REVAMP
  containerPrimier: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.superlightGrey,
    paddingBottom: 50
  },
  backgroundColor1: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.2
  },
  containerBanner: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginHorizontal: 0,
    marginVertical: Platform.OS === 'ios' ? width * 0.27 : width * 0.22,
    borderRadius: 15,
    top: width * -0.2
  },
  containerInnerBox: {
    marginTop: 5,
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width * 0.9,
    backgroundColor: theme.white
  },
  containerContent: [{justifyContent: 'space-between', flexGrow: 1, paddingBottom: 20}],
  container: {
    flex: 1,
    backgroundColor: theme.superlightGrey,
  },
  youBillDownloadText: {
    flex: 1, 
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  youBillTitleContainer: {
    backgroundColor: theme.softBlue,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  youBillTitleText: {
    color: theme.lightBlue,
    fontSize: theme.fontSizeSmall,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },
  share: {
    color: theme.darkBlue,
    fontSize: theme.fontSizeLarge,
  },
  shareContainer: {
    position: 'absolute',
    right: 10
  },
  rowYouBillShare: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ph20: {
    paddingHorizontal: 20,
  },
  whiteIconEdit: {
    color: theme.white,
  },
  backgroundColor2: {
    backgroundColor: theme.pinkBrand,
    height: Platform.OS === 'ios' ? height / 10 : height / 10,
    width: width,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: height * 0.4,
    position: 'absolute',
  },
  containerBanner2: {
    borderRadius: 15,
    backgroundColor: theme.white,
    marginHorizontal: width * 0.05,
  },
  contentInnerBox: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  rightHistory: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  }
};