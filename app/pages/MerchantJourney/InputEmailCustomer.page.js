
import React from 'react';
import PropTypes from 'prop-types';
import Payment from '../../components/MerchantJourney/InputEmailCustomer.component';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {goToEasyPinDigitalStore} from '../../state/thunks/digitalStore.thunks';
import {validateRequiredFields, validateEmail} from '../../utils/validator.util';

const formConfig = {
  form: 'MerchantEmailInputForm',
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
    goToPayment: PropTypes.func,
    setEmail: PropTypes.func,
    navigation: PropTypes.object
  }

  goToPaymentMerchant=() => {
    const {navigation, goToPayment} = this.props;
    const formValues = result(navigation, 'state.params.formValues', {});
    const totalAll = result(navigation, 'state.params.totalAll', {});
    const purchaseCode = result(navigation, 'state.params.purchaseCode', {});
    const typeMerchant = result(navigation, 'state.params.typeMerchant', '');
    goToPayment(formValues, totalAll, purchaseCode, typeMerchant);
  }

  componentWillMount () {
    const {simasPoin, setEmail} = this.props;
    const email = result(simasPoin, 'email', '');
    setEmail(email);
  }

  render () {
    const {simasPoin} = this.props;
    return <ConnectedForm goToConfirmation={this.goToPaymentMerchant} simasPoin={simasPoin}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  goToPayment: (formValues, totalAll, purchaseCode, typeMerchant) => dispatch(goToEasyPinDigitalStore(formValues, totalAll, purchaseCode, typeMerchant)),
  setEmail: (email) => dispatch(change('MerchantEmailInputForm', 'email', email)),
});
const mapStateToProps = (state) => ({
  simasPoin: result(state, 'user.profile', '')
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
