import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCardDelivery from '../../components/CreditCardManageJourney/CreditCardDelivery.component';
import {generateLocation} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {result} from 'lodash';
import {confirmSendAddress} from '../../state/thunks/common.thunks';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'cardDelivery',
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['deliveryMode'])};
    return {
      ...errors
    };
  },
  onSubmit: (values, dispatch, {navigation}) => {
    dispatch(confirmSendAddress(navigation));
  },
};

const mapStateToProps = (state) => ({
  addressForm: result(state, 'form.CCForm2.values', {}),
  ccCheckpointData: result(state, 'checkpoint', {}),
});

const mapDispatchToProps = (dispatch) => ({
  setDelivery: (mode) => {
    dispatch(change('cardDelivery', 'deliveryMode', mode));
  },
});

const CreditCardForm = reduxForm(formConfig)(CreditCardDelivery);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm9 extends Component {

  static propTypes = {
    addressForm: PropTypes.object,
    workingAddressForm: PropTypes.object,
    setDelivery: PropTypes.func,
    ccCheckpointData: PropTypes.object,
    navigation: PropTypes.object
  }


  render () {
    const {navigation, addressForm, workingAddressForm, ccCheckpointData} = this.props;
    const radioOptions = generateLocation(ccCheckpointData);
    return (
      <ConnectedForm
        navigation={navigation}
        addressForm={addressForm}
        workingAddressForm={workingAddressForm}
        radioOptions={radioOptions}
        ccCheckpointData={ccCheckpointData}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm9);
export default ConnectedFormPage;
