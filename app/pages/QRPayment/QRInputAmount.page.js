import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getInvoiceDetail} from '../../state/thunks/qrpayment.thunk';
import {reduxForm} from 'redux-form';
import {validateRequiredFields} from '../../utils/validator.util';
import result from 'lodash/result';

import QRInputAmount from '../../components/QRPayment/QRInputAmount.component';

const formConfig = {
  form: 'QRInputAmount',
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = validateRequiredFields(values, ['amount']);
    return errors;
  },
  onSubmit: (values, dispatch, {qrData}) => {
    dispatch(getInvoiceDetail({...values, data: qrData}));
  },
  initialValues: {
  }
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const DecoratedForm = reduxForm(formConfig)(QRInputAmount);

class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    options: PropTypes.object,
    onClose: PropTypes.func,
    qrScanner: PropTypes.func,
    extraProps: PropTypes.object,
  };

  goToScanner = () => this.props.qrScanner()

  render () {
    const navParams = result(this.props, 'navigation.state.params', {});
    return <DecoratedForm goToScanner={this.goToScanner} {...navParams} {...this.props.extraProps}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
