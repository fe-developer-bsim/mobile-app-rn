import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import IdentityForm, {fields} from '../../components/PaydayLoan/PaydayLoanIndex.component';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields, validateNumber, isInRange} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {precisionRound} from '../../utils/transformer.util';

const formConfig = {
  form: 'PaydayLoanIndexForm',
  destroyOnUnmount: false,
  initialValues: {
    [fields.AMOUNT_PAYLOAN]: '',
  },
  onSubmit: (values, dispatch, {partFour, checkForm, configPostal}) => {
    if (checkForm === 'yes') {
      dispatch(NavigationActions.navigate({routeName: 'ConfirmPaydayLoan', params: {paydayLoanForm: values, partFour: partFour}}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'PaydayLoanFormFill', params: {paydayLoanForm: values, configPostal: configPostal}}));
    }
  },
  validate: (values, {partFour}) => {
    const errors = {
      ...validateRequiredFields(values, [fields.AMOUNT_PAYLOAN])};
    return {
      amountPayloan: validateNumber(values.amountPayloan) || isInRange(500000, partFour, values.amountPayloan),
      ...errors
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  setAmount: (amount) => dispatch(change('PaydayLoanIndexForm', 'amountPayloan', amount)),
});

const RegisterForm = reduxForm(formConfig)(IdentityForm);

const ConnectedForm = connect(null, mapDispatchToProps)(RegisterForm);

class IdentityFormPage extends Component {
  state ={
    partOne: '',
    partTwo: '',
    partThree: '',
    partFour: '',
    viewFee: '',
  }
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    setAmount: PropTypes.func,
  }

  onLoginPress = () => {
    this.props.navigation.navigate('RegisterAtm');
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amountPayloan' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }
  componentWillMount () {
    const {navigation} = this.props;
    const amount = result(navigation, 'state.params.plafond', '');
    this.setState({partOne: (precisionRound(amount * 0.25, -3)).toString()});
    this.setState({partTwo: (precisionRound(amount * 0.5, -3)).toString()});
    this.setState({partThree: (precisionRound(amount * 0.75, -3)).toString()});
    this.setState({partFour: amount.toString()});
  }

  changeStateFee = (values) => {
    this.setState({viewFee: values});
  }

  setAmountOne = () => {
    const {navigation} = this.props;
    const amount = (precisionRound((result(navigation, 'state.params.plafond', '')) * 0.25, -3)).toString();

    if (amount < 500000) {
      this.props.setAmount('500000');
    } else {
      this.props.setAmount(amount);
    }
  }
  setAmountTwo = () => {
    const {navigation} = this.props;
    const amount = (precisionRound((result(navigation, 'state.params.plafond', '')) * 0.5, -3)).toString();
    this.props.setAmount(amount);
  }
  setAmountThree = () => {
    const {navigation} = this.props;
    const amount = (precisionRound((result(navigation, 'state.params.plafond', '')) * 0.75, -3)).toString();
    this.props.setAmount(amount);
  }
  setAmountFour = () => {
    const {navigation} = this.props;
    const amount = ((result(navigation, 'state.params.plafond', ''))).toString();
    this.props.setAmount(amount);
  }

  render () {
    const {navigation, goToForgotPassword} = this.props;
    const configPostal = result(navigation, 'state.params', {});
    const amountValid = result(navigation, 'state.params.plafond', '');
    const checkForm = result(navigation, 'state.params.checkForm', '');
    return (
      <ConnectedForm
        forgotPassword={goToForgotPassword}
        navigation={navigation}
        onLoginPress={this.onLoginPress}
        validationInput={this.validationInput()}
        setAmountOne={this.setAmountOne}
        setAmountTwo={this.setAmountTwo}
        setAmountThree={this.setAmountThree}
        setAmountFour={this.setAmountFour}
        partOne={this.state.partOne}
        partTwo={this.state.partTwo}
        partThree={this.state.partThree}
        partFour={this.state.partFour}
        checkForm={checkForm}
        viewFee={this.state.viewFee}
        changeStateFee={this.changeStateFee}
        configPostal={configPostal}
        amountValid={amountValid}
      />
    );
  }
}

const ConnectedFormPage = connect(null, mapDispatchToProps)(IdentityFormPage);
export default ConnectedFormPage;
