import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AlfacartShippingMethod from '../../components/OnboardingJourney/AlfacartShippingMethod.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import find from 'lodash/find';
import {goToShipping, goToFormFillAddres, listaddress, checkoutStockALfa, editAddressAlfa, selectAddressShippingAlfa, setDefaultAlfaAddress, deleteAlfaAddress, oncloseTimeSlot, selectAddressShippingCMI} from '../../state/thunks/digitalStore.thunks';
import {NavigationActions} from 'react-navigation';
import {reduxForm, destroy} from 'redux-form';


const formConfig = {
  form: 'alfaShipmentForm',
  destroyOnUnmount: false,
  onSubmit: () => {
  },
};


const mapStateToProps = (state) =>  {
  const isStateEmpty = isEmpty(state.appInitKeys);
  const introductionTriggered = result(state, 'introductionTriggered', false);
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  const billerMenuOrderRevamp = result(state, 'config.billerMenuOrderRevamp', []);
  const billerConfig = result(state, 'billerConfig', {});
  const emoney = result(state, 'emoney', {});
  const currentMerchant = result(state, 'currentMerchant', []);
  return {
    isLockedDevice: Boolean(state.appInitKeys && state.appInitKeys.username && state.appInitKeys.tokenClient && state.appInitKeys.tokenServer),
    currentLanguage: state.currentLanguage,
    nav: state.nav,
    isStateEmpty,
    introductionTriggered,
    state,
    clickedOffer,
    egiftList: state.egiftList,
    simasPoin: state.simasPoin,
    isDeeplinkExist: state.isDeeplinkExist,
    billerMenuOrderRevamp,
    billerConfig,
    emoney,
    currentMerchant,
    listAllProductData: state.listAllProduct,
    categoryData: state.category,
    alfacartShipmentAddress: result(state, 'alfacartShipmentAddress', []),
    checkTimeSlot: result(state, 'form.alfaShipmentForm.values.datePicker', ''),
    initialTimeDate: result(state, 'form.alfaCheckoutForm.values.timeSelection.firstDate', ''),
    lastTimeDate: result(state, 'form.alfaCheckoutForm.values.timeSelection.lastDate', ''),
    optionTimeSlot: result(state, 'form.alfaCheckoutForm.values.timeSelection.timeSlotPick', []),
    checkAlfaShipment1: Boolean(isEmpty(result(state, 'form.alfaShipmentForm.values.datePicker', ''))),
    checkAlfaShipment2: Boolean(isEmpty(result(state, 'form.alfaShipmentForm.values.timeSlot', ''))),
    checkAlfaShipment3: Boolean(isEmpty(result(state, 'form.alfaShipmentForm.values.recepientName', ''))),
    alfaShowTimeSlot: result(state, 'alfaShowTimeSlot', false)
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToShipping: () => {
    dispatch(goToShipping());
  },
  goToFormFillAddres: () => {
    dispatch(goToFormFillAddres());
  },
  listaddress: () => {
    dispatch(listaddress('alfacart'));
  },
  connfirmButton: (values) => {
    dispatch(checkoutStockALfa(values));
  },
  editAddress: (value) => () => {
    dispatch(editAddressAlfa(value));
  },
  deleteAddress: (value) => () => {
    dispatch(deleteAlfaAddress(value));
  },
  defaultAlfaAddress: (value) => () => {
    dispatch(setDefaultAlfaAddress(value));
  },
  goTosearchStore: () => {
    dispatch(NavigationActions.navigate({routeName: 'FormFillAlfaNewStore'}));
    dispatch(destroy('alfaStoreSearchForm'));
  },
  selectAddressShip: (value) => {
    dispatch(selectAddressShippingAlfa(value));
  },
  onCloseSLotTime: () => {
    dispatch(oncloseTimeSlot());
  },
  selectAddressCMI: (value) => {
    dispatch(selectAddressShippingCMI(value));
  }
});
const DecoratedForm = reduxForm(formConfig)(AlfacartShippingMethod);
const ConnectedAlfacartShippingMethodPage = connect(mapStateToProps, mapDispatchToProps)(DecoratedForm);

class AlfacartShippingMethodPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    isStateEmpty: PropTypes.bool,
    nav: PropTypes.object,
    goToDetail: PropTypes.func,
    goToAlfacart: PropTypes.func,
    listProduct: PropTypes.func,
    categoryData: PropTypes.array,
    detailCategory: PropTypes.func,
    listAllProductData: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    seeAllCategory: PropTypes.func,
    goToShipping: PropTypes.func,
    goToFormFillAddres: PropTypes.func,
    listaddress: PropTypes.func,
    alfacartShipmentAddress: PropTypes.array,
    connfirmButton: PropTypes.func,
    checkAlfaShipment1: PropTypes.bool,
    checkAlfaShipment2: PropTypes.bool,
    checkAlfaShipment3: PropTypes.bool,
    editAddress: PropTypes.func,
    defaultAlfaAddress: PropTypes.func,
    deleteAddress: PropTypes.func,
    goTosearchStore: PropTypes.func,
    alfaShowTimeSlot: PropTypes.bool,
    checkTimeSlot: PropTypes.string,
    initialTimeDate: PropTypes.string,
    lastTimeDate: PropTypes.string,
    optionTimeSlot: PropTypes.array,
    selectAddressShip: PropTypes.func,
    onCloseSLotTime: PropTypes.func,
    getDefaultAlfaAddress: PropTypes.func,
    currentMerchant: PropTypes.array,
    selectAddressCMI: PropTypes.func,
    

  }

  state = {
    quantity: 1,
    totalAmount: 0,
    value: false,
    error: {},
    visible: false,
  }
  render () {
    const {nav, goToAlfacart, listAllProductData, categoryData, goToDetail, alfacartShipmentAddress, connfirmButton, defaultAlfaAddress, deleteAddress, checkAlfaShipment1, checkAlfaShipment3, checkAlfaShipment2, editAddress, onCloseSLotTime,
      goToDetailCategory, seeAllCategory, goToShipping, goToFormFillAddres, listaddress, goTosearchStore, alfaShowTimeSlot, checkTimeSlot, initialTimeDate, lastTimeDate, optionTimeSlot, selectAddressShip, getDefaultAlfaAddress, currentMerchant, selectAddressCMI} = this.props;
    const dataCategory = result(categoryData, 'Array', []);
    return (
      <ConnectedAlfacartShippingMethodPage goToDetail={goToDetail} nav={nav} navigateTo={this.navigateTo} deleteAddress={deleteAddress} goTosearchStore={goTosearchStore} checkTimeSlot={checkTimeSlot} initialTimeDate={initialTimeDate} lastTimeDate={lastTimeDate} optionTimeSlot={optionTimeSlot}
        goToAlfacart={goToAlfacart}  categoryData={categoryData} alfacartShipmentAddress={alfacartShipmentAddress} defaultAlfaAddress={defaultAlfaAddress} alfaShowTimeSlot={alfaShowTimeSlot} selectAddressShip={selectAddressShip} onCloseSLotTime={onCloseSLotTime}
        listAllProductData={listAllProductData} dataCategory={dataCategory} connfirmButton={connfirmButton} checkAlfaShipment2={checkAlfaShipment2} editAddress={editAddress}
        goToDetailCategory={goToDetailCategory} tickOnclose={this.tickOnclose} visible={this.state.visible} checkAlfaShipment1={checkAlfaShipment1} checkAlfaShipment3={checkAlfaShipment3}
        seeAllCategory={seeAllCategory} goToShipping={goToShipping} goToFormFillAddres={goToFormFillAddres} listaddress={listaddress} getDefaultAlfaAddress={getDefaultAlfaAddress} currentMerchant={currentMerchant} selectAddressCMI={selectAddressCMI}/>
    );
  }
}


export default AlfacartShippingMethodPage;
