import {theme} from '../../styles/core.styles';

export default {
  container: [{
    borderBottomWidth: 1,
    borderColor: theme.grey,
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1
  }],
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  subtext: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.black,    
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
    fontWeight: theme.fontWeightRegular,
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: theme.black,    
    flex: 1
  },
  secondaryText: {
    fontWeight: theme.fontWeightNormal,
    fontSize: theme.fontSizeSmall,
    textAlign: 'right',
    alignSelf: 'center',
    color: theme.black,    
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    color: theme.black,
    marginRight: 10
  }
};
