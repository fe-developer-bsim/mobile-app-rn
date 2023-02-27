import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm7.component';
import {validateRequiredFields, validateNumber, validateNpwpLength} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, result} from 'lodash';
import {createCreditCardForm} from '../../state/thunks/ccEform.thunks';

const formConfig = {
  form: 'CCForm7',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, checked}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const statusForm = 'NEXT';
    if (checked) {
      dispatch(createCreditCardForm(statusForm, 'CreditCardForm8', checkpoint));
    } else {
      dispatch(createCreditCardForm(statusForm, 'CreditCardNPWPCamera', checkpoint));
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
  npwpNumber: result(state, 'form.CCForm7.values.npwpNumber', ''),
  reasonNoNPWP: result(state, 'form.CCForm7.values.reasonNoNPWP.value', ''),
  listReasonNoNpwp: result(state, 'configEForm.listConfigEform.reasonNoNPWP', []),
  CCForm7Data: result(state, 'form.CCForm7', {}),
  ccCode: result(state, 'ccCode', '')
});

const mapDispatchToProps = (dispatch) => ({
  setNpwpNumbertoClear: () => {
    dispatch(change('CCForm7', 'npwpNumber', ''));
  },
  setNpwpNumbertoNull: () => {
    dispatch(change('CCForm7', 'npwpNumber', null));
  },
  setNpwpReasontoNull: () => {
    dispatch(change('CCForm7', 'reasonNoNPWP', null));
  },
});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm7 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    checkbox: PropTypes.bool,
    setNpwpNumbertoClear: PropTypes.func,
    setNpwpNumbertoNull: PropTypes.func,
    setNpwpReasontoNull: PropTypes.func,
    listReasonNoNpwp: PropTypes.array,
    CCForm7Data: PropTypes.object,
    creditLimit: PropTypes.number,
    ccCode: PropTypes.ccCode
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
    const {navigation, listReasonNoNpwp, creditLimit, ccCode} = this.props;
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
        ccCode={ccCode}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm7);
export default ConnectedFormPage;
