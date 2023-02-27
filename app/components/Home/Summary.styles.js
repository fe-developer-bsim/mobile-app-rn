import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle} from '../../styles/common.styles';
import {bold} from '../../styles/common.styles';

export default {
  container: {
    backgroundColor: theme.pinkBrand,
    paddingVertical: 20,
    // paddingHorizontal: 10,
    // marginHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  welcome:
  {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.fontSizeMedium,
    marginBottom: 5,
    marginTop: 5
  },
  details: {
    color: theme.white,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  summary: {
    flex: 1,
    marginBottom: 20
  },
  summaryForex: {
    flex: 1,
  },
  title: [
    fontSizeNormalStyle,
    {
      color: theme.white
    }
  ],
  subtitle: {
    color: theme.black,
    marginBottom: 22,
    fontWeight: theme.fontWeightBold,
    fontSize: theme.fontSizeMedium
  },
  forexDetails: {
    // paddingTop: 10,
    marginTop: 5,
    marginBottom: 25
  },
  accordionIcon: {
    transform: [{rotate: '270deg'}],
  },
  iconCollapsedStyle: {
    transform: [{rotate: '90deg'}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 13,
    marginLeft: 13
  },
  rowForex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginRight: 13,
    marginLeft: 13
  },
  value: [fontSizeNormalStyle,
    {
      fontWeight: 'bold',
      color: theme.white,
    }],
  borderGrey: {
    height: 1,
    backgroundColor: theme.greyLine,
    marginRight: 20,
    marginLeft: 20
  },
  borderGreyTop: {
    marginTop: 20,
    marginBottom: 20,
    height: 2,
    backgroundColor: theme.white,
    marginRight: 7,
    marginLeft: 7
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
    flexDirection: 'column',
    marginLeft: 15
  },
  titleContainer: {
    flexDirection: 'row',
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 20
  },
  pictureIcon: {
    alignSelf: 'center',
    width: 70,
    height: 70,
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
    backgroundColor: theme.white,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 40,
  },
  iconStyleRed: {
    color: theme.brand
  },
  collapsibleButton: {
    borderRadius: 25,
    borderColor: 'white',
    alignSelf: 'center',
    color: theme.white,
    paddingHorizontal: 5,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  collapsibleContainer: {
    backgroundColor: theme.lightPinkNew,
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    paddingVertical: 5,
    width: 120,
    marginTop: 5
  },
  reloadBalance: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  reloadIcon: {
    paddingHorizontal: 5
  },
  containerButtonHome: {
    borderRadius: 20,
    borderColor: 'white',
    color: theme.red,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: theme.white,
    width: 65,
    height: 65,
    marginTop: 5
  },
  collapsibleButtonHome: {
    color: theme.pinkBrand
  },
  textHome: {
    fontSize: theme.fontSizeXS,
    color: theme.pinkBrand,
  }
};
