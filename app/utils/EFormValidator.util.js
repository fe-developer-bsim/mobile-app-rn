import {isEmptyOrNull} from './transformer.util';
import {validateEmail, validateNameEform, validateNumber, validateRtRw, validatePostalCodeLength, validateIdNumber,
  validateMonthlyIncome, validateNpwpLength, validateCreditLimit, validateAlphanumeric, validatePhoneNumber, validatePhoneNumberHome, 
  validatePhoneNumberCompany, validateCompanyPhoneNumberPD, validatePhoneNumberPD} from './validator.util';
import {result, forEach, split, noop} from 'lodash';

export const email = (val) => isEmptyOrNull(val) || validateEmail(val);

export const district = (val) => isEmptyOrNull(validateNameEform(val));

export const subDistrict = (val) => isEmptyOrNull(validateNameEform(val));

export const streetAddress = (val) => isEmptyOrNull(validateNameEform(val));

export const rt = (val) => isEmptyOrNull(validateRtRw(val));

export const rw = (val) => isEmptyOrNull(validateRtRw(val));

export const postal = (val) => isEmptyOrNull(validateNumber(val));

export const number = (val) => isEmptyOrNull(val);

export const name = (val) => isEmptyOrNull(validateNameEform(val));

export const birthPlace = (val) => isEmptyOrNull(validateNameEform(val));

export const karyawan = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== 'Karyawan';

export const npwpNumber = (val) => isEmptyOrNull(validateNpwpLength(val));

export const creditLimit = (val) => isEmptyOrNull(validateCreditLimit(val));

export const haveVehicle = (formValues, dependentOnHide, dependentOnHideCode) => {
  const haveVehicle = result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '');
  const show = haveVehicle !== 'Car' && haveVehicle !== 'Motorbike';
  return show;
};

export const disabledField = (formValues, code) => {
  let disabled = false;
  const value = result(formValues, `${code}`, '');
  if (value !== '') {
    disabled = true;
  } else {
    disabled = false;
  }
  return disabled;
};

// function for show field, if have NPWP
export const haveNpwp = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== '0';

// function for show field, if don't have NPWP
export const dontHaveNpwp = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== '1';

export const alamat = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== '1';

export const alamatKTP = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== '0';

export const referalCode = (val) => validateAlphanumeric(val);

export const otherSourceFund = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== 'LAINNYA';

export const highRisk = (formValues, dependentOnHideCode, dependentOnHide) => {
  let isHighRisk = [];
  const code = split(dependentOnHideCode, ',');
  forEach(code, (cd) => {
    if (result(formValues, `${cd}.${dependentOnHide}`, '') !== 'highRisk') {
      isHighRisk.push('true');
    } else {
      isHighRisk.push('false');
    }
  });

  const hide = !isHighRisk.includes('false');
  return hide;
};

export const mobileNumber = (val) => isEmptyOrNull(val) || validatePhoneNumber(val);

export const companyPhoneNumber = (val) => isEmptyOrNull(val) || validatePhoneNumberHome(val);

export const mustHide = (formValues, dependentOnHide, dependentOnHideCode) => noop(formValues, dependentOnHide) === noop(dependentOnHideCode) || true;

// function for show field
export const showField = (formValues, dependentOnHide, dependentOnHideCode) => result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '') !== '0';

// export const pendidikan = (formValues, dependentOn) =>  isEmptyOrNull(result(formValues, `${dependentOn}`, ''));

export const workUnemployed = (formValues, dependentOnHideCode, dependentOnHide) => {
  let hide = true;
  const workType = result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '');
  if (workType === 'Employed' || workType === 'Professional' || workType === 'Entrepreneur') {
    hide = false;
  } else {
    hide = true;
  }
  return hide;
};

export const workEmPr = (formValues, dependentOnHideCode, dependentOnHide) => {
  let hide = true;
  const workType = result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '');
  if (workType === 'Employed' || workType === 'Professional') {
    hide = false;
  } else {
    hide = true;
  }
  return hide;
};

export const workProfessional = (formValues, dependentOnHideCode, dependentOnHide) => {
  let hide = true;
  const workType = result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '');
  if (workType === 'Professional') {
    hide = false;
  } else {
    hide = true;
  }
  return hide;
};

export const workEntre = (formValues, dependentOnHideCode, dependentOnHide) => {
  let hide = true;
  const workType = result(formValues, `${dependentOnHide}.${dependentOnHideCode}`, '');
  if (workType === 'Entrepreneur') {
    hide = false;
  } else {
    hide = true;
  }
  return hide;
};

export const companyPhoneNumberPD = (val) => isEmptyOrNull(val) || validateCompanyPhoneNumberPD(val);

export const mobileNumberPD = (val) => isEmptyOrNull(val) || validatePhoneNumberPD(val);

export const newCompanyPhoneNumber = (val) => validatePhoneNumberCompany(val);

export default {
  email: validateEmail,
  number: validateNumber,
  // rt: validateRtRw,
  postal: validatePostalCodeLength,
  ktpNumber: validateIdNumber,
  npwpNumber: validateNpwpLength,
  creditLimit: validateCreditLimit,
  referalCode: validateAlphanumeric,
  monthlyIncome: validateMonthlyIncome,
  mobileNumber: validatePhoneNumber,
  companyPhoneNumber: validatePhoneNumberHome,
  newCompanyPhoneNumber: validatePhoneNumberCompany,
  companyPhoneNumberPD: validateCompanyPhoneNumberPD,
  mobileNumberPD: validatePhoneNumberPD
};
