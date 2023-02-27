import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {language} from '../../config/language';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import styles from './Cart.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import size from 'lodash/size';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import EmptyCart from '../../assets/images/emptycart.png';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class QRPromoDetail extends React.Component {
  static propTypes = {
    egiftCart: PropTypes.array,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    totalAmount: PropTypes.number,
    dropFromCart: PropTypes.func,
    goToLanding: PropTypes.func,
    goToLogin: PropTypes.func,
    simasPoin: PropTypes.object,
    EStorePurchaseLimit: PropTypes.number
  }

  renderCart = (product) => {
    const {addQuantity = noop, minusQuantity = noop, egiftCart, dropFromCart, EStorePurchaseLimit} = this.props;
    const id = result(product, 'items.productId', '');
    const items = product.items;
    const filterquantity = filter(egiftCart, function (o) {
      return o.items.productId === id;
    });
    const quantity = size(filterquantity);
    const price = Number(result(product, 'items.price', ''));
    const stock = result(product, 'items.stock');
    const amount = quantity * price;
    const EStorePurchaseLimitFix = Number(EStorePurchaseLimit);
    return (
      <View style={styles.productContainer}>
        <View style={styles.flex1}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image source={{uri: product.items.urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                showsText: true,
                color: styles.red,
                size: 50,
                thickness: 2
              }} style={styles.imageSize} resizeMode='cover'/>
            </View>
            <View style={styles.productNameContainer}>
              <Text style={styles.mediumText}>{items.productName}</Text>
            </View>
            <Touchable style={styles.iconContainer} onPress={dropFromCart(product.items)}>
              <SimasIcon name={'trash'} size={20}/>
            </Touchable>
          </View>
          <View style={styles.row}>
            <View style={[styles.flex1, styles.ph20]}>
              <Text style={styles.mediumText}>{language.DIGISTORE__STOCK_TEXT} : {stock}</Text>
              <Text style={styles.mediumText}>{language.DIGISTORE__QUANTITY_TEXT} : {quantity}</Text>
              <View style={styles.rowEnd}>
                <View style={styles.borderedContainer}>
                  <Touchable disabled={quantity < 2} onPress={minusQuantity(product)}>
                    <View style={styles.rightBorder}>
                      <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                    </View>
                  </Touchable>
                  <View style={styles.rightBorder}>
                    <Text style={styles.quantity}>{stock === '' || stock === 0 || stock < 0 ? 0 : quantity}</Text>
                  </View>
                  <Touchable onPress={addQuantity(product)} disabled= {quantity === stock || stock === '' || stock === 0 || stock < 0 || EStorePurchaseLimitFix === quantity}>
                    <View style={styles.center}>
                      <Text style={styles.largeText}>+</Text>
                    </View>
                  </Touchable>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>Rp {currencyFormatter(amount)} </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {egiftCart = [], goToLanding, goToLogin, simasPoin} = this.props;
    const products = uniq(egiftCart);
    const sortProduct = sortBy(products, [function (o) {
      return o.items.productId;
    }]);
    const price = sumBy(egiftCart, 'price');
    const poin = result(simasPoin, 'simasPoin.data.total_point', 0);
    const payDisabled = isEmpty(egiftCart) || poin < total;
    const quantity = egiftCart.length;
    const total = quantity * price;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          isEmpty(sortProduct) ?
            <View style={styles.emptyCartContainer}>
              <Image source={EmptyCart} style={styles.emptyCartImage} resizeMode='cover'/>
              <View style={styles.cartEmptyContainer}><Text style={styles.cartEmptyText}>{language.EGIFT__CART_EMPTY}</Text></View>
            </View>
            :
            <View>
              {sortProduct.map(this.renderCart)}
            </View>
        }
        <View style={styles.buttonContainer}>
          <View style={styles.buttonLeft}>
            <SinarmasButton buttonType='secondary' text={language.EGIFT__CART_ADD_MORE} onPress={goToLanding}/>
          </View>
          <View style={styles.buttonRight}>
            <SinarmasButton disabled={payDisabled} text={'CHECKOUT'} onPress={goToLogin}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default QRPromoDetail;
