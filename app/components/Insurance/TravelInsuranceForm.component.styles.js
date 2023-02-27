import {theme} from '../../styles/core.styles';

export default {
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  tittle_header: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    fontSize: 33,
    paddingVertical: 17,
    paddingHorizontal: 40,
    color: theme.black,
  },
  sub_tittle: {
    paddingHorizontal: 40,
    paddingVertical: 6,
    fontSize: 19,
    justifyContent: 'space-between',
  },
  bar_proggres: {
    backgroundColor: theme.brand,
    height: 7,
    width: 100,
  },
  radio_tittle: {
    fontSize: 20,
    color: theme.black,
  },
  radio_sub_tittle: {
    fontSize: 18,
  },
  radio: {
    paddingHorizontal: 40,
    paddingVertical: 25,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: theme.grey,
  },
};
