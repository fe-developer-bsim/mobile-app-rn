import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CcHistory from '../../components/CreditCardManageJourney/CreditCardManageConfirmPin.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {reduxForm, change} from 'redux-form';
import {confirmpin} from '../../state/thunks/common.thunks';
import {validateFieldsMatch, validateRequiredFields} from '../../utils/validator.util';
import isEmpty from 'lodash/isEmpty';


const formConfig = {
  form: 'PinCreationConfirmForm',
  destroyOnUnmount: false,
  initialValues: {
    PinConfirm: '',
  },
  validate: (values, props) => {
    const pinValue = result(props, 'pinValue.pinValue', '');
    return {
      _error: validateRequiredFields(values, ['PinConfirm']) && validateFieldsMatch(values['PinConfirm'], pinValue)
    };
  },
  onSubmit: (values, dispatch, selectedAccount) => {
    dispatch(confirmpin(selectedAccount));
  }
};

const mapStateToProps = (state) => ({
  creationFormValues: result(state, 'form.PinCreationConfirmForm.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  validateBeforeSubmit: () => {
    dispatch(change('PinCreationForm', 'CreditCardManageCreatePin', ''));
    dispatch(NavigationActions.back());
  }
});


class CcHistoryPage extends Component {
  static propTypes = {
    history: PropTypes.array,
    destroy: PropTypes.func,
    navigation: PropTypes.object,
    confirmBlockCreditCard: PropTypes.func,
    selectedAccount: PropTypes.object,
    pinValue: PropTypes.string,
    creationFormValues: PropTypes.object,
    errors: PropTypes.object,
  }


  render () {
    const {history, navigation, confirmBlockCreditCard, creationFormValues} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    const creditCardDetail = result(navigation, 'state.params.creditCardDetail', {});
    const isChangePin = result(navigation, 'state.params.isChangePin', '');
    const pinValue = result(navigation, 'state.params.pinValue', '');
    const disabled = isEmpty(result(creationFormValues, 'PinConfirm', {}));
    return <CcHistoryForm transactions={history} selectedAccount={selectedAccount}
      creditCardDetail={creditCardDetail} confirmBlockCreditCard={confirmBlockCreditCard} isChangePin={isChangePin} pinValue={pinValue} disabled={disabled}/>;
  }
}

const CcHistoryForm = reduxForm(formConfig)(CcHistory);

const ConnectedCcHistoryPage = connect(mapStateToProps, mapDispatchToProps)(CcHistoryPage);

export default ConnectedCcHistoryPage;
