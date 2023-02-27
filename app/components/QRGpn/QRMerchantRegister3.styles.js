import {contentContainerStyle, fontSizeXLStyle, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', paddingBottom: 30}],
  titles: [fontSizeXLStyle, {
  }],
  titles2: [fontSizeXLStyle, {
    marginBottom: 15,
  }],
  titles3: [fontSizeMediumStyle, {
    marginVertical: 20,
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
  rentRow: {
    flexDirection: 'row'
  },
  rentStart: {
    flex: 1,
    paddingBottom: 15,
    paddingRight: 10,
  },
  rentEnd: {
    alignSelf: 'flex-end',
    paddingBottom: 30,
    paddingLeft: 10,
    flex: 1,
  },
  textavailable: {
    color: theme.green,
  },
  textcontainer: {
    alignItems: 'flex-end'
  },
  textnotavail: {
    color: theme.brand
  },
  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.grey,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
  },
  explainIcon: {
    color: theme.black
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 10,
    width: width - 100,
  },
  halfWidth: {
    flex: 1,
  }
};
