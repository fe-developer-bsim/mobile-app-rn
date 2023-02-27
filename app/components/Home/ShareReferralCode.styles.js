import {theme} from '../../styles/core.styles';

export default {
  content: [{
    backgroundColor: theme.white,
    flex: 1,
  }],
  mainTitle: {
    textAlign: 'center',
    fontSize: theme.fontSizeLarge,
    padding: 30,
    color: theme.black
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 100
  },
  rowLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  rowRight: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  valid: {
    alignItems: 'center',
    paddingBottom: 70,
    paddingTop: 20
  },
  validText: {
    color: theme.black,
    fontSize: theme.fontSizeSmall
  },
  downContent: {
    backgroundColor: theme.containerGrey,
    alignItems: 'center'
  },
  bottomSpacing: {
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  termTitle: {
    alignItems: 'center',
    paddingBottom: 20
  },
  termTitleView: {
    alignItems: 'center',
  },
  downRow: {
    flexDirection: 'row',
    backgroundColor: theme.white,
    borderRadius: 5
  },
  downRowRight: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  downRowLeft: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  bottomSide: {
    backgroundColor: theme.containerGrey,
  },
  shareLinkTitle: {
    paddingTop: 15,
    paddingBottom: 5
  },
  rowBot: {
    color: theme.red,
    fontSize: theme.fontSizeMedium
  },
  rowInvitRight: {
    textAlign: 'center'
  },
  rowInvitLeft: {
    textAlign: 'center'
  },
  logoShare: {
    height: 100,
    width: 100,
    alignItems: 'center',
    padding: 10
  },
  logoShareIcon: {
    height: 100,
    width: 100,
    padding: 10
  },
  copy: {
    color: theme.red
  }
};
