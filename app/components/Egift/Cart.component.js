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
import countBy from 'lodash/countBy';
import sumBy from 'lodash/sumBy';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import Poin from '../../assets/images/simaspoins.png';
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
  }

  renderCart = (product) => {
    const {addQuantity = noop, minusQuantity = noop, egiftCart, dropFromCart} = this.props;
    const id = product.egiftId;
    const quantity = countBy(egiftCart, 'egiftId')[`${id}`];
    const amount = quantity * product.value;
    return (
      <View style={styles.productContainer}>
        <View style={styles.flex1}>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image source={{uri: product.image}} renderError={loadError} indicator={Bar} indicatorProps={{
                showsText: true,
                color: styles.red,
                size: 50,
                thickness: 2
              }} style={styles.imageSize} resizeMode='cover'/>
            </View>
            <View style={styles.productNameContainer}>
              <Text style={styles.mediumText}>{product.itemName}</Text>
            </View>
            <Touchable style={styles.iconContainer} onPress={dropFromCart(product)}>
              <SimasIcon name={'trash'} size={20}/>
            </Touchable>
          </View>
          <View style={styles.row}>
            <View style={[styles.flex1, styles.ph20]}>
              <Text style={styles.mediumText}>Quantity</Text>
              <View style={styles.rowEnd}>
                <View style={styles.borderedContainer}>
                  <Touchable disabled={quantity < 2} onPress={minusQuantity(product)}>
                    <View style={styles.rightBorder}>
                      <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                    </View>
                  </Touchable>
                  <View style={styles.rightBorder}>
                    <Text style={styles.quantity}>{quantity}</Text>
                  </View>
                  <Touchable onPress={addQuantity(product)}>
                    <View style={styles.center}>
                      <Text style={styles.largeText}>+</Text>
                    </View>
                  </Touchable>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>{currencyFormatter(amount)} </Text>
                  <View style={styles.poinContainerProduct}><Image source={Poin} style={styles.poinImage}/></View>
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
    const total = sumBy(egiftCart, 'value');
    const poin = result(simasPoin, 'simasPoin.data.total_point', 0);
    const payDisabled = isEmpty(egiftCart) || poin < total;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          isEmpty(products) ?
            <View style={styles.emptyCartContainer}>
              <Image source={EmptyCart} style={styles.emptyCartImage} resizeMode='cover'/>
              <View style={styles.cartEmptyContainer}><Text style={styles.cartEmptyText}>{language.EGIFT__CART_EMPTY}</Text></View>
            </View>
            :
            <View>
              {products.map(this.renderCart)}
              <View style={styles.totalContainer}>
                <Text style={styles.largeText}>{language.EGIFT__CART_TOTAL}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.total}>{currencyFormatter(total)} </Text>
                  <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImageLarge}/></View>
                </View>
              </View>
              { isEmpty(simasPoin) ?
                <View style={styles.errorContainer}>
                  <View style={styles.errorIconContainer}>
                    <SimasIcon style={styles.errorIconColor} name='caution-circle' size={24}/>
                  </View>
                  <View style={styles.errorTextContainer}>
                    <Text style={styles.errorPoin}>{language.SIMAS_POIN__FAILED_INQUIRY}</Text>
                  </View>
                </View>
                : !isEmpty(simasPoin) && parseInt(poin) < total ?
                  <View style={styles.errorContainer}>
                    <View style={styles.errorIconContainer}>
                      <SimasIcon style={styles.errorIconColor} name='caution-circle' size={24}/>
                    </View>
                    <View style={styles.errorTextContainer}>
                      <Text style={styles.errorPoin}>{language.SIMAS_POIN__YOUR_SIMAS_POIN}{currencyFormatter(poin)}</Text>
                      <Text style={styles.error}>{language.SIMAS_POIN__SIMAS_POIN_NOT_ENOUGH}</Text>
                    </View>
                  </View>
                  : null
              }
            </View>
        }
        <View style={styles.buttonContainer}>
          <View style={styles.buttonLeft}>
            <SinarmasButton buttonType='secondary' text={language.EGIFT__CART_ADD_MORE} onPress={goToLanding}/>
          </View>
          <View style={styles.buttonRight}>
            <SinarmasButton disabled={payDisabled} text={language.EGIFT__CART_PAY} onPress={goToLogin}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default QRPromoDetail;
