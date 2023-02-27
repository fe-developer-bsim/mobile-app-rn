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
  balanceTxt: {
    color: theme.lightGrey,
  },
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
  accTxt2: [bold, {
  }],
  imageOffer2: {
    width: 85,
    height: 85
  },
  buttonCenter: {
    padding: 30
  },
  tabInvestmentContainer: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  greyLine: {
    height: 1,
    backgroundColor: theme.greyLine,
    marginVertical: 7
  },
  greyLine2: {
    height: 1,
    backgroundColor: theme.greyLine,
  },
  greyLineButton: {
    backgroundColor: theme.greyLine,
    height: 3,

  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButtonNew: {
    color: theme.red,
  },
  transparentContainer: {
    backgroundColor: theme.transparent,
    marginRight: 5,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  FilterStyle: {
    alignSelf: 'center',
    backgroundColor: theme.transparent,
    paddingTop: 60
  },
  black: {
    alignSelf: 'center',
    paddingTop: 40,
  },

  filterIcon: {
    paddingLeft: 10,
    paddingTop: 17,
    paddingBottom: 13,
    color: theme.lightGrey
  },
  blackText: {
    color: theme.lightGrey,
    paddingTop: 15,
    fontFamily: 'roboto'
  },
  filterButton: {
    borderRadius: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.grey,
    paddingHorizontal: 20,
  },
  textProductTitle2: {
    color: theme.white
  },
  addressText: [bold, {
    paddingBottom: 10,

  }],

  menuBarBar: {
    color: theme.lightGrey,
  },
  borderAddress: {
    borderRadius: 20,
    padding: 15,
    marginTop: 18,
    borderWidth: 2,
    borderColor: theme.greyLine
  }
};
