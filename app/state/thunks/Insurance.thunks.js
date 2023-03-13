import * as actionCreators from '../actions/index.actions.js';
import {StackActions, NavigationActions} from 'react-navigation';
import api from '../../utils/api.util';
import {
  getErrorMessage,
  dateFormatter,
  isEmptyOrNull,
  formatFieldAmount,
} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';
import result from 'lodash/result';
import moment from 'moment';
import * as middlewareUtils from '../../utils/middleware.util';
import filter from 'lodash/filter';
import {destroy} from 'redux-form';
import {getAmountForGenericBillerTypeOne} from './genericBill.thunks';
import {
  populateBillerData,
  populateConfigData,
  isEmptyFields,
  getTransRefNumAndOTPNavigate,
} from './common.thunks';
import forEach from 'lodash/forEach';
import isNaN from 'lodash/isNaN';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import map from 'lodash/map';
import {getDropDownList} from '../../utils/transformer.util';

const routeNames = [
  'HomeScreen', // 0
  'Insurance', // 1
  'TravelInsurance', // 2
  'PlanTravel', // 3
  'TravelDetail', // 4
  'TravelCustomer', // 5
  'TravelBeneficiary', // 6
  'TravelConfirm', // 7
  'TravelResult', // 8
  'TravelPay', // 9
];

let navigateActions = [];

const storeAction = (params, index) => {
  const routes = routeNames[index];
  navigateActions[index] = NavigationActions.navigate({
    routeName: routes,
    params: params,
  });
};

export const dispatchAction = index => dispatch => {
  const routes =
    index > navigateActions.length
      ? navigateActions
      : navigateActions.slice(0, index + 1);
  const actionDispatch = routes.map((_, key) => navigateActions[key]);
  dispatch(StackActions.reset({index: index, actions: actionDispatch}));
};

export function insurance() {
  return dispatch => {
    dispatch(actionCreators.clearParty());
    // dispatch(actionCreators.clearDataTravel());
    dispatch(actionCreators.showSpinner());
    api
      .getTravelInsurance(dispatch)
      .then(response => {
        const TravelInsurance = result(response, 'data', {});
        dispatch(actionCreators.setInsuranceTravel({TravelInsurance}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.INSURANCE_ERROR_DATA),
          Toast.LONG,
        );
      });
    api
      .getPAInsurance(dispatch)
      .then(response => {
        const PAInsurance = result(response, 'data', {});
        dispatch(actionCreators.setInsurancePA({PAInsurance}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.INSURANCE_ERROR_DATA),
          Toast.LONG,
        );
      });
    storeAction({}, 0);
    storeAction({}, 1);
    dispatch(NavigationActions.navigate({routeName: routeNames[1]}));
  };
}

export function getTravelInsuranceCreate() {
  return (dispatch, getState) => {
    const state = getState();
    const plan = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.planListJson',
      [],
    );
    const travelType = map(uniqBy(plan, 'jenisPerjalanan'), object => ({
      value: object.jenisPerjalanan,
    }));
    const links = result(state, 'config.attention', {});
    const travelURI = {
      Domestic: result(links, 'urlTravelInsuranceDomestic', ''),
      Overseas: result(links, 'urlTravelInsuranceOverseas', ''),
    };
    const premiURI = result(links, 'urlTravelInsurancePremi', '');
    const typeDisplay = {
      Domestic:
        language.TRAVEL_INSURANCE__SIMASNET_TRAVEL_OPTION_SUBHEADER +
        language.TRAVEL_INSURANCE__DOMESTIC_OPTION,
      Overseas:
        language.TRAVEL_INSURANCE__SIMASNET_TRAVEL_OPTION_SUBHEADER +
        language.TRAVEL_INSURANCE__OVERSEAS_OPTION,
    };
    const params = {travelType, travelURI, premiURI, typeDisplay};
    storeAction({...params}, 2);
    dispatch(dispatchAction(2));
  };
}

export function getTravelInsurance(planSelect) {
  return (dispatch, getState) => {
    const state = getState();
    const plan = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.planListJson',
      [],
    );
    const Individu = filter(plan, {
      jenisPerjalanan: planSelect,
      jenisPlan: 'Individu',
    });
    const Family = filter(plan, {
      jenisPerjalanan: planSelect,
      jenisPlan: 'Family',
    });
    const headerTop = language.TRAVEL_INSURANCE__TITLE_PLAN + ' ' + planSelect;
    const planHeader = {header: headerTop};
    const currData = result(state, 'insuranceDataTravel', {});
    const currDataTravel = result(currData, 'DATATRAVEL', {});
    const currDisplay = result(currDataTravel, 'dataDisplay', {});
    const currPlanHeader = result(currDisplay, 'planHeader', {});
    const DATATRAVEL = {
      ...currDataTravel,
      dataDisplay: {
        ...currDisplay,
        planHeader: {...currPlanHeader, ...planHeader},
      },
    };
    dispatch(actionCreators.setDataTravel({...currData, DATATRAVEL}));
    const params = {Individu, Family, planSelect};
    storeAction({...params}, 3);
    dispatch(dispatchAction(3));
  };
}
export function getPA() {
  return (dispatch, getState) => {
    const state = getState();
    const premi = result(
      state,
      'insurancePA.PAInsurance.dropDownLists.personalAccidentPremiJson',
      [],
    );
    dispatch(NavigationActions.navigate({routeName: 'PremiPA', params: premi}));
  };
}
export function PremiPA(selectPremi) {
  return (dispatch, getState) => {
    const state = getState();
    const premi = result(selectPremi, 'code', '');
    let AJSMSIG = {premium: premi};
    dispatch(actionCreators.setDataPA({AJSMSIG}));
    const formData = result(state, 'insurancePA.PAInsurance.customer', []);
    const formDataDropDownSex = result(
      state,
      'insurancePA.PAInsurance.dropDownLists.personalAccidentSexJson',
      [],
    );
    dispatch(
      NavigationActions.navigate({
        routeName: 'formDataPA',
        params: {formData, formDataDropDownSex, premi},
      }),
    );
  };
}
export function FormDataPA(formData) {
  return (dispatch, getState) => {
    const state = getState();
    let AJSMSIG = result(state, 'insuranceDataPA.AJSMSIG', '');
    const cust_cif = result(
      state,
      'insurancePA.PAInsurance.customer.cifCode',
      '',
    );
    const cust_name = result(formData, 'cust_name', '');
    const cust_identity_number = result(formData, 'cust_identity_number', '');
    const cust_dob = String(
      dateFormatter(result(formData, 'cust_dob', ''), 'YYYY/MM/DD'),
    );
    const cust_sex = result(formData, 'cust_sex.code', '');
    const cust_phone = result(formData, 'cust_phone', '');
    const cust_mobile = result(formData, 'cust_mobile', '');
    const cust_email = result(formData, 'cust_email', '');
    const cust_address = result(formData, 'cust_address', '');
    const cust_city = result(formData, 'cust_city', '');
    const cust_postal_code = result(formData, 'cust_postal_code', '');
    const cust_account = result(formData, 'accountNo.accountNumber', '');
    const premium = result(AJSMSIG, 'premium', '');
    const cust_sex_dis = result(formData, 'cust_sex.name', '');

    AJSMSIG = {
      cust_cif: cust_cif,
      cust_name: cust_name,
      cust_identity_number: cust_identity_number,
      cust_dob: cust_dob,
      cust_sex: cust_sex,
      cust_phone: cust_phone,
      cust_mobile: cust_mobile,
      cust_email: cust_email,
      cust_address: cust_address,
      cust_city: cust_city,
      cust_postal_code: cust_postal_code,
      cust_account: cust_account,
      premium: premium,
    };
    let display = {
      cust_cif: cust_cif,
      cust_name: cust_name,
      cust_identity_number: cust_identity_number,
      cust_dob: cust_dob,
      cust_sex: cust_sex,
      cust_phone: cust_phone,
      cust_mobile: cust_mobile,
      cust_email: cust_email,
      cust_address: cust_address,
      cust_city: cust_city,
      cust_postal_code: cust_postal_code,
      cust_account: cust_account,
      premium: premium,
      cust_sex_dis: cust_sex_dis,
    };
    dispatch(actionCreators.setDataPA({AJSMSIG, display}));
    const BeneficiaryDataRelation = result(
      state,
      'insurancePA.PAInsurance.dropDownLists.personalAccidentBenRelationJson',
      [],
    );
    const BeneficiaryDataSex = result(
      state,
      'insurancePA.PAInsurance.dropDownLists.personalAccidentSexJson',
      [],
    );
    dispatch(
      NavigationActions.navigate({
        routeName: 'FormDataBeneficiaryPA',
        params: {
          BeneficiaryDataRelation,
          BeneficiaryDataSex,
          cust_name,
          premium,
        },
      }),
    );
  };
}
export function FormDataBeneficiaryPA(formDataBeneficiary) {
  return (dispatch, getState) => {
    const state = getState();
    let AJSMSIG = result(state, 'insuranceDataPA.AJSMSIG', '');
    let display = result(state, 'insuranceDataPA.display', '');
    const cust_cif = result(AJSMSIG, 'cust_cif', '');
    const cust_name = result(AJSMSIG, 'cust_name', '');
    const cust_identity_number = result(AJSMSIG, 'cust_identity_number', '');
    const cust_dob = result(AJSMSIG, 'cust_dob', '');
    const cust_sex = result(AJSMSIG, 'cust_sex', '');
    const cust_phone = result(AJSMSIG, 'cust_phone', '');
    const cust_mobile = result(AJSMSIG, 'cust_mobile', '');
    const cust_email = result(AJSMSIG, 'cust_email', '');
    const cust_address = result(AJSMSIG, 'cust_address', '');
    const cust_city = result(AJSMSIG, 'cust_city', '');
    const cust_postal_code = result(AJSMSIG, 'cust_postal_code', '');
    const cust_account = result(AJSMSIG, 'cust_account', '');
    const premium = result(AJSMSIG, 'premium', '');
    const benef_name = result(formDataBeneficiary, 'benef_name', '');
    const benef_dob = String(
      dateFormatter(
        moment(result(formDataBeneficiary, 'benef_dob', ''), 'DD/MM/YYYY'),
        'YYYY/MM/DD',
      ),
    );
    const benef_relation = result(
      formDataBeneficiary,
      'benef_relation.code',
      '',
    );
    const benef_sex = result(formDataBeneficiary, 'benef_sex.code', '');

    const request = result(state, 'insurancePA.PAInsurance.PA.request', '');
    const request_type = result(
      state,
      'insurancePA.PAInsurance.PA.request_type',
      '',
    );
    const client_id = result(state, 'insurancePA.PAInsurance.PA.client_id', '');
    const client_name = result(
      state,
      'insurancePA.PAInsurance.PA.client_name',
      '',
    );
    const signature = result(state, 'insurancePA.PAInsurance.PA.signature', '');

    const cust_sex_dis = result(display, 'cust_sex_dis', '');
    const benef_relation_dis = result(
      formDataBeneficiary,
      'benef_relation.name',
      '',
    );
    const benef_sex_dis = result(formDataBeneficiary, 'benef_sex.name', '');

    AJSMSIG = {
      cust_cif: cust_cif,
      cust_name: cust_name,
      cust_identity_number: cust_identity_number,
      cust_dob: cust_dob,
      cust_sex: cust_sex,
      cust_phone: cust_phone,
      cust_mobile: cust_mobile,
      cust_email: cust_email,
      cust_address: cust_address,
      cust_city: cust_city,
      cust_postal_code: cust_postal_code,
      cust_account: cust_account,
      premium: premium,
      benef_name: benef_name,
      benef_dob: benef_dob,
      benef_relation: benef_relation,
      benef_sex: benef_sex,
      request: request,
      request_type: request_type,
      client_id: client_id,
      client_name: client_name,
      signature: signature,
    };

    display = {
      cust_cif: cust_cif,
      cust_name: cust_name,
      cust_identity_number: cust_identity_number,
      cust_dob: cust_dob,
      cust_sex: cust_sex,
      cust_phone: cust_phone,
      cust_mobile: cust_mobile,
      cust_email: cust_email,
      cust_address: cust_address,
      cust_city: cust_city,
      cust_postal_code: cust_postal_code,
      cust_account: cust_account,
      premium: premium,
      cust_sex_dis: cust_sex_dis,
      benef_relation_dis: benef_relation_dis,
      benef_sex_dis: benef_sex_dis,
      benef_name: benef_name,
      benef_dob: benef_dob,
      benef_relation: benef_relation,
      benef_sex: benef_sex,
    };

    dispatch(actionCreators.setDataPA({AJSMSIG, display}));
    return api
      .confirmPAInsurance(AJSMSIG, dispatch)
      .then(res => {
        const response = res;
        dispatch(actionCreators.setDataPA({AJSMSIG, display, response}));
        dispatch(
          NavigationActions.navigate({
            routeName: 'confirmationPA',
            params: display,
          }),
        );
      })
      .catch(err => {
        Toast.show(getErrorMessage(err, language.INSURANCE__ERROR_));
      });
  };
}

export function confirmPA(data) {
  return (dispatch, getState) => {
    const state = getState();
    let AJSMSIG = result(state, 'insuranceDataPA.AJSMSIG', '');
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const transRefNum = state.transRefNum;
    const date = new Date();
    const time = moment(date).format('DD MMM YYYY, hh:mm a');
    const payload = middlewareUtils.prepareInsurancePA(
      AJSMSIG,
      transRefNum,
      easyPin,
      smsOtp,
      simasToken,
    );
    dispatch(actionCreators.showSpinner());
    dispatch(destroy('FormDataBeneficiaryPA'));
    dispatch(destroy('formDataPA'));
    dispatch(destroy('confirmationPA'));
    dispatch(destroy('AuthenticateForm'));
    dispatch(destroy('InsurancePAForm'));
    return api
      .resultPAInsurance(payload, dispatch)
      .then(res => {
        const response = res;
        dispatch(actionCreators.setDataPA({AJSMSIG, response}));

        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({
                routeName: 'resultPA',
                params: {
                  AJSMSIG,
                  response,
                  status: '200',
                  transRefNum: transRefNum,
                  time: time,
                },
              }),
            ],
          }),
        );

        dispatch(actionCreators.hideSpinner());
        return Promise.all([
          dispatch(populateBillerData()),
          dispatch(populateConfigData()),
        ]);
      })
      .catch(err => {
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'AccountMenu'}),
              NavigationActions.navigate({
                routeName: 'resultPA',
                params: {
                  err,
                  data,
                  status: '400',
                  transRefNum: transRefNum,
                  time: time,
                },
              }),
            ],
          }),
        );
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.INSURANCE__ERROR_));
      });
  };
}

export function payPA() {
  return (dispatch, getState) => {
    const state = getState();
    const vaPA = result(state, 'insuranceDataPA.response.data.NO_VA', '');
    dispatch(actionCreators.showSpinner());
    return api
      .getbillerConfig(dispatch)
      .then(res => {
        const databiller = result(res, 'data.billerList', []);
        const biller = filter(databiller, {name: 'Virtual Account'});
        const billerData = result(biller, '0', {});
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'AccountMenu'})],
          }),
        );
        dispatch(getAmountForGenericBillerTypeOne(vaPA, billerData));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'AccountMenu'})],
          }),
        );
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function TravelDetail(value) {
  return (dispatch, getState) => {
    const state = getState();
    const isBack = isEmptyOrNull(value);
    const member = result(value, 'jenisPlan', '');
    const currPartyData = result(state, 'insuranceAddParty', {});
    const currMaxSize = result(currPartyData, 'maxSize', 0);
    const currMinSize = result(currPartyData, 'minSize', 0);
    const maxSize = isBack ? currMaxSize : member === 'Individu' ? 0 : 4;
    const minSize = isBack ? currMinSize : member === 'Individu' ? 0 : 1;
    let newPartyData = {};
    map(currPartyData, (obj, key) => {
      const parsedKey = parseInt(key);
      isNaN(parsedKey) || parsedKey < maxSize
        ? (newPartyData = {...newPartyData, [`${key}`]: obj})
        : null;
    });
    const currData = result(state, 'insuranceDataTravel', {});
    const currDATATRAVEL = result(currData, 'DATATRAVEL', {});
    const dataDisplay = result(currDATATRAVEL, 'dataDisplay', {});
    const currInsuredHeader = result(dataDisplay, 'insuredHeader', {});
    let newSubHeader = {
      0: result(result(newPartyData, 'Insured', {}), 'CustName', {}),
    };
    map(newPartyData, (obj, key) => {
      if (obj && parseInt(key)) {
        newSubHeader = {
          ...newSubHeader,
          [`${key}`]: result(obj, 'CustName', ''),
        };
      }
    });
    const insuredHeader = {
      header: language.TRAVEL_INSURANCE__INSURED,
      subHeader: newSubHeader,
      func: () => {
        dispatch(TravelCustomer());
      },
    };
    const customer = result(
      state,
      'insuranceTravel.TravelInsurance.customer',
      {},
    );
    const reason = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.tripReasonJson',
      {},
    );
    const planName = result(value, 'name', '');
    const planCode = result(value, 'code', '');
    const currDataTravel = result(currData, 'DATATRAVEL', {});
    const currDataSend = result(currDataTravel, 'dataSend', {});
    const currTravelData = result(currDataSend, 'travelData', {});
    const currDataDisplay = result(currDataTravel, 'dataDisplay', {});
    const partyInfoExist = !isEmptyOrNull(result(currPartyData, 'Insured', {}));
    const newSend = {
      cifCode: result(customer, 'cifCode', ''),
      CustName: result(customer, 'name', ''),
      product: 'simasnetTravel',
      destType: result(value, 'jenisPerjalanan', ''),
      planType: result(value, 'jenisPlan', ''),
      travelData: {
        ...currTravelData,
        Package: isBack ? result(currTravelData, 'Package', '') : planCode,
      },
    };
    const currPlanHeader = result(currDataDisplay, 'planHeader', {});
    const newPlanHeader = isBack
      ? currPlanHeader
      : {
          subHeader: planName,
          func: () => {
            dispatch(getTravelInsuranceCreate());
          },
        };
    const planSelect = result(navigateActions, '3.params.planSelect', '');
    const limitObj = {Domestic: 90, Overseas: 180};
    const limit = result(limitObj, planSelect, '');
    const DATATRAVEL = partyInfoExist
      ? {
          ...currDataTravel,
          dataSend: {
            ...currDataSend,
            ...newSend,
          },
          dataDisplay: {
            ...currDataDisplay,
            planHeader: {...currPlanHeader, ...newPlanHeader},
            insuredHeader: {...currInsuredHeader, ...insuredHeader},
          },
        }
      : {
          ...currDataTravel,
          dataSend: {
            ...currDataSend,
            ...newSend,
          },
          dataDisplay: {
            ...currDataDisplay,
            planHeader: {...currPlanHeader, ...newPlanHeader},
          },
        };
    dispatch(actionCreators.setDataTravel({...currData, DATATRAVEL}));
    dispatch(actionCreators.addParty({...newPartyData, maxSize, minSize}));
    isEmptyOrNull(value) ? undefined : storeAction({reason, value, limit}, 4);
    dispatch(dispatchAction(4));
  };
}

export const TravelInsuranceEmptyFields = () => (dispatch, getState) => {
  const state = getState();
  const mapping = {
    name: 'CustName',
    ktpId: 'InsuredIdNo',
    dob: 'DateOfBirth',
    gender: 'Gender',
    mobilenumber: 'HandPhone',
    email: 'Email',
  };
  const customer = result(
    state,
    'insuranceTravel.TravelInsurance.customer',
    {},
  );
  const specialCondition = (obj, key) => key === 'gender' && obj === 'U';
  return dispatch(isEmptyFields(customer, mapping, specialCondition));
};

export function TravelCustomer(values) {
  return (dispatch, getState) => {
    const state = getState();
    const currData = result(state, 'insuranceDataTravel', {});
    const currDATATRAVEL = result(currData, 'DATATRAVEL', {});
    const currDataSend = result(currDATATRAVEL, 'dataSend', {});
    const currTravelData = result(currDataSend, 'travelData', {});
    const dataDisplay = result(currDATATRAVEL, 'dataDisplay', {});
    const customer = result(
      state,
      'insuranceTravel.TravelInsurance.customer',
      {},
    );
    const fromDate = result(values, 'InseptionDate', '');
    const toDate = result(values, 'InseptionDateTo', '');
    const fromCity = result(values, 'OriginatingCity', '');
    const toCity = result(values, 'FurthestCity', '');
    const currHeader = result(dataDisplay, 'travelHeader', {});
    const isBack = isEmptyOrNull(values);
    const travelDetail =
      language.TRAVEL_DOMESTIC_TITTLE_FROM +
      ' ' +
      fromCity +
      ' ' +
      language.TRAVEL_DOMESTIC_TITTLE_TO +
      ' ' +
      toCity;
    const dateDetail =
      moment(fromDate, 'DD/MM/YYYY').format('DD MMM YYYY') +
      ' - ' +
      moment(toDate, 'DD/MM/YYYY').format('DD MMM YYYY');
    const newTravelData = isBack
      ? {...currTravelData}
      : {
          TripReason: result(values, 'TripReason.val', ''),
          Amount: '',
          OriginatingCity: fromCity,
          FurthestCity: toCity,
        };
    const travelHeader = isBack
      ? currHeader
      : {
          header: language.TRAVEL_INSURANCE__TRAVEL_DETAIL,
          subHeader: {travelDetail, dateDetail},
          func: () => {
            dispatch(TravelDetail());
          },
        };
    const currTravelHeader = result(dataDisplay, 'travelHeader', {});
    const currPartyData = result(state, 'insuranceAddParty', {});
    const DATATRAVEL = {
      ...currDATATRAVEL,
      dataDisplay: {
        ...dataDisplay,
        travelHeader: {...currTravelHeader, ...travelHeader},
      },
      dataSend: {
        ...currDataSend,
        InseptionDate: isBack
          ? result(currDataSend, 'InseptionDate', '')
          : fromDate,
        InseptionDateTo: isBack
          ? result(currDataSend, 'InseptionDateTo', '')
          : toDate,
        travelData: {
          ...currTravelData,
          ...newTravelData,
        },
      },
    };
    const sex = result(customer, 'gender', '');
    const genderType = {M: 'L', F: 'P'};
    const statusList = getDropDownList(
      result(
        state,
        'insuranceTravel.TravelInsurance.dropDownLists.statusInsuredJson',
        [],
      ),
    );
    const genderList = getDropDownList(
      result(
        state,
        'insuranceTravel.TravelInsurance.dropDownLists.genderJson',
        [],
      ),
    );
    const insuredStatus = filter(statusList, {code: 'Insured'});
    const insuredGender = filter(genderList, {
      code: result(genderType, sex, ''),
    });
    const defaultInsured = {
      IsInsuredFlag: 1,
      CustName: result(customer, 'name', ''),
      InsuredIdNo: result(customer, 'ktpId', ''),
      DateOfBirth: result(customer, 'dob', ''),
      Gender: insuredGender[0],
      Status: insuredStatus[0],
      HandPhone: result(customer, 'mobilenumber', ''),
      Email: result(customer, 'email', ''),
      IdType: 'KTP',
      isFilled: false,
    };
    const currInsured = result(currPartyData, 'Insured', {});
    const partyInfoExist = !isEmptyOrNull(currInsured) && currInsured.isFilled;
    const currSize = result(currPartyData, 'size', {});
    const size = isEmptyOrNull(currSize) ? 0 : currSize;
    const Insured = isEmpty(currInsured) ? {...defaultInsured} : currInsured;
    dispatch(actionCreators.setDataTravel({...currData, DATATRAVEL}));
    dispatch(actionCreators.addParty({...currPartyData, size, Insured}));
    isBack ? undefined : storeAction({customer}, 5);
    partyInfoExist
      ? dispatch(dispatchAction(5))
      : dispatch(editDetail('Insured'));
  };
}

export function TravelBeneficiary() {
  return (dispatch, getState) => {
    const state = getState();
    const currData = result(state, 'insuranceDataTravel', {});
    const DATATRAVEL = result(currData, 'DATATRAVEL', {});
    const dataSend = result(DATATRAVEL, 'dataSend', {});
    const travelData = result(dataSend, 'travelData', {});
    const dataDisplay = result(DATATRAVEL, 'dataDisplay', {});
    const currParty = result(state, 'insuranceAddParty', {});
    const values = result(currParty, 'Insured', {});
    const compileInfo = partyInfo => ({
      CustName: result(partyInfo, 'CustName', ''),
      DateOfBirth: result(partyInfo, 'DateOfBirth', ''),
      Gender: result(partyInfo, 'Gender.val', result(partyInfo, 'Gender', '')),
      Status: result(partyInfo, 'Status.val', result(partyInfo, 'Status', '')),
      IsInsuredFlag:
        result(partyInfo, 'Status.val', result(partyInfo, 'Status', '')) ===
        'Insured'
          ? 1
          : 0,
      PhoneNo: result(partyInfo, 'PhoneNo', ''),
      HandPhone: result(partyInfo, 'HandPhone', ''),
      Email: result(partyInfo, 'Email', ''),
      CustAddress: result(partyInfo, 'CustAddress', ''),
      City: result(partyInfo, 'City', ''),
      ZipCode: result(partyInfo, 'ZipCode', ''),
      InsuredIdNo:
        result(partyInfo, 'IdType', '') +
        ':' +
        result(partyInfo, 'InsuredIdNo', ''),
    });
    let sentParty = {0: compileInfo(values)};
    forEach(currParty, (object, k) => {
      sentParty = !isNaN(parseInt(k))
        ? {...sentParty, [`${k}`]: compileInfo(object)}
        : {...sentParty};
    });
    const newDataTravel = {
      ...DATATRAVEL,
      dataSend: {
        ...dataSend,
        travelData: {
          ...travelData,
          Insured: Object.values(sentParty),
        },
      },
    };
    const relation = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.relationshipHeirJson',
      [],
    );
    dispatch(
      actionCreators.setDataTravel({
        ...currData,
        DATATRAVEL: {...newDataTravel},
      }),
    );
    const planSelect = result(navigateActions, '3.params.planSelect', '');
    const params = {relation, dataDisplay, planSelect};
    storeAction(params, 6);
    dispatch(dispatchAction(6));
  };
}

export function TravelConfirm(values) {
  return (dispatch, getState) => {
    const state = getState();
    const currData = result(state, 'insuranceDataTravel', {});
    const currDataTravel = result(currData, 'DATATRAVEL', {});
    const dataSend = result(currDataTravel, 'dataSend', {});
    const travelData = result(dataSend, 'travelData', {});
    const Benefi = {
      BeneficiaryName: result(values, 'BeneficiaryName', ''),
      BeneficiaryRelationship: result(values, 'BeneficiaryRelationship', ''),
      BeneficiaryPercentage: parseInt(
        result(values, 'BeneficiaryPercentage', 100),
      ),
    };
    const DATATRAVEL = {
      ...currDataTravel,
      dataSend: {
        ...dataSend,
        travelData: {
          ...travelData,
          Beneficiary: Object.values({
            Beneficiary: {
              ...Benefi,
              BeneficiaryRelationship: result(
                Benefi,
                'BeneficiaryRelationship.val',
              ),
              BeneficiaryPercentage: Benefi.BeneficiaryPercentage,
            },
          }),
        },
      },
    };
    const currDataParty = result(state, 'insuranceAddParty', {});
    dispatch(actionCreators.showSpinner());
    return api
      .confirmTravelInsurance(DATATRAVEL.dataSend, dispatch)
      .then(res => {
        DATATRAVEL.res = {...res};
        const params = {
          statusTranslate: {
            Insured: language.GENERIC__INSURED,
            Spouse: language.GENERIC__SPOUSE,
            Child: language.GENERIC__CHILD,
          },
        };
        dispatch(
          NavigationActions.navigate({routeName: 'TravelConfirm'}, params),
        );
        dispatch(actionCreators.setDataTravel({...currData, DATATRAVEL}));
        dispatch(
          actionCreators.addParty({...currDataParty, Beneficiary: Benefi}),
        );
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        Toast.show(getErrorMessage(err, language.INSURANCE__ERROR_));
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export const destroyTravelInsuranceForm = () => dispatch => {
  dispatch(destroy('travelDetail'));
  dispatch(destroy('travelCustomer'));
  dispatch(destroy('AuthenticateForm'));
  dispatch(destroy('travelBeneficiary'));
};

export const OTPtoResult = onSubmit => dispatch => {
  const params = {onSubmit};
  dispatch(actionCreators.showSpinner());
  dispatch(actionCreators.setIsLoading());
  dispatch(dispatchAction(0));
  dispatch(destroyTravelInsuranceForm());
  dispatch(
    getTransRefNumAndOTPNavigate(
      'simasnettravel',
      true,
      'AuthDashboard',
      params,
      false,
      false,
    ),
  );
};
export function TravelResult() {
  return (dispatch, getState) => {
    const state = getState();
    const currInsuranceDataTravel = result(state, 'insuranceDataTravel', {});
    const currDataTravel = result(currInsuranceDataTravel, 'DATATRAVEL', {});
    const smsOtp = result(state, 'form.AuthenticateForm.values.otp', '');
    const easyPin = result(state, 'form.AuthenticateForm.values.easypin', '');
    const simasToken = result(
      state,
      'form.AuthenticateForm.values.simasToken',
      '',
    );
    const transRefNum = state.transRefNum;
    const currDataSend = result(currDataTravel, 'dataSend', {});
    const currDataDisplay = result(currDataTravel, 'dataDisplay', {});
    const travelData = result(currDataSend, 'travelData', {});
    const res = result(currDataTravel, 'res.data.travelData', {});
    const payload = middlewareUtils.prepareInsuranceTravel(
      {...travelData, ...res},
      transRefNum,
      smsOtp,
      simasToken,
      easyPin,
    );
    dispatch(destroyTravelInsuranceForm());
    dispatch(actionCreators.showSpinner());
    return api
      .resultTravelInsurance(payload, dispatch)
      .then(res => {
        const DATATRAVEL = {
          ...currDataTravel,
          dataSend: {
            ...currDataSend,
            ...res,
            transRefNum,
            smsOtp,
            simasToken,
          },
          dataResult: {
            simasToken,
            transRefNum,
            smsOtp,
            travelData: {...travelData, ...res},
          },
          res: res,
          dataDisplay:
            res.status === 200
              ? {
                  insurancePlan: result(
                    currDataTravel,
                    'dataDisplay.planHeader.header',
                    '',
                  ),
                  insuranceType: result(
                    currDataTravel,
                    'dataDisplay.planHeader.subHeader',
                    '',
                  ),
                  PolicyInsuranceNo: result(res, 'data.PolicyInsuranceNo', ''),
                  InsuredName: result(
                    currDataTravel,
                    'dataDisplay.insuredHeader.subHeader.0',
                    '',
                  ),
                  Premi: result(res, 'data.Premi', ''),
                  Kurs: result(res, 'data.Kurs', ''),
                }
              : currDataDisplay,
        };
        const dataDisplay = {
          insurancePlan: result(DATATRAVEL, 'dataDisplay.insurancePlan', ''),
          insuranceType: result(DATATRAVEL, 'dataDisplay.insuranceType', ''),
          PolicyInsuranceNo: result(
            DATATRAVEL,
            'dataDisplay.PolicyInsuranceNo',
            '',
          ),
          InsuredName: result(DATATRAVEL, 'dataDisplay.InsuredName', ''),
          Premi:
            result(DATATRAVEL, 'dataDisplay.Kurs', '') +
            formatFieldAmount(result(DATATRAVEL, 'dataDisplay.Premi', '')),
        };
        const dataDisplayHeader = {
          insurancePlan: language.TRAVEL_INSURANCE__INSURANCE_PLAN,
          insuranceType: language.TRAVEL_INSURANCE__INSURANCE_TYPE,
          PolicyInsuranceNo: language.TRAVEL_INSURANCE__POLICY_INSURANCE_NO,
          InsuredName: language.TRAVEL_INSURANCE__INSURED_NAME,
          Premi: language.TRAVEL_INSURANCE__PREMI,
        };
        dispatch(
          actionCreators.setDataTravel({
            ...currInsuranceDataTravel,
            DATATRAVEL,
          }),
        );
        dispatch(actionCreators.hideSpinner());
        const params = {
          status: res.status,
          dataDisplay,
          dataDisplayHeader,
          NoRef: transRefNum,
        };
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'HomeScreen'}),
              NavigationActions.navigate({routeName: 'TravelResult', params}),
            ],
          }),
        );
        return Promise.all([
          dispatch(populateBillerData()),
          dispatch(populateConfigData()),
        ]);
      })
      .catch(err => {
        Toast.show(getErrorMessage(err, language.INSURANCE__ERROR_));
        const dataDisplay = {
          insurancePlan: result(
            currDataTravel,
            'dataDisplay.planHeader.header',
            '',
          ),
          insuranceType: result(
            currDataTravel,
            'dataDisplay.planHeader.subHeader',
            '',
          ),
        };
        const error = {
          errorMsg: getErrorMessage(
            err,
            result(
              err,
              'data.responseCode',
              language.ERROR_MESSAGE__UNKNOWN_ERROR,
            ),
          ),
        };
        const dataDisplayHeader = {
          errorMsg: language.GENERIC__ERROR_MESSAGE,
        };
        dispatch(actionCreators.hideSpinner());
        const params = {
          status: 400,
          error,
          dataDisplayHeader,
          dataDisplay,
          NoRef: transRefNum,
        };
        dispatch(
          StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({routeName: 'HomeScreen'}),
              NavigationActions.navigate({routeName: 'TravelResult', params}),
            ],
          }),
        );
      });
  };
}

export function TravelPay() {
  return (dispatch, getState) => {
    const state = getState();
    const response = result(
      state,
      'insuranceDataTravel.DATATRAVEL.res.data',
      {},
    );
    const NoVA = result(response, 'NoVA', '');
    dispatch(actionCreators.showSpinner());
    return api
      .getbillerConfig(dispatch)
      .then(res => {
        const databiller = result(res, 'data.billerList', []);
        const biller = filter(databiller, {name: 'Virtual Account'});
        const billerData = result(biller, '0', {});
        dispatch(actionCreators.clearParty());
        dispatch(actionCreators.clearDataTravel());
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
          }),
        );
        dispatch(actionCreators.showSpinner());
        dispatch(getAmountForGenericBillerTypeOne(NoVA, billerData));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(() => {
        dispatch(actionCreators.clearParty());
        dispatch(actionCreators.clearDataTravel());
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function addParty(values) {
  return (dispatch, getState) => {
    const state = getState();
    const currParty = result(state, 'insuranceAddParty', {});
    const val = result(values, 'values', {});
    const index = result(values, 'index', '');
    const gender = result(val, 'Gender', '');
    const status = result(val, 'Status', '');
    const idType = result(val, 'IdType', '');
    const statusList = getDropDownList(
      result(
        state,
        'insuranceTravel.TravelInsurance.dropDownLists.statusInsuredJson',
        [],
      ),
    );
    const genderList = getDropDownList(
      result(
        state,
        'insuranceTravel.TravelInsurance.dropDownLists.genderJson',
        [],
      ),
    );
    const idTypeList = getDropDownList(
      result(
        state,
        'insuranceTravel.TravelInsurance.dropDownLists.idTypeJson',
        [],
      ),
    );
    const newGender = filter(genderList, {
      display: typeof gender === 'object' ? gender.display : gender,
    });
    const newStatus = filter(statusList, {
      display: typeof status === 'object' ? status.display : status,
    });
    const newIdType = filter(idTypeList, {
      display: typeof idType === 'object' ? idType.display : idType,
    });
    const wrappedInfo = {
      CustName: result(val, 'CustName', ''),
      InsuredIdNo: result(val, 'InsuredIdNo', ''),
      DateOfBirth: result(val, 'DateOfBirth', ''),
      Gender: newGender[0],
      Status: newStatus[0],
      HandPhone: result(val, 'HandPhone', ''),
      PhoneNo: result(val, 'PhoneNo', ''),
      Email: result(val, 'Email', ''),
      CustAddress: result(val, 'CustAddress', ''),
      City: result(val, 'City', ''),
      ZipCode: result(val, 'ZipCode', ''),
      IdType: newIdType[0].val,
      isFilled: true,
    };
    dispatch(
      actionCreators.addParty({...currParty, [`${index}`]: wrappedInfo}),
    );
    const currData = result(state, 'insuranceDataTravel', {});
    const DATATRAVEL = result(currData, 'DATATRAVEL', {});
    const dataDisplay = result(DATATRAVEL, 'dataDisplay', {});
    const currInsuredHeader = result(dataDisplay, 'insuredHeader', {});
    const currSubHeader = result(currInsuredHeader, 'subHeader', {});
    const insuredHeader = {
      header: language.TRAVEL_INSURANCE__INSURED,
      subHeader: {
        ...currSubHeader,
        [`${index === 'Insured' ? 0 : index}`]: result(val, 'CustName', ''),
      },
      func: () => {
        dispatch(TravelCustomer());
      },
    };
    const newDataTravel = {
      ...DATATRAVEL,
      dataDisplay: {
        ...dataDisplay,
        insuredHeader: {
          ...currInsuredHeader,
          ...insuredHeader,
        },
      },
    };
    dispatch(
      actionCreators.setDataTravel({...currData, DATATRAVEL: newDataTravel}),
    );
    dispatch(NavigationActions.navigate({routeName: 'TravelCustomer'}));
  };
}

export function addSize() {
  return (dispatch, getState) => {
    const state = getState();
    const currParty = result(state, 'insuranceAddParty', '');
    const size = currParty.size + 1;
    dispatch(
      actionCreators.addParty({
        ...currParty,
        [`${size}`]: {isFilled: false, isInsuredFlag: 0},
        size,
      }),
    );
    dispatch(editDetail(size));
  };
}

export function editDetail(index) {
  return (dispatch, getState) => {
    const state = getState();
    const isInsured = index === 'Insured';
    const statusList = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.statusInsuredJson',
      [],
    );
    const genderList = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.genderJson',
      [],
    );
    const idTypeList = result(
      state,
      'insuranceTravel.TravelInsurance.dropDownLists.idTypeJson',
      [],
    );
    dispatch(destroy('travelCustomer'));
    const retStatusList = filter(statusList, function (o) {
      const trueInsured = isInsured && o.code === 'Insured';
      if (trueInsured) {
        return o;
      } else if (!isInsured && o.code !== 'Insured') {
        return o;
      }
    });
    dispatch(
      NavigationActions.navigate({
        routeName: 'TravelCustomerForm',
        params: {
          index,
          isInsured,
          idTypeList,
          genderList,
          statusList: retStatusList,
        },
      }),
    );
  };
}

export function deleteParty(index) {
  return (dispatch, getState) => {
    const state = getState();
    const currPartyData = result(state, 'insuranceAddParty', {});
    const size = result(currPartyData, 'size', '');
    let storedData = {};
    forEach(currPartyData, (object, k) => {
      const newObject = k === 'size' ? size - 1 : object;
      const key = parseInt(k) > index ? parseInt(k) - 1 : k;
      if (k !== index) {
        storedData = {...storedData, [`${key}`]: newObject};
      }
    });
    dispatch(actionCreators.addParty({...storedData}));
  };
}

export const goToTnC = planType => (dispatch, getState) => {
  const state = getState();
  const links = result(state, 'config.attention', {});
  const tncURI = {
    Domestic: result(links, 'urlSimobiTnCTravelInsuranceDomestic', ''), // to do
    Overseas: result(links, 'urlSimobiTnCTravelInsuranceOverseas', ''), // to do
  };
  const url = result(tncURI, planType, '');
  dispatch(
    NavigationActions.navigate({
      routeName: 'TravelInsuranceTnC',
      params: {url},
    }),
  );
};

export function insuranceLoginProduct() {
  return dispatch => {
    dispatch(actionCreators.clearParty());
    // dispatch(actionCreators.clearDataTravel());
    dispatch(actionCreators.showSpinner());
    api
      .getTravelInsurance(dispatch)
      .then(response => {
        const TravelInsurance = result(response, 'data', {});
        dispatch(actionCreators.setInsuranceTravel({TravelInsurance}));
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.INSURANCE_ERROR_DATA),
          Toast.LONG,
        );
      });
    api
      .getPAInsurance(dispatch)
      .then(response => {
        const PAInsurance = result(response, 'data', {});
        dispatch(actionCreators.setInsurancePA({PAInsurance}));
        dispatch(actionCreators.hideSpinner());
      })
      .catch(err => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(
          getErrorMessage(err, language.INSURANCE_ERROR_DATA),
          Toast.LONG,
        );
      });
    storeAction({}, 0);
    storeAction({}, 1);
    dispatch(NavigationActions.navigate({routeName: 'Insurance'}));
  };
}
