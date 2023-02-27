import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {language} from '../../config/language';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import styles from './AlfacartCart.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import size from 'lodash/size';
import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import EmptyCart from '../../assets/images/emptycart.png';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class QRPromoDetail extends React.Component {
  static propTypes = {
    alfacartFreeShippingAfter: PropTypes.object,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    totalAmount: PropTypes.number,
    dropFromCart: PropTypes.func,
    goToLanding: PropTypes.func,
    goToLogin: PropTypes.func,
    simasPoin: PropTypes.object,
    onChangeBoxCheckList: PropTypes.func,
    getConfirmProduct: PropTypes.func,
    itemsSelection: PropTypes.func,
    itemsAll: PropTypes.array,
    cartAlfacart: PropTypes.array,
    addWishlistFromCart: PropTypes.func,
    dropWishlistFromCart: PropTypes.func,
    wishlistAlfacart: PropTypes.array,
    cartCMI: PropTypes.array,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,
    onChangeBoxCheckListCMI: PropTypes.func,
    getConfirmProductCMI: PropTypes.func,


  }

  renderCartCMI = (product) => {
    const {addQuantity = noop, minusQuantity = noop, cartCMI, dropFromCart, getConfirmProductCMI, itemsSelection, addWishlistFromCart, wishlistCMI, dropWishlistFromCart} = this.props;
    const code = result(product, 'items.productId', '');
    const productCodeItem = result(product, 'items.productCode', '');
    const wishlistColor = size(filter(wishlistCMI, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem === firstCounting;
    }));

    const filterProductExist = size(filter(cartCMI, function (o) {
      return o.items.productId === code;
    }));
    const quantity = filterProductExist;
    const items = product.items;
    const price = Number(result(product, 'items.price', ''));
    const grossPrice = result(product, 'items.grossPrice', '');
    const stock = result(product, 'items.stock');
    const checklistChecker = size(filter(itemsSelection, function (o) {
      return o.items.productId === code;
    }));
    const checkListFlag = checklistChecker >= 1;
    return (
      <View style={styles.productContainer}>
        <View style={styles.flex1}>
          <View style={styles.rowCheck}>
            <View style={styles.ph20}>
              <View style={styles.rowEndCheck}>
                <CheckBox
                  onChange={getConfirmProductCMI(items)}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!checkListFlag}
                />
              </View>
            </View>
            <View style={styles.productContainer2}>
              <View style={styles.imageContainer}>
                <Image source={{uri: items.urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                  showsText: true,
                  color: styles.red,
                  size: 50,
                  thickness: 2
                }} style={styles.imageSize} resizeMode='cover' />
              </View>
              <View style={styles.row2}>
                <Text style={styles.mediumText}>{items.productName}</Text>
                <Text style={styles.amountNew}>Rp {currencyFormatter(price)}</Text>

              </View>
              {
                grossPrice === '' ?
                  <Text style={styles.amountNew}>{''}</Text>
                  :
                  <Text style={styles.grossAmount}>Rp. {currencyFormatter(grossPrice)} </Text>
              }
              <View style={styles.newRow}>
                <View style={styles.borderedContainer}>
                  <Touchable disabled={quantity < 2} onPress={minusQuantity(product)}>
                    <View style={styles.rightBorder}>
                      <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                    </View>
                  </Touchable>
                  <View style={styles.rightBorder}>
                    <Text style={styles.quantity}>{quantity}</Text>
                  </View>
                  <Touchable onPress={addQuantity(product)} disabled={quantity === stock}>
                    <View style={styles.center}>
                      <Text style={styles.largeText}>+</Text>
                    </View>
                  </Touchable>
                </View>

              </View>
              {
                wishlistColor === 1 ?
                  <View style={styles.rowIcon}>
                    <Touchable style={styles.wishlistContainer} onPress={dropWishlistFromCart(product)}>
                      <SimasIcon name={'love-fill'} size={15} style={styles.loveFillRed} />
                    </Touchable>
                  </View>
                  :
                  <View style={styles.rowIcon}>
                    <Touchable style={styles.wishlistContainer} onPress={addWishlistFromCart(product.items)}>
                      <SimasIcon name={'love-fill'} size={15} style={styles.loveFill} />
                    </Touchable>
                  </View>
              }
              <View style={styles.rowIcon2}>
                <Touchable style={styles.amountContainer} onPress={dropFromCart(product.items)}>
                  <SimasIcon name={'trash'} size={15} />
                </Touchable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderCart = (product) => {
    const {addQuantity = noop, minusQuantity = noop, cartAlfacart, dropFromCart, getConfirmProduct, itemsSelection, addWishlistFromCart, wishlistAlfacart, dropWishlistFromCart} = this.props;
    const code = result(product, 'items.productId', '');

    const productCodeItem = result(product, 'items.productCode', '');
    const wishlistColor = size(filter(wishlistAlfacart, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem === firstCounting;
    }));

    const filterProductExist = size(filter(cartAlfacart, function (o) {
      return o.items.productId === code;
    }));
    const quantity = filterProductExist;
    const items = product.items;
    const price = Number(result(product, 'items.price', ''));
    const grossPrice = result(product, 'items.grossPrice', '');
    const stock = result(product, 'items.stock');
    const checklistChecker = size(filter(itemsSelection, function (o) {
      return o.items.productId === code;
    }));
    const checkListFlag = checklistChecker >= 1;
    return (
      <View style={styles.productContainer}>
        <View style={styles.flex1}>
          <View style={styles.rowCheck}>
            <View style={styles.ph20}>
              <View style={styles.rowEndCheck}>
                <CheckBox
                  onChange={getConfirmProduct(items)}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!checkListFlag}
                />
              </View>
            </View>
            <View style={styles.productContainer2}>
              <View style={styles.imageContainer}>
                <Image source={{uri: items.urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                  showsText: true,
                  color: styles.red,
                  size: 50,
                  thickness: 2
                }} style={styles.imageSize} resizeMode='cover' />
              </View>
              <View style={styles.row2}>
                <Text style={styles.mediumText}>{items.productName}</Text>
                <Text style={styles.amountNew}>Rp {currencyFormatter(price)}</Text>

              </View>
              {
                grossPrice === '' ?
                  <Text style={styles.amountNew}>{''}</Text>
                  :
                  <Text style={styles.grossAmount}>Rp. {currencyFormatter(grossPrice)} </Text>
              }
              <View style={styles.newRow}>
                <View style={styles.borderedContainer}>
                  <Touchable disabled={quantity < 2} onPress={minusQuantity(product)}>
                    <View style={styles.rightBorder}>
                      <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                    </View>
                  </Touchable>
                  <View style={styles.rightBorder}>
                    <Text style={styles.quantity}>{quantity}</Text>
                  </View>
                  <Touchable onPress={addQuantity(product)} disabled={quantity === stock}>
                    <View style={styles.center}>
                      <Text style={styles.largeText}>+</Text>
                    </View>
                  </Touchable>
                </View>

              </View>
              {
                wishlistColor === 1 ?
                  <View style={styles.rowIcon}>
                    <Touchable style={styles.wishlistContainer} onPress={dropWishlistFromCart(product)}>
                      <SimasIcon name={'love-fill'} size={15} style={styles.loveFillRed} />
                    </Touchable>
                  </View>
                  :
                  <View style={styles.rowIcon}>
                    <Touchable style={styles.wishlistContainer} onPress={addWishlistFromCart(product.items)}>
                      <SimasIcon name={'love-fill'} size={15} style={styles.loveFill} />
                    </Touchable>
                  </View>
              }
              <View style={styles.rowIcon2}>
                <Touchable style={styles.amountContainer} onPress={dropFromCart(product.items)}>
                  <SimasIcon name={'trash'} size={15} />
                </Touchable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {cartAlfacart = [], goToLogin, simasPoin, onChangeBoxCheckList, itemsSelection, itemsAll, alfacartFreeShippingAfter, currentMerchant, cartCMI = [], onChangeBoxCheckListCMI} = this.props;
    const merchant = result(currentMerchant, 'name', '');
    const products = uniq(cartAlfacart);
    
    const idResult = require('lodash');
    const productsCMI = idResult.uniqWith(cartCMI, function (arrVal, othVal) {
      return arrVal.items.productId === othVal.items.productId;
    });

    const productsCheckout = uniq(itemsAll);
    const sortProduct = sortBy(products, [function (o) {
      return result(o, 'items.productId', '');
    }]);
    const sortProductCMI = sortBy(productsCMI, [function (o) {
      return result(o, 'items.productId', '');
    }]);
    const price = sumBy(itemsAll, 'items.price');
    const poin = result(simasPoin, 'simasPoin.data.total_point', 0);
    const payDisabled = isEmpty(cartAlfacart) || poin < total;
    const payDisabledCMI = isEmpty(cartCMI) || poin < total;

    const checkoutDisabled = isEmpty(itemsAll) || poin < total;

    const quantity = itemsAll.length;
    const total = quantity * price;
    const itemsSize = size(cartAlfacart);
    const itemsSizeCMI = size(cartCMI);
    const itemsSelectionSize = size(itemsSelection);
    const flagGlobalCheck = itemsSize === itemsSelectionSize;
    const flagGlobalCheckCMI = itemsSizeCMI === itemsSelectionSize;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          merchant === 'ALFACART' ?
            <View>
              {
                isEmpty(sortProduct) ?
                  <View style={styles.emptyCartContainer}>
                    <Image source={EmptyCart} style={styles.emptyCartImage} resizeMode='cover' />
                    <View style={styles.cartEmptyContainer}><Text style={styles.cartEmptyText}>{language.EGIFT__CART_EMPTY}</Text></View>
                  </View>
                  :
                  <View>
                    <View style={styles.productContainerOngkir}>
                      <View style={styles.flex1}>
                        <View style={styles.rowCheck}>
                          <View style={styles.ph20}>
                            <View style={styles.rowEndOngkir}>
                              <CheckBox
                                onChange={onChangeBoxCheckList}
                                uncheckedImage={RedCheckBox}
                                checkedImage={UnCheckBox}
                                label={null}
                                checkboxStyle={styles.checkboxStyle}
                                labelStyle={styles.checkboxLabel}
                                checked={!flagGlobalCheck}
                              />
                            </View>
                          </View>
                          <View style={styles.row}>
                            <View style={styles.selectAll}>
                              <Text style={styles.mediumText}>{language.ALFACART_CART_SELECT_ALL}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.flex1}>
                        <View style={styles.rowOngkir}>
                          <View style={styles.ph20}>
                            <View style={styles.rowEndOngkir}>
                              <View style={styles.borderedContainerOngkir}>
                                <View style={styles.iconOngkir}>
                                  <SimasIcon name={'truck'} size={40} />
                                </View>
                                <View style={styles.textOngkir}>
                                  <Text style={styles.ongkirText}>{'Dapatkan free ongkir dengan'}</Text>
                                  <View style={styles.spaceOngkir}>
                                    <Text style={styles.ongkirText}>{'minimal belanja'}</Text>
                                    <Text style={styles.amountOngkir}>Rp {currencyFormatter(alfacartFreeShippingAfter)}!</Text>
                                  </View>
                                </View>
                                <View style={styles.cautionOngkir}>
                                  <SimasIcon name={'caution-reverse'} size={20} style={styles.cautioni} />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View>
                      {sortProduct.map(this.renderCart)}
                    </View>


                  </View>
              }
            </View>
            :
            <View>
              {
                isEmpty(sortProductCMI) ?
                  <View style={styles.emptyCartContainer}>
                    <Image source={EmptyCart} style={styles.emptyCartImage} resizeMode='cover' />
                    <View style={styles.cartEmptyContainer}><Text style={styles.cartEmptyText}>{language.EGIFT__CART_EMPTY}</Text></View>
                  </View>
                  :
                  <View>
                    <View style={styles.productContainerOngkir}>
                      <View style={styles.flex1}>
                        <View style={styles.rowCheck}>
                          <View style={styles.ph20}>
                            <View style={styles.rowEndOngkir}>
                              <CheckBox
                                onChange={onChangeBoxCheckListCMI}
                                uncheckedImage={RedCheckBox}
                                checkedImage={UnCheckBox}
                                label={null}
                                checkboxStyle={styles.checkboxStyle}
                                labelStyle={styles.checkboxLabel}
                                checked={!flagGlobalCheckCMI}
                              />
                            </View>
                          </View>
                          <View style={styles.row}>
                            <View style={styles.selectAll}>
                              <Text style={styles.mediumText}>{language.ALFACART_CART_SELECT_ALL}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.flex1}>
                        {/* <View style={styles.rowOngkir}>
                          <View style={styles.ph20}>
                            <View style={styles.rowEndOngkir}>
                              <View style={styles.borderedContainerOngkir}>
                                <View style={styles.iconOngkir}>
                                  <SimasIcon name={'truck'} size={40} />
                                </View>
                                <View style={styles.textOngkir}>
                                  <Text style={styles.ongkirText}>{'Dapatkan free ongkir dengan'}</Text>
                                  <View style={styles.spaceOngkir}>
                                    <Text style={styles.ongkirText}>{'minimal belanja'}</Text>
                                    <Text style={styles.amountOngkir}>Rp {currencyFormatter(alfacartFreeShippingAfter)}!</Text>
                                  </View>
                                </View>
                                <View style={styles.cautionOngkir}>
                                  <SimasIcon name={'caution-reverse'} size={20} style={styles.cautioni} />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View> */}
                      </View>
                    </View>

                    <View>
                      {sortProductCMI.map(this.renderCartCMI)}
                    </View>


                  </View>
              }
            </View>
        }

        {
          merchant === 'ALFACART' ?

            <View style={styles.buttonContainer}>
              {
                isEmpty(products) ?
                  <View style={styles.buttonLeft} />
                  :
                  <View style={styles.buttonLeft}>
                    <Text style={styles.textItems}>Total ({quantity} items) :</Text>
                    <Text style={styles.textTotal}>Rp {currencyFormatter(price)}</Text>
                  </View>
              }
              {
                isEmpty(productsCheckout) ?
                  <View style={styles.buttonRight}>
                    <SinarmasButton disabled={checkoutDisabled} text={language.ALFACART_CHECKOUT_TITTLE} onPress={goToLogin} />
                  </View>
                  :
                  <View style={styles.buttonRight}>
                    <SinarmasButton disabled={payDisabled} text={language.ALFACART_CHECKOUT_TITTLE} onPress={goToLogin} />
                  </View>
              }
            </View>
            :

            <View style={styles.buttonContainer}>
              {
                isEmpty(productsCMI) ?
                  <View style={styles.buttonLeft} />
                  :
                  <View style={styles.buttonLeft}>
                    <Text style={styles.textItems}>Total ({quantity} items) :</Text>
                    <Text style={styles.textTotal}>Rp {currencyFormatter(price)}</Text>
                  </View>
              }
              {
                isEmpty(productsCheckout) ?
                  <View style={styles.buttonRight}>
                    <SinarmasButton disabled={checkoutDisabled} text={language.ALFACART_CHECKOUT_TITTLE} onPress={goToLogin} />
                  </View>
                  :
                  <View style={styles.buttonRight}>
                    <SinarmasButton disabled={payDisabledCMI} text={language.ALFACART_CHECKOUT_TITTLE} onPress={goToLogin} />
                  </View>
              }
            </View>
        }


      </ScrollView>
    );
  }
}

export default QRPromoDetail;
