import {theme} from '../../styles/core.styles';

export default {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  icon: {
    color: theme.black
  },
  touchableContainerRight: {
    borderRadius: 5,
    backgroundColor: theme.white,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.brand
  },
  touchableContainerLeft: {
    borderRadius: 5,
    backgroundColor: theme.white,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.brand
  },
  touchableContainerRightActive: {
    borderRadius: 5,
    backgroundColor: theme.brand,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableContainerLeftActive: {
    borderRadius: 5,
    backgroundColor: theme.brand,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textActive: {
    color: theme.white,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  textinActive: {
    color: theme.brand,
    fontSize: theme.fontSizeNormal,
    fontFamily: theme.roboto,
  },
  padding: {
    paddingHorizontal: 3
  }
};
  