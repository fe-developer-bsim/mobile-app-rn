import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import SmartInvestaLinkRiskQuestionComponent, {fields} from '../../components/InvestmentJourney/SILeSPAJForm6.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields, validateNumber} from '../../utils/validator.util';

const formConfig = {
  form: 'SileSPAJForm6',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, silIdrUsd, checkboxArray) => {
    const isSilIdrUsd = result(silIdrUsd, 'isSilIdrUsd', '');
    if (isSilIdrUsd === 'IDR') {
      dispatch(NavigationActions.navigate({routeName: 'ConfirmationBuyPolisSILIDR'}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'ConfirmationBuyPolisSILUSD'}));
    }
    const dataCollected = {
      formName: 'SileSPAJForm6',
      dataBody: {
        checkboxArray: checkboxArray,
        answer0: values.answer0,
        answer1: values.answer1,
        answer2: values.answer2,
        answer3: values.answer3,
        answer4: values.answer4,
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },

  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.ANSWER])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.SileSPAJForm6.values', {}),
  getProfileQuestion: result(state, 'getProfileQuestion.profileQuestion', []),
  countingAnswer: result(state, 'form.SileSPAJForm6.values', {}),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  profileQuestionResult: result(state, 'getProfileQuestion.kamusPoin', []),
});

const SmartInvestaLinkRiskQuestionPage = reduxForm(formConfig)(SmartInvestaLinkRiskQuestionComponent);

class SmartInvestaLinkQuestion extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    amountValue: PropTypes.number,
    isSilIdrUsd: PropTypes.string,
    getProfileQuestion: PropTypes.array,
    countingAnswer: PropTypes.object,
    profileQuestionResult: PropTypes.array,
  };

  state = {
    checkboxArray: []
  }

  changeCheckboxArray = (checkbox)  => {
    this.setState({checkboxArray: checkbox});
  }
    
  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amount' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {formValues, countingAnswer, amountValue, isSilIdrUsd, getProfileQuestion, profileQuestionResult} = this.props;
    return <SmartInvestaLinkRiskQuestionPage
      formValues={formValues}
      validationInput={this.validationInput}
      isSilIdrUsd = {isSilIdrUsd}
      amountValue={amountValue}
      countingAnswer={countingAnswer}
      checkboxArray={this.state.checkboxArray}
      changeCheckboxArray={this.changeCheckboxArray}
      getProfileQuestion={getProfileQuestion}
      profileQuestionResult={profileQuestionResult}
    />;
  }
}

export default connect(mapStateToProps, null)(SmartInvestaLinkQuestion);