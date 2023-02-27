import {fontSizeXLStyle, bold, fontSizeMediumStyle} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';

export default {
  container: {
    backgroundColor: theme.cardGrey,
    flexGrow: 1,
  },
  wrapContainer: {
    backgroundColor: theme.white,
    flexGrow: 1,
  },
  titleTxt: [bold, {
    fontSize: theme.fontSize22
  }],
  subtitleTxt: {
    color: theme.lightGrey,
    paddingVertical: 10
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15
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
  },
  iconContainer: {
    flex: 0.5,
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
  balanceTxt: {
    color: theme.lightGrey,
  },
  arrowContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10
  },
  cardIcon: {
    color: theme.red
  },
  arrowIcon: {
    marginRight: 15,
    color: theme.black,
    height: 22,
    width: 22
  },
  row2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accTxt2: [bold, {
  }],
  imageOffer2: {
    width: 50,
    height: 50
  },
  greyLine: {
    backgroundColor: theme.grey,
    height: 1,
  },
  date: {
    bottom: 20,
    left: 28,
    marginTop: 5
  },
  dateText: {
    fontSize: 12
  },
  spaceTop: {
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },
  typeTxt: {
    fontSize: 12
  },
  renderFooter:
  {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  },
  red: theme.brand
};
