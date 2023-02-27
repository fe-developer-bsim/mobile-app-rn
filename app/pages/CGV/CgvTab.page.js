import React from 'react';
import PropTypes from 'prop-types';
import OffersDetail from '../../components/CGV/CgvTab.component.js';
import {connect} from 'react-redux';
import {movieClick, CgvSchedule} from '../../state/thunks/profile.thunks';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {reduxForm} from 'redux-form';

const mapDispatchToProps = (dispatch) => ({
  onCinemaClick: (offer) => () => {
    dispatch(CgvSchedule(offer, 'cinema'));
  },
  onMovieClick: (offer, tipe) => () => {
    dispatch(movieClick(offer, tipe));
  },
});

const offerConfig = {
  form: 'OfferConfig',
  destroyOnUnmount: false,
  initialValues: {
  },
};

const DecoratedOffer = reduxForm(offerConfig)(OffersDetail);


class OffersDetailPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    navigation: PropTypes.object,
    onCinemaClick: PropTypes.func,
    onMovieClick: PropTypes.func,
  }

  render () {
    const {navigation = {}, onCinemaClick = noop, onMovieClick = noop} = this.props;
    const movieList = result(navigation, 'state.params.dataMovie', {});
    const cinemaList = result(navigation, 'state.params.dataCinema', {});
    const comingSoonList = result(navigation, 'state.params.dataComingSoon', {});
    return <DecoratedOffer movieList={movieList} cinemaList={cinemaList} comingSoonList={comingSoonList} onCinemaClick={onCinemaClick} onMovieClick={onMovieClick}/>;
  }
}


export default connect(null, mapDispatchToProps)(OffersDetailPage);
