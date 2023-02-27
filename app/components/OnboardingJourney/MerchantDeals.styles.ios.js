import {theme} from '../../styles/core.styles';

export default {
  container: {
    backgroundColor: theme.containerGrey,
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  item: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: theme.greyLine,
    backgroundColor: theme.white,
  },
  imageContainer: {
    padding: 10,
  },
  imageSize: {
    aspectRatio: 1
  },
  itemNameContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  priceContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  listViewContainer: {
    paddingHorizontal: 10,
    flex: 1
  }
};
