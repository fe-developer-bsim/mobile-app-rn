import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import GenflixConfirmation from '../../components/Genflix/GenflixConfirmation.component';
import result from 'lodash/result';
import {getTransRefNumAndOTPNavigate} from '../../state/thunks/common.thunks';
import {GenflixResult} from '../../state/thunks/Genflix.thunk';
import {wrapMethodInFunction} from '../../utils/transformer.util';

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(getTransRefNumAndOTPNavigate('genflixRegistration', true, 'Auth', params, false, false)),
  subscribeResult: (resData) => dispatch(GenflixResult(resData)),
});

class GenflixConfirmationPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    subscribeResult: PropTypes.func,
    triggerAuth: PropTypes.func,
  };

  handleSubmit = () => {
    const {triggerAuth, subscribeResult, navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const params = {onSubmit: wrapMethodInFunction(subscribeResult, navParams)};
    triggerAuth(params);
  };

  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <GenflixConfirmation navParams={navParams} handleSubmit={this.handleSubmit}/>
    );
  }
}

const ConnectedGenflixConfirmation = connect(null, mapDispatchToProps)(GenflixConfirmationPage);

export default ConnectedGenflixConfirmation;