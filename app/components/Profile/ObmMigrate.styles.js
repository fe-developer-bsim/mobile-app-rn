import {theme, text as textStyles} from '../../styles/core.styles';

export default {
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white'
  },
  columnContainer: {
    flex: 1,
  },
  mainTitleLogo: {
    width: 80,
    height: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    resizeMode: 'contain'
  },
  informationText: {
    ...textStyles.h1,
    ...textStyles,
    paddingVertical: theme.padding,
  },
  informationSubText: {
    color: theme.black
  },
  verifikasiPasswordAlertText: {
    color: theme.black,
    paddingTop: 10,
    paddingVertical: theme.padding,
  },
  loginProblemVerifikasiText: {
    ...textStyles.text,
    ...textStyles.justify,
    paddingVertical: 20,
  },
  clearSimobiPlusDataText: {
    color: theme.red,
    fontSize: theme.fontSizeMedium
  },
  clearSimobiPlusDataContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerInformationText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  }
};
