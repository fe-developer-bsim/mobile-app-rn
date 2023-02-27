import {fontSizeLargeStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
  },
  terminalContainer: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    height: 100,
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.greyLine,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  labelSpacing: {
    paddingVertical: 7
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  row2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  borderGreyStyle: {
    height: 1.5,
  },
  nameStyle: [fontSizeLargeStyle, {fontWeight: 'bold'
  }],
  terminalStyle: {
    paddingHorizontal: 13
  },
  icon: {
    paddingHorizontal: 13
  },
  red: {
    color: 'red'
  },
  headText3: {
    color: 'grey',
    paddingBottom: 5,
  },
  resetContainer: {
    paddingVertical: 2,
    alignItems: 'flex-end',
  },
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,

  },
};
