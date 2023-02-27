import React from 'react';
import PropTypes from 'prop-types';
import SmartInvestaLinkInfoComponent, {fields} from '../../components/InvestmentJourney/SILIlustrasiForm1.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {goToSILForm2, saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields, validateEmail, validatePhoneNumber, validateNameEform} from '../../utils/validator.util';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'SilIustrasiForm1',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, checkboxArray) => {
    dispatch(goToSILForm2());
    const dataCollected = {
      formName: 'SilIustrasiForm1',
      dataBody: {
        checkboxArray: checkboxArray,
        email: values.email,
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },
  initialValues: {
    [fields.EMAIL]: '',
  },

  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.EMAIL])
    };
    return {
      email: validateEmail(values.email),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  email: result(state, 'smartInvestasiLinkPolis.email', ''),
  fullName: result(state, 'smartInvestasiLinkPolis.namaLengkap', ''),
  phone: result(state, 'smartInvestasiLinkPolis.noHp', ''),
  birthdate: result(state, 'smartInvestasiLinkPolis.tanggalLahir', ''),
  gender: result(state, 'smartInvestasiLinkPolis.jenisKelamin', ''),
  chooseGender: result(state, 'getDropList.dropDownList', {}),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
});



const mapDispatchToProps = (dispatch) => ({
  prefilledEmail: (email) => {
    dispatch(change('SilIustrasiForm1', 'email', email));
  },
  goToSILForm2: () => dispatch(goToSILForm2()),
});

const SmartInvestaLinkInfoPage = reduxForm(formConfig)(SmartInvestaLinkInfoComponent);

class SmartInvestaLinkDetail extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    triggerAuth: PropTypes.func,
    prefilledEmail: PropTypes.func,
    prefilledGender: PropTypes.func,
    prefilledFullName: PropTypes.func,
    prefilledPhone: PropTypes.func,
    prefilledBirthdate: PropTypes.func,
    email: PropTypes.string,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    birthdate: PropTypes.string,
    goToSILForm2: PropTypes.func,
    gender: PropTypes.string,
    chooseGender: PropTypes.array
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
    } else if ('phoneNumber' === typeField) {
      if (isEmpty(validatePhoneNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('email' === typeField) {
      if (isEmpty(validateEmail(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentDidMount = () => {
    const {email, prefilledEmail} = this.props;
    prefilledEmail(email);
  }
  
  render () {
    const {goToSILForm2, gender, email, phone, fullName, birthdate, chooseGender} = this.props; 
    return (
      <SmartInvestaLinkInfoPage 
        validationInput={this.validationInput}
        goToSILForm2={goToSILForm2}
        chooseGender={chooseGender}
        gender={gender}
        checkboxArray={this.state.checkboxArray}
        changeCheckboxArray={this.changeCheckboxArray}
        email={email}
        phone={phone}
        fullName={fullName}
        birthdate={birthdate}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkDetail);
