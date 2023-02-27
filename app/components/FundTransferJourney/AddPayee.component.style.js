import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';

export default {
  container: [contentContainerStyle],
  containerContent: [{alignItems: 'stretch', flexGrow: 1, 
    justifyContent: 'space-between'}],
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    color: '#0787E3',
    paddingRight: 10
  },
  title: {
    fontSize: theme.fontSize22,
    fontFamily: 'roboto',
  },
  formContainer: {
    flex: 1,
    paddingVertical: 20
  },
  formHeader: {
    fontWeight: theme.fontWeightMedium,
    paddingTop: 25,
    paddingBottom: 0,
    fontSize: theme.fontSizeNormal,
    fontFamily: 'roboto'
  },
  formHeaderSubtext: {
    paddingTop: 10,
    fontWeight: theme.fontWeightLight,
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto'
  },
  error: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'roboto'
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: theme.grey,
    borderWidth: 1,
    borderRadius: 4,
  },
  warningIcon: {
    color: theme.black
  },
  warningText: {
    marginLeft: 10,
    fontSize: theme.fontSizeSmall,
    color: theme.opacityBlack,
    fontFamily: 'roboto'    
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20
  },
  buttonBottom: {
    marginTop: 20
  },
  topContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  black: {
    color: theme.black,
  },
  greyLineLeft: {
    backgroundColor: theme.softGrey,
    height: 1,
    marginTop: 10,
  },
  arrowDownStyle: {
    color: theme.black,
  },
  bankContainer: {
    marginTop: 20, 
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center'
  }
};
