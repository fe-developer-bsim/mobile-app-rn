import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Confirmation.styles';
import result from 'lodash/result';
import uniq from 'lodash/uniq';
import countBy from 'lodash/countBy';
import sumBy from 'lodash/sumBy';
import {currencyFormatter} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import Poin from '../../assets/images/poin.png';
import Touchable from '../Touchable.component';

class QRPromoDetail extends React.Component {
  static propTypes = {
    simasPoin: PropTypes.object,
    goToConfirmation: PropTypes.func,
    egiftCart: PropTypes.array,
    egiftPaymentForm: PropTypes.object,
    goLanding: PropTypes.func,
  }

  renderDetail = (product) => {
    const {egiftCart} = this.props;
    const id = product.egiftId;
    const quantity = countBy(egiftCart, 'egiftId')[`${id}`];
    const amount = quantity * product.value;
    const itemName = result(product, 'itemName');
    return (
      <View style={styles.productContainer}>
        <View style={styles.row}>
          <View style={styles.quantityContainer}><Text style={styles.quantity}>{quantity}</Text></View>
          <Text style={styles.product}>{itemName}</Text>
        </View>
        <View style={styles.row}>
          <View />
          <View style={styles.row}>
            <Text style={styles.amount}>{currencyFormatter(amount)} </Text>
            <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImage}/></View>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {simasPoin = {}, goToConfirmation, egiftCart, egiftPaymentForm, goLanding} = this.props;
    const name = result(simasPoin, 'fullName', '');
    const poin = result(simasPoin, 'simasPoin.data.total_point', '');
    const products = uniq(egiftCart);
    const total = sumBy(egiftCart, 'value');
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
          <View style={styles.detailContainer}>
            <View style={[styles.row, styles.pb20]}>
              <View style={styles.titleContainer}><Text style={styles.title}>{language.EGIFT__PURCHASE_DETAIL}</Text></View>
              <Touchable onPress={goLanding}>
                <View style={styles.buttonTxt}>
                  <Text>{language.CGV__CANCELLATION}</Text>
                </View>
              </Touchable>
            </View>
            <View>
              <Text style={styles.evTxt}>E-voucher</Text>
              {products.map(this.renderDetail)}
            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.middleContainer}>
            <Text style={styles.title}>{language.EGIFT__SEND_TO}</Text>
            <Text style={styles.name}>{result(egiftPaymentForm, 'values.email', '')}</Text>
            <View style={styles.infoTextContainer}>
              <Text style={styles.info}>{language.EGIFT__SEND_EMAIL}</Text>
            </View>
          </View>
          <View style={styles.greyLine2} />
          <View style={styles.bgWhite}>
            <View style={styles}>
              <Text style={styles.amountHead1}>{language.CGV__SIMAS_POIN} - {name}</Text>
              <Text style={styles.amountHead2}>{language.CGV__AVAIL_BALANCE2} - {currencyFormatter(poin)} {language.CGV__POIN}</Text>
            </View>
            <View style={styles.greyLine} />
            <View style={styles.row}>
              <Text style={styles.amountTxt2}>{language.CGV__PRICE}</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{currencyFormatter(total)} </Text>
                <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImage}/></View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.greyLine} />
        <View style={styles.buttonContainer}>
          <View>
            <Text>{language.CGV__TOTAL}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amount2}>{currencyFormatter(total)} </Text>
              <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImage}/></View>
            </View>
          </View>
          <SinarmasButton style={styles.button2} onPress={goToConfirmation} text={language.CGV__PAY} />
        </View>
      </View>
    );
  }
}

export default QRPromoDetail;
