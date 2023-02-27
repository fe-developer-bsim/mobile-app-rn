import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SavingAccount, {fields} from '../../components/CreateNewSavingAccount/SavingAccountForm7.component';
import {validateRequiredFields, validateNumber, validateNpwpLength} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {createCreditCardForm} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'SavingForm7',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, checked}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    let statusForm = '';
    if (checked) {
      statusForm = 'SUBMIT';
      dispatch(createCreditCardForm(statusForm, 'SavingAccountFinalize', checkpoint));
    } else {
      statusForm = 'NEXT';
      const checkpointStatus = checked ? checkpoint : false;
      dispatch(createCreditCardForm(statusForm, 'SavingNPWPCamera', checkpointStatus));
    }
  },
  validate: (values, {disable}) => {
    const errors = {
      ...validateRequiredFields(values, [fields.REASON_NO_NPWP]),
    };
    const errorsNpwp = {
      ...validateRequiredFields(values, [fields.NPWP_NUMBER]),
      npwpNumber: validateNpwpLength(result(values, 'npwpNumber', ''))
    };
    if (disable) {
      return {
        ...errors,
      };
    } else {
      return {
        ...errorsNpwp,
      };
    }
  }
};

const mapStateToProps = (state) => ({
  creditLimit: result(state, 'form.CCForm6.values.creditLimit', ''),
  npwpNumber: result(state, 'form.SavingForm7.values.npwpNumber', ''),
  reasonNoNPWP: result(state, 'form.SavingForm7.values.reasonNoNPWP.value', ''),
  listReasonNoNpwp: result(state, 'configEForm.listConfigEform.reasonNoNPWP', []),
  CCForm7Data: result(state, 'form.SavingForm7', {}),
});

const mapDispatchToProps = (dispatch) => ({
  setNpwpNumbertoClear: () => {
    dispatch(change('SavingForm7', 'npwpNumber', ''));
  },
  setNpwpNumbertoNull: () => {
    dispatch(change('SavingForm7', 'npwpNumber', null));
  },
  setNpwpReasontoNull: () => {
    dispatch(change('SavingForm7', 'reasonNoNPWP', null));
  },
});

const SavingAccountForm = reduxForm(formConfig)(SavingAccount);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm);

class SavingAccountForm7 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    checkbox: PropTypes.bool,
    setNpwpNumbertoClear: PropTypes.func,
    setNpwpNumbertoNull: PropTypes.func,
    setNpwpReasontoNull: PropTypes.func,
    listReasonNoNpwp: PropTypes.array,
    CCForm7Data: PropTypes.object,
    creditLimit: PropTypes.number,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
  }

  state = {
    checked: false,
    hidden: true,
    disable: false
  }

  toogleCheckbox = (checked) => {
    const {setNpwpNumbertoClear, setNpwpNumbertoNull, setNpwpReasontoNull} = this.props;
    this.setState({checked: checked, hidden: !checked, disable: checked});
    checked ? setNpwpNumbertoClear() : setNpwpNumbertoNull();
    !checked ? setNpwpReasontoNull() : null;
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('npwpNumber' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentWillMount () {
    const {navigation, CCForm7Data} = this.props;
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const npwpNumber = result(CCForm7Data, 'values.npwpNumber', '');
    const reasonNoNPWP = result(CCForm7Data, 'values.reasonNoNPWP', {});
    if (checkpoint) {
      if ((npwpNumber === '') && (!isEmpty(reasonNoNPWP))) {
        this.setState({checked: true, hidden: false, disable: true});
      } else {
        this.setState({checked: false, hidden: true, disable: false});
      }
    }
  }

  render () {
    const {navigation, listReasonNoNpwp, creditLimit} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        checked={this.state.checked}
        hidden={this.state.hidden}
        disable={this.state.disable}
        toogleCheckbox={this.toogleCheckbox}
        checkbox={this.state.checked}
        listReasonNoNpwp={listReasonNoNpwp}
        creditLimit={creditLimit}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm7);
export default ConnectedFormPage;
