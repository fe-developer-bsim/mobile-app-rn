import React from 'react';
import PropTypes from 'prop-types';
import CgvSchedule from '../../components/CGV/CgvSchedule.component.js';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {getSeatLayout} from '../../state/thunks/cgv.thunks';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  toCgvSeats: (value) => () => {
    dispatch(getSeatLayout(value));
  },
  goBack: () => dispatch(NavigationActions.back()),
});

const offerConfig = {
  form: 'CgvSchedule',
  destroyOnUnmount: false,
  initialValues: {
  },
};

const DecoratedOffer = reduxForm(offerConfig)(CgvSchedule);


class OffersDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    toCgvSeats: PropTypes.func,
    goBack: PropTypes.func,
  }

  timeout = () => {
    this.props.goBack();
  }

  render () {
    const {navigation = {}, toCgvSeats = noop} = this.props;
    const param = result(navigation, 'state.params.movieData');
    return <DecoratedOffer param={param} navigation={navigation} toCgvSeats={toCgvSeats} timeout={this.timeout}/>;
  }
}


export default connect(null, mapDispatchToProps)(OffersDetailPage);
