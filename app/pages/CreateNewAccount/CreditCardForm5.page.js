import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm5.component';
import {validateRequiredFields, validateNameEform} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {createCreditCardForm} from '../../state/thunks/ccEform.thunks';

const formConfig = {
  form: 'CCForm5',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, numberOfDependant}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const statusForm = 'NEXT';
    const pageName = 'CreditCardForm6';
    dispatch(change('CCForm5', 'numberOfDependant', numberOfDependant)),
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.LAST_EDUCATION, fields.PURPOSE_OF_OPENING, fields.NUMBER_OF_DEBIT,
        fields.DEBIT_PER_MONTH, fields.NUMBER_OF_CREDIT, fields.CREDIT_PER_MONTH])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  dependant: result(state, 'checkpoint.0.rawData.dataSubmit.stage1.1.value.6.value', ''),
  educationList: result(state, 'configEForm.listConfigEform.lastEducation', []),
  purposeList: result(state, 'configEForm.listConfigEform.purposeAccountOpening', []),
  purposeOfOpening: result(state, 'form.CCForm5.values.purposeOfOpening', ''),
  numberOfDebit: result(state, 'form.CCForm5.values.numberOfDebit', ''),
  debitPerMonth: result(state, 'form.CCForm5.values.debitPerMonth', ''),
  numberOfCredit: result(state, 'form.CCForm5.values.numberOfCredit', ''),
  creditPerMonth: result(state, 'form.CCForm5.values.creditPerMonth', ''),
});

const mapDispatchToProps = () => ({});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm5 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    educationList: PropTypes.array,
    purposeList: PropTypes.array,
    dependant: PropTypes.string
  }

  state = {
    numberOfDependant: 0,
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('lastEducation' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('purposeOfOpening' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  addQuantity = () => {
    if (this.state.numberOfDependant < 10) {
      this.setState({numberOfDependant: this.state.numberOfDependant + 1});
    }
  }

  minusQuantity = () => {
    if (this.state.numberOfDependant > 0) {
      this.setState({numberOfDependant: this.state.numberOfDependant - 1});
    }
  }

  componentWillMount () {
    const {dependant, navigation} = this.props;
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const numberOfDependantCheckpoint = parseInt(dependant);
    if (checkpoint) {
      if (numberOfDependantCheckpoint !== 0) {
        this.setState({numberOfDependant: numberOfDependantCheckpoint});
      }
    }
  }

  render () {
    const {navigation, educationList, purposeList} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        educationList={educationList}
        purposeList={purposeList}
        addQuantity={this.addQuantity}
        minusQuantity={this.minusQuantity}
        numberOfDependant={this.state.numberOfDependant}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm5);
export default ConnectedFormPage;
