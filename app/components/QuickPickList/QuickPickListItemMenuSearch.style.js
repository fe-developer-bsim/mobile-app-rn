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
    fontWeight: theme.fontWeightBold,
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
    color: theme.black
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
    color: theme.brand,
    paddingRight: 20
  },
  pictureIcon: {
    alignSelf: 'center',
    marginRight: 10
  }
};
