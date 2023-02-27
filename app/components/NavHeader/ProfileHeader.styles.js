import {theme} from '../../styles/core.styles';

export default {
  logo: {
    width: 80,
    height: 28,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  greySmallText: {
    textAlign: 'right',
    color: theme.textLightGrey,
    fontSize: theme.fontSizeXS
  },
  additionalPadding: {
    paddingBottom: 5
  },
  iconPadding: {
    paddingHorizontal: 5,
  },
  iconInbox: {
    paddingLeft: 5,
    paddingBottom: 3
  },
  cartRed: {
    borderRadius: 15,
    height: 10,
    width: 10,
    overflow: 'hidden',
    backgroundColor: theme.brand,
    position: 'absolute',
    top: 5,
    right: 3,
    zIndex: 1
  },
  burger: {
    color: theme.black
  },
  row: {
    flexDirection: 'row',
  },
  faveFill: {
    color: '#FFE205'
  },
  scheduledOutline: {
    position: 'absolute',
    color: theme.black,
    paddingTop: 2
  },
  burgerLuckyDip: {
    width: 35,
    height: 35,
    alignItems: 'center',
    paddingTop: 25
  },
  LuckydipPrizeText: {
    fontSize: 9, 
    color: theme.white, 
    fontWeight: theme.fontWeightBold
  },
  tagLuckyDipHeader: {
    backgroundColor: theme.red, 
    alignItems: 'center', 
    borderRadius: 20, 
    width: 50,
    height: 12,
  }
};
