import React from 'react';
import PropTypes from 'prop-types';
import TxTravelDetail from '../../components/FlightJourney/TxTravelDetail.component';
import {upperCase, checkContact} from '../../utils/transformer.util';
import {connect} from 'react-redux';
import {reduxForm, destroy} from 'redux-form';
import {validateRequiredFields, maxCharacter, validateEmail, validateIdNumber, validateName, validateBirthDate} from '../../utils/validator.util';
import * as actionCreators from '../../state/actions/index.actions.js';
import {result} from 'lodash';
import {NavigationActions} from 'react-navigation';
import {txTravelPassenger, TxTravelHistory} from '../../state/thunks/flight.thunks';

const txTravelDetail = {
  form: 'txTravelDetail',
  destroyOnUnmount: false,
  validate: (values, props) => {
    const tipe = upperCase(result(props, 'navigation.state.params.type', ''));
    const isInternational = result(props, 'navigation.state.params.isInternational', false);
    let errors = {};
    let defaultValdiation = {
      firstName: validateName(values.firstName),
      lastName: validateName(values.lastName),
    };
    if (tipe === 'CHILD') { // check adult or child
      defaultValdiation = {
        ...defaultValdiation,
        birthDate: validateBirthDate('CHILD', values.birthDate),
      };
      if (isInternational) {
        defaultValdiation = {
          ...defaultValdiation,
          passportNumber: maxCharacter(20, values.passportNumber),
        };
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['nationality', 'firstName', 'lastName', 'tittle', 'passportNumber', 'coi', 'expiryPassport']),
        };
      } else {
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['nationality', 'firstName', 'lastName', 'tittle']),
        };
      }
    } else if (tipe === 'ADULT') {
      defaultValdiation = {
        ...defaultValdiation,
        phone: maxCharacter(20, values.phone),
        homePhone: maxCharacter(20, values.homePhone),
        idNumber: validateIdNumber(values.idNumber),
        email: validateEmail(values.email),
        birthDate: validateBirthDate('ADULT', values.birthDate),
      };
      if (isInternational) {
        defaultValdiation = {
          ...defaultValdiation,
          passportNumber: maxCharacter(20, values.passportNumber),
        };
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['nationality', 'firstName', 'lastName', 'tittle', 'passportNumber', 'coi', 'expiryPassport']),
        };
      } else {
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['nationality', 'firstName', 'lastName', 'tittle', 'phone', 'homePhone']),
        };
      }
    } else if (tipe === 'INFANT') {
      defaultValdiation = {
        ...defaultValdiation,
        birthDate: validateBirthDate('INFANT', values.birthDate),
      };
      if (isInternational) {
        defaultValdiation = {
          ...defaultValdiation,
          passportNumber: maxCharacter(20, values.passportNumber),
        };
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['nationality', 'firstName', 'lastName', 'tittle', 'passportNumber', 'coi', 'expiryPassport']),
        };
      } else {
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['nationality', 'firstName', 'lastName', 'tittle']),
        };
      }
    } else if (tipe === 'CONTACT') {
      if (isInternational)
        errors = {
          phone: maxCharacter(20, values.phone),
          homePhone: maxCharacter(20, values.homePhone),
          email: validateEmail(values.email),
          ...defaultValdiation,
          ...validateRequiredFields(values, ['firstName', 'lastName', 'tittle', 'phone', 'homePhone']),
        };
      else
        errors = {
          ...defaultValdiation,
          ...validateRequiredFields(values, ['firstName', 'lastName', 'tittle', 'phone', 'homePhone']),
        };
    }
    return {
      ...errors
    };
  },
  onSubmit: (values, dispatch) => dispatch(NavigationActions.back()),
};

const DecoratedTxTravelDetail = reduxForm(txTravelDetail)(TxTravelDetail);

const mapDispatchToProps = (dispatch) => ({
  goToCountryIso: (tipe) => {
    dispatch(NavigationActions.navigate({routeName: 'TxTravelListCountryIso', params: {tipe: tipe}}));
  },
  dispatch: (action) => dispatch(action),
  ToTravelHistory: (tipe) => () => {
    dispatch(TxTravelHistory(tipe));
  },
  showSpin: () => {
    dispatch(actionCreators.showSpinner());
  },
  hideSpin: () => {
    dispatch(actionCreators.hideSpinner());
  }
});

const mapStateToProps = (state, props) => ({
  formValues: result(state, 'form.txTravelDetail.values', {}),
  txTravelDetail: result(state, 'txTravelDetail', {}),
  index: result(props, 'navigation.state.params.index', ''),
  initialValues: result(state, 'txTravelDetail.' + [`${String(result(props, 'navigation.state.params.index', ''))}`] + '.formValues', {})
});

class TxTravelDetailPage extends React.Component {
  static propTypes = {
    onOfferClick: PropTypes.func,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    txTravelDetail: PropTypes.object,
    saveDetail: PropTypes.func,
    initialValues: PropTypes.object,
    ToTravelHistory: PropTypes.func,
    goToCountryIso: PropTypes.func,
    showSpin: PropTypes.func,
    hideSpin: PropTypes.func,
  }

  saveDetail = (disable) => {
    const {dispatch, formValues, txTravelDetail, navigation} = this.props;
    const params = result(navigation, 'state.params', {});
    const index = result(params, 'index', '-');
    const setAsContact = result(formValues, 'setAsContact', false);
    const dataContact = formValues;
    const tipe = result(params, 'type', '-');

    let dataForm =
    setAsContact ?
      {
        ...txTravelDetail,
        [`${index}`]: {formValues, 'type': tipe, 'disable': disable},
        ['99']: {formValues: {...dataContact, 'setAsContact': false}, 'type': 'contact', 'disable': disable}
      }
      : {
        ...txTravelDetail,
        [`${index}`]: {formValues, 'type': tipe, 'disable': disable}
      };
    tipe !== 'contact' ? dispatch(txTravelPassenger(formValues, tipe)) : null;
    dispatch(actionCreators.saveTxTravelDetail(dataForm));
    dispatch(this.destroyTxTravelDetail);
  };

  destroyTxTravelDetail = () => {
    const {dispatch} = this.props;
    dispatch(destroy('txTravelDetail'));
  };

  render () {
    const {navigation = {}, initialValues, dispatch, ToTravelHistory, goToCountryIso, showSpin, hideSpin} = this.props;
    const dataContact = result(navigation, 'state.params.state.txTravelDetail');
    const listPassenger = result(navigation, 'state.params.state.txTravelListPassenger');
    const isContact = checkContact(dataContact);
    return <DecoratedTxTravelDetail navigation={navigation} saveDetail={this.saveDetail} initialValues={initialValues} dispatch={dispatch}
      destroyTxTravelDetail={this.destroyTxTravelDetail} isContact={isContact} listPassenger={listPassenger} ToTravelHistory={ToTravelHistory}
      goToCountryIso={goToCountryIso} showSpin={showSpin} hideSpin={hideSpin}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TxTravelDetailPage);
