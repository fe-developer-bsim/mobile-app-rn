import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCardDelivery from '../../components/CreateNewAccount/CreditCardDelivery.component';
import {generateLocationSelection} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {result, isEmpty, startsWith, find} from 'lodash';
import {createOramiId} from '../../state/thunks/ccEform.thunks';

const formConfig = {
  form: 'cardDelivery',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    dispatch(createOramiId(navigation));
  },
};

const mapStateToProps = (state) => ({
  addressForm: result(state, 'form.CCForm2.values', {}),
  workingAddressForm: result(state, 'form.CCForm4.values', {}),
  ccCheckpointData: result(state, 'checkpoint', {}),
  cardDelivery: result(state, 'form.cardDelivery.values.deliveryMode', {}),
  statusAddress: result(state, 'form.CCForm2.values.usingKtpData', undefined),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  accountList: result(state, 'accounts', [])
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
    navigation: PropTypes.object,
    cardDelivery: PropTypes.object,
    statusAddress: PropTypes.bool,
    cifCode: PropTypes.string,
    accountList: PropTypes.array
  }

  render () {
    const {navigation, addressForm, workingAddressForm, ccCheckpointData, cardDelivery, statusAddress, cifCode, accountList} = this.props;
    const status = statusAddress === true ? 'CHECKED' : 'UNCHECKED';
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    let existing = false;
    if (!startsWith(cifCode, 'NK')) {
      if (emoneyKycOnly) {
        existing = false;
      } else {
        existing = true;
      }
    } else {
      existing = false;
    }
    const usingKtpData = statusAddress === undefined ? result(ccCheckpointData, '0.statusAddress', 'UNCHECKED') : status;
    const radioOptions = generateLocationSelection(addressForm, workingAddressForm, usingKtpData, existing);
    const disabled = isEmpty(cardDelivery);

    return (
      <ConnectedForm
        navigation={navigation}
        addressForm={addressForm}
        workingAddressForm={workingAddressForm}
        radioOptions={radioOptions}
        disabled={disabled}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm9);
export default ConnectedFormPage;
