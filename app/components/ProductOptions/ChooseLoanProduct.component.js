import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Products.styles';
import Touchable from '../../components/Touchable.component';
import {isEmpty} from 'lodash';

class ChooseLoanProduct extends React.Component {
  static propTypes = {
    goToReguler: PropTypes.func,
    goToAlfamart: PropTypes.func,
    goToSmartfren: PropTypes.func,
    isLogin: PropTypes.bool,
    savingGoldEnabledNTB: PropTypes.bool,
    savingGoldEnabledETB: PropTypes.bool,
    savingAlfamartEnabledNTB: PropTypes.bool,
    smartfrenToogle: PropTypes.string,
    listProducts: PropTypes.array,
    currentLanguage: PropTypes.string,
    goToTnC: PropTypes.func,
    goToNextPage: PropTypes.func,
    nextPage: PropTypes.func,
    isEmoneyKyc: PropTypes.bool
  }

  renderLoanProducts = (item) => {
    const {isLogin, currentLanguage, nextPage, isEmoneyKyc} = this.props;
    const show = isLogin && isEmoneyKyc ? item.productEnabledETB : item.productEnabledNTB;
    const title = currentLanguage === 'id' ? item.productNameID : item.productNameEN;
    const description = currentLanguage === 'id' ? item.productDescID : item.productDescEN;
    
    return (
      <View>
        { show ?
          <Touchable onPress={nextPage(item)} style={styles.offerContainer}>
            <View style={styles.cardContainer2}>
              <View style={styles.imageContainer}>
                <Image source={{uri: item.productImage}} style={styles.imageCC} />
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.txtBold}>{title}</Text>
                <Text style={styles.txtLight}>{description}</Text>
              </View>
            </View>
          </Touchable>
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
            <Text style={styles.titleText}>{language.LOAN__CHOOSE_PRODUCTS}</Text>
          </View>

          {isEmpty(listProducts) ? null : listProducts.map(this.renderLoanProducts)}
        </View>
      </ScrollView>
    );
  }
}

export default ChooseLoanProduct;
