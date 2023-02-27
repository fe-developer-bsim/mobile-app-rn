import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle,
    {
      backgroundColor: theme.white
    }
  ],
  containerContent: [
    {
      paddingBottom: 100
    }
  ],
  buttonNext: {
    paddingVertical: 30,
  },
  containerWhite: {
    backgroundColor: 'transparent',
  },
  field: {
    paddingBottom: 20
  },
  titleCode: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  codeBorder: {
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: theme.grey,
    borderRadius: 5,
    backgroundColor: theme.white,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  borderCenter: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: 20
  },
  textCode: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: theme.black
  },
  validText: {
    color: theme.black,
    fontWeight: 'bold',
  },
  buttonFinish: {
    backgroundColor: theme.red,
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 15
  },
  buttonText: {
    color: theme.white,
    fontSize: 18,
  },
  topContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  titleWidth: {
    width: width * 50 / 100,
  },
  validWidth: {
    width: width * 20 / 100,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  timeWidth: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  maxPayment: {
    alignItems: 'center',
    borderRadius: 10,
    borderColor: theme.white,
    backgroundColor: theme.white,
    borderWidth: 1,
    marginHorizontal: 20,
    padding: 10,
    paddingBottom: 20,
    paddingTop: 30,
  },
  maxPaymentText: {
    color: theme.grey,
  },
  containerCodeBorder: {
    backgroundColor: 'transparent',
    paddingTop: 20,
    paddingVertical: 20,
    paddingBottom: 20,
  },
  codeTop: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  lineText: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.grey,
    width: 300,
  },
  containerCode: {
    shadowColor: 'black',
    shadowOpacity: 20,
    shadowRadius: 5,
    backgroundColor: theme.white,
    paddingBottom: 10,
    paddingTop: 8,
  },
  timerShow: {
    color: theme.red,
    fontSize: 50
  },
  merchNametext: {
    color: theme.red,
    fontWeight: 'bold',
  },
  labeltime: {
    
    alignItems: 'center',
  },
  caption1: {
    textAlign: 'center',
  },
  space: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  codeText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    marginLeft: 10
  },
  toucheableIcon: {
    paddingLeft: 10
  },
  containerButton: {
    paddingBottom: 200,
    backgroundColor: theme.white,
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.greyLine
  },
  row: {
    alignItems: 'center',
  },
  rowbert: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 20
  },
  lineTopBottom: {
    borderWidth: 1,
    borderColor: theme.greyLine,
    width: width - 40
  },
  barcode: {
    paddingBottom: 10
  },
  tap: {
    paddingTop: 10
  },
  lineButton: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    width: width,
    paddingTop: 10
  },
  bottomSpacing: {
    paddingVertical: 180
  },
  explainIcon: {
    color: theme.black,
    marginRight: 10,
  },
  containExplantionRight: {
    fontSize: theme.fontSizeSmall,
    color: theme.black,
    fontFamily: 'Roboto',
    width: width - 100,
    flex: 1,
    flexWrap: 'wrap',
  },
  textExplanation: {
    fontSize: theme.fontSizeSmall,
    color: theme.softGrey,
    flexDirection: 'row',
  },

  containerCoba: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: theme.white,
  },

  containtextExplanation: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.transparent,
    paddingVertical: 15,
    flexDirection: 'row',
    paddingLeft: 8
  
  },
  copyIcon: {
    color: theme.red
  }
};
