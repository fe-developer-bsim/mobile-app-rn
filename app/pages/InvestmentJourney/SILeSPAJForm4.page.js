import React from 'react';
import PropTypes from 'prop-types';
import SILForm4, {fields} from '../../components/InvestmentJourney/SILeSPAJForm4.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {getHealthQuestionFunc} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields, validateNameEform, validateDateBirthdate} from '../../utils/validator.util';
import isEmpty from 'lodash/isEmpty';
import {saveSILDATA} from '../../state/thunks/dashboard.thunks';
import lowerCase from 'lodash/lowerCase';


const formConfig = {
  form: 'SileSPAJForm4',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, checkboxArray) => {
    dispatch(getHealthQuestionFunc());
    const dataCollected = {
      formName: 'SileSPAJForm4',
      dataBody: {
        checkboxArray: checkboxArray,
        fullName: values.fullName,
        birthdate: values.birthdate,
        gender: values.gender,
        polisRelation: values.polisRelation,
        benefit: values.benefit,
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },
  initialValues: {
    [fields.FULLNAME]: '',
    [fields.BIRTHDATE]: '',
    [fields.GENDER]: '',
    [fields.POLIS_RELATION]: []
  },

  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, [fields.FULLNAME, fields.GENDER, fields.POLIS_RELATION, values, fields.BIRTHDATE])
    };
    return {
      fullName: validateNameEform(values.fullName),
      birthdate: validateDateBirthdate(values.birthdate),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  gender: lowerCase(result(state, 'smartInvestasiLinkPolis.jenisKelamin', '')),
  dropList: result(state, 'getDropList.dropDownList', {}),
  maritalStatus: lowerCase(result(state, 'form.SileSPAJForm1.values.maritalStatus.label')),
  relationBeneficiary: lowerCase(result(state, 'form.SileSPAJForm4.values.polisRelation.label', '')),
  genderOther: lowerCase(result(state, 'form.SileSPAJForm4.values.gender.label', '')),
});


const mapDispatchToProps = (dispatch) => ({
  getHealthQuestionFunc: () => {
    dispatch(getHealthQuestionFunc());
  },
});

const eSPAJSILForm4 = reduxForm(formConfig)(SILForm4);
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(eSPAJSILForm4);

class SmartInvestaLinkForm4 extends React.Component {
  static propTypes = {
    getHealthQuestionFunc: PropTypes.func,
    gender: PropTypes.array,
    maritalStatus: PropTypes.string,
    relationBeneficiary: PropTypes.string,
    genderOther: PropTypes.string
  }

  state = {
    checkboxArray: []
  }

  changeCheckboxArray = (checkbox) => {
    this.setState({checkboxArray: checkbox});
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('fullName' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }

  }

  render () {
    const {gender, getHealthQuestionFunc, maritalStatus, relationBeneficiary, genderOther} = this.props;

    return (
      <ConnectedForm
        validationInput={this.validationInput}
        gender={gender}
        getHealthQuestionFunc = {getHealthQuestionFunc}
        checkboxArray={this.state.checkboxArray}
        changeCheckboxArray={this.changeCheckboxArray}
        maritalStatus={maritalStatus}
        relationBeneficiary={relationBeneficiary}
        genderOther={genderOther}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkForm4);