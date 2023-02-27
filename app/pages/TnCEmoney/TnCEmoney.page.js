import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionEmoney from '../../components/TnCEmoney/TnCEmoney.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {finalizeEmoneyExistingtoBank} from '../../state/thunks/dashboard.thunks';

const formEmoney = {
  form: 'FormEmoney',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, registerEmoneytoBank, amount}) => {
    const params = {onSubmit: registerEmoneytoBank, amount, isOtp: true};
    triggerAuth(amount, params);
  }
};
const mapStateToProps = (state) => ({
  tncUrl: result(state, 'config.attention.urlSimobiOnboardingTnC', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (billAmount, params) => dispatch(triggerAuthNavigate('emoneyoffers', billAmount, false, 'AuthDashboard', params)),
  goToNextPage: (route) => dispatch(NavigationActions.navigate({routeName: route})),
  registerEmoneytoBank: () => dispatch(finalizeEmoneyExistingtoBank()),
});

const AgreeForm = reduxForm(formEmoney)(TermConditionEmoney);

class TermEmoneyPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    tncUrl: PropTypes.string,
    goToNextPage: PropTypes.func,
    triggerAuth: PropTypes.func,
    registerEmoneytoBank: PropTypes.func,
  }

  onFinalizeForm = () => {
    const {goToNextPage} = this.props;
    goToNextPage('HomeScreen');
  }

  render () {
    const {tncUrl, triggerAuth, registerEmoneytoBank} = this.props;
    return (
      <AgreeForm onFinalizeForm={this.onFinalizeForm} triggerAuth={triggerAuth} registerEmoneytoBank={registerEmoneytoBank}
        tncUrl={tncUrl} />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(TermEmoneyPage);
export default ConnectedForm;
