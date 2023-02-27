
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './AlfacartShippingMethod.styles';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import {ScrollView} from 'react-native-gesture-handler';
import {result, find} from 'lodash';
import {SinarmasInput, DatePicker, SinarmasPicker} from '../../components/FormComponents';
import {formatFieldName} from '../../utils/transformer.util';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import {theme} from '../../styles/core.styles';
import ShippingTab from './ShippingTab.component';
import PickupTab from './PickupTab.component';
import {Field} from 'redux-form';
import Overlay from '../Overlay/OverlayRadius.component';
import moment from 'moment';
import ShippingTabCMI from './ShippingTabCMI.component';


const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
    borderRadius: 5
  },
  tabBarTextStyle: styles.tabText
};

class AlfacartDashboard extends React.Component {
  static propTypes = {
    detailProduct: PropTypes.func,
    nav: PropTypes.object,
    navigateTo: PropTypes.func,
    categoryData: PropTypes.array,
    listAllProductData: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    dataCategory: PropTypes.string,
    seeAllCategory: PropTypes.func,
    selectNoPolis: PropTypes.func,
    inquiryData: PropTypes.object,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.object,
    goToEmFund: PropTypes.func,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    goToAlfacart: PropTypes.func,
    listProduct: PropTypes.func,
    detailCategory: PropTypes.func,
    dispatch: PropTypes.func,
    listAllProduct: PropTypes.func,
    maximumNumberOfEachPage: PropTypes.string,
    detailProductData: PropTypes.array,
    onChangeTab: PropTypes.func,
    initialTab: PropTypes.number,
    goToFormFillAddres: PropTypes.func,
    listaddress: PropTypes.func,
    alfacartShipmentAddress: PropTypes.array,
    pickAddres: PropTypes.func,
    visible: PropTypes.bool,
    tickOnclose: PropTypes.func,
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
    currentMerchant: PropTypes.array,
    selectAddressCMI: PropTypes.func,

  }


  state={
    visible: false,
    addressTarget: {}
  }


  selectNoPolis = () => {
    this.bs.current.snapTo(1);
  }

  thisPickAddress = (values, method) => () => {
    const {connfirmButton} = this.props;
    this.setState({addressTarget: {...values, method}});
    connfirmButton({...values, method});
  }


  confirmButton= () => {
    const {selectAddressShip} = this.props;
    selectAddressShip(this.state.addressTarget);
    this.setState({visible: false});
  }

  oncloseOverlay =() => {
    const {onCloseSLotTime} = this.props;
    onCloseSLotTime();
  }
  confrimButtonCMI= () => {
    const {selectAddressCMI} = this.props;
    selectAddressCMI(this.state.addressTarget);
    this.setState({visible: false});
  }
  render () {

    const {deleteAddress, defaultAlfaAddress, checkTimeSlot, initialTimeDate, lastTimeDate, optionTimeSlot = [], alfaShowTimeSlot = false, goTosearchStore, editAddress, checkAlfaShipment1, checkAlfaShipment2, checkAlfaShipment3, alfacartShipmentAddress, onChangeTab, initialTab, goToFormFillAddres, currentMerchant} = this.props;
    const addressCustomer = result(alfacartShipmentAddress, 'addressList', []);
    const pickupStore = result(alfacartShipmentAddress, 'storeList', []);
    const merchant = result(currentMerchant, 'name', '');
    const initialDate = new Date();
    const checkAlfaShipment3Flag = result(this.state.addressTarget, 'method', '0') === '0' ? checkAlfaShipment3 : false;
    const modcheckTimeSlot = moment(checkTimeSlot).format('YYYY-MM-DD');
    const optionTimeSLotNew = find(optionTimeSlot, function (items) { 
      return result(items, 'availabledate', '') === modcheckTimeSlot;
    });
    const optionTimeSLotNewChoise = result(optionTimeSLotNew, 'timeslotsbean', []);
    return (
      <ScrollView>
        <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
          <View>
            {merchant === 'ALFACART' ?

              <Overlay visible={alfaShowTimeSlot}>
                {result(this.state.addressTarget, 'method', '0') === '0' &&
                <Text style={styles.overlayHeader}>{language.ALFACART_PICKUP__TIME_TITTLE}</Text>
                }
                {result(this.state.addressTarget, 'method', '0') === '1' &&

                <Text style={styles.overlayHeader}>{language.ALFACART__DELIVERY_TIME_TEXT}</Text>
                }
                <View style={{marginVertical: 40}}>
                  <View style={{margin: -30}}>
                    {result(this.state.addressTarget, 'method', '0') === '0' &&
                    <Field
                      name='recepientName'
                      label={language.CARDLESSWITHDRAWAL__NAME}
                      placeholder={language.CARDLESSWITHDRAWAL__HINTTEXT_NAME}
                      format={formatFieldName}
                      normalize={formatFieldName}
                      component={SinarmasInput}
                    />}
                    {result(this.state.addressTarget, 'method', '0') === '0' &&
                    <Field
                      name='datePicker'
                      component={DatePicker}
                      label={language.ALFACART_PICKUP__TIME_DATE}
                      minimumDate={initialTimeDate}
                      maximumDate={lastTimeDate}
                      date={initialDate}
                    />
                    }
                    {result(this.state.addressTarget, 'method', '0') === '1' &&
                    <Field
                      name='datePicker'
                      component={DatePicker}
                      label={language.ALFACART_DELIVERY__TIME_DATE }
                      minimumDate={initialTimeDate}
                      maximumDate={lastTimeDate}
                      date={initialDate}
                    />
                    }

                    {result(this.state.addressTarget, 'method', '0') === '0' &&
                    <Field
                      name='timeSlot'
                      label={language.CARDLESSWITHDRAWAL__NAME}
                      component={SinarmasPicker}
                      style={styles.fieldContainer}
                      placeholder={language.ALFACART__TIME_SLOT_WORDING_BAHASA}
                      itemList={optionTimeSLotNewChoise}
                      labelKey='timeSlotDesc'
                    />
                    }
                    {result(this.state.addressTarget, 'method', '0') === '1' &&
                    <Field
                      name='timeSlot'
                      label={language.CARDLESSWITHDRAWAL__NAME}
                      component={SinarmasPicker}
                      style={styles.fieldContainer}
                      placeholder={language.ALFACART__TIME_SLOT_WORDING}
                      itemList={optionTimeSLotNewChoise}
                      labelKey='timeSlotDesc'
                    />
                    }

                  </View>
                  <View style={{...styles.buttonContainer, padding: 30, justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Touchable onPress={this.oncloseOverlay} style={{padding: 20}}>
                      <Text style={styles.textAdd}>{language.GENERIC__CANCEL}</Text>
                    </Touchable>
                    <Touchable buttonType='secondary' onPress={this.confirmButton} style={{padding: 20}} disabled={checkAlfaShipment1 || checkAlfaShipment2 || checkAlfaShipment3Flag}>
                      <Text style={styles.textBuy}>{language.ONBOARDING__OKAY}</Text>
                    </Touchable>
                  </View>
                </View>
              </Overlay>
              : null
            }
          </View>
  
          
          <View style={styles.container2}>
            <View style={styles.containerDetailProduct}>
              {merchant === 'ALFACART' ?
                <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={onChangeTab} initialPage={initialTab}>
                  <ShippingTab tabLabel={language.ALFACART_SHIPPING_TITTLE} alfacartShipmentAddress={addressCustomer} pickAddres={this.thisPickAddress} goToFormFillAddres={goToFormFillAddres} editAddress={editAddress} deleteAddress={deleteAddress} defaultAlfaAddress={defaultAlfaAddress}/>
                  <PickupTab tabLabel={language.ALFACART_PICK_UP_STORE__TITTLE} storeList={pickupStore} pickAddres={this.thisPickAddress} goTosearchStore={goTosearchStore} confirmButton={this.confirmButton}/>
                </ScrollableTabView>
                :
                <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={onChangeTab} initialPage={initialTab}>
                  <ShippingTabCMI tabLabel={language.ALFACART_SHIPPING_TITTLE} alfacartShipmentAddress={addressCustomer} goToFormFillAddres={goToFormFillAddres} editAddress={editAddress} deleteAddress={deleteAddress} defaultAlfaAddress={defaultAlfaAddress} merchant={merchant} confrimButtonCMI={this.confrimButtonCMI} pickAddres={this.thisPickAddress}/>
                </ScrollableTabView>
              }     
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }
}

export default AlfacartDashboard;