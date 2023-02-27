import {theme} from '../../styles/core.styles';

export default {
  containerGrey: [{
    backgroundColor: theme.greyLine,
    flex: 1
  }],
  cardContainer: {
    backgroundColor: theme.white,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: theme.darkGrey
  },
  imageContainer: {
    flex: 3,
    aspectRatio: 1,
    paddingLeft: 20,
    alignItems: 'center'
  },
  detailContainer: {
    flex: 7,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  cardsContainer: {
    padding: 10,
    backgroundColor: theme.white,
    borderRadius: 15,
    shadowColor: theme.black, // for IOS
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  thumbnailDetail: {
    marginLeft: 20,
    justifyContent: 'space-between',
    flex: 1
  },
  thumbnail: {
    paddingTop: 10
  },
  thumbnailNK: {
    paddingTop: 20,
    paddingRight: 50,
  },
  flexGrow: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  actionTextContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15
  },
  actionText: {
    color: theme.brand,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium
  },
  bold: {
    fontWeight: theme.fontWeightBold
  },
  red: theme.brand,
  gradientGrey: [
    theme.white,
    theme.gradientMiddle,
    theme.greyLine
  ],
  thumbnailImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  bottomContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  redTextEnd: {
    fontFamily: theme.roboto,
    color: theme.brand,
    textAlign: 'right',
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium
  },
  thumbnailTitle: {
    fontFamily: theme.roboto,
    color: theme.black,
    fontSize: theme.fontSizeMedium,
    fontWeight: theme.fontWeightMedium
  },
  thumbnailText: {
    fontFamily: theme.robotoLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightLight,
    paddingTop: 5
  },
  thumbnailMedium: {
    fontFamily: theme.robotoLight,
    color: theme.black,
    fontSize: theme.fontSizeSmall,
    fontWeight: theme.fontWeightMedium,
  },
  title: {
    fontFamily: theme.roboto,
    color: theme.black,
    fontSize: theme.fontSizeMedium
  }
};
