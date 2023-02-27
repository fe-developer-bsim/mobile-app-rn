import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {Toast} from '../../utils/RNHelpers.util.js';
import {destroy, change} from 'redux-form';
import moment from 'moment';
import forEach from 'lodash/forEach';
import {getErrorMessage} from '../../utils/transformer.util';
import {prepareSaveBooking, payloadFareDetail, prepareSavePassenger} from '../../utils/middleware.util';
import {language} from '../../config/language';
import {populateConfigData, refreshStorageNew, inquirySimasPoin} from './common.thunks';
import {prepareGoDashboard, initStoreWithTransactionDetails} from './onboarding.thunks';
import startsWith from 'lodash/startsWith';
import * as middlewareUtils from '../../utils/middleware.util';

export function goFlight () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'FlightMain'}));
  };
}

export function setAirport (airport, navigation) {
  return (dispatch, getState) => {
    const state = getState();
    // get airport detail
    const flag = result(navigation, 'state.params.flag', '');
    const airportName = result(airport, 'AirportName', '');
    const cityName = result(airport, 'CityName', '');
    const code = result(airport, 'Code', '');

    // get origin & destination
    const originCity = result(state, 'form.FlightIndexForm.values.originCity', '');
    const destinationCity = result(state, 'form.FlightIndexForm.values.destinationCity', '');

    const codeOrigin = originCity.substring(originCity.indexOf('[') + 1,  originCity.indexOf(']'));
    const codeDestination = destinationCity.substring(destinationCity.indexOf('[') + 1, destinationCity.indexOf(']'));

    if (flag === 'origin') {
      dispatch(actionCreators.showSpinner());
      if (codeDestination === code) {
        dispatch(actionCreators.hideSpinner());
        Toast.show('Please select other city', Toast.LONG);
      } else {
        dispatch(change('FlightIndexForm', 'originCity', airportName + '/' + cityName + '[' +  code + ']'));
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSpinner());
      }
    } else if (flag === 'destination') {
      dispatch(actionCreators.showSpinner());
      if (codeOrigin === code) {
        dispatch(actionCreators.hideSpinner());
        Toast.show('Please select other city', Toast.LONG);
      } else {
        dispatch(change('FlightIndexForm', 'destinationCity',  airportName + '/' + cityName + '[' +  code + ']'));
        dispatch(NavigationActions.back());
        dispatch(actionCreators.hideSpinner());
      }
    }
  };
}

export function getFlightAvailability (adult, child, infant, inquiry) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();

    const originCity = result(state, 'form.FlightIndexForm.values.originCity', '');
    const destinationCity = result(state, 'form.FlightIndexForm.values.destinationCity', '');

    const Origin = originCity.substring(originCity.indexOf('[') + 1, originCity.indexOf(']'));
    const Destination = destinationCity.substring(destinationCity.indexOf('[') + 1, destinationCity.indexOf(']'));

    const departDateRaw = result(state, 'form.FlightIndexForm.values.departDate', '');
    const DepartDate =  departDateRaw === '' ? '' : moment(departDateRaw).format('YYYY-MM-DD');
    const arrivalDateRaw =  result(state, 'form.FlightIndexForm.values.arrivalDate', '');
    const ReturnDate  =  arrivalDateRaw === '' ? '' : moment(arrivalDateRaw).format('YYYY-MM-DD');

    const Routes = [];
    const FareType = 'LowestFare';
    const PreferredAirlines = [2, 3, 4, 5, 7, 8, 11];
    const Adult = adult === 0 ? '0' : adult.toString();
    const Child = child === 0 ? '0' : child.toString();
    const Infant = infant === 0 ? '0' : infant.toString();
    const total = parseInt(adult) + parseInt(child) + parseInt(infant);

    const contactData = {'99': result(state, 'txTravelDetail.99', {})};
    dispatch(actionCreators.saveTxTravelDetail(contactData));

    let flag = '';
    if (ReturnDate === '') {
      flag = 'oneWay';
      const flight1 = {'Origin': Origin, 'Destination': Destination, 'DepartDate': DepartDate};
      Routes.push(flight1);
      const payload = {Routes, Adult: Adult, Child: Child, Infant: Infant, FareType, PreferredAirlines};

      return api.getFlightAvailability(payload, dispatch).
        then((res) => {
          dispatch(actionCreators.hideSpinner());
          if (res.data.responseCode === '00' && res.data.getFlightAvailabilityMap[0].Flights.length > 0 && res.data.getFlightAvailabilityMap.length > 0) {
            if (inquiry === 'new') {
              dispatch(NavigationActions.navigate({routeName: 'FlightSchedule1'}));
              dispatch(actionCreators.saveFlightSchedule(res.data.getFlightAvailabilityMap));
            } else if (inquiry === 'reinquiry') {
              dispatch(actionCreators.saveFlightSchedule(res.data.getFlightAvailabilityMap));
            }
            const passenger = {Adult, Child, Infant, total, flag};
            dispatch(actionCreators.savePassenger(passenger));
          } else {
            Toast.show(language.FLIGHT__ERR_MSG1, Toast.LONG);
          }

        }).
        catch((err) => {
          Toast.show(getErrorMessage(err, language.FLIGHT__ERR_MSG1), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        });
    } else if (ReturnDate !== '') {
      flag = 'twoWay';
      const flight1 = {'Origin': Origin, 'Destination': Destination, 'DepartDate': DepartDate};
      const flight2 = {'Origin': Destination, 'Destination': Origin, 'DepartDate': ReturnDate};
      Routes.push(flight1);
      Routes.push(flight2);
      const payload = {Routes, Adult, Child, Infant, FareType, PreferredAirlines};
      return api.getFlightAvailability(payload, dispatch).
        then((res) => {
          dispatch(actionCreators.hideSpinner());
          if (res.data.responseCode === '00' && res.data.getFlightAvailabilityMap[0].Flights.length > 0 && res.data.getFlightAvailabilityMap[1].Flights.length > 0 && res.data.getFlightAvailabilityMap.length > 0) {
            if (inquiry === 'new') {
              dispatch(NavigationActions.navigate({routeName: 'FlightSchedule1'}));
              dispatch(actionCreators.saveFlightSchedule(res.data.getFlightAvailabilityMap));
            } else if (inquiry === 'reinquiry') {
              dispatch(actionCreators.saveFlightSchedule(res.data.getFlightAvailabilityMap));
            }
            const passenger = {Adult, Child, Infant, total, flag};
            dispatch(actionCreators.savePassenger(passenger));
          } else {
            Toast.show(getErrorMessage(res.data.responseMessage), Toast.LONG);
          }
        }).
        catch((err) => {
          Toast.show(getErrorMessage(err, language.FLIGHT__ERR_MSG1), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        });
    }
  };
}

export function getFareDetail (item) {
  return (dispatch, getState) => {
    const state = getState();
    const passenger = result(state, 'userPassenger', {});
    const Adult = result(passenger, 'Adult', '0');
    const Child = result(passenger, 'Child', '0');
    const Infant = result(passenger, 'Infant', '0');


    const Airline = String(result(item, 'Airline', 0));
    const isConnecting = result(item, 'IsConnecting', false);
    const isMultiClass = result(item, 'IsMultiClass', false);
    const flightObject = result(item, 'ClassObjects', []);
    const connectedObject = result(item, 'ConnectingFlights', []);

    let FlightId = '';
    let ClassId = '';
    let Fare = 0;
    let Tax = 0;
    let flightIdArray = [];
    let classIdArray = [];
    let flag = '';

    dispatch(actionCreators.saveFlightData(item));

    let payload = {};
    if (isConnecting === false && isMultiClass === false) {
      flag = 'direct';
      FlightId = result(flightObject[0], 'FlightId', '');
      ClassId = result(flightObject[0], 'Id', '');
      Fare = String(result(flightObject[0], 'Fare', ''));
      Tax = String(result(flightObject[0], 'Tax', ''));
    } else if (isConnecting ===  true && isMultiClass === true) {
      flag = 'connecting';
      forEach(connectedObject, function (value) {
        const ObjectClass = result(value, 'ClassObjects', []);
        forEach(ObjectClass, function (object) {
          flightIdArray.push(result(object, 'FlightId', ''));
          classIdArray.push(result(object, 'Id', ''));
          Fare = Fare + result(object, 'Fare', 0);
          Tax = Tax + result(object, 'Tax', 0);
        });
      });
      FlightId = flightIdArray.join('#');
      ClassId = classIdArray.join('#');
      Fare = String(Fare);
      Tax = String(Tax);
    } else if (isConnecting === true && isMultiClass === false) {
      flag = 'connecting';
      FlightId = result(flightObject[0], 'FlightId', '');
      ClassId = result(flightObject[0], 'Id', '');
      Fare = String(result(flightObject[0], 'Fare', ''));
      Tax = String(result(flightObject[0], 'Tax', ''));
    }
    payload = {Airline, Adult, Child, Infant, ClassId, FlightId, Fare, Tax};
    dispatch(actionCreators.showSpinner());
    return api.getFareDetail(payload, dispatch).
      then((res) => {
        if (res.data.responseCode === '00' && res.data.getFareDetailMap !== null) {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.navigate({routeName: 'FlightDetail', params: {data: res.data.getFareDetailMap, flag: flag}}));
        }
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.FLIGHT__ERR_MSG2), Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      });
  };
}

export function changeDate (date, flag) {
  return (dispatch, getState) => {
    const state = getState();
    const passenger = result(state, 'userPassenger', {});
    const Adult = result(passenger, 'Adult', '0');
    const Child = result(passenger, 'Child', '0');
    const Infant = result(passenger, 'Infant', '0');
    if (flag === 1) {
      dispatch(change('FlightIndexForm', 'departDate', date));
      dispatch(getFlightAvailability(Adult, Child, Infant, 'reinquiry'));
    } else if (flag === 2) {
      dispatch(change('FlightIndexForm', 'arrivalDate', date));
      dispatch(getFlightAvailability(Adult, Child, Infant, 'reinquiry'));
    }

  };
}

export function saveFareDetail (item, itemFlag) {
  return (dispatch, getState) => {
    const state = getState();
    const passenger = result(state, 'userPassenger', {});
    const Adult = result(passenger, 'Adult', '0');
    const Child = result(passenger, 'Child', '0');
    const Infant = result(passenger, 'Infant', '0');

    const Airline = String(result(item, 'Airline', 0));
    const isConnecting = result(item, 'IsConnecting', false);
    const isMultiClass = result(item, 'IsMultiClass', false);
    const flightObject = result(item, 'ClassObjects', []);
    const connectedObject = result(item, 'ConnectingFlights', []);

    let FlightId = '';
    let ClassId = '';
    let Fare = 0;
    let Tax = 0;
    let flightIdArray = [];
    let classIdArray = [];

    let payload = {};
    if (isConnecting === false && isMultiClass === false) {
      FlightId = result(flightObject[0], 'FlightId', '');
      ClassId = result(flightObject[0], 'Id', '');
      Fare = String(result(flightObject[0], 'Fare', ''));
      Tax = String(result(flightObject[0], 'Tax', '0'));
    } else if (isConnecting ===  true && isMultiClass === true) {
      forEach(connectedObject, function (value) {
        const ObjectClass = result(value, 'ClassObjects', []);
        forEach(ObjectClass, function (object) {
          flightIdArray.push(result(object, 'FlightId', ''));
          classIdArray.push(result(object, 'Id', ''));
          Fare = Fare + result(object, 'Fare', 0);
          Tax = Tax + result(object, 'Tax', 0);
        });
      });
      FlightId = flightIdArray.join('#');
      ClassId = classIdArray.join('#');
      Fare = String(Fare);
      Tax = String(Tax);
    } else if (isConnecting === true  && isMultiClass === false) {
      FlightId = result(flightObject[0], 'FlightId', '');
      ClassId = result(flightObject[0], 'Id', '');
      Fare = String(result(flightObject[0], 'Fare', ''));
      Tax = String(result(flightObject[0], 'Tax', '0'));
    }
    payload = {Airline, Adult, Child, Infant, ClassId, FlightId, Fare, Tax};
    dispatch(actionCreators.showSpinner());
    return api.getFareDetail(payload, dispatch).
      then((res) => {
        if (res.data.responseCode === '00' && res.data.getFareDetailMap !== null) {
          if (itemFlag === 1) {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.saveFareDetail1(res.data.getFareDetailMap));
          } else if (itemFlag === 2) {
            dispatch(actionCreators.hideSpinner());
            dispatch(actionCreators.saveFareDetail2(res.data.getFareDetailMap));
          }
        } else {
          Toast.show(language.FLIGHT__ERR_MSG1, Toast.LONG);
          dispatch(actionCreators.hideSpinner());

        }

      }).catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.FLIGHT__ERR_MSG1), Toast.LONG);
      });
  };

}


export function goNextPage (value) {
  return (dispatch, getState) => {
    const state = getState();
    const passenger = result(state, 'userPassenger', '');
    const flag = result(passenger, 'flag', '');

    if (flag === 'oneWay') {

      dispatch(actionCreators.saveListPlane1(value));
      dispatch(saveFareDetail(value, 1));
      dispatch(NavigationActions.navigate({routeName: 'FlightSummary'}));
    } else if (flag === 'twoWay') {
      dispatch(actionCreators.saveListPlane1(value));
      dispatch(saveFareDetail(value, 1));
      dispatch(NavigationActions.navigate({routeName: 'FlightSchedule2'}));
    }
  };
}

export function switchOriginDestination () {
  return (dispatch, getState) => {
    const state = getState();
    const originCity = result(state, 'form.FlightIndexForm.values.originCity', '');
    const destinationCity = result(state, 'form.FlightIndexForm.values.destinationCity', '');

    dispatch(change('FlightIndexForm', 'originCity', destinationCity));
    dispatch(change('FlightIndexForm', 'destinationCity', originCity));
  };
}

export function goSummaryFlight (value) {
  return (dispatch, getState) => {
    const state = getState();
    const passenger = result(state, 'userPassenger', {});
    const flag = result(passenger, 'flag', '');
    dispatch(actionCreators.saveListPlane2(value));
    dispatch(saveFareDetail(value, 2));
    if (flag === 'twoWay') {
      dispatch(NavigationActions.navigate({routeName: 'FlightSummary'}));
    }
  };
}

// Travel contact
export function txTravelContactDetail () {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(NavigationActions.navigate({routeName: 'TxTravelContact', params: {state}}));
  };
}

export function txTravelDetailList (toDetailList, hitApi) {
  return (dispatch, getState) => {
    dispatch(actionCreators.showSpinner());
    const state = getState();
    const payload = {};

    if (hitApi) {
      api.countryIso(payload, dispatch).then((res) => {
        dispatch(actionCreators.saveCountryIso(res));
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.TX_TRAVEL_FAIL_GET_COUNTRY_ISO), Toast.LONG);
      });

      api.getListPassenger(payload, dispatch).then((res) => {
        dispatch(actionCreators.saveListPassenger(res));
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        Toast.show(getErrorMessage(err, language.TX_TRAVEL_FAIL_GET_PASSENGER), Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      });

      dispatch(NavigationActions.navigate({routeName: 'TxTravelDetailList', params: {state}}));
      dispatch(actionCreators.hideSpinner());

    } else {
      return api.getListPassenger(payload, dispatch).then((res) => {
        dispatch(actionCreators.saveListPassenger(res));
        toDetailList ?
          dispatch(NavigationActions.navigate({routeName: 'TxTravelDetailList', params: {state}}))
          : null;
        dispatch(actionCreators.hideSpinner());
      }).catch((err) => {
        toDetailList ?
          dispatch(NavigationActions.navigate({routeName: 'TxTravelDetailList', params: {state}}))
          : null;
        Toast.show(getErrorMessage(err, language.TX_TRAVEL_FAIL_GET_PASSENGER), Toast.LONG);
        dispatch(actionCreators.hideSpinner());
      });
    }
  };
}

export function txTravelDetail (index, type, isInternational) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(NavigationActions.navigate({routeName: 'TxTravelDetail', params: {index, type, isInternational, state}}));
  };
}

export function txTravelSeat () {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'TxTravelSeat'}));
  };
}

export function TxTravelHistory (tipe) {
  return (dispatch, getState) => {
    const state = getState();
    const payload = {};
    dispatch(actionCreators.showSpinner());
    return api.getListPassenger(payload, dispatch).then((res) => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.saveListPassenger(res));
      dispatch(NavigationActions.navigate({routeName: 'TxTravelHistory', params: {res: res, tipe: tipe, state}}));
    }).catch((err) => {
      dispatch(NavigationActions.navigate({routeName: 'TxTravelHistory', params: {state}}));
      Toast.show(getErrorMessage(err, language.TX_TRAVEL_FAIL_GET_PASSENGER), Toast.LONG);
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function fareDetail () {
  return (dispatch, getState) => {
    const state = getState();
    const userPassenger = result(state, 'userPassenger', {});
    const flagWay = result(userPassenger, 'flag', '');
    const passegerDetail = result(state, 'txTravelDetail', {});
    const flightDataDetail1 = result(state, 'flightDataDetail1', {});
    const flightFareDetail1 = result(state, 'flightFareDetail1', {});
    const payload1 = payloadFareDetail(flightDataDetail1, userPassenger);
    const flightData1 = prepareSaveBooking(passegerDetail, flightDataDetail1, 'departure', state);
    const price1 = parseInt(result(flightFareDetail1, 'Total', 0));
    let flightFareDetail2 = '';
    let flightDataDetail2 = '';
    let payload2 = '';
    let flightData2 = '';
    let price2 = '';

    if (flagWay !== 'oneWay') {
      flightFareDetail2 = result(state, 'flightFareDetail2', {});
      flightDataDetail2 = result(state, 'flightDataDetail2', {});
      payload2 = payloadFareDetail(flightDataDetail2, userPassenger);
      flightData2 = prepareSaveBooking(passegerDetail, flightDataDetail2, 'arrival', state);
      price2 = parseInt(result(flightFareDetail2, 'Total', 0));
    }

    dispatch(actionCreators.showSpinner());

    return api.getFareDetail(payload1, dispatch).then((res) => {
      const newPrice1 = result(res, 'data.getFareDetailMap.Total');
      if (flagWay === 'oneWay') {
        dispatch(actionCreators.hideSpinner());
        if (res.data.responseCode === '00' && res.data.getFareDetailMap !== null) {
          dispatch(actionCreators.saveFareDetail1(res.data.getFareDetailMap));
          let flightData = {...flightData1};
          flightData = {...flightData, 'isDifferentAirlines': false};
          const hideAlert = () => {
            dispatch(actionCreators.hideSinarmasAlert());
            dispatch(NavigationActions.navigate({routeName: 'EmallLogin', params: {flightData, type: 'tx'}}));
          };
          const sinarmasModalOptions = {
            heading1: language.TX_TRAVEL_TIKET_PRICE_CHANGE_TITLE,
            text: language.TX_TRAVEL_TIKET_PRICE_CHANGE_TEXT,
            button1: 'ok',
            onButton1Press: hideAlert,
            button1Color: 'black'
          };
          if (price1 !== newPrice1) {
            dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
          } else {
            dispatch(NavigationActions.navigate({routeName: 'EmallLogin', params: {flightData, type: 'tx'}}));
          }
        }
      } else {
        return api.getFareDetail(payload2, dispatch).then((res2) => {
          const newPrice2 = result(res2, 'data.getFareDetailMap.Total');
          const segment1 = result(flightData1, 'Segments', []);
          const segment2 = result(flightData2, 'Segments', []);
          let Segments = segment1;
          forEach(segment2, function (val) {
            Segments = [...Segments, val];
          });
          let flightData = {...flightData1, 'Segments': Segments};
          const isDifferentAirlines = parseInt(result(segment1[0], 'Airline', 0)) === parseInt(result(segment2[0], 'Airline', 0));
          flightData = {...flightData, 'isDifferentAirlines': !isDifferentAirlines};
          if (res2.data.responseCode === '00' && res2.data.getFareDetailMap !== null) {
            dispatch(actionCreators.saveFareDetail2(res2.data.getFareDetailMap));
            const hideAlert = () => {
              dispatch(actionCreators.hideSinarmasAlert());
              dispatch(NavigationActions.navigate({routeName: 'EmallLogin', params: {flightData, type: 'tx'}}));
            };
            const sinarmasModalOptions = {
              heading1: language.TX_TRAVEL_TIKET_PRICE_CHANGE_TITLE,
              text: language.TX_TRAVEL_TIKET_PRICE_CHANGE_TEXT,
              button1: 'ok',
              onButton1Press: hideAlert,
              button1Color: 'black'
            };
            dispatch(actionCreators.hideSpinner());
            if ((price1 !== newPrice1) || (price2 !== newPrice2)) {
              dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
            } else {
              dispatch(NavigationActions.navigate({routeName: 'EmallLogin', params: {flightData, type: 'tx'}}));
            }
          }
        }).catch((err) => {
          Toast.show(getErrorMessage(err, language.TX_TRAVEL_NO_FLIGHT_AVAILABLE), Toast.LONG);
          dispatch(actionCreators.hideSpinner());
        });
      }
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.TX_TRAVEL_NO_FLIGHT_AVAILABLE), Toast.LONG);
      dispatch(actionCreators.hideSpinner());
    });
  };
}


export function txTravelPassenger (data, tipe) {
  return (dispatch, getState) => {
    const state = getState();
    const payload = prepareSavePassenger(data, tipe, state);
    return api.addListPassenger(payload, dispatch).then(() => {
    }).catch((err) => {
      Toast.show(getErrorMessage(err, language.TX_TRAVEL_FAIL_ADD_PASSENGER), Toast.LONG);
      dispatch(actionCreators.hideSpinner());
    });
  };
}

export function changeCountryIso (data) {
  return (dispatch) => {
    const nationality = data.name;
    dispatch(change('txTravelDetail', 'nationality', nationality));
    dispatch(NavigationActions.back());
  };
}

export function changeCOI (data) {
  return (dispatch) => {
    const nationality = data.name;
    dispatch(change('txTravelDetail', 'coi', nationality));
    dispatch(NavigationActions.back());
  };
}

export function goTx (emallData) {
  return (dispatch, getState) => {
    const state = getState();
    const flightData = result(emallData, 'flightData', {});
    const fareDepart = result(state, 'flightFareDetail1', {});
    const fareReturn = result(state, 'flightFareDetail2', {});
    const totalDepart = result(fareDepart, 'Total', '');
    const totalReturn = result(fareReturn, 'Total', '');
    const totalAmount = totalDepart + totalReturn;
    const payload = flightData;
    const accountList = result(state, 'accounts', []);
    const navigationKeys = result(getState(), 'promos.navigateOnPushClicked', false);
    const cifCode = state.user.profile.customer.cifCode;
    dispatch(refreshStorageNew());
    dispatch(inquirySimasPoin()),
    dispatch(destroy('loginWithUsernamePassword'));
    dispatch(destroy('loginAccountForm'));
    dispatch(destroy('easyPinCreationForm'));
    dispatch(destroy('easyPinCreationConfirmForm'));
    dispatch(initStoreWithTransactionDetails());
    if (navigationKeys.length) {
      forEach(navigationKeys, (navigateKey) => dispatch(NavigationActions.navigate({routeName: navigateKey})));
      dispatch(actionCreators.changeNotificationRoute([]));
    }
    return api.getFlightReserv(payload, dispatch).then((res) => {
      const reservData = result(res, 'data', {});
      if (startsWith(cifCode, 'NK')) {
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Landing'}),
          ]
        }));
        dispatch(NavigationActions.back());
        dispatch(NavigationActions.navigate({routeName: 'EmallRoutes', params: {...emallData, reservData, totalAmount}}));
      } else {
        if (accountList.length === 1 && find(accountList, {accountType: 'emoneyAccount'})) {
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
            ]
          }));
          dispatch(NavigationActions.back());
          dispatch(NavigationActions.navigate({routeName: 'EmallRoutes', params: {...emallData, reservData, totalAmount}}));
        } else {
          dispatch(actionCreators.hideSpinner());
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Landing'}),
            ]
          }));
          dispatch(NavigationActions.back());
          dispatch(NavigationActions.navigate({routeName: 'EmallRoutes', params: {...emallData, reservData, totalAmount}}));
        }
      }
    }).catch((err) => {
      dispatch(actionCreators.hideSpinner());
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__FLIGHT_RESERV), Toast.LONG);
    });
  };
}

export function goTxConfirm (accData, emallData) {
  return (dispatch, getState) => {
    const state = getState();
    const fareDepart = result(state, 'flightFareDetail1', {});
    const fareReturn = result(state, 'flightFareDetail2', {});
    const totalDepart = result(fareDepart, 'Total', '');
    const totalReturn = result(fareReturn, 'Total', '');
    const availBlc = result(accData, 'balances.availableBalance', '');
    const availBalance = parseInt(availBlc);
    const totalAmt = totalDepart + totalReturn;
    const totalAmount = parseInt(totalAmt);
    if (availBalance > totalAmount) {
      dispatch(NavigationActions.navigate({routeName: 'EmallTx', params: {accData, emallData}}));
    } else {
      Toast.show(language.CGV__TOAST_BALANCE, Toast.LONG);
    }
  };
}

export function goTxConfirmSimas (isUseSimas, emallData) {
  return (dispatch, getState) => {
    const state = getState();
    const fareDepart = result(state, 'flightFareDetail1', {});
    const fareReturn = result(state, 'flightFareDetail2', {});
    const totalDepart = result(fareDepart, 'Total', '');
    const totalReturn = result(fareReturn, 'Total', '');
    const totalAmt = totalDepart + totalReturn;
    const totalAmount = parseInt(totalAmt);
    const simasPoin = result(state, 'simasPoin', {});
    const availBlc = result(simasPoin, 'simasPoin.data.total_point', '');
    const availBalance = parseInt(availBlc);
    if (availBalance > totalAmount) {
      dispatch(NavigationActions.navigate({routeName: 'EmallTx', params: {isUseSimas, emallData}}));
    } else {
      Toast.show(language.CGV__TOAST_BALANCE, Toast.LONG);
    }
  };
}

export function getFlightResult (flightData, accData, reservData, isUseSimas, segmentsReturn) {
  return (dispatch, getState) => {
    const onSubmit = () => {
      const PnrId = result(reservData, 'reservationMap.PnrId', '');
      const CallbackUri = result(flightData, 'CallbackUri', '');
      const newState = getState();
      const easyPin = result(newState, 'form.AuthenticateForm.values.easypin', '');
      const transRefNum = result(newState, 'transRefNum', '');
      const additional = ['TXID', 'sessionCode', 'E2EE_RANDOM', 'tokenClient', 'tokenServer', 'deviceParam', 'lang', 'ipassport'];
      const payload = {transRefNum, easyPin, PnrId, CallbackUri, isUseSimas};
      dispatch(actionCreators.showSpinner());
      return api.getFlightPayment(payload, additional, dispatch).then((res) => {
        dispatch(actionCreators.hideSpinner());
        const resData = result(res, 'data', {});
        const successData = 'success';
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'HomeScreen'}),
            NavigationActions.navigate({routeName: 'EmallTxStatus', params: {flightData, accData, resData, successData, isUseSimas, segmentsReturn}}),
          ]
        }));
      }).catch((err) => {
        const resData = result(err, 'data', {});
        const successData = 'failed';
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'HomeScreen'}),
            NavigationActions.navigate({routeName: 'EmallTxStatus', params: {flightData, accData, resData, successData, isUseSimas, segmentsReturn}}),
          ]
        }));
      });
    };

    dispatch(populateConfigData()).
      then(() => {
        const payload = middlewareUtils.prepateTransRefNumPayload('eCommerce', false);
        dispatch(actionCreators.showSpinner());
        return api.getTransRefNum({...payload, smsPriority: false}, dispatch);
      }).
      then((res) => {
        dispatch(actionCreators.saveTransRefNum(res.data.transRefNum));
        dispatch(actionCreators.hideSpinner());
        dispatch(NavigationActions.navigate({routeName: 'EmallEasyPin', params: {isEasypin: true, onSubmit}}));
      }).
      catch((err) => {
        dispatch(actionCreators.hideSpinner());
        Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__COULD_NOT_SEND_SMS_VERIFICATION), Toast.LONG);
      });
  };
}

export function getConfirmInfo (flightData, accData, reservData, segmentsReturn) {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'EmallTxInfo', params: {flightData, accData, reservData, segmentsReturn}}));
  };
}

export function getTxComplete () {
  return (dispatch) => {
    dispatch(actionCreators.clearTransRefNum());
    dispatch(prepareGoDashboard());
  };
}
