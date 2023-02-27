import {theme} from '../../styles/core.styles';
export default {
  wrapperContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.overlayBackground
  },
  contentContainerStyle: {
    flex: 1
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: theme.white,
    padding: 20,
    borderRadius: 20
  },
  innerContainerTransparent: {
    bottom: 100,
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  innerContainerRound: {
    alignItems: 'center',
    backgroundColor: theme.white,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 10
  },
  modalStyle: {
    padding: 0,
    margin: 0
  },
  innerContainerReferMgm: {
    alignItems: 'center',
    backgroundColor: theme.white,
    padding: 20,
    borderRadius: 20
  },
  innerContainerRoundMedalion: {
    alignItems: 'center',
    backgroundColor: theme.white,
    paddingHorizontal: 0,
    paddingVertical: 80,
    paddingBottom: 40,
    borderRadius: 10,
  },
  
  innerContainerSplitBill: {
    alignItems: 'center',
    backgroundColor: theme.white,
    padding: 20,
    borderRadius: 20
  }
};
