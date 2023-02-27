import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './AddNewAtmCard.styles';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';

class AddNewAtmCardConfirmation extends React.Component {
  static propTypes = {
    createCardNew: PropTypes.func,
    accLinked: PropTypes.string,
    embossName: PropTypes.string,
    cardNetwork: PropTypes.string,
    fee: PropTypes.string,
    imageCard: PropTypes.string,
    deliveryAddress: PropTypes.string,
  }

  render () {
    const {createCardNew, accLinked, embossName, cardNetwork, fee, imageCard, deliveryAddress} = this.props;
    return (
      <View style={styles.buttonContainerStyle}>
        <ScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} extraHeight={120}>
          <View>
            
            <View style={styles.FieldsContainerWrapperPage}>
              <Text style={styles.mainTitleTextHeader}>{language.REQUEST_ATM_CARD__CONFIRM_TITLE}</Text>

              <View>
                <View style={styles.containerConfirm}>
                  <Text style={[styles.accNo, styles.roboto]}>{language.REQUEST_ATM_CARD__CONFIRM_ACC_LINKED}</Text>
                  <Text style={[styles.product, styles.roboto]}>{accLinked}</Text>
                </View>
              </View>

              <View>
                <View style={styles.containerConfirm}>
                  <Text style={[styles.accNo, styles.roboto]}>{language.REQUEST_ATM_CARD__CONFIRM_HOLDER_NAME}</Text>
                  <Text style={[styles.product, styles.roboto]}>{embossName}</Text>
                </View>
              </View>

              <View>
                <View style={styles.containerConfirm}>
                  <Text style={[styles.accNo, styles.roboto]}>{language.REQUEST_ATM_CARD__CONFIRM_CARD_NETWORK}</Text>
                  <Text style={[styles.product, styles.roboto]}>{cardNetwork}</Text>
                </View>
              </View>

              <View>
                <View style={styles.containerConfirm}>
                  <Text style={[styles.accNo, styles.roboto]}>{language.REQUEST_ATM_CARD__CONFIRM_FEE}</Text>
                  <Text style={[styles.product, styles.roboto]}>{'Rp. ' + currencyFormatter(fee)}</Text>
                </View>
              </View>

              <View>
                <View style={styles.containerConfirm}>
                  <Text style={[styles.accNo, styles.roboto]}>{language.REQUEST_ATM_CARD__CONFIRM_DELIVERY_ADDRESS}</Text>
                  <Text style={[styles.product, styles.roboto]}>{deliveryAddress}</Text>
                </View>
              </View>

              <View style={styles.containerConfirmBottom}>
                <Text style={styles.textTitleImageConfirm}>{language.ADD_NEW_ATM_CARD_DETAIL}</Text>
                <View style={styles.containerImageCard}>
                  <Image source={{uri: imageCard}} style={styles.imageList} />
                </View>
              </View>
              
            </View>
          </View>
        </ScrollView>

        <View style={styles.containerIcon}>
          <SinarmasButton onPress={createCardNew} text={language.GENERIC__CONTINUE} />
        </View>
      </View>
    );
  }
}

export default AddNewAtmCardConfirmation;
