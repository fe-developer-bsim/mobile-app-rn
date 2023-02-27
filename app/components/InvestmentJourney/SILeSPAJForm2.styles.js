import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import * as styles from '../../styles/common.styles';

export default {
  SilTitleHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  SilTitleHeader: {
    fontSize: theme.fontSizeMedium,
    color: theme.black,
  },
  name: {
    color: theme.black,
    fontFamily: theme.robotoLight,
  },
  pageTitleName: {
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontSize: theme.fontSizeSmall,
  },
  titleNameProduct: {
    fontSize: theme.fontSizeNormal,
    paddingBottom: 20,
    color: theme.black
  },
  mobileNumbeContainer: {
    marginTop: 10,
    marginBottom: -30
  },
  bodyContainerWithTerms:
  [{
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  }, styles.contentContainerStyle],
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainTitleText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 20,
    paddingTop: 25
  },
  FieldsContainerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 10
  },
  fieldContainer: {
    borderColor: theme.white,
    marginTop: 20,
    fontSize: theme.fontSizeNormal,
  },
  phoneNumberField: {
    paddingBottom: 10,
    marginTop: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  inlineField: {
    flexDirection: 'row',
  },
  childField: {
    width: width / 4,
  },
  childFieldper: {
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  pageTitle: {
    fontSize: theme.fontSizeSmall,
    paddingTop: 20,
    marginBottom: -10,
    fontFamily: 'Roboto',
  },
};