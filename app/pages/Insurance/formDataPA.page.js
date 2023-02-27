import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormDataPA, getPA} from '../../state/thunks/Insurance.thunks';
import FormDataPAComponent, {fields} from '../../components/Insurance/FormDataPA.component';
import {result, find} from 'lodash';
import {reduxForm, change} from 'redux-form';
import {validateRequiredFields, validatePhoneNumber, validateNumber, validateEmail} from '../../utils/validator.util';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';

const formConfig = {
  form: 'InsurancePAForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(FormDataPA(values));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.NAME, fields.IDENTITY_NUMBER, fields.DOB, fields.PHONE, fields.MOBILE, fields.EMAIL, fields.ADDRESS, fields.CITY, fields.POSTAL])};
    return {
      cust_phone: validatePhoneNumber(values.cust_phone) && validateNumber(values.cust_phone),
      cust_mobile: validatePhoneNumber(values.cust_mobile) && validateNumber(values.cust_mobile),
      cust_postal_code: validateNumber(values.cust_postal_code),
      cust_email: validateEmail(values.cust_email),
      cust_identity_number: validateNumber(values.cust_identity_number),

      ...errors
    };
  }
};
const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
});

const mapDispatchToProps = (dispatch) => ({
  sumbitFormDataPA: () => () => dispatch(FormDataPA()),
  setName: (Name) => dispatch(change('InsurancePAForm', 'cust_name', Name)),
  setIdentity: (Identity) => dispatch(change('InsurancePAForm', 'cust_identity_number', Identity)),
  setDob: (Dob) => dispatch(change('InsurancePAForm', 'cust_dob', Dob)),
  setMobilenumber: (Mobilenumber) => dispatch(change('InsurancePAForm', 'cust_mobile', Mobilenumber)),
  getPACreate: () =>  dispatch(getPA()),
  setSex: (gender) => dispatch(change('InsurancePAForm', 'cust_sex', gender)),
  setEmail: (email) => dispatch(change('InsurancePAForm', 'cust_email', email)),
});

const FormDataPAForm = reduxForm(formConfig)(FormDataPAComponent);

class InsurancePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    sumbitFormDataPA: PropTypes.func,
    setName: PropTypes.func,
    setIdentity: PropTypes.func,
    setDob: PropTypes.func,
    setMobilenumber: PropTypes.func,
    accounts: PropTypes.array,
    getPACreate: PropTypes.func,
    setSex: PropTypes.func,
    setEmail: PropTypes.func,
  }

  componentDidMount () {
    const {navigation, setName, setIdentity, setDob, setMobilenumber, setSex, setEmail} = this.props;
    const Name = result(navigation, 'state.params.formData.name', '');
    const email = result(navigation, 'state.params.formData.email', 'email@email.com');
    const Identity = result(navigation, 'state.params.formData.ktpId', '');
    const Dob = result(navigation, 'state.params.formData.dob', '');
    const Mobilenumber = result(navigation, 'state.params.formData.mobilenumber', '');
    const genderList = result(navigation, 'state.params.formDataDropDownSex', []);
    const genderAcc = result(navigation, 'state.params.formData.gender', '');
    const genderName = genderAcc === 'F' ? 'Female' : genderAcc === 'M' ? 'Male' : null;
    const gender = find(genderList, {name: genderName}) || null;
    setName(Name);
    setIdentity(Identity);
    setDob(Dob);
    setMobilenumber(Mobilenumber);
    setSex(gender);
    setEmail(email);
  }

  render () {
    const {accounts = [], sumbitFormDataPA, navigation, getPACreate} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const genderAcc = result(navigation, 'state.params.formData.gender', '');
    const genderCode = genderAcc === 'F' ? '0' : genderAcc === 'M' ? '1' : null;
    return (
      <FormDataPAForm sumbitFormDataPA={sumbitFormDataPA} {...navigation} navParams={navParams} accounts={accounts} getPACreate = {getPACreate} genderAcc = {genderCode}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePage);
