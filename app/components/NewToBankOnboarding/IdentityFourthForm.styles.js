import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  columnContainer: {
    flex: 1,
    backgroundColor: theme.white
  },
  mainTitle: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  amountTitle: {
    color: theme.black
  },
  amountTransfer: {
    color: theme.red,
    fontSize: theme.fontSizeLarge
  },
  virtualAccountTitle: {
    color: theme.black
  },
  virtualAccount: {
    color: theme.red,
    fontSize: theme.fontSizeLarge
  },
  codeBank: {
    color: theme.black
  },
  accountNameTitle: {
    color: theme.black
  },
  accountName: {
    color: theme.red,
    fontSize: theme.fontSizeLarge
  },
  buttonNext: {
    paddingTop: 25,
    paddingHorizontal: width / 11,
    position: 'relative',
    width: width
  },
  buttonHowTo: {
    backgroundColor: 'transparent',
    borderColor: theme.red,
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 15
  },
  buttonHowToTransfer: {
    color: theme.red
  },
  buttonPayment: {
    marginTop: 5
  },
  buttonIhaveMakePayment: {
    color: theme.white
  },
  buttonComponent: {
    justifyContent: 'space-between',
  }
};
