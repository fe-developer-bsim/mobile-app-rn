import {theme} from '../../styles/core.styles';
import {Platform} from 'react-native';

export default {
  container: {
    padding: 20
  },
  topTextContainer: {
    marginTop: 20,
    marginBottom: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: theme.fontWeightMedium,
    color: theme.darkBlue
  },
  itemContainer: {
    borderColor: theme.grey,
    borderWidth: 0,
    paddingVertical: 20,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: theme.white,
    shadowColor: theme.grey,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
    elevation: 4,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingLeft: 15
  },
  backButton: {
    color: theme.brand,
    marginRight: 10
  },
  headerItemText: {
    fontSize: 18,
    fontWeight: theme.fontWeightMedium,
    color: theme.darkBlue,
    marginBottom: 5
  },
  textBody: {
    flex: 1,
  },
  itemText: {
    fontSize: 12,
    fontWeight: theme.fontWeightRegular,
    color: theme.darkBlue,
    marginRight: 10
  },
  containerContent: {paddingBottom: 5, marginTop: 5, paddingHorizontal: 20, marginBottom: 10},
  generateQRTTSText: {
    fontSize: 18,
    color: theme.darkBlue,
    fontWeight: 'bold',
    marginBottom: 20
  },
  formContainerAmount: {
    marginBottom: 10,
  },
  containerInputBox: {
    paddingVertical: 7,
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0.2,
    borderRadius: 10,
    borderColor: theme.darkBlue,
    marginVertical: 5
  },
  textPickerStyle: {
    marginTop: 20,
    color: theme.darkBlue,
  },
  pickerStyle: {
    paddingVertical: 10,
    borderColor: theme.darkBlue,
    color: theme.darkBlue,
  },
  generateQRTTSButton: {
    // marginTop: 10
  },
  generateQRText: {
    color: theme.white,
    fontWeight: 'bold'
  },
  
};
