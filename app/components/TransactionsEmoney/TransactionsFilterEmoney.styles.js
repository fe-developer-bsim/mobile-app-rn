import {contentContainerStyle, fontSizeSmallStyle, bold} from '../../styles/common.styles';

export default {
  container: [
    contentContainerStyle, {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'space-between'
    }
  ],
  dropdownLabel: {
    ...bold,
    ...fontSizeSmallStyle
  },
  formInputWrapper: {
    paddingBottom: 30
  },
  checkboxLabel: [
    {paddingBottom: 20},
    bold,
    fontSizeSmallStyle
  ],
  checkboxLabelStyle: {
    ...fontSizeSmallStyle
  },
  checkboxContainerStyle: {
    paddingBottom: 20
  },
  checkboxStyle: {
    width: 15,
    height: 15,
  }
};
