import {Dimensions} from 'react-native';
import {theme} from '../../styles/core.styles';
const {width} = Dimensions.get('window');

export default {
  containerWhite: {
    backgroundColor: theme.white,
  },
  scrollWhite: {
    backgroundColor: theme.white,
    paddingBottom: 50,
  },
  bgWhite: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
  redLine: {
    height: 5,
    width: (width * 60) / 100,
    backgroundColor: theme.darkBrand
  },
  textTittle: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.black,
    paddingTop: 20,
  },
  textSubTittle: {
    fontSize: theme.fontSizeLarge,
    color: theme.black,
    paddingVertical: 20,
    fontWeight: 'bold'
  },
  textSubTittleLeft: {
    fontSize: theme.fontSizeLarge,
    textAlign: 'left',
    color: theme.black,
    paddingVertical: 20,
    fontWeight: 'bold'
  },
  textSubTittleRight: {
    fontSize: theme.fontSizeLarge,
    textAlign: 'right',
    color: theme.red,
    paddingVertical: 20,
    fontWeight: 'bold'
  },
  checkboxField: {
    alignItems: 'flex-start',
    paddingRight: 20
  },
  rowCheckBox: {
    flexDirection: 'row',
    paddingTop: 50
  },
  paddingButton: {
    paddingVertical: 50
  },
  btnConfirm: {
    paddingHorizontal: 20,
    paddingVertical: 50
  },
  buttonLargeTextStyle: {
    color: theme.white,
    fontSize: theme.fontSizeMedium
  },
  checkBoxStyle: {
    height: 25,
    width: 25,
  },
  labelCheckBox: {
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    paddingTop: 2
  },
  textPurpose: {
    paddingVertical: 10,
    color: theme.grey
  },
  formField: {
    flexDirection: 'row',
  },
  formFieldRow: {
    width: ((width - 40) / 2),
    paddingHorizontal: 5
  },
  qiuckPickListStyle: {
    paddingTop: 0,
    marginTop: 0,
  },
  qiuckPickListScroll: {
    maxHeight: 100,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: theme.grey,
  },
  qiuckPickListStyleHide: {
    height: 0,
    width: 0,
  },
  labelPurpose: {
    color: theme.textGrey
  },
  hiddenForm: {
    height: 0
  },
  tittleRow: {
    flexDirection: 'row',
  },
  hideView: {
    height: 0,
    width: 0,
    margin: 0,
  },
  showView: {

  },
  pressCountryIso: {
    width: width - 40,
    height: -20,
    backgroundColor: 'transparent'
  }
};
