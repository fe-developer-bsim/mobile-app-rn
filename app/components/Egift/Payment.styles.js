import {theme} from '../../styles/core.styles';
import {textLightGreyStyle} from '../../styles/common.styles';

export default {
  container: {
    padding: 20,
    justifyContent: 'space-between',
    flex: 1
  },
  topContainer: {
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: theme.greyLine
  },
  titleContainer: {
    paddingBottom: 20
  },
  middleContainer: {
  },
  bottomContainer: {
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },

  title: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightMedium,
    fontFamily: 'Roboto',
  },
  name: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'Roboto',
  },
  poin: {
    fontSize: theme.fontSizeNormal,
    color: theme.textGrey,
    fontFamily: 'Roboto',
  },
  iconColor: {
    color: theme.textGrey
  },
  infoTextContainer: {
    flex: 1
  },
  info: [textLightGreyStyle, {
    fontSize: theme.fontSizeSmall
  }],
};
