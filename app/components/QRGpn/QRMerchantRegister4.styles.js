import {contentContainerStyle, fontSizeXLStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{flex: 1, justifyContent: 'space-between', paddingBottom: 20}],
  titles: [fontSizeXLStyle, {
  }],
  titles2: [fontSizeMediumStyle, {
    marginVertical: 15,
  }],
  formContainer: {
    flex: 1,
  },
  greyLine: {
    backgroundColor: '#ECECEC',
    height: 10,
    marginTop: 20
  },
  buttonCheck: {
    position: 'absolute',
    right: 5,
    bottom: 20,
  },
  buttonText: {
    padding: 5,
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.brand,
    color: theme.brand,
  },
  containerInner: [contentContainerStyle, {
    paddingBottom: 10,
  }],
  labelSpacing: {
    paddingVertical: 12
  },
  containerBtn: {
    paddingTop: 20,
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
  textavailable: {
    color: theme.green,
  },
  textcontainer: {
    alignItems: 'flex-end'
  },
  textcontainerPhone: {
    alignItems: 'flex-start'
  },
  textnotavail: {
    color: theme.brand
  },
  textavailablePhone: {
    color: theme.disabledGrey
  },
  borderedContainer: {
  },
  disbaledBorderedContainer: {
  },
  wnia: [fontSizeMediumStyle, {
  }],
  wna: {
  }
};
