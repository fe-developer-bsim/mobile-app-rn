import React from 'react';
import PropTypes from 'prop-types';
import Confirmation from '../../components/Egift/Confirmation.component.js';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {goToEasyPin} from '../../state/thunks/egift.thunks';
import {getLandingEgift} from '../../state/thunks/dashboard.thunks';

class ConfirmationPage extends React.Component {
  static propTypes = {
    simasPoin: PropTypes.object,
    goToConfirmation: PropTypes.func,
    egiftPaymentForm: PropTypes.object,
    egiftCart: PropTypes.array,
    profile: PropTypes.object,
    goLanding: PropTypes.func,
  }

  render () {
    const {goToConfirmation, simasPoin, egiftPaymentForm, egiftCart, profile, goLanding} = this.props;
    return <Confirmation goToConfirmation={goToConfirmation} simasPoin={simasPoin} egiftPaymentForm={egiftPaymentForm}
      egiftCart={egiftCart} profile={profile} goLanding={goLanding} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToConfirmation: () => dispatch(goToEasyPin()),
  goLanding: () => dispatch(getLandingEgift()),
});
const mapStateToProps = (state) => ({
  egiftPaymentForm: result(state, 'form.EgiftPaymentForm', []),
  simasPoin: result(state, 'simasPoin', []),
  egiftCart: result(state, 'egiftCart', []),
  profile: result(state, 'user.profile', {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
