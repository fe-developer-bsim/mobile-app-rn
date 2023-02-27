import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './MainGenerateCode.styles';
import {result} from 'lodash';
import Touchable from '../Touchable.component';
import {filterBymerchantType} from '../../utils/transformer.util';


class MainGenerateCode extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goNextPage: PropTypes.func,
    isLogin: PropTypes.bool,
    offlineStorage: PropTypes.func,
    generateCode: PropTypes.object,
  }

  renderMerchant = (data = {}, key) => {
    const name = result(data, 'merchName', '');
    const isOnline = result(data, 'isOnline', false);
    const isOffline = result(data, 'isOffline', false);
    const {goNextPage, isLogin, navigation} = this.props;
    let show = false;
    const merchIcon = result(data, 'merchIcon', '');
    const trxType = result(navigation, 'state.params.trxType', '');

    if (isOnline) {
      if (isLogin) {
        show = true;
      } else if (isOffline) {
        show = true;
      }
    } else if (isOffline) {
      if (!isLogin) {
        show = true;
      } else if (isLogin) {
        if (isOnline) {
          show = true;
        }
      }
    }
    show = true;

    return (
      <View key={key}>
        {
          show ?
            <View>
              <Touchable onPress={goNextPage(data, trxType)}>
                <View style={styles.codeBorder}>
                  <View style={styles.imageLeft}>
                    <Text style={styles.titleCode}>{name}</Text>
                  </View>
                  <View>
                    <Image source={merchIcon} style={styles.imageOffer2} />
                  </View>
                  
                </View>
              </Touchable>
            </View>
            : null
        }
      </View>
    );
  };

  render () {
    const {generateCode, navigation} = this.props;
    const listMerchant = result(generateCode, 'data.merchList', []);
    const trxType = result(navigation, 'state.params.trxType', '');
    const filteredMerchant = filterBymerchantType(listMerchant, trxType);
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.containerWhite}>
          <View style={styles.containerMenu}>
            {filteredMerchant.map(this.renderMerchant)}
          </View>
          <View style={styles.whiteBottom} />
        </View>
      </ScrollView>
    );
  }
}

export default MainGenerateCode;
