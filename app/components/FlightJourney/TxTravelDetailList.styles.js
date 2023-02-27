import {Dimensions} from 'react-native';
import {theme} from '../../styles/core.styles';
const {width} = Dimensions.get('window');
const titleWidth = ((width - 40) * 30 / 100);
const valWidth = ((width - 40) * 70 / 100);

export default {
  bgWhite: {
    backgroundColor: theme.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.grey
  },
  rowProgress: {
    flexDirection: 'row',
  },
  redLine: {
    height: 5,
    width: (width * 60) / 100,
    backgroundColor: theme.red
  },
  darkGreyLine: {
    height: 5,
    width: (width * 40) / 100,
    backgroundColor: theme.grey
  },
  textTitle: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.black,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  checkboxField: {
    alignItems: 'flex-start',
    paddingRight: 20
  },
  rowCheckBox: {
    flexDirection: 'row',
    paddingTop: 50
  },
  btnConfirm: {
    paddingVertical: 80,
    paddingHorizontal: 20
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
  },
  textPurpose: {
    paddingVertical: 10,
    color: theme.grey
  },
  containerDisable: {
    borderWidth: 1,
    borderColor: theme.red
  },
  showFormKey: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  touchableContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  showFormTittle: {
    width: titleWidth
  },
  showFormVal: {
    alignItems: 'flex-end',
    width: valWidth
  },
  greyLine: {
    borderTopWidth: 1,
    borderTopColor: theme.greyLine
  },
  greyLinePadding: {
    height: 10,
    backgroundColor: theme.greyLine
  },
  textPurposeTittle: {
    color: theme.black,
    fontSize: theme.fontSizeLarge
  },
  textPurposeWarning: {
    color: theme.red,
    fontSize: theme.fontSizeSmall
  },
  formKeyTextTittle: {
    color: theme.textGrey,
    textAlign: 'left',
  },
  formKeyText: {
    textAlign: 'left',
    color: theme.black,
  },
  viewPurposeTittle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outerContainer: {
    backgroundColor: theme.white
  },
  scrollContainer: {
    backgroundColor: theme.white
  },
  iconEdit: {
    color: theme.red
  },
  showFormTittleContact: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  editButton: {
    color: theme.red,
    fontSize: theme.fontSizeLarge,
  },
  containerListPassenger: {
    paddingTop: 20
  }
};
