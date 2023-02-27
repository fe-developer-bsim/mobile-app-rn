import {theme} from '../../styles/core.styles';
export default {
  wrapperContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.overlayBackground,
    margin: 0,
  },
  contentContainerStyle: {
    flex: 1
  },
  innerContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.white,
  },
  modalStyle: {
    padding: 0,
    margin: 0
  },
  
};
