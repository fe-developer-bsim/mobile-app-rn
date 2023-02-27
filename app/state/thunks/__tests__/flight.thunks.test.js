jest.mock('../../../utils/api.util', () => ({
  goFlight: jest.fn(() => Promise.resolve()),
  setAirport: jest.fn(() => Promise.resolve()),
  getFlightAvailability: jest.fn(() => Promise.resolve()),
  getFareDetail: jest.fn(() => Promise.resolve()),
  changeDate: jest.fn(() => Promise.resolve()),
  saveFareDetail: jest.fn(() => Promise.resolve()),
  goNextPage: jest.fn(() => Promise.resolve()),
  switchOriginDestination: jest.fn(() => Promise.resolve()),
  goSummaryFlight: jest.fn(() => Promise.resolve()),
  txTravelContactDetail: jest.fn(() => Promise.resolve()),

}));
jest.mock('../../actions/index.actions', () => ({
  showSpinner: jest.fn(() => Promise.resolve()),
  hideSpinner: jest.fn(() => Promise.resolve()),
  saveTransRefNum: jest.fn(() => Promise.resolve()),
  clearTransRefNum: jest.fn(() => Promise.resolve()),
}));

import * as thunks from '../flight.thunks';
import apiUtils from '../../../utils/api.util';
import * as actionCreators from '../../actions/index.actions';
import {Toast} from '../../../utils/RNHelpers.util';
import * as reduxForm from 'redux-form';
import {NavigationActions} from 'react-navigation';

describe('flightThunks', () => {
  const mockDispatch = jest.fn();
  const getState = () => {};
  const spy = jest.spyOn(Toast, 'show');
  reduxForm.destroy = jest.fn();
  reduxForm.change = jest.fn();
  NavigationActions.reset = jest.fn();
  NavigationActions.navigate = jest.fn();
  NavigationActions.back = jest.fn();

  it('goFlight: confirm navigate to index flight', () => {
    apiUtils.goFlight = jest.fn(() => Promise.resolve());
    thunks.goFlight()(mockDispatch, getState);
    expect(NavigationActions.navigate).toHaveBeenCalled();
  });

  xit('setAirport: failed change Flight field', () => {
    const navigation = {state: {params: {flag: 'origin'}}};
    apiUtils.setAirport = jest.fn(() => Promise.resolve());
    expect(actionCreators.showSpinner).toHaveBeenCalled();

    thunks.setAirport(navigation.state.params.flag === 'origin')(mockDispatch, getState);
    expect(actionCreators.hideSpinner).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();

  });

  
  xit('setAirport: success change Flight field', () => {
    const navigation = {state: {params: {flag: 'origin'}}};
    apiUtils.setAirport = jest.fn(() => Promise.resolve());
    thunks.setAirport(navigation.state.params.flag === 'origin')(mockDispatch, getState).then(() => {
      expect(actionCreators.showSpinner).toHaveBeenCalled();
      expect(reduxForm.change).toHaveBeenCalled();
      expect(NavigationActions.back).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  xit('getFlightAvailability: confirm to get return from backend', () => {
    apiUtils.getFlightAvailability = jest.fn(() => Promise.resolve());
    expect(actionCreators.showSpinner).toHaveBeenCalled();
    thunks.getFlightAvailability()(mockDispatch, getState);
    return apiUtils.getFlightAvailability().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
      expect(actionCreators.saveFlightSchedule).toHaveBeenCalled();
      expect(actionCreators.savePassenger).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  xit('changeDate: succcess change date without reinputed', () => {
    apiUtils.changeDate = jest.fn(() => Promise.resolve());
    expect(actionCreators.showSpinner).toHaveBeenCalled();
    thunks.change()(mockDispatch, getState).then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(reduxForm.change).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  xit('saveFareDetail: success save fare detail to reducer first way', () => {
    apiUtils.saveFareDetail = jest.fn(() => Promise.resolve());
    expect(actionCreators.showSpinner).toHaveBeenCalled();
    return apiUtils.saveFareDetail().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveFareDetail1).toHaveBeenCalled();    
    });
  });

  xit('saveFareDetail: success save fare detail to reducer second way', () => {
    apiUtils.saveFareDetail = jest.fn(() => Promise.resolve());
    expect(actionCreators.showSpinner).toHaveBeenCalled();
    return apiUtils.saveFareDetail().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveFareDetail1).toHaveBeenCalled();
    });
  });
  

});
