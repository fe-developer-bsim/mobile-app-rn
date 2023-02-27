import {contentContainerStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
  },
  bgWhite: [contentContainerStyle, {
    backgroundColor: theme.white,
  }],
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 10,
  },
  greyLine2: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  iconContainer: {
    alignItems: 'flex-end',
    flex: 0.05
  },
  button2: {
    width: 135,
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  contentText: {
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  subContentTextTop: {
    color: theme.black,
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    fontFamily: theme.robotoLight
  },
  subContentTextBottom: {
    paddingTop: 5,
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightRegular,
    fontFamily: theme.roboto
  },
  subContentTextBottomBold: {
    color: theme.black,
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightMedium,
    fontFamily: theme.robotoLight
  },
  mainTitle: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  image: {
    width: width - 60,
    height: (width / 2) + 10 
  },
  redBar: {
    backgroundColor: theme.brand,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  borderGreyTop: {
    marginBottom: 20,
    marginTop: 5,
    backgroundColor: theme.disabledGrey,
    height: 1,
  },
  sendAccountDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center'
  },
  detailLeft: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  detailRight: {
    paddingTop: 5,
    alignItems: 'flex-end',
  },
  rowFieldAgreement: {
    flexDirection: 'row',
  },
  greyLine3: {
    marginTop: 20,
    backgroundColor: theme.greyLine,
    height: 6,
  },
  textThin: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightLight,
    fontFamily: theme.robotoLight
  },
  textCenter: {
    alignItems: 'center',
    paddingVertical: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: [fontSizeSmallStyle, {
    color: theme.brand,
    fontFamily: theme.robotoLight
  }],
  maxText: {
    width: width
  },
  containerConvertSavingValas: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainerConvertValas: {
    justifyContent: 'flex-start',
  },
  titleConvertValas: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightRegular,
    marginRight: 10,
    color: theme.black,
  },
  valueConvertValas: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightRegular,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
  },
  containerAmountDebitedSavingValas: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greyLineConvertValas: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  titleConvertValasBold: {
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightBold,
    marginRight: 10,
    color: theme.black,
  },
  valueConvertValasBold: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightBold,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
  },
  greyLineValas: {
    backgroundColor: theme.greyLine,
    height: 6,
  },
};
