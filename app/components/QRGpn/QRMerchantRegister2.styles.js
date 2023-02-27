import {contentContainerStyle, fontSizeXLStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],
  titles: [fontSizeXLStyle, {
  }],
  titles2: [fontSizeXLStyle, {
    marginBottom: 15,
  }],
  titles3: [fontSizeMediumStyle, {
    marginBottom: 20,
  }],
  formContainer: {
    flex: 1,
  },
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  labelSpacing: {
    paddingVertical: 12
  },
  containerBtn: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  timeSelection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  radioStyle: {
    color: theme.brand
  },
  extraPadding: {
    paddingLeft: 10
  },
  borderedContainer: {
  },
  disbaledBorderedContainer: {
  },
  wnia: [fontSizeMediumStyle, {
  }],
  wna: {
  },
  halfWidth: {
    flex: 1,
  }
};
