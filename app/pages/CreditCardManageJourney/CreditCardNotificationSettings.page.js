import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {result} from 'lodash';
import {setNotifSettings} from '../../state/thunks/creditCardManage.thunks';
import {NavigationActions} from 'react-navigation';
import CreditCardNotificationSettings from '../../components/CreditCardManageJourney/CreditCardNotificationSettings.component';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'CreditCardNotificationSettingsPage',
  destroyOnUnmount: true,
  initialValues: {
    myAccount: {},
    amount: '',
  },
  onSubmit: (values, dispatch, {selectedAccount, flagSms, flagEmail}) => {
    dispatch(setNotifSettings(selectedAccount, flagSms, flagEmail, values));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['amount'])
    };
    return {
      ...errors,
    };
  }
};

const DecoratedCCNotifSettings = reduxForm(formConfig)(CreditCardNotificationSettings);

class CreditCardNotificationSettingsPage extends React.Component {

  state = {
    newAccount: {}
  }
  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    selectedAccount: PropTypes.object,
    setNotifSettings: PropTypes.func,
    moveTo: PropTypes.func,
    notifSettings: PropTypes.func,
  };

  render () {
    const {navigation, formValues = {}, moveTo, notifSettings, setNotifSettings} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    return (
      <DecoratedCCNotifSettings navigation={navigation} formValues={formValues}
        moveTo={moveTo} notifSettings={notifSettings} setNotifSettings={setNotifSettings} selectedAccount={selectedAccount}/>
    );
  }
}

const mapStateToProps = (state) =>   ({
  formValues: result(state, 'form.CreditCardNotificationSettingsPage.values', {}),
  notifSettings: result(state, 'ccNotifSettings', {}),
});

const mapDispatchToProps = (dispatch) => ({
  setNotifSettings: (selectedAccount, allowNotifFlag, allowEmailNotifFlag, flagSms, flagEmail, amount) => dispatch(setNotifSettings(selectedAccount, allowNotifFlag, allowEmailNotifFlag, flagSms, flagEmail, amount)),
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}})),
});


export default connect(mapStateToProps, mapDispatchToProps)(CreditCardNotificationSettingsPage);
