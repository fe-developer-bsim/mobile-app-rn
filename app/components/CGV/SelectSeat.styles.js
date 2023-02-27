import {theme} from '../../styles/core.styles';

export default {
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'space-between'
  },
  rowData: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row'
  },
  seat: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  topContainer: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 10,
    borderColor: theme.greyLine
  },
  middleContainer: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  colorBox: {
    width: 10,
    height: 10
  },
  screenContainer: {
    height: 20,
    backgroundColor: theme.greyLine,
    alignItems: 'center',
    marginVertical: 10
  },
  seatLayoutContainer: {
    backgroundColor: theme.greyLine
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  seatGrade: {
    paddingLeft: 5,
    width: 90
  },
  seatAmount: {
    paddingLeft: 10,
    flex: 1
  },
  legendContainer: {
    marginVertical: 5
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  totalContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 10
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  seatNumber: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeXS
  },
  seatNumberSelected: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeXS,
    color: theme.white
  },
  seatNumberDisabled: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeXS,
    color: '#c7c7c6'
  },
  title: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeLarge,
  },
  subTitle: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight
  },
  countdown: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    color: theme.brand,
    textAlign: 'right'
  },
  screenText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    color: theme.lightGrey,
  },
  legendSpace: {
    marginBottom: 5,
    fontWeight: theme.fontWeightMedium
  },
  totalTitle: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightLight
  },
  amount: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeLarge,
  },

  na: '#c7c7c6',
  color01: '#735012',
  color02: '#b55642',
  color03: '#ff61b0',
  color04: '#c0c081',
  color05: '#d297d3',
  color06: '#830242',
  color07: '#0357FC',
  color08: '#e8f08d',
  color09: '#d121ca',
  color10: '#ea548d',
};
