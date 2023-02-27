import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, ScrollView} from 'react-native';
import {noop, startsWith, lowerCase} from 'lodash';
import {dataProduct} from '../../utils/transformer.util';
import Touchable from '../../components/Touchable.component';
import styles from './EgiftTabs.component.styles';
import {theme} from '../../styles/core.styles';
import {result} from 'lodash';
import {language} from '../../config/language';
import Bar from 'react-native-progress/Bar';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class Offers extends React.Component {
  static propTypes = {
    offers: PropTypes.array.isRequired,
    offerID: PropTypes.string,
    onOfferClick: PropTypes.func,
    clickedOffer: PropTypes.object,
    closeHandler: PropTypes.func,
    isLogin: PropTypes.bool,
    changeTab: PropTypes.func,
    newProduct: PropTypes.func,
    getValas: PropTypes.func,
    getTdCreate: PropTypes.func,
    getInsurance: PropTypes.func,
    goToSplitBillMenu: PropTypes.func,
    goReferralCode: PropTypes.func,
    newProductCC: PropTypes.func,
    gotoEasyPin: PropTypes.func,
    hideMGM: PropTypes.string,
    dataDisplay: PropTypes.object,
    goToLoan: PropTypes.func
  }

  renderProduct = (data = []) => {
    const {gotoEasyPin, isLogin, newProduct, getValas, getTdCreate, getInsurance, goToSplitBillMenu, goReferralCode, newProductCC, goToLoan} = this.props;
    const productName = result(data, 'product', '');
    const productGoTo = productName === 'cc' ? newProductCC : productName === 'sa' ?  newProduct : productName === 'insurance' ? getInsurance : productName === 'td' ? getTdCreate : productName === 'exrate' ? getValas : productName === 'mgm' ? goReferralCode : productName === 'splitbill' ? goToSplitBillMenu : productName === 'loan' ? goToLoan : noop;
    return (
      <Touchable style={styles.containerInnerProductSeall} onPress={isLogin ? productGoTo : gotoEasyPin(productName)}>
        <Image source={data.image} resizeMode={'cover'} renderError={loadError} indicator={Bar} indicatorProps={{
          showsText: true,
          color: theme.brand,
          size: 50,
          thickness: 2
        }} style={styles.bannerProduct} />
      </Touchable>
    );
  }


  render () {
    const {dataDisplay, hideMGM} = this.props;
    const cif = result(dataDisplay, 'cifCode', '');
    const isNonKyc = startsWith(cif, 'NK');
    const hideMGMon = lowerCase(hideMGM) === 'yes';
    const productData = dataProduct(isNonKyc, hideMGMon);
    return (
      <View>
        <ScrollView style={styles.containerProd} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.OffersContainer}>
            {productData.map(this.renderProduct)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Offers;
