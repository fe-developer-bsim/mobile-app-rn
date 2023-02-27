import {theme} from '../../../styles/core.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  optionStyle: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between'
  },
  buttonStyle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.textGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonActive: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.brand
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: '100'
  },
  textStyleDisabled: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    color: theme.textGrey,
    fontWeight: '100'
  },
  subtextStyle: {
    fontSize: theme.fontSizeSmall,
    paddingRight: 5
  },
  boldTextDisabled: {
    color: theme.textGrey,
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontWeight: theme.fontWeightBold
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 15,
    marginBottom: 10,
  },
  halfWidth: {
    width: (width - 40) / 2
  },
  renderContainer: {
    // flexWrap: 'wrap',
  },
  subtextGreyStyle: {
    fontSize: theme.fontSizeSmall,
    paddingLeft: 5,
    color: theme.lightGrey,
    fontFamily: 'roboto'
  },
  label: {
    fontSize: theme.fontSizeNormal,
    paddingLeft: 5,
    fontFamily: 'roboto',
    color: theme.darkBlue,
    fontWeight: theme.fontWeightBold,
  },
  detailsContainer: {
    justifyContent: 'center',
    flex: 2,
  },
  optionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 5
  },
};
