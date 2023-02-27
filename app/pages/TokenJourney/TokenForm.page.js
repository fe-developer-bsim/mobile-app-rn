import {result} from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import TokenForm, {fields} from '../../components/TokenJourney/TokenForm.component';
import {wrapMethodInFunction, getPushBillPossibleAccounts} from '../../utils/transformer.util';
import {tokenPayment, triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: fields.formName,
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, triggerAuth}) => {
    const isOwnAccount = false;
    const data = result(navigation, 'state.params.data.data', {});
    const amount = result(navigation, 'state.params.data.amount');
    const emoneyAccount = result(navigation, 'state.params.data.emoneyAccount');
    const kmtr = result(navigation, 'state.params.data.kmtr', '');
    const val = result(navigation, 'state.params.data.values');
    const params = {onSubmit: wrapMethodInFunction(dispatch, tokenPayment(val, data, emoneyAccount, kmtr)), amount, isOtp: false};
    triggerAuth(amount, isOwnAccount, 'Auth', params, true);
  }
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.TokenForm.values', {}),
  emoneyAccount: getPushBillPossibleAccounts(result(state, 'accounts', {}), 'bp'),

});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, isOwnAccount, routeName, params) => {
    dispatch(triggerAuthNavigate('lkd', amount, isOwnAccount, 'Auth', params));
    
  },
});

const DecoratedTokenForm = reduxForm(formConfig)(TokenForm);

class TokenFormPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    triggerAuth: PropTypes.func,
    emoneyAccount: PropTypes.object,
    kmtr: PropTypes.bool
  };

  render () {
    const {triggerAuth, formValues = {}, navigation = {}, emoneyAccount} = this.props;

    return <DecoratedTokenForm
      formValues={formValues}
      navigation={navigation}
      triggerAuth={triggerAuth}
      emoneyAccount={emoneyAccount}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenFormPage);
