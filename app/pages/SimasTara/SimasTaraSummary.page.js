import React from 'react';
import PropTypes from 'prop-types';
import SimasTaraSummaryComponent from '../../components/SimasTara/SimasTaraSummary.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {createSimasTara} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'SimasTaraSummary',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {triggerAuth, createSaving, data}) => {
    const createSavingTara = () => {
      createSaving(data);
    };
    const params = {onSubmit: createSavingTara, amount: '0', isOtp: false};
    dispatch(triggerAuth(params));
  }
};

const mapStateToProps = (state) => ({
  name: result(state, 'user.profile.name', ''),
  email: result(state, 'form.EmailForm.values.email', ''),
  account: result(state, 'form.SimasTaraSimulation.values.AccNo', {}),
  periodList: result(state, 'form.SimasTaraSimulation.values.periodList.name', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (params) => dispatch(triggerAuthNavigate('SimasTara', '0', true, 'AuthDashboard', params)),
  createSimasTaraAccount: (data) => dispatch(createSimasTara(data))
});

const SimasTaraSummary = reduxForm(formConfig)(SimasTaraSummaryComponent);

class SimasTaraSummaryClass extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    account: PropTypes.object,
    periodList: PropTypes.string,
    navigation: PropTypes.object,
    createSimasTaraAccount: PropTypes.func,
    triggerAuth: PropTypes.func,
  }

  createSaving = (data) => {
    const {createSimasTaraAccount} = this.props;
    createSimasTaraAccount(data);
  }

  render () {
    const {name, email, account, periodList, navigation, triggerAuth} = this.props;
    const data = result(navigation, 'state.params', {});
    return <SimasTaraSummary name={name} email={email} account={account} periodList={periodList} data={data} createSaving={this.createSaving} triggerAuth={triggerAuth}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SimasTaraSummaryClass);
