import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './SimasValas.styles';
import Touchable from '../../components/Touchable.component';
import idrSavings from '../../assets/images/IDRsavings.png';

class ProductTypeSelections extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    isLogin: PropTypes.bool,
    show: PropTypes.bool,
    goToIDRsavings: PropTypes.func,
    goToValasSavings: PropTypes.func,
    findProductSavingValas: PropTypes.object,
    productEnabledETB: PropTypes.bool,
    productEnabledNTB: PropTypes.bool,
    productNameID: PropTypes.string,
    productNameEN: PropTypes.string,
    productDescID: PropTypes.string,
    productDescEN: PropTypes.string,
    productImage: PropTypes.string,
  }
  
  render () {
    const {currentLanguage, show, goToIDRsavings, goToValasSavings,
      productEnabledETB, productEnabledNTB, productNameID, productNameEN, productDescID, productDescEN, productImage} = this.props;
    const flag = show ? productEnabledETB : productEnabledNTB;
    const title = currentLanguage === 'id' ? productNameID : productNameEN;
    const description = currentLanguage === 'id' ? productDescID : productDescEN;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.contentContainerStyle}>
        <View style={styles.containerProductSelections}>
          <View>
            <Touchable onPress={goToIDRsavings} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainerIDR}>
                  <Image source={idrSavings} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.IDR_SAVINGS}</Text>
                  <Text style={styles.txtLight}>{language.DETAIL_IDR_SAVINGS_MENU}</Text>
                </View>
              </View>
            </Touchable>
          </View>

          {flag === true ?
            <View>
              <Touchable onPress={goToValasSavings} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainer}>
                    <Image source={{uri: productImage}} style={styles.imageValas} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{title}</Text>
                    <Text style={styles.txtLight}>{description}</Text>
                  </View>
                </View>
              </Touchable>
            </View>
            : null }

        </View>
      </ScrollView>
    );
  }
}

export default ProductTypeSelections;
