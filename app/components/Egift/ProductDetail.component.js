import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {language} from '../../config/language';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import styles from './ProductDetail.styles';
import Touchable from '../Touchable.component';
import {currencyFormatter} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import Poin from '../../assets/images/simaspoins.png';
import result from 'lodash/result';
import AutoHeightWebView from 'react-native-autoheight-webview';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class QRPromoDetail extends React.Component {
  static propTypes = {
    items: PropTypes.object,
    detailProduct: PropTypes.object,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    totalAmount: PropTypes.number,
    goToCart: PropTypes.func,
  }

  render () {
    const {items = {}, detailProduct = {}, minusQuantity, addQuantity, quantity, totalAmount, goToCart} = this.props;
    const productOver = result(detailProduct, 'overview');
    const productNull = productOver === null ? '' : productOver;
    const overviewStyle = '<style>* body {font-family: roboto; font-size: 16;}</style>';
    const tncStyle = '<style>* body {font-family: roboto; font-size: 12;}</style>';
    const term_condition = result(detailProduct, 'termCondition');
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: items.image}} renderError={loadError} indicator={Bar} indicatorProps={{
            showsText: true,
            color: styles.red,
            size: 50,
            thickness: 2
          }} style={styles.imageSize} resizeMode='cover'/>
        </View>

        <View style={styles.topContainer}>
          <Text style={styles.name}>{items.itemName}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{currencyFormatter(items.value)} </Text>
            <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImage}/></View>
          </View>
          <View style={styles.greyLine}/>
          <View style={styles.qtyContainer}>
            <Text style={styles.quantity}>QTY</Text>
            <View style={styles.amountContainer}>
              <View style={styles.borderedContainer}>
                <Touchable disabled={quantity < 2} onPress={minusQuantity}>
                  <View style={styles.rightBorder}>
                    <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                  </View>
                </Touchable>
                <View style={styles.rightBorder}>
                  <Text style={styles.timesText}>{quantity}</Text>
                </View>
                <Touchable onPress={addQuantity}>
                  <View style={styles.center}>
                    <Text style={styles.largeText}>+</Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <View>
            <AutoHeightWebView style={styles.webViewWidth} source={{html: overviewStyle + productNull}}/>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text>{language.TERMS_AND_CONDITION}</Text>
          <View>
            <AutoHeightWebView style={styles.webViewWidth} source={{html: tncStyle + term_condition}}/>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.name}>TOTAL</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.totalAmount}>{currencyFormatter(totalAmount)} </Text>
              <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImageLarge}/></View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <SinarmasButton text={language.EGIFT__BUY} onPress={goToCart}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default QRPromoDetail;
