import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CcHistory from '../../components/CreditCardManageJourney/CreditCardManageCreatePin.component';
import result from 'lodash/result';
import {confirmBlockCreditCard} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {reduxForm, change} from 'redux-form';
import {validateFieldsMatch} from '../../utils/validator.util';


const formConfig = {
  form: 'PinCreationForm',
  destroyOnUnmount: false,
  initialValues: {
    pinValue: '',
  },
  validate: (values, props) => {
    const confirmValue = result(props, 'confirmFormValues.easyPinConfirm', '');
    return {
      _error: !values['pinValue'] && confirmValue && validateFieldsMatch(values['pinValue'], confirmValue)
    };
  },
  onSubmit: (values, dispatch, {selectedAccount}) => {
    const pinValue = values;
    dispatch(change('PinCreationConfirmForm', 'CreditCardManageConfirmPin', ''));
    dispatch(NavigationActions.navigate({routeName: 'CreditCardManageConfirmPin', params: {selectedAccount, pinValue}}));
  }
};

const mapStateToProps = (state) => ({
  confirmFormValues: result(state, 'form.PinCreationConfirmForm.values', {}),
});



class CcHistoryPage extends Component {
  static propTypes = {
    history: PropTypes.array,
    destroy: PropTypes.func,
    navigation: PropTypes.object,
    selectedAccount: PropTypes.object,
  }


  render () {
    const {history, navigation} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    const creditCardDetail = result(navigation, 'state.params.creditCardDetail', {});
    const isChangePin = result(navigation, 'state.params.isChangePin', '');
    return <CcHistoryForm transactions={history} selectedAccount={selectedAccount}
      creditCardDetail={creditCardDetail} confirmBlockCreditCard={confirmBlockCreditCard} isChangePin={isChangePin}/>;
  }
}

const CcHistoryForm = reduxForm(formConfig)(CcHistory);

const ConnectedCcHistoryPage = connect(mapStateToProps, null)(CcHistoryPage);

export default ConnectedCcHistoryPage;
