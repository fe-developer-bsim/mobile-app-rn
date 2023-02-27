import {theme} from '../../styles/core.styles';

export default {
  upperContainer: {
    paddingHorizontal: 10,
  },
  fieldsContainerWrapper: {
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 10
  },
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
  bodyContainerWithNoTerms: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between',
    paddingBottom: -10
  },
  spaceContainer: {
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  fieldsContainerWrapperBenefit: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 10
  },
  mainTitleTextForm4: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 25
  },
  fieldContainer: {
    borderColor: theme.white,
    paddingBottom: 20,
    fontSize: theme.fontSizeNormal,
  },
  loginFieldsContainer: {
    paddingHorizontal: 10,
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
  loginFieldsContainerCal: {
    paddingHorizontal: 10
  },
};