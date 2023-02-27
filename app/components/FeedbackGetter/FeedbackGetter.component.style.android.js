import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

export default {
  container: {
    backgroundColor: theme.white,
    overflow: 'hidden',
    flex: 1

  },
  title: {
    color: theme.black,
    textAlign: 'center',
    padding: 10,
    fontSize: theme.fontSizeSmall,
    fontStyle: 'italic',
    marginTop: 20,
    paddingBottom: 120
  },
  title2: {
    color: theme.black,
    textAlign: 'center',
    padding: 10,
    fontSize: theme.fontSizeSmall,
    marginBottom: 30
  },
  ratingText: {
    textAlign: 'center',
    fontStyle: 'italic',

  },
  subtitle: {
    textAlign: 'center',
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    paddingTop: 20,
    paddingBottom: 15,
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    marginTop: 10
  },
  mainArea: {
   
  },
  mainArea2: {
    
  },
  mainArea3: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    textAlign: 'center',
    paddingTop: 60,
    
    
  },
  textArea: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 7,
    borderRadius: 3,
    borderWidth: 0.2,
    borderColor: theme.grey,
    elevation: 1,
    width: (width - 20),
    alignSelf: 'center',
    backgroundColor: theme.white,
    padding: 10,
  
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 5,
    paddingTop: 50,
    
  },
  button: {
    width: 340,
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 50
  },
  suggestionText1: {
    borderRadius: 3,
    alignItems: 'center',
    fontSize: 12,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderColor: theme.grey,
    backgroundColor: theme.white,
    margin: 6,
  },
  suggestionTexts1: {
    borderRadius: 5,
    height: 34,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1},
    elevation: 2,
    justifyContent: 'flex-start',
    marginRight: 10,
    alignSelf: 'center',
    backgroundColor: theme.brand,
    margin: 5
  },
  suggestionTexts2: {
    borderRadius: 5,
    height: 34,
    alignItems: 'center',
    fontSize: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1},
    elevation: 2,
    justifyContent: 'flex-start',
    marginRight: 10,
    alignSelf: 'center',
    backgroundColor: '#D46B07',
    margin: 5
    
  },
  suggestionTexts3: {
    borderRadius: 5,
    height: 34,
    alignItems: 'center',
    fontSize: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1},
    elevation: 2,
    justifyContent: 'flex-start',
    marginRight: 10,
    alignSelf: 'center',
    backgroundColor: '#E6D000',
    margin: 5
  },
  suggestionTexts4: {
    borderRadius: 5,
    height: 34,
    alignItems: 'center',
    fontSize: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1},
    elevation: 2,
    justifyContent: 'flex-start',
    marginRight: 10,
    alignSelf: 'center',
    backgroundColor: '#AEC317',
    marginBottom: 5
  },
  suggestionTexts5: {
    borderRadius: 5,
    height: 34,
    alignItems: 'center',
    fontSize: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1},
    elevation: 2,
    justifyContent: 'flex-start',
    marginRight: 10,
    alignSelf: 'center',
    backgroundColor: '#23A251',
    margin: 5
    
  },
  buttonText1: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1},
    elevation: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: theme.white,
  },
  buttonTexts1: {
    fontSize: theme.fontSizeSmall,
    color: theme.white,
    textAlign: 'center',
    padding: 5,
    paddingVertical: 5,
    margin: 3,
  },
  neverText: {
    textAlign: 'center',
    fontSize: theme.fontSizeSmall,
  },
  spaceLeft: {
    marginLeft: 1
  },
  logoImage: {
    alignSelf: 'center',
    width: width - 45,
    height: 160,
    paddingTop: 15,
  },
  dashLine: {
    width: width - 30,
    height: 1,
    paddingTop: 10,
    paddingBottom: 10,
    dashLength: 5,
    color: theme.red,
    dashGap: 10
  },
  subtitle1: {
    color: theme.black,
    fontWeight: theme.fontWeightBold,
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 15,
    marginRight: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    paddingBottom: 15,
    marginLeft: 5
  },
  row2: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 5,
    paddingBottom: 10,
    paddingTop: 30,
    marginLeft: 5
  },
  row1: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginLeft: 5,
    paddingVertical: 5,
    padding: 5

  },
  rateText: {
    color: theme.red,
    fontWeight: theme.fontWeightBold,
    fontSize: 18,
    marginBottom: 20,
    marginTop: -4
  },
  rateText1: {
    color: '#D46B07',
    fontWeight: theme.fontWeightBold,
    fontSize: 18,
    marginBottom: 20,
    marginTop: -4
  },
  rateText2: {
    color: '#E6D000',
    fontWeight: theme.fontWeightBold,
    fontSize: 18,
    marginBottom: 20,
    marginTop: -4
  },
  rateText3: {
    color: '#AEC317',
    fontWeight: theme.fontWeightBold,
    fontSize: 18,
    marginBottom: 20,
    marginTop: -4
  },
  rateText4: {
    color: '#23A251',
    fontWeight: theme.fontWeightBold,
    fontSize: 18,
    marginBottom: 20,
    marginTop: -4
  },
  descriptionMore: {
    color: theme.black,
    fontWeight: theme.fontWeightMedium,
    padding: 20,
    marginLeft: -10,
    marginTop: -10,
    marginBottom: 10
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: theme.grey,
    marginVertical: 20,
  },
  backRate: {
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    height: 12, 
    width: width - 20
  },
  gradientPurple: [
    '#C1000E', '#E6D000', '#23A251'
  ],
  margin: {
    marginTop: -20
  },
  height: {
    height: height
  },
  buttonX: {
    padding: 10
  }
};
