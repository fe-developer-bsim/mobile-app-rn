import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {confirmPA, dispatchAction} from '../../state/thunks/Insurance.thunks';
import ConfirmPAComponent from '../../components/Insurance/ConfirmationPA.component';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';

const formConfig = {
  form: 'InsurancePAForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, confirmDataPA}) => {
    const params = {onSubmit: confirmDataPA, amount: '', isOtp: true};
    const amountDefault = 0;
    dispatch(triggerAuth(amountDefault, params));
  },
};
const FormDataPAForm = reduxForm(formConfig)(ConfirmPAComponent);

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(triggerAuthNavigate('personalaccident', 0, false, 'AuthDashboard', params)),
  confirmData: (data) => dispatch(confirmPA(data)),
  resetToHome: () => dispatch(dispatchAction(0)),
});

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    confirmPA: PropTypes.func,
    confirmData: PropTypes.func,
    triggerAuth: PropTypes.func
  }
  state = {
    isDisabled: true
  }

  confirmDataPA = () => {
    const {confirmData, triggerAuth} = this.props;
    const params = {onSubmit: confirmData, amount: '0', isOtp: true, isEasypin: false, shouldSendSmsOtp: true};
    triggerAuth(params);
  }
  render () {
    const {confirmPA} = this.props;
    const {navigation = {}} = this.props;
    const navParams = result(navigation, 'state.params', {});

    return (
      <FormDataPAForm {...this.props} confirmPA = {confirmPA} {...navigation} navParams={navParams} confirmDataPA={this.confirmDataPA} />
    );
  }

}

export default connect(null, mapDispatchToProps)(InsurancePage);
