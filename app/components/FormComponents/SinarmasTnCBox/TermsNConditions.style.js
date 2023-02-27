import {theme} from '../../../styles/core.styles';

export default {
  checkBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  labelStyle: {
    fontFamily: theme.roboto,
    fontSize: 15,
  },
  border: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    justifyContent: 'flex-start',
    padding: 10,
  },
  padding: {
    paddingHorizontal: 37,
  },
  tncBodyStyle: {
    fontFamily: theme.robotoLight,
    fontSize: 12,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mt5: {
    marginTop: 5
  },
  errIcon: {
    color: theme.brand,
    marginRight: 5,
  },
  redText: {
    fontSize: theme.fontSizeSmall,
    color: theme.brand,
    fontFamily: 'Roboto',
  },
};