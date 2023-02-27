import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Products.styles';
import Touchable from '../../components/Touchable.component';
import {isEmpty} from 'lodash';

class ChooseSavingAccount extends React.Component {
  static propTypes = {
    listProducts: PropTypes.array,
    currentLanguage: PropTypes.string,
    goToTnC: PropTypes.func,
    showSaving: PropTypes.bool
  }

  renderSavingProducts = (item) => {
    const {goToTnC, currentLanguage, showSaving} = this.props;
    const show = showSaving ? item.productEnabledETB : item.productEnabledNTB;
    const title = currentLanguage === 'id' ? item.productNameID : item.productNameEN;
    const description = currentLanguage === 'id' ? item.productDescID : item.productDescEN;
  
    return (
      <View>
        {show === 'true' ? 
          <View>
            <Touchable onPress={goToTnC(item)} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainerCC}>
                  <Image source={{uri: item.productImage}} style={styles.imageCC} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{title}</Text>
                  <Text style={styles.txtLight}>{description}</Text>
                </View>
              </View>
            </Touchable>
          </View> 
          : null
        } 
      </View>
    );
  }

  render () {
    const {listProducts} = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.SAVING__CHOOSE_PRODUCTS}</Text>
          </View>

          {isEmpty(listProducts) ? null : listProducts.map(this.renderSavingProducts)}
        </View>
      </ScrollView>
    );
  }
}

export default ChooseSavingAccount;
