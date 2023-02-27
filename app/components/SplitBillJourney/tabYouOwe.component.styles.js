import * as styles from '../../styles/common.styles';
import {theme, text as textStyles} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const steps = 7;

export default {
  serialNoContainer: {
    flex: 1
  },
  contentContainer: {
    marginBottom: 5
  },
  content: {
    paddingVertical: 10,
  },
  number: [
    styles.fontSizeLargeStyle,
    styles.bold
  ],
  pageTitle: [
    styles.fontSizeLargeStyle,
    styles.bold,
    {
      paddingBottom: 10,
    }
  ],
  pageSubtitle: [
    styles.fontSizeNormalStyle,
    {
      paddingBottom: 10,
    }
  ],
  pageSubtitleDetail: [
    styles.fontSizeNormalStyle,
    {
      color: theme.red,
      marginTop: 7.5,
    }
  ],
  confirmSubtitle: [
    styles.fontSizeLargeStyle,
    styles.bold,
    {
      marginBottom: 20,
    }
  ],
  confirmTitle: [
    styles.fontSizeNormalStyle,

  ],
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7.5
  },
  column: {
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  rowGrey: [
    styles.borderGreyStyle,
    styles.rowGray, 
    {borderTopWidth: 2}
  ],
  formContainer: {
    flex: 1,
    paddingBottom: 10
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    width: 250,
    textAlign: 'center',
    color: theme.white
  },
  iconCurvePA: {
    paddingRight: 10,
    paddingBottom: 80

  },
  iconCurve: {
    borderColor: theme.grey,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 130
  },
  barStep: {
    flexDirection: 'row',
    height: 7
  },
  partOne: {
    backgroundColor: theme.red,
    height: steps,
    width: width / steps
  },
  partTwo: {
    backgroundColor: theme.grey,
    height: steps,
    width: width
  },
  arrowIconContainer: {
    justifyContent: 'center',
    paddingTop: 60,
    paddingRight: 15,
  },
  arrowIcon: {
    color: theme.black,
  },
  border: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  webView: {
    width: width,
  },
  detailContainer: {
    justifyContent: 'center',
    flex: 3,
    paddingLeft: 20,
    borderRadius: 3,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  columnContainer: {
    backgroundColor: theme.white
  },
  containerSplitBill: {
    flexDirection: 'row',
  },
  infoSplitBill: {
    backgroundColor: theme.brand,
    height: 20,
    width: 100,
    borderRadius: 10,
    marginLeft: 100,
    marginTop: -5,
    alignItems: 'center',
  },
  infoSplitBillText: {
    fontSize: 20,
    color: theme.white,
    paddingTop: 1,
    marginBottom: 20,
    marginTop: -5
  },
  validateSplitBill: {
    ...textStyles.text,
  },
  deleteText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
  },
  whiteIcon: {
    color: theme.white
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.7
  },

  iconSize: {
    alignSelf: 'center',
    width: 100,
    height: 200
  },

  emptyExplanation: {
    fontSize: theme.fontSizeNormal,
    color: theme.blueText,
    fontFamily: theme.roboto,
    paddingVertical: 10,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 5,
    width: width * 0.5,
    textAlign: 'center'
  },
  
  rowColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountText: {
    fontSize: theme.fontSize20,
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
    fontFamily: theme.roboto,
    paddingTop: 5,
  },

  productText: {
    fontSize: theme.fontSizeNormal,
    color: theme.blueText,
    fontFamily: theme.roboto,
    
  },

  productTextBilled: {
    fontSize: theme.fontSizeNormal,
    color: theme.blueText,
    fontFamily: theme.roboto,
    paddingVertical: 5,
  },

  productTextBilledText: {
    fontSize: theme.fontSizeNormal,
    color: theme.blueText,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    fontWeight: theme.fontWeightBold,
    paddingLeft: 5
  },

  dateText: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: theme.robotoLight,
    paddingVertical: 5,
  },

  installmentDetailText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: theme.roboto,
    paddingVertical: 5,
  },

  boxContainer: {
    borderRadius: 5,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  statusFullyPaidText: {
    backgroundColor: theme.softBlue,
    width: 60,
    height: 15,
    borderRadius: 20,
    top: 10
  },
  statusFailText: {
    backgroundColor: theme.black,
    width: 40,
    height: 15,
    borderRadius: 20,
    top: 10
  },
  statusPartiallyPaidText: {
    backgroundColor: theme.orange,
    width: 60,
    height: 15,
    borderRadius: 20,
    top: 10
  },
  statusPendingText: {
    backgroundColor: theme.softPink,
    width: 80,
    height: 15,
    borderRadius: 20,
    top: 10
  },
  statusRejectText: {
    backgroundColor: theme.softPink,
    width: 50,
    height: 15,
    borderRadius: 20,
    top: 10
  },
  aprovedTextColorPaid: {
    color: theme.lightBlue,
    fontSize: theme.fontSizeXS,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },  
  trash: {
    backgroundColor: 'red',
    marginHorizontal: 20,
    width: 80,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 5
  },
  gradientTwoR: [
    '#E35607', '#EA371B', '#F31133',
  ],
  aprovedTextColor: {
    color: theme.pinkBrand,
    fontSize: theme.fontSizeXS,
    fontFamily: theme.roboto,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold
  },
  rowBilledBy: {
    flexDirection: 'row'
  }
};