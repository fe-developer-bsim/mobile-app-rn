import {Dimensions} from 'react-native';
import {theme} from '../../styles/core.styles';
const {width} = Dimensions.get('window');

export default {
  bgWhite: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.grey
  },
  redLine: {
    height: 5,
    width: (width * 50) / 100,
    backgroundColor: theme.darkBrand
  },
  textTitle: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.black,
    paddingVertical: 20
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
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: theme.greyLine

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
  }

};
