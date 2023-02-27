import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
import {flex_1} from '../../styles/common.styles';

const {height, width} = Dimensions.get('window');

const row = {
  flexDirection: 'row',
  paddingBottom: 10,
};

const markerContainer = [
  row, {
    justifyContent: 'flex-start'
  }
];

export default {
  bodyContainerWithTerms:
  [{
    backgroundColor: theme.white,
    justifyContent: 'space-between'
  }, styles.contentContainerStyle],
  buttonContainerStyle: [{flexGrow: 1, backgroundColor: 'white', height: height / 2}],
  row: {
    paddingVertical: 10,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
    paddingTop: 10,
  },
  mainTitleTextHeader: {
    fontSize: theme.fontSizeXL,
    color: theme.black,
  },
  formHeader: {
    fontSize: theme.fontSizeNormal,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: theme.fontWeightBold,
  },
  containerImageCard: {
    flex: 1,
    alignItems: 'center',
    aspectRatio: 1.5,
  },
  imageList: {
    resizeMode: 'contain',
    flex: 1,
    width: width,
  },
  containerIcon: [
    styles.containerWhiteStyle,
    {
      padding: 20,
    }
  ],
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10,
  },
  redBar: {
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 2,
    borderColor: theme.white,
  },
  middleBar: {
    flexDirection: 'row',
    borderRightWidth: 2,
    borderColor: theme.white,
  },
  greyBar: {
    flexDirection: 'row',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  progressBar: {
    flexDirection: 'row',
    height: 7,
    paddingHorizontal: 40,
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 25,
    marginTop: 7,
  },
  FieldsContainerWrapperPage: {
    paddingHorizontal: 25,
  },
  inlineField: {
    flexDirection: 'row'
  },
  fieldPhoneCode: {
    width: width / 4
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: -20,
    fontSize: theme.fontSizeXS,
  },
  fieldPhoneNumber: {
    width: (width / 2) + 35,
    marginLeft: 20,
    bottom: 4.2
  },
  fieldContainer2: {
    borderColor: theme.white,
    fontSize: theme.fontSizeXS,
  },
  fieldDetermine: {
    marginBottom: -10,
    marginTop: -20,
  },
  textField: {
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.roboto,
    paddingBottom: -100,
    marginTop: 30,
  },
  textSub: {
    fontSize: theme.fontSizeXS,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.roboto
  },
  textArea: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 7,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.grey,
    elevation: 1,
    width: (width - 20),
    alignSelf: 'center',
    backgroundColor: theme.white,
    padding: 10,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  rowAlignBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: theme.whiteGrey,
  },
  accNo: {color: theme.textGrey},
  product: {color: theme.black, marginTop: 5},
  roboto: {
    fontFamily: 'roboto',
  },
  borderCaution: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.red,
    marginTop: 50,
    padding: 20,
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  caution: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    flex: 1
  },
  stylePicker: {
    marginTop: 30,
  },
  styleRadioButton: {
    marginTop: 20,
  },
  rowTextError: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: [theme.fontSizeSmallStyle, {
    color: theme.brand,
    fontFamily: theme.robotoLight
  }],
  textPickerStyle: {
    marginTop: 15,
  },

  containerSuccessScreen:
  {
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingBottom: 10,
  }
  ,
  labelSpacing: {
    paddingVertical: 14
  },
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  redContainer: [styles.contentContainerStyle, {
    backgroundColor: theme.brand,
  }],
  whiteContainer: [styles.contentContainerStyle, {
  }],
  logoImage: {
    width: 85,
    height: 33,
    marginVertical: 17,
  },
  merchantText: [styles.fontSizeXLStyle, {
    color: theme.white,
  }],
  whiteUnderlineText: {
    color: theme.white,
    textDecorationLine: 'underline'
  },
  whiteText: {
    color: theme.white,
  },
  rowSuccessScreen: {
    flexDirection: 'row'
  },
  info: {
    marginVertical: 20,
  },
  info2: {
    marginVertical: 10,
  },
  transactionId: {
    marginTop: 20,
  },
  regCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  plusContainer: {
    paddingRight: 20,
  },
  plusIcon: {
    color: theme.white
  },
  bulletIcon: {
    paddingTop: 10,
    color: theme.grey
  },
  txt: [styles.fontSizeLargeStyle],
  buttonAgree: {
    padding: 10,
  },
  textSmallTitle: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
  },
  textSmall: {
    color: theme.black,
    marginLeft: 5,
    fontFamily: 'roboto',
  },
  paddingDetail: {
    paddingRight: 30,
  },
  tncRow: {
    flexDirection: 'row'
  },
  tncRowMargin: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textTnc: {
    marginLeft: 5,
  },
  textTrxLimit: {
    marginBottom: 10,
  },
  btnUpdateAddress: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeLarge,
    color: theme.brand,
  },
  rowCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBorderCaution: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  containerConfirm: {
    marginTop: 20,
  },
  containerConfirmBottom: {
    marginTop: 20,
    marginBottom: 100,
  },
  textTitleImageConfirm: {
    color: theme.textGrey,
    fontFamily: 'roboto',
    marginBottom: 10,
  },
  iconCenter: {
    marginRight: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerIconAddress: {
    justifyContent: 'center',
  },
  borderSimasTara: {
    justifyContent: 'center',
    borderColor: theme.darkGrey,
    padding: 10,
  },
  borderBottomRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    marginBottom: 10,
  },
  newTitleContainer: [markerContainer, flex_1],
  titleSimasTara: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightLight,
    color: theme.lightBlack,
  },
  valueDetail: {
    color: theme.black,
    textAlign: 'right',
    fontFamily: 'roboto',
  },
  borderBottomNoRow: {
    flexDirection: 'row',
  },
};