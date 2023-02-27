import {theme} from '../../styles/core.styles';
import {fontSizeNormalStyle, fontSizeSmallStyle} from '../../styles/common.styles';

export default {
  container: {
    backgroundColor: theme.lightDenim,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 20,
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
    color: theme.red,
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
  title: [
    fontSizeNormalStyle,
    {
      color: theme.grey,
      marginBottom: 10
    }
  ],
  titleTime: [
    fontSizeSmallStyle,
    {
      color: theme.grey,
      marginBottom: 5

    }
  ],
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 13,
    marginLeft: 13
  },
  value: [fontSizeNormalStyle,
    {
      fontWeight: 'bold',
      color: theme.white,
    }],
  titleKurs: [
    fontSizeNormalStyle,
    {
      color: theme.white
    }
  ],
  valueTime: [fontSizeSmallStyle,
    {
      fontWeight: 'bold',
      color: theme.white,
    }],
  borderGreyTop: {
    marginTop: 20,
    marginBottom: 20,
    height: 2,
    backgroundColor: theme.white,
    marginRight: 7,
    marginLeft: 7
  },
  nameContainer: {
    flexDirection: 'column',
    marginLeft: 15
  },
  titleContainer: {
    flexDirection: 'row',
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 20,
    justifyContent: 'center',
  },
  collapsibleContainer: {
    backgroundColor: theme.white,
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    paddingVertical: 5,
    width: 120,
    marginTop: 5
  },
  titleTotalSummary: {
    marginRight: 7,
    marginLeft: 7,
    alignItems: 'center',
  },
  titleLastUpdate: {
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 10,
    alignItems: 'center',
    paddingTop: 20
  }
};
