import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SavingAccount, {fields} from '../../components/CreateNewSavingAccount/SavingAccountForm4.component';
import {validateRequiredFields, validateNumber, validateNameEform} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {createCreditCardForm, getProvinceList, getCityList, getDistrictList, getSubDistrictList} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'SavingForm4',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const existing = result(navigation, 'state.params.existing', false);
    const statusForm = 'NEXT';
    const pageName = existing ? 'SavingAccountForm7' : 'SavingAccountForm5';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint, existing));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.WORK_TITLE, fields.WORK_POSITION, fields.INDUSTRY, fields.COMPANY_NAME,
        fields.COMPANY_ADDRESS, fields.COMPANY_PHONE_NUMBER, fields.COMPANY_PROVINCE,
        fields.COMPANY_CITY, fields.COMPANY_DISTRICT, fields.COMPANY_SUBDISTRICT,
        fields.COMPANY_POSTAL_CODE, fields.COMPANY_RT, fields.COMPANY_RW])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  workTitle: result(state, 'form.SavingForm4.values.workTitle', ''),
  workPosition: result(state, 'form.SavingForm4.values.workPosition', ''),
  industry: result(state, 'form.SavingForm4.values.industry', ''),
  companyName: result(state, 'form.SavingForm4.values.companyName', ''),
  companyAddress: result(state, 'form.SavingForm4.values.companyAddress', ''),
  companyPhoneNumber: result(state, 'form.SavingForm4.values.companyPhoneNumber', ''),
  listPosition: result(state, 'configEForm.listConfigEform.workTitle', []),
  provinceList: result(state, 'provinceList', []),
  cityList: result(state, 'cityList', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
  companySubDistrict: result(state, 'form.SavingForm4.values.companySubDistrict', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('SavingForm4', 'companyProvince'));
    dispatch(change('SavingForm4', 'companyCity', {}));
    dispatch(change('SavingForm4', 'companyDistrict', {}));
    dispatch(change('SavingForm4', 'companySubDistrict', {}));
    dispatch(change('SavingForm4', 'companyPostalCode', {}));
    dispatch(change('SavingForm4', 'companyRT', {}));
    dispatch(change('SavingForm4', 'companyRW', {}));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('SavingForm4', 'companyCity'));
    dispatch(change('SavingForm4', 'companyDistrict', {}));
    dispatch(change('SavingForm4', 'companySubDistrict', {}));
    dispatch(change('SavingForm4', 'companyPostalCode', {}));
    dispatch(change('SavingForm4', 'companyRT', {}));
    dispatch(change('SavingForm4', 'companyRW', {}));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('SavingForm4', 'companyDistrict'));
    dispatch(change('SavingForm4', 'companySubDistrict', {}));
    dispatch(change('SavingForm4', 'companyPostalCode', {}));
    dispatch(change('SavingForm4', 'companyRT', {}));
    dispatch(change('SavingForm4', 'companyRW', {}));
  },
  setPostalCode: (code) => {
    dispatch(change('SavingForm4', 'companyPostalCode', code));
  },
  setCountry: () => {
    dispatch(change('SavingForm4', 'companyCountry', 'Indonesia'));
  }
});

const SavingAccountForm = reduxForm(formConfig)(SavingAccount);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm);

class SavingAccountForm4 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    getProvinceList: PropTypes.func,
    getCityList: PropTypes.func,
    getDistrictList: PropTypes.func,
    getSubDistrictList: PropTypes.func,
    provinceList: PropTypes.array,
    cityList: PropTypes.array,
    districtList: PropTypes.array,
    subDistrictList: PropTypes.array,
    setPostalCode: PropTypes.func,
    companySubDistrict: PropTypes.object,
    listPosition: PropTypes.array,
    setCountry: PropTypes.func
  }

  componentWillMount () {
    this.props.getProvinceList();
    this.props.setCountry();
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('workTitle' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('companyName' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('companyAddress' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('companyPhoneNumber' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  setPostalCode = () => {
    setTimeout(() => {
      const {setPostalCode, companySubDistrict} = this.props;
      const zipcode = result(companySubDistrict, 'zipCode', '');
      setPostalCode(zipcode);
    }, 1000);
  }

  render () {
    const {navigation, getCityList, getDistrictList, getSubDistrictList, listPosition} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        getCityList={getCityList}
        getDistrictList={getDistrictList}
        getSubDistrictList={getSubDistrictList}
        setZipCode={this.setPostalCode}
        listPosition={listPosition}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm4);
export default ConnectedFormPage;
