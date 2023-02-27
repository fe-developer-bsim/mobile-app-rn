import React from 'react';
import PropTypes from 'prop-types';
import Payment from '../../components/Egift/Payment.component.js';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {goToConfirmation} from '../../state/thunks/egift.thunks';
import {validateRequiredFields, validateEmail} from '../../utils/validator.util';

const formConfig = {
  form: 'EgiftPaymentForm',
  validate: (values) => {
    const errors = {
      email: validateEmail(values.email),
      ...validateRequiredFields(values, ['email'])
    };
    return errors;
  },
};

const ConnectedForm = reduxForm(formConfig)(Payment);

class PaymentPage extends React.Component {
  static propTypes = {
    simasPoin: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToConfirmation: PropTypes.func,
    setEmail: PropTypes.func,
  }

  componentWillMount () {
    const {simasPoin, setEmail} = this.props;
    const email = result(simasPoin, 'email', '');
    setEmail(email);
  }

  render () {
    const {goToConfirmation, simasPoin} = this.props;
    return <ConnectedForm goToConfirmation={goToConfirmation} simasPoin={simasPoin}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToConfirmation: () => dispatch(goToConfirmation()),
  setEmail: (email) => dispatch(change('EgiftPaymentForm', 'email', email)),
});
const mapStateToProps = (state) => ({
  simasPoin: result(state, 'simasPoin', [])
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
