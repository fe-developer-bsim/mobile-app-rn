import {theme} from '../../styles/core.styles';
import {fontSizeMediumStyle, fontSizeSmallStyle, fontSizeNormalStyle} from '../../styles/common.styles';

export default {
  container: [
    {
      paddingTop: 8
    }
  ],
  imageContainer: {
    height: 245,
  },
  arrowIconContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  icon: {
    color: theme.white
  },
  valueTitle: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingTop: 30
    }
  ],
  productName: [
    fontSizeMediumStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightMedium,
      marginBottom: 17,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      fontFamily: 'roboto',
      flex: 1,
      flexWrap: 'wrap',
    }
  ],
  value: 
  {
    color: theme.white,
    fontWeight: theme.fontWeightMedium,
    marginBottom: 17,
    fontFamily: 'roboto',
    fontSize: theme.fontSize22
  },
  iconTitleLeft: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingHorizontal: 20,      
    }
  ],
  iconTitleRight: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightLight,
      fontFamily: 'roboto',
      paddingHorizontal: 20,
    }
  ],
  leftDetail: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingLeft: 5,
      paddingTop: 10
    }
  ],
  leftValue: [
    fontSizeSmallStyle,
    {
      color: theme.white,     
      fontFamily: 'roboto',
      paddingLeft: 5,
    }
  ],
  rightDetail: [
    fontSizeSmallStyle,
    {
      color: theme.white,
      fontWeight: theme.fontWeightLight,      
      fontFamily: 'roboto',
      paddingTop: 10
    }
  ],
  rightValue: [
    fontSizeSmallStyle,
    {
      color: theme.white,     
      fontFamily: 'roboto',
    }
  ],
  historyHeader: [
    fontSizeMediumStyle,
    {    
      fontFamily: 'roboto'
    }
  ],

  valueRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  visibility: {
    textDecorationLine: 'underline',
    color: 'white',
    marginBottom: 17
  },
  visibilityPadding: {
    paddingLeft: 10
  },
  accountHiddenText: [
    fontSizeNormalStyle,
    {
      color: theme.white,
      marginBottom: 17,
      fontFamily: 'roboto',
    }
  ],
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  hideIcon: {
    width: 25,
    height: 25,
    zIndex: 1,
  },
  eyeFillColor: {
    color: theme.opacityWhite
  },
  eyeStrokeColor: {
    color: theme.white
  },
  cardContainer: {
    padding: 20,
    paddingTop: 15,
    backgroundColor: 'transparent',
    flex: 1
  },
  historyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10
  },
  historyDetailContainer: {
    paddingTop: 10,
    paddingBottom: 50
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    backgroundColor: theme.white
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  detailRow: {
    flexDirection: 'row',
    flex: 1 
  },
  detailContainer: {
  },
  arrowContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    justifyContent: 'space-between',
    position: 'absolute',
    marginLeft: 45,
    bottom: 15,   
  },
  iconBuySell: {
    paddingHorizontal: 40,
    color: theme.white,
    alignItems: 'center'
  },
  iconBuySell1: {
    paddingHorizontal: 40,
    color: theme.white,
    alignItems: 'center'
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
    opacity: 0.2
  },
  greyLineVertical: {
    borderRightWidth: 1,
    borderColor: theme.greyLine,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 40,
    opacity: 0.2,    
  },

  valueHistoryDetailGreen: {
    fontFamily: 'roboto',
    color: theme.green,
    fontSize: theme.fontSizeSmall,
    marginRight: 5,
    flex: 1,
    textAlign: 'right'
  },
  valueHistoryDetailRed: {
    fontFamily: 'roboto',
    color: theme.brand,
    fontSize: theme.fontSizeSmall,
    marginRight: 5,
    flex: 1,
    textAlign: 'right'
  },
  historyTitle: {
    fontFamily: 'roboto',
    color: theme.black
  },
  leftHistory: {
    flex: 1,
  },
  rightHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flex: 1
  },
  subTitle: {
    fontWeight: theme.fontWeightLight,
    fontSize: 12,
    color: theme.black,
    fontFamily: 'roboto',
  },
  columnContainer: {
    backgroundColor: theme.white,
    height: '100%',
  },
  infoDTBase: {
    position: 'absolute',
    bottom: 0,
    height: 40
  },
  infoDT: {
    textAlign: 'center',
  }
};
