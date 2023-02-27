/* eslint-disable */;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm8.component';
import {validateRequiredFields, validateNameEform} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {createCreditCardForm, generateStatementPhoto} from '../../state/thunks/ccEform.thunks';
import {hideSpinner} from '../../state/actions/index.actions.js';
import ImagePicker from 'react-native-image-picker';
import {Toast} from '../../utils/RNHelpers.util.js';

const formConfig = {
  form: 'CCForm8',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const statusForm = 'NEXT';
    const pageName = 'CreditCardForm9';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
  },
  initialValues: {
    savingStatement1: ''
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.WORK_STATUS])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  workStatus: result(state, 'form.CCForm8.values.workStatus', ''),
  startWork: result(state, 'form.CCForm8.values.startWork', ''),
  workStatusList: result(state, 'configEForm.listConfigEform.statusWork', []),
  work: result(state, 'form.CCForm3.values.work', ''),
});

const mapDispatchToProps = (dispatch) => ({
  hideSpinner: () => dispatch(hideSpinner()),
  setImageData: (data) => dispatch(generateStatementPhoto(result(data, 'fieldName', ''), result(data, 'stringData', ''))),
});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm8 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    hideSpinner: PropTypes.func,
    selectInput: PropTypes.func,
    setImageData: PropTypes.func,
    work: PropTypes.object,
  }

  state = {
    savingStatement1: '',
    savingStatement2: '',
    savingStatement3: '',
    latestPayslip: ''
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.hideSpinner();
    }, 1000);
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('workStatus' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  selectInput = (fieldName) => () => {
    const {setImageData} = this.props;
    ImagePicker.showImagePicker({}, (response) => {
      const isError = response.hasOwnProperty('error');
      if (isError) {
        Toast.show('Go to settings, allow Simobi+ to access device camera', Toast.LONG);
      } else {
        setImageData({fieldName: fieldName, stringData: response.data});
        this.setState({
          [`${fieldName}`]: result(response, 'fileName', '') ? result(response, 'fileName', '') : result(response, 'uri', '')
        });
      }
    });
  }

  render () {
    const {navigation, work} = this.props;
    const {savingStatement1, savingStatement2, savingStatement3, workStatusList, latestPayslip} = this.state;
    const workType = result(work, 'filter', '');
    const disabled = workType === 'Employed' ?
      isEmpty(latestPayslip) :
      isEmpty(savingStatement1) || isEmpty(savingStatement2) || isEmpty(savingStatement3);
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        selectInput={this.selectInput}
        disabled={disabled}
        savingStatement1={savingStatement1}
        savingStatement2={savingStatement2}
        savingStatement3={savingStatement3}
        workStatusList={workStatusList}
        work={work}
        selectPayslip={this.selectPayslip}
        latestPayslip={latestPayslip}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm8);
export default ConnectedFormPage;
