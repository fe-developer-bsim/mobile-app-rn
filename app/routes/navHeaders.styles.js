import {theme} from '../styles/core.styles';

export default {
  title: {
    color: theme.white,
    paddingHorizontal: 10,
    fontSize: theme.fontSizeMedium
  },
  titleWhite: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: theme.fontSizeMedium
  },
  titleRed: {
    color: theme.radicalRed,
    paddingHorizontal: 10,
    fontSize: theme.fontSizeMedium
  },
  row: {
    flexDirection: 'row'
  },
  topHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconScan: {
    backgroundColor: theme.pinkBrand,
    marginBottom: 20,
    height: 50,
    width: 50,
    borderRadius: 20
  },
  titleMgm: {
    color: theme.white,
    fontSize: theme.fontSizeLarge,
    alignSelf: 'center',
    paddingRight: 70,
  },
  titleTransferProxy: {
    color: theme.white,
    fontSize: theme.fontSizeLarge,
    alignSelf: 'center',
    paddingRight: 70,
    fontWeight: 'bold',
  }
};
