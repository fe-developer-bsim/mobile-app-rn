import {theme} from '../../styles/core.styles';

export default {
  container: [{
    flexDirection: 'row',
    flex: 1
  }],
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  leftSide: {
    flex: 1
  },
  rightSide: {
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row'
  },
  text: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent'
  },
  secondaryText: {
    fontWeight: theme.fontWeightNormal,
    fontSize: theme.fontSizeSmall,
    textAlign: 'right',
    alignSelf: 'center',
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    color: theme.red
  }
};
