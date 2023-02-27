import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';
import * as styles from '../../styles/common.styles';

const markerContainer = [
  {
    justifyContent: 'flex-start'
  }
];

export default {
  container: [contentContainerStyle, {
  }],
  titleTextContainer: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: theme.fontSizeXL,
    fontWeight: theme.fontWeightRegular,
    color: theme.black,
    fontFamily: theme.roboto
  },
  containerImageTextCurrency: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
    paddingVertical: 15,
    alignItems: 'center',
  },
  imageCurrency: {
    aspectRatio: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  newTitleContainer: [markerContainer],
  title: {
    fontSize: theme.fontSizeMedium,
    fontFamily: 'roboto',
    fontWeight: theme.fontWeightRegular,
    marginRight: 10,
    color: theme.black,
  },
  value: {
    color: theme.black,
    textAlign: 'right',
    flex: 1,
    fontWeight: theme.fontWeightRegular,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeLarge,
  },
  borderBottomRow: {
    borderBottomWidth: 1,
    borderColor: theme.greyLine,
  },

  contentContainerStyle: [{flexGrow: 1, backgroundColor: 'white'}],
  containerProductSelections: [
    styles.containerWhiteStyle,
    {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between'
    }
  ],
  offerContainer: {
    borderRadius: 10,
    borderColor: theme.disabledGrey,
    backgroundColor: theme.contrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  cardContainer2: {
    alignItems: 'flex-start',
    backgroundColor: theme.white,
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20
  },
  imageContainerIDR: {
    flex: 4,
    aspectRatio: 1,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 4,
    aspectRatio: 1,
    alignItems: 'center',
    padding: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: 100,
  },
  imageValas: {
    flex: 1,
    resizeMode: 'stretch',
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  detailContainer: {
    flex: 10,
    paddingLeft: 15,
  },
  txtBold: {
    fontWeight: theme.fontWeightBold,
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    marginTop: -5,
    fontFamily: theme.roboto,
  },
  txtLight: {
    fontWeight: theme.fontWeightLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    paddingTop: 5,
    fontFamily: theme.robotoLight,
  },
};
