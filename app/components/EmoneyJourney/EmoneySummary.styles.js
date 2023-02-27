import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle} from '../../styles/common.styles';
import {bold} from '../../styles/common.styles';

export default {
  container: {
    backgroundColor: theme.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  welcome:
  {
    color: theme.black,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium
  }
  ,
  summary: {
    flex: 1
  },
  title: [
    fontSizeNormalStyle,
    {
      color: theme.black
    }
  ],
  subtitle: {
    color: theme.black,
    marginBottom: 22,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium
  },
  forexDetails: {
    borderTopWidth: 1,
    borderTopColor: theme.cardGrey,
    paddingTop: 10,
    marginTop: 5
  },
  accordionIcon: {
    transform: [{rotate: '270deg'}],
    color: theme.brand,
    paddingHorizontal: 5
  },
  iconCollapsedStyle: {
    transform: [{rotate: '90deg'}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7.5
  },
  value: [fontSizeNormalStyle,
    {
      color: theme.black,
    }],
  borderGrey: {
    height: 1,
    backgroundColor: theme.greyLine
  },
  paddingSpace: {
    paddingVertical: 3
  },
  salutation: [
    bold,
    {
      fontSize: theme.fontSizeMedium,
      color: theme.black,
    }
  ],
  extraPadding: {
    paddingBottom: 10
  },
  offerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  containerRowSimasPoin: {
    flexDirection: 'row',
    borderColor: theme.disabledGrey,
    height: 60
  },
  containerPoin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.greyLine,
    borderRadius: 20,
  },
  poinImage: {
    height: 14,
    width: 35
  },
  welcomePoin:
  {
    color: theme.black,
    textAlign: 'center',
    fontWeight: theme.fontWeightBold,
    fontSize: 12
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    paddingVertical: 10
  },
  touchableRowPoin: {
    borderColor: 'white',
    flex: 2,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingBottom: 10
  },
  containerReload: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 40,
  },
  iconStyleRed: {
    color: theme.brand
  },
  collapsibleButton: {
    width: 40,
    height: 5,
    backgroundColor: theme.greyLine,
    borderRadius: 25,
    borderColor: 'white',
    alignSelf: 'center'
  },
  collapsibleContainer: {
    paddingTop: 20,
  },
};
