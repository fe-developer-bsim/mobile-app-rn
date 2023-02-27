import React from 'react';
import PropTypes from 'prop-types';
import SmartInvestaLinkInfoComponent, {fields} from '../../components/InvestmentJourney/SILeSPAJForm5.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {getProfileQuestion, saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields} from '../../utils/validator.util';
import {isEmptyOrNull} from '../../utils/transformer.util';


const formConfig = {
  form: 'SileSPAJForm5',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, checkboxArray) => {
    dispatch(getProfileQuestion());
    const blankArray = [];
    const dataCollected = {
      formName: 'SileSPAJForm5',
      dataBody: {
        checkboxArray: values.answers1.questionarePpFlag === 0 ? blankArray : checkboxArray,
        answers0: values.answers0,
        answers1: values.answers1,
        answers2: values.answers2,
        explain0: values.explain0,
        explain2: values.explain2
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },
  initialValues: {
  },

  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, [fields.ANSWERS + '0', fields.ANSWERS + '1', fields.ANSWERS + '2', fields.EXPLAIN + '0', fields.EXPLAIN + '2'])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  healthQuestions: result(state, 'healthQuestion', []),
  formHealth: result(state, 'form.SileSPAJForm5.values', {}),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  answers1: result(state, 'form.SileSPAJForm5.values.answers1', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getProfileQuestion: () => dispatch(getProfileQuestion()),
  prefilledAnwers1: (answers1) => {
    dispatch(change('SileSPAJForm5', 'answers1', answers1));
  },
});

const SmartInvestaLinkInfoPage = reduxForm(formConfig)(SmartInvestaLinkInfoComponent);

class SmartInvestaLinkDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getProfileQuestion: PropTypes.func,
    gender: PropTypes.array,
    healthQuestions: PropTypes.array,
    formHealth: PropTypes.object,
    answers1: PropTypes.object,
    prefilledAnwers1: PropTypes.func,
  }
  state = {
    checkboxArray: []
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {checkboxArray} = this.state;
    const {prefilledAnwers1} = this.props;
    const health = isEmptyOrNull(this.props.healthQuestions);
    let chooseAnwers1 = '';
    if (checkboxArray.length >= 1 && prevState.checkboxArray.length === 0 && health === false) {
      chooseAnwers1 = this.props.healthQuestions[1].listAnswers;
      prefilledAnwers1(chooseAnwers1[1]);
    } else if (checkboxArray.length === 0 && prevState.checkboxArray.length >= 1 && health === true) {
      chooseAnwers1 = this.props.healthQuestions[1].listAnswers;
      prefilledAnwers1({});
    }
  }

  changeCheckboxArray = (checkbox) => {
    this.setState({checkboxArray: checkbox});
  }

  render () {
    const {getProfileQuestion, gender, healthQuestions, formHealth, answers1} = this.props;
    return (
      <SmartInvestaLinkInfoPage validationInput={this.validationInput}
        getProfileQuestion={getProfileQuestion}
        gender={gender}
        healthQuestions={healthQuestions}
        formHealth={formHealth}
        checkboxArray={this.state.checkboxArray}
        changeCheckboxArray={this.changeCheckboxArray}
        answers1={answers1}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkDetail);