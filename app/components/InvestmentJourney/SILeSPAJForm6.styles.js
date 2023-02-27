import {theme} from '../../styles/core.styles';

export default {
  rowCheckBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20
  },
  textCheckBox: {
    paddingLeft: 20,
    paddingRight: 25
  },
  progressBar: {
    flexDirection: 'row',
    height: 7,
  },
  redBar: {
    backgroundColor: theme.blueAmount,
    flexDirection: 'row',
  },
  greyBar: {
    backgroundColor: theme.darkGrey,
    flexDirection: 'row',
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
  invesRadioButton: {
    paddingHorizontal: 20,
    paddingTop: 15,
    color: theme.red,
    fontWeight: theme.fontWeightBold,
  },
  row: {
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonLargeTextStyle: {
    fontSize: theme.fontSizeMedium,
    color: theme.white,
  },
  emoneyTitle: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    paddingHorizontal: 20,
    paddingTop: 25
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  detailTitle: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingLeft: 30,
    fontWeight: theme.fontWeightBold,
  },
  detailTitle2: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 40,
    fontWeight: theme.fontWeightLight,
  },
  detailTitle3: {
    fontSize: theme.fontSizeNormal,
    color: theme.black,
    fontFamily: theme.roboto,
    paddingVertical: 5,
    paddingLeft: 20,
    fontWeight: theme.fontWeightLight,
    paddingBottom: 5,
  },
};