import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, Linking, ScrollView} from 'react-native';
import styles from './SILChoosePolisBuy.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import simasIdr from '../../assets/images/SIMAS-IDR.png';
import smartUsd from '../../assets/images/SMART-USD.png';
import {Toast} from '../../utils/RNHelpers.util';
import {result} from 'lodash';


const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};

class SmartInvestaLinkPolisBuyComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    items: PropTypes.array,
    onGoNextUSD: PropTypes.func,
    onGoNextIDR: PropTypes.func,
    listProduct: PropTypes.array,
    acctPrList: PropTypes.array,
  }

  render () {
    const {onGoNextUSD, onGoNextIDR, listProduct, acctPrList} = this.props;
    const listProducts = result(listProduct, 'listProduct', []);
    const linkKetentuanIdr = result(listProducts, '[0].listProdDetail[0].riplayUmum', '');
    const linkKetentuanUsd = result(listProducts, '[1].listProdDetail[0].riplayUmum', '');
    // const productCodeIdr = result(listProducts, '[0].productId', '');
    // const productCodeUsd = result(listProducts, '[1].productId', '');
    return (
      <ScrollView>
        <View style={[styles.container, styles.menu]}>

          {listProducts.map((option) => {
            const productId = result(option, 'productId', ''); // 175 dan 203 dari vendor ketika ini berubah
            const isIncludeInArray = acctPrList.includes(productId);
            const isIDR = productId === '185';
            return (
              <View>
                {
                  isIncludeInArray &&  <View style={styles.flexUsd}>
                    <Touchable onPress={isIDR ? onGoNextIDR : onGoNextUSD} style={styles.imagePress}>
                      <Image source={isIDR ? simasIdr : smartUsd} style={styles.limitedLabelstyle}/>
                    </Touchable>
                    <View style={styles.textTittle}>
                      <Touchable onPress={isIDR ? onGoNextIDR : onGoNextUSD} >
                        <Text style={[styles.title, styles.menuTitle]}>{isIDR ? language.SIL__SMART__INVESMENT_LINK_IDR : language.SIL__SMART__INVESMENT_LINK_USD}</Text>
                        <Text style={styles.title2}>{isIDR ? language.SIL__SHORT_DESC_IDR : language.SIL__SHORT_DESC_USD}</Text>
                      </Touchable>
                      <Touchable onPress={openLink(isIDR ? linkKetentuanIdr : linkKetentuanUsd)}>
                        <Text style={styles.detailProduk}>{isIDR ? language.SIL__DETAIL_PRODUK : language.SIL__DETAIL_PRODUK}</Text>
                      </Touchable>
                    </View>
                    <View style={styles.descTittle}>
                      <Touchable onPress={isIDR ? onGoNextIDR : onGoNextUSD} >
                        <SimasIcon name={'arrow'} size={15} style={styles.pr20}/>
                      </Touchable>
                    </View>
                  </View>
                }
              </View>
             
              
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default SmartInvestaLinkPolisBuyComponent;
