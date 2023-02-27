import {contentContainerStyle, fontSizeXLStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: [contentContainerStyle, {
    backgroundColor: theme.cardGrey,
    flexGrow: 1,
  }],
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  titleTxt: [bold, {
    fontSize: theme.fontSize22,
  }],
  subtitleTxt: {
    color: theme.lightGrey,
    paddingVertical: 5
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.black,
    height: 30
  },
  bgWhite: {
    backgroundColor: theme.white,
    marginVertical: 5,
    paddingVertical: 10
  },
  iconContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1.7,
  },
  simasTxt: [fontSizeMediumStyle, {
    color: theme.brand,
    fontWeight: '900'
  }],
  imageOffer: {
    width: 50,
    height: 18
  },
  poinImage: {
    height: 15,
    width: 40
  },
  pad2: {
    paddingVertical: 1
  },
  accTxt: [fontSizeXLStyle, {
    fontWeight: '800'
  }],
  typeTxt: {
    fontSize: 13
  },
  balanceTxt: [{
    fontSize: 13,
    color: theme.lightGrey,
  }],
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardIcon: {
    color: theme.red
  },
  arrowIcon: {
    paddingRight: 15,
    color: theme.red,
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  pb20: {
    paddingBottom: 20
  }
};
