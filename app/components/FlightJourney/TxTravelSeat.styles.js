import {Dimensions} from 'react-native';
import {theme} from '../../styles/core.styles';
const {width} = Dimensions.get('window');

export default {
  bgWhite: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
  redLine: {
    height: 5,
    width: (width * 70) / 100,
    backgroundColor: theme.darkBrand
  },
  textTitle: {
    fontSize: theme.fontSizeExtraXL,
    color: theme.black,
    paddingVertical: 20
  },
  checkboxField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 20
  },
  rowCheckBox: {
    paddingTop: 20,
  },
  paddingButton: {
    paddingVertical: 50
  },
  btnConfirm: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: theme.white

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
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  labelPax: {
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  textPurpose: {
    paddingTop: 20,
    color: theme.grey
  },
  textTnc: {
    color: theme.red,
    fontWeight: 'bold'
  },
  scrollContainer: {
    backgroundColor: theme.white
  }

};
