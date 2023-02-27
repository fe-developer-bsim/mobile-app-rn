import {theme} from '../../styles/core.styles';

export default {
  container: {
    flexGrow: 1,
    backgroundColor: theme.white
  },
  subContainer:
  {
    justifyContent: 'space-between',
    padding: 20,
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
    paddingTop: 0,
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
  textContainer: {
    flex: 1,
    flexWrap: 'wrap'
  },
  bottomWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonNext: {
    paddingTop: 20,
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  redText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    color: theme.brand
  },
  itemText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    color: theme.black
  },
  formTitle: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontWeight: theme.fontWeightLight,
    paddingBottom: 2
  },
  finePrint: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
  }
};
