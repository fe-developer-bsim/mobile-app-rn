import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RedeemSmartfren from '../../components/Home/RedeemSmartfren.component';
import {reduxForm, change} from 'redux-form';
import {validateRequiredFields, validateIdNumber, validateSmartfrenNumber} from '../../utils/validator.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {redeemSmartfrenConfirm} from '../../state/thunks/dashboard.thunks';
import {andromaxAccount} from '../../utils/transformer.util';

const formConfig = {
  form: 'RedeemSmartfren',
  destroyOnUnmount: false,
  initialValues: {
    noKTP: '',
    smartfrenNumber: '088',
    accNumber: '',
  },
  onSubmit: (values, dispatch) => {
    dispatch(redeemSmartfrenConfirm(values));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['noKTP', 'smartfrenNumber', 'accNumber'])};
    return {
      noKTP: validateIdNumber(values.noKTP),
      smartfrenNumber: validateSmartfrenNumber(values.smartfrenNumber),
      ...errors
    };
  }
};

const RedeemSmartfrenForm = reduxForm(formConfig)(RedeemSmartfren);

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('td', amount, true, 'AuthDashboard', params)),
  setAcc: (accNumber) => dispatch(change('RedeemSmartfren', 'accNumber', accNumber)),
});

class RedeemSmartfrenPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    setAcc: PropTypes.func,
  };

  componentDidMount () {
    const {setAcc, accounts} = this.props;
    const andromaxAcc = andromaxAccount(accounts, 'td'); // foo now only allowed for IDR and only from savings
    setAcc(result(andromaxAcc, '0.accountNumber'));
  }

  render () {
    const {navigation, accounts = {}} = this.props;
    const andromaxAcc = andromaxAccount(accounts, 'td'); // foo now only allowed for IDR and only from savings
    return <RedeemSmartfrenForm
      navigation={navigation} andromaxAcc={andromaxAcc}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedeemSmartfrenPage);
