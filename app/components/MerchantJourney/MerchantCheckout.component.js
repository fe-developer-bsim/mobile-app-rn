
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './MerchantCheckout.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import {ScrollView} from 'react-native-gesture-handler';
import {result, isEmpty} from 'lodash';
import {SinarmasButton} from '../../components/FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';

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
    goTopUp: PropTypes.func,
  }


  selectNoPolis = () => {
    this.bs.current.snapTo(1);
  }

  goToPayment= () => {
    const {formValues, goPayment, totalByProduct, subscriberNoInput} = this.props;
    const deliveryFee = Number(result(formValues, 'shippingAddress.fee', 0));
    const totalAll = totalByProduct + deliveryFee;
    goPayment(formValues, totalAll, subscriberNoInput);
  }

  renderCart = (product) => {
    const productDetail = result(product, 'items', {});
    const image = result(productDetail, 'urlImage', '');
    return (
      <View style={styles.productContainer}>
        <View style={styles.row} >
          <Image source={{uri: image}} style={styles.alfaIcon}/>
          <View style={styles.productNameContainer}>
            <Text style={styles.mediumText}>{result(productDetail, 'productName', '')}</Text>
            <Text style={styles.mediumText}>{language.DIGISTORE__QUANTITY_TEXT} : {result(product, 'quantity', 0)}</Text>
            <Text style={styles.mediumText}>Rp {currencyFormatter(result(productDetail, 'price', ''))}</Text>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {goToLanding, goToShipping, getSourceAcc, formValues, checkoutList, totalByProduct, couponCustomerMerchantView} = this.props;
    const checkAcc = isEmpty(result(formValues, 'myAccount', {}));
    const checkAcc2 = isEmpty(result(formValues, 'shippingAddress', {}));
    const checkAcc3 = isEmpty(result(formValues, 'vouchers', {}));
    const sendAccountNumber = result(formValues, 'myAccount.accountNumber', '');
    const sendAccountName = result(formValues, 'myAccount.name', '');
    const place = result(formValues, 'shippingAddress.name', '');
    const adress = result(formValues, 'shippingAddress.address1', '');
    const postalCode = result(formValues, 'shippingAddress.postalCode', '');
    const nameCity = result(formValues, 'shippingAddress.nameCity', '');
    const deliveryFee = Number(result(formValues, 'shippingAddress.fee', 0));
    const vouchers = result(formValues, 'vouchers.value', '');
    const totalAll = totalByProduct + deliveryFee;
    const availableBalance = checkAcc && (result(formValues, 'myAccount.balances.availableBalance', '') === '' || result(formValues, 'myAccount.balances.availableBalance', '') === null) ? totalAll : result(formValues, 'myAccount.balances.availableBalance', 0);
    const balanceFlag = availableBalance < totalAll;
    return (
      <ScrollView>
        <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
          <View style={styles.container2}>
            <View style={styles.containerScrollView}>
              <View style={styles.rowProduct} >
                <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_PRODUCT}</Text>
              </View>
              <View />
            </View>
            <View style={styles.containerProduct} />
            {checkoutList.map(this.renderCart)}
            <View style={styles.greyLine2}/>
            <View style={styles.container}>
              <View style={styles.containerRowShippmenAndFundAndVoucher} >
                <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_SHIP_TO}</Text>
                {!checkAcc2 && <Touchable onPress={goToShipping}> 
                  <Text style={styles.styleRedMessage}>{language.GENERIC__EDIT}</Text>
                </Touchable>}
              </View>
              <View style={styles.containerDiv}>
                <Touchable onPress={goToShipping}>
                  {checkAcc2 ?
                    <View style={styles.containerShippment}>
                      <View>
                        <SimasIcon style={styles.iconStyle} name='transportation-stroke' size={25}/>
                      </View>
                      <View style={styles.centerItem}>
                        <Text style={styles.titleCode}>{language.ALFACART_CHECKOUT_SHIP_TO__TEXT}</Text>
                      </View>
                      <View style={styles.centerItem}>
                        <SimasIcon name='chevron' size={15} style={styles.black}/>
                      </View>
                    </View>
                    :
                    <View>
                      <Text style={styles.sendAccNumber}>{place}</Text>
                      <Text style={styles.sendAccNameType}>{adress}</Text>
                      <Text style={styles.sendAccNameType}>{nameCity} {postalCode}</Text>
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
                  <View >
                    <Text style={styles.sendAccNumber}>{sendAccountNumber} - {sendAccountName}</Text>
                    <Text style={styles.sendAccNumber}>{language.GENERIC_BILLER__BALANCE} {currencyFormatter(availableBalance)}</Text>
                  </View>
                }
              </Touchable>

              {balanceFlag && <Text style={styles.styleRedMessageError}>{language.DIGISTORE__BALANCE_NOT_INSUFICIENT}</Text>}
            </View>
            <View style={styles.greyLine2}/>
            <View style={styles.containerRowServiceBillpay} >
              <Text style={styles.styleMessage}>{language.ALFACART_CHECKOUT_VOUCHER_TITTLE}</Text>
            </View>

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
                <Text style={styles.paymentStyle}>{language.ALFACART_PAYMENT_DETAILS__SHIPPING_PROTECTION}</Text>
                <Text style={styles.paymentStyle2}>0</Text>
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
          <SinarmasButton style={styles.buttonSpacing} onPress={this.goToPayment} disabled={checkAcc2 || checkAcc || balanceFlag}>
            <Text style={styles.textButton}>{language.SERVICE__PAY_NOW}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

export default AlfacartDashboard;
