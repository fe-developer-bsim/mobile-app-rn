import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CcHistory from '../../components/CreditCardManageJourney/CreditCardManageDetail.component';
import result from 'lodash/result';
import {confirmBlockCreditCard} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {reduxForm, change} from 'redux-form';
import {validateFieldsMatch} from '../../utils/validator.util';


const formConfig = {
  form: 'PinCreationForm',
  destroyOnUnmount: false,
  initialValues: {
    easyPin: '',
  },
  validate: (values, props) => {
    const confirmValue = result(props, 'confirmFormValues.easyPinConfirm', '');
    return {
      _error: !values['easyPin'] && confirmValue && validateFieldsMatch(values['easyPin'], confirmValue)
    };
  },
  onSubmit: (values, dispatch, {maskedUsername, isResetEasypin, isMigrate, encryptedToken, isRegistDeeplink, typeActivationDeeplink}) => {
    dispatch(change('easyPinCreationConfirmForm', 'easyPinConfirm', ''));
    dispatch(NavigationActions.navigate({routeName: 'EasyPinConfirm', params: {maskedUsername, isResetEasypin, isRegistDeeplink, isMigrate, encryptedToken, typeActivationDeeplink}}));
  }
};

const mapStateToProps = (state) => {
  const history = result(state, 'creditCardHistory.creditCardTransactions');
  return {
    history
  };
};

const mapDispatchToProps = (dispatch) => ({
  confirmBlockCreditCard: (selectedAccount) => {
    dispatch(confirmBlockCreditCard(selectedAccount));
  },
});


class CcHistoryPage extends Component {
  static propTypes = {
    history: PropTypes.array,
    destroy: PropTypes.func,
    navigation: PropTypes.object,
    confirmBlockCreditCard: PropTypes.func,
    selectedAccount: PropTypes.object,
  }


  render () {
    const {history, navigation, confirmBlockCreditCard} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount', {});
    const creditCardDetail = result(navigation, 'state.params.creditCardDetail', {});
    const isChangePin = result(navigation, 'state.params.isChangePin', '');
    return <CcHistoryForm transactions={history} selectedAccount={selectedAccount}
      creditCardDetail={creditCardDetail} confirmBlockCreditCard={confirmBlockCreditCard} isChangePin={isChangePin}/>;
  }
}

const CcHistoryForm = reduxForm(formConfig)(CcHistory);

const ConnectedCcHistoryPage = connect(mapStateToProps, mapDispatchToProps)(CcHistoryPage);

export default ConnectedCcHistoryPage;
