import {fontSizeMediumStyle, fontSizeXLStyle, fontSizeLargeStyle} from '../../styles/common.styles';
import {theme, textBasic} from '../../styles/core.styles';

export default {
  container: {
    flex: 1,
  },
  bgGrey: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
  },
  bgWhite: {
    backgroundColor: theme.white,
    padding: 10,
  },
  bgWhite2: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
    height: 160,
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.greyLine,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  bgWhite3: {
    backgroundColor: theme.white,
    paddingHorizontal: 15,
    justifyContent: 'center',
    paddingTop: 10
  },
  labelSpacing: {
    paddingVertical: 7
  },
  cashierContainer: {
    backgroundColor: theme.white,
    paddingHorizontal: 15,
  },
  subtext: {
    fontWeight: theme.fontWeightLight
  },
  merchantText: [fontSizeXLStyle, {
    color: theme.red
  }],
  merchantText2: [fontSizeLargeStyle, {
    color: theme.green
  }],
  merchantText3: [fontSizeLargeStyle, {
    color: theme.black,
    fontWeight: theme.fontWeightBold
  }],
  merchantText4: [fontSizeMediumStyle, {
    color: theme.black,
    fontWeight: theme.fontWeightBold
  }],
  plusIcon: {
    color: theme.red,
    marginRight: 5
  },
  arrowIcon: {
    color: theme.red,
    paddingHorizontal: 13
  },
  iconContainer: {flex: 0.5},
  nameContainer: {flex: 1.5},
  arrowContainer: {flex: 0.5, justifyContent: 'center', alignItems: 'flex-end'},
  merchantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10
  },
  subMerchant: [textBasic, {
    fontSize: theme.fontSizeSmall,
    color: theme.grey,
  }],
  borderGreyStyle: {
    height: 1.5,
  },
  headText: {
    color: 'grey',
    marginBottom: 3,
  },
  headText3: {
    color: 'grey',
    marginTop: 5,
  },
  bold: {
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium
  },
  buttonNext: {
    backgroundColor: theme.white,
    padding: 13,
    paddingHorizontal: 20,

  },
  plusContainer: {
  },
  refundCont: {
  },
  addCashierText: {
    color: theme.red,
    paddingHorizontal: 5
  },
  addCashierText2: [fontSizeMediumStyle, {
    color: theme.red,
  }],
  greyLine: {
    borderTopWidth: 1,
    borderColor: theme.greyLine,
    marginTop: 10
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  userIcon:
  {
    color: '#3892FC'
  },
  buttonCont: {
    alignItems: 'flex-end',
  },
  buttonText: {
    backgroundColor: theme.brand,
    color: theme.white,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cashierListCont: {
    marginTop: 20
  },
  titleStyle: {
    fontSize: 24,
    paddingHorizontal: 10,
    color: theme.black,
    fontWeight: theme.fontWeightBold
  },
  iconSize: {
    color: '#3892FC',
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  iconContainerImage: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
};
