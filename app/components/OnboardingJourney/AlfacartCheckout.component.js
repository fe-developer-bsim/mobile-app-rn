import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './AlfacartCheckout.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import {ScrollView} from 'react-native-gesture-handler';
import {result, isEmpty, size, filter, sortBy} from 'lodash';
import {SinarmasButton} from '../../components/FormComponents';
import {currencyFormatter, checkShariaAccount} from '../../utils/transformer.util';
import TabCoupon from '../Coupon/CouponTabPurchase.component';
import truncate from 'lodash/truncate';

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
    detailCategory: PropTypes.func,
    dispatch: PropTypes.func,
    listAllProduct: PropTypes.func,
    maximumNumberOfEachPage: PropTypes.string,
    goToShipping: PropTypes.func,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    checkoutList: PropTypes.array,
    goPayment: PropTypes.object,
    totalByProduct: PropTypes.number,
    subscriberNoInput: PropTypes.string,
    goToLanding: PropTypes.func,
    couponCustomerMerchantView: PropTypes.func,
    couponUse: PropTypes.object,
    removeCoupon: PropTypes.func,
    pickAddres: PropTypes.func,
    saveResultStockAlfa: PropTypes.array,
    deleteOnconfrimItems: PropTypes.func,
    thresshold: PropTypes.func,
    currency: PropTypes.string,
    currentMerchant: PropTypes.array,

  }

  remove=() => {
    this.props.removeCoupon();
  }

  selectNoPolis = () => {
    this.bs.current.snapTo(1);
  }

  goToPayment= () => {
    const {formValues, goPayment, totalByProduct, currency} = this.props;
    const deliveryFee = Number(result(formValues, 'shippingAddress.fee', ''));
    const totalAll = totalByProduct + deliveryFee;
    const isUseSimas = result(formValues, 'myAccount.isUseSimas', false);
    const isSyariah = checkShariaAccount(result(formValues, 'myAccount', {})) && currency !== 'simaspoin';
    goPayment(formValues, totalAll, totalByProduct, isSyariah, isUseSimas);
  }

  renderCart = (product) => {
    const {formValues, saveResultStockAlfa = [], deleteOnconfrimItems} = this.props;
    const checkAcc2 = isEmpty(result(formValues, 'shipmentaddress', {}));
    const productDetail = result(product, 'items', {});
    const productCodeItem = result(productDetail, 'productCode', '');
    const filterOutOfStock = size(filter(saveResultStockAlfa, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem === firstCounting;
    }));
    const image = result(productDetail, 'urlImage', '');
    const totalPrice = Number(result(productDetail, 'price', '')) * Number(result(product, 'quantity', 0));
    return (
      <View style={filterOutOfStock === 1 && !checkAcc2 ? styles.backgroudImage : styles.backgroudImage2}>
        <View style={styles.productContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: image}} style={styles.alfaIcon}/>
          </View>
          <View style={styles.row2}>
            <Text style={styles.mediumText}>{result(productDetail, 'productName', '')}</Text>
            <Text style={styles.mediumText}>{language.DIGISTORE__QUANTITY_TEXT} : {result(product, 'quantity', 0)}</Text>
            <Text style={styles.mediumText}>Rp {currencyFormatter(totalPrice)}</Text>
          </View>
          { filterOutOfStock === 1 && !checkAcc2 &&
          <View>
            <Touchable onPress={deleteOnconfrimItems(productCodeItem)}>
              <Text style={styles.styleRedMessage}>{language.EGIFT__CART_DELETE_BUTTON}</Text>
            </Touchable>
          </View>
          }
        </View>
      </View>

    );
  }

  render () {
    const {goToLanding, goToShipping, getSourceAcc, formValues, checkoutList, totalByProduct, couponUse, couponCustomerMerchantView, saveResultStockAlfa, currentMerchant} = this.props;
    const idResult = require('lodash');
    const productsCMI = idResult.uniqWith(checkoutList, function (arrVal, othVal) {
      return arrVal.items.productId === othVal.items.productId;
    });
    const sortProductCMI = sortBy(productsCMI, [function (o) {
      return result(o, 'items.productId', '');
    }]);
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const isUseSimas = result(formValues, 'myAccount.isUseSimas');
    const checkAcc2 = isEmpty(result(formValues, 'shipmentaddress', {}));
    const checkAcc3 = isEmpty(result(formValues, 'vouchers', {}));
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const place = result(formValues, 'shipmentaddress.formValues.name', '');
    const adress = result(formValues, 'shipmentaddress.formValues.address1', '');
    const postalCode = result(formValues, 'shipmentaddress.formValues.postalCode', '');
    const addressMark = result(formValues, 'shipmentaddress.formValues.addressMark', '');
    const nameCity = result(formValues, 'shipmentaddress.formValues.nameCity', '');
    const deliveryFee = Number(result(formValues, 'timeSelection.deliverFee', 0));
    const vouchers = result(formValues, 'vouchers.value', '');
    const totalAll = totalByProduct + deliveryFee;
    const availableBalance = checkAcc && result(formValues, 'myAccount.balances.availableBalance', '') === '' ? totalAll : result(formValues, 'myAccount.balances.availableBalance', 0);
    const balanceFlag = availableBalance < totalAll;
    const couponDescription = result(couponUse, 'description', '');
    const newSubtitle = truncate(couponDescription, {length: '30', omission: '...'});
    const pickAddresAlfa2 = result(formValues, 'alfaCheckoutForm.shipmentaddress', '');
    const methodType = result(formValues, 'shipmentaddress.formValues.method', '0');
    const recepientName = result(formValues, 'shipmentaddress.recepientValue.recepientName', '');
    const dateShipping = result(formValues, 'shipmentaddress.recepientValue.datePicker', '');
    const timeShipping = result(formValues, 'shipmentaddress.recepientValue.timeSlot.timeSlotDesc', '');
    const mobilePhone = result(formValues, 'shipmentaddress.formValues.mobilePhone', '');
    const email = result(formValues, 'shipmentaddress.formValues.email', '');
    const flagOOS = size(saveResultStockAlfa) > 0 && !checkAcc2;
    const merchant = result(currentMerchant, 'name', '');
    let disabledbuttonpay = false;
    if (flagOOS && !checkAcc || totalAll === 0) {
      disabledbuttonpay = true;
    }
    return (
      <ScrollView>
        <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
          <View style={styles.container2}>
            <View style={styles.containerScrollView}>
              <View style={styles.rowProduct} >
                <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_PRODUCT}</Text>
              </View>
            </View>
            <View style={styles.containerProduct}/>
            {
              sortProductCMI.map(this.renderCart)
            }

            <View style={styles.greyLine2}/>
            <View style={styles.container}>
              <View style={styles.containerRowShippmenAndFundAndVoucher} >
                <Text style={styles.styleMessage}>{language.ALFACART_SHIPPING_METHOD__TITTLE}</Text>
                {!checkAcc2 && <Touchable onPress={goToShipping}>
                  <Text style={styles.styleRedMessage}>{language.GENERIC__EDIT}</Text>
                </Touchable>}
              </View>
              <View style={styles.containerDiv}>
                <Touchable onPress={goToShipping}>
                  {checkAcc2 ?
                    <View style={styles.containerShippment}>
                      <View>
                        <SimasIcon style={styles.iconStyle} name='truck' size={25}/>
                      </View>
                      <View style={styles.centerItem}>
                        <Text style={styles.titleCode}>{language.ALFACART__SHIP_TO_TEXT_NEW}</Text>
                      </View>
                      <View style={styles.centerItem}>
                        <SimasIcon name='chevron' size={15} style={styles.black}/>
                      </View>
                    </View>
                    :
                    merchant === 'ALFACART' ?
                      <View>
                        {methodType === '1' ? <Text style={styles.sendAccNameTypeNew}> Alamat : {addressMark}</Text> : <Text style={styles.sendAccNumber}>{language.ALFACART_PICKU__BY_TITTLE} : {recepientName}</Text>}
                        {methodType === '1' ? <Text style={styles.sendAccNameTypeNew}> {language.ALFACART_DELIVERY__TITTLE} : {place}</Text> : <Text style={styles.sendAccNameTypeNew}> {place}</Text>}
                        <Text style={styles.sendAccNameType}>{adress}</Text>
                        <Text style={styles.sendAccNameType}>{nameCity} {postalCode} {pickAddresAlfa2}</Text>
                        <Text style={styles.sendAccNameType}>----------------------------------------</Text>
                        {methodType === '1' ? <Text style={styles.sendAccNameTypeNew}> {language.QR_GPN__TERMINAL_PHONE} :</Text> : <Text style={styles.sendAccNameTypeNew}> {language.ALFACART_STORE__NUMBER_TITTLE} :</Text>}
                        <Text style={styles.sendAccNameType}>{mobilePhone}</Text>
                        <Text style={styles.sendAccNameType}>{email}</Text>
                        <Text style={styles.sendAccNameType}>----------------------------------------</Text>
                        {methodType === '1' ? <Text style={styles.sendAccNameType}>{language.ALFACART__DEVERY_SCHEDULE_TEXT}</Text> : <Text style={styles.sendAccNameType}>{language.ALFACART_PICKUP__SCHEDULE_TITTLE}</Text>}
                        <Text style={styles.sendAccNameType}>{dateShipping} pukul {timeShipping}</Text>
                      </View>
                      :
                      <View>
                        <Text style={styles.sendAccNameTypeNew}> Alamat : {addressMark}</Text>
                        <Text style={styles.sendAccNameTypeNew}> {language.ALFACART_DELIVERY__TITTLE} : {place}</Text>
                        <Text style={styles.sendAccNameType}>{adress}</Text>
                        <Text style={styles.sendAccNameType}>{nameCity} {postalCode} {pickAddresAlfa2}</Text>
                        <Text style={styles.sendAccNameType}>----------------------------------------</Text>
                        <Text style={styles.sendAccNameTypeNew}> {language.QR_GPN__TERMINAL_PHONE} :</Text>
                        <Text style={styles.sendAccNameType}>{mobilePhone}</Text>
                        <Text style={styles.sendAccNameType}>{email}</Text>
                      </View>
                  }
                </Touchable>
              </View>
            </View>
            <View style={styles.greyLine2}/>
            <View style={styles.containerRowShippmenAndFundAndVoucher}>
              <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_PAYMENT_TITTLE}</Text>
              {!checkAcc && <Touchable onPress={getSourceAcc}>
                <Text style={styles.styleRedMessage}>{language.GENERIC__EDIT}</Text>
              </Touchable>}
            </View>
            <View style={styles.containerDiv}>
              <Touchable onPress={getSourceAcc}>
                {checkAcc ?
                  <View style={styles.containerShippment}>
                    <View>
                      <SimasIcon style={styles.iconStyle} name='Creditcard_02' size={25}/>
                    </View>
                    <View style={styles.centerItem}>
                      <Text style={styles.titleCode}>{language.ALFACART_CHECKOUT_PAYMENT__TEXT}</Text>
                    </View>
                    <View style={styles.centerItem}>
                      <SimasIcon name='chevron' size={15} style={styles.black}/>
                    </View>
                  </View>
                  :
                  <View>
                    {
                      isUseSimas ?
                        <View >
                          <Text style={styles.sendAccNumber}>{sendAccountName}</Text>
                          <Text style={styles.sendAccNumber}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                        </View>
                        :
                        <View >
                          <Text style={styles.sendAccNumber}>{sendAccountName} - {sendAccountNumber}</Text>
                        </View>
                    }
                  </View>

                }
              </Touchable>

              {balanceFlag && <Text style={styles.styleRedMessageError}>{language.DIGISTORE__BALANCE_NOT_INSUFICIENT}</Text>}
            </View>
            <View style={styles.greyLine2}/>
            <View style={styles.containerRowServiceBillpay} >
              <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_VOUCHER_TITTLE}</Text>
            </View>
            {!couponDescription ?
              <Touchable style={styles.containerInnerAlfaCart} onPress={couponCustomerMerchantView}>
                <View style={styles.containerShippment}>
                  <View>
                    <SimasIcon style={styles.iconStyle} name='voucher-2-outline' size={25}/>
                  </View>
                  <View style={styles.centerItem}>
                    <Text style={styles.titleCode}>{language.ALFACART_CHECKOUT_VOUCHER__TEXT}</Text>
                  </View>
                  <View style={styles.centerItem}>
                    <SimasIcon name='chevron' size={15} style={styles.black}/>
                  </View>
                </View>
              </Touchable>
              :
              <View style={styles.containerInnerAlfaCart}>
                <TabCoupon goToCoupon={couponCustomerMerchantView} couponUse={newSubtitle} removeCoupon={this.remove}/>
              </View>
            }
            <View style={styles.greyLine2}/>
            <View >
              <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_PAYMENT_DETAILS}</Text>
            </View>
            <View>
              <View style={styles.rowDetail}>
                <Text style={styles.paymentStyle}>{language.ALFACART_PAYMENT_DETAILS__TOTAL_PAYMENT}</Text>
                <Text style={styles.paymentStyle2}>{currencyFormatter(totalByProduct)}</Text>
              </View>
              <View style={styles.rowDetail}>
                <Text style={styles.paymentStyle}>{language.ALFACART_PAYMENT_DETAILS__DELIVERY_FEE}</Text>
                <Text style={styles.paymentStyle2}>{currencyFormatter(deliveryFee)}</Text>
              </View>
              <View style={styles.rowDetail}>
                <Text style={styles.paymentStyle}>{language.ALFACART_PAYMENT_DETAILS__VOUCHER}</Text>
                <Text style={styles.paymentStyle2}>{checkAcc3 ? vouchers : '--'}</Text>
              </View>
              <View style={styles.greyLine}/>
              <View style={styles.rowDetail}>
                <Text style={styles.paymentStyle}>{language.ALFACART_CART_BOTTOM_SHEET_TOTAL}</Text>
                <Text style={styles.paymentStyle2}>{currencyFormatter(totalAll)}</Text>
              </View>




            </View>
          </View>
        </View>
        <View style={styles.greyLine2}/>
        <View style={styles.buttonCenter}>
          <SinarmasButton style={styles.buttonSpacing} onPress={goToLanding}>
            <Text style={styles.textButton}>{language.DIGISTORE__BUTTON_TO_LANDING}</Text>
          </SinarmasButton>
        </View>
        <View style={styles.buttonCenter}>
          <SinarmasButton style={styles.buttonSpacing} onPress={this.goToPayment} disabled={checkAcc2 || checkAcc || balanceFlag || flagOOS || disabledbuttonpay}>
            <Text style={styles.textButton}>{language.SERVICE__PAY_NOW}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

export default AlfacartDashboard;