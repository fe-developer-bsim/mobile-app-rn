import React from 'react';
import PropTypes from 'prop-types';
import CgvMovieDetail from '../../components/CGV/CgvMovieDetail.component.js';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import result from 'lodash/result';
import {CgvSchedule} from '../../state/thunks/profile.thunks';
import noop from 'lodash/noop';

const mapDispatchToProps = (dispatch) => ({
  onMovieClick: (offer) => () => {
    dispatch(CgvSchedule(offer, 'movie'));
  },
});

const offerConfig = {
  form: 'CgvMovieDetail',
  destroyOnUnmount: false,
  initialValues: {
  },
};

const DecoratedOffer = reduxForm(offerConfig)(CgvMovieDetail);


class OffersDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onMovieClick: PropTypes.func,
  }

  render () {
    const {navigation = {}, onMovieClick = noop} = this.props;
    const param = result(navigation, 'state.params.movieData');
    const tipe = result(navigation, 'state.params.tipe');
    return <DecoratedOffer param={param} onMovieClick={onMovieClick} tipe={tipe}/>;
  }
}


export default connect(null, mapDispatchToProps)(OffersDetailPage);
