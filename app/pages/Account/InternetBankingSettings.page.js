import React from 'react';
import PropTypes from 'prop-types';
import InternetBankingSettings from '../../components/Account/InternetBankingSettings.component.js';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {triggerAuthNavigate, setInternetBankingSettings} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'setAllowInternetBanking',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch, {allowIB, triggerAuth}) => {
    const params = {onSubmit: allowIB(), isOtp: false, isEasypin: true};
    dispatch(triggerAuth(params));
  }
};

const InternetBankingSettingsForm = reduxForm(formConfig)(InternetBankingSettings);

class InternetBankingSettingsPage extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    setIB: PropTypes.func,
    formValues: PropTypes.object,
    toggleIB: PropTypes.object,
    setFormCheckIB: PropTypes.func,
  }

  allowIB = () => () => {
    const {setIB, formValues, setFormCheckIB} = this.props;
    const toggleIB = result(formValues, 'allow', '');
    const allow = result(formValues, 'allow', '') === 'YES' ? 'NO' : 'YES';
    setFormCheckIB(allow);
    setIB(toggleIB);
  }

  render () {
    const {triggerAuth, user, navigation, setIB, formValues, toggleIB} = this.props;
    const allow = result(navigation, 'state.params.allowIB', '') === 'YES' ? 'NO' : 'YES';
    const isLogin = !isEmpty(user);
    return <InternetBankingSettingsForm isLogin={isLogin} formValues={formValues} toggleIB={toggleIB} triggerAuth={triggerAuth}
      setInternetBankingSettings={setIB} initialValues={{allow: allow}} allowIB={this.allowIB}/>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  nav: state.nav,
  formValues: result(state, 'form.setAllowInternetBanking.values', {}),
  toggleIB: result(state, 'internetBankingToggle.toggleIB.allowIB', ''),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (data) => dispatch(data),
  setIB: (allowIB) => dispatch(setInternetBankingSettings(allowIB)),
  triggerAuth: (params) => dispatch(triggerAuthNavigate('InternetBankingSettings', null, false, 'Auth', params)),
  setFormCheckIB: (allow) => {
    dispatch(change('setAllowInternetBanking', 'allow', allow));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InternetBankingSettingsPage);
