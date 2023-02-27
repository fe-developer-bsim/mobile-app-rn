import {theme} from '../../styles/core.styles';
import {textLightGreyStyle, containerGreyStyle, containerWhiteStyle} from '../../styles/common.styles';

const card = [containerWhiteStyle, {
  marginVertical: 5,
}];

const qrStyle = {
  padding: 30
};

export default {
  container: [containerGreyStyle],
  containerContent: {alignItems: 'stretch'},
  title: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    paddingBottom: 20
  },
  formContainer: {
    flex: 1,
    paddingBottom: 15
  },
  availableBalanceText: [
    textLightGreyStyle,
    {
      fontSize: theme.fontSizeNormal
    }
  ],
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  line: {
    borderTopColor: theme.grey,
    borderTopWidth: 1,
    marginVertical: 15
  },
  halfWidth: {
    flex: 1
  },
  right: {
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginLeft: 40,
    fontSize: theme.fontSizeLarge,
  },
  card,
  button: [card, qrStyle],
  qrStyle
};
