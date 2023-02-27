import {theme} from '../../styles/core.styles';

export default {
  container: {
    flexGrow: 1,
    backgroundColor: theme.white
  },
  subContainer:
  {
    justifyContent: 'space-between',
    padding: 0,
  },
  progressBar: {
    flexDirection: 'row',
    height: 7
  },
  redBar: {
    backgroundColor: theme.brand,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
  },
  topContainer: {
    paddingTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  greyLine: {
    height: 1,
    backgroundColor: theme.greyLine,
    marginVertical: 15
  },
  middleContainer: {
    paddingHorizontal: 20
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomWrapper: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  buttonNext: {
    paddingTop: 40,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  title: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  redText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium,
    color: theme.brand
  },
  itemText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeMedium,
    color: theme.black
  },
  titleText: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.lightGrey,
  },
  formTitle: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontWeight: theme.fontWeightLight,
    paddingBottom: 2
  },
  flex1: {
    flex: 1
  },
  detailBox: {
    marginVertical: 10
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
};
