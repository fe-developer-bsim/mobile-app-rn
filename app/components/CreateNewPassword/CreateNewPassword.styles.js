import {contentContainerStyle, fontSizeNormalStyle, fontSizeSmallStyle, textLightGreyStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle, {
    justifyContent: 'space-between',
    flex: 1
  }],
  label: [fontSizeNormalStyle],
  inputSpacing: {
    marginBottom: 15
  },
  passwordFieldsContainer: {
    flexDirection: 'column'
  },
  eyeIconStyle: {position: 'absolute', width: 30, right: 5, top: 30},
  passRule: [fontSizeSmallStyle, textLightGreyStyle]
};
