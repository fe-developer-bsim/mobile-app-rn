import {View, Text, FlatList, Image, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRMerchantList.styles';
import {listViewComparator} from '../../utils/transformer.util';
import QRMenu from './QRMenu.component';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import qrmerchant from '../../assets/images/qrmerchant.jpg';
import forEach from 'lodash/forEach';

class QRMerchantList extends React.Component {
  static propTypes = {
    QRMerchantRegisterPage: PropTypes.func,
    header: PropTypes.string,
    navigation: PropTypes.array,
    datatransactions: PropTypes.array,
    isMerchantAccount: PropTypes.array,
    goToDetailMerchant: PropTypes.func,
    goToMerchantInquiry: PropTypes.func,
    getRefundCode: PropTypes.func,
    getTnC: PropTypes.func,
  }
  comparator = listViewComparator

  renderListItemMerchantInquiry = () => {
    const {goToMerchantInquiry = {}} = this.props;
    return goToMerchantInquiry ? goToMerchantInquiry : {};
  }

  renderListItemDetailMerchant = () => {
    const {goToDetailMerchant = {}} = this.props;
    return goToDetailMerchant ? goToDetailMerchant : {};
  }

  renderListItem = ({item}) => (
    <QRMenu {...item} getDetailMerchant={this.renderListItemDetailMerchant()} getMerchantInquiry={this.renderListItemMerchantInquiry()} />
  );

  render () {
    
    const {QRMerchantRegisterPage, navigation, getTnC} = this.props;
    const data = result(navigation, 'state.params', []);
    let dataView = [];
    forEach(data, (item) =>  {
      dataView = [...dataView, item];
    });
    return (
      <View style={styles.halfWidth}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{paddingBottom: 0}} extraHeight={120} style={styles.bgGrey}>
          { isEmpty(data) ?
            <View style={styles.container}>
              <View style={styles.bgWhite}>
                <View>
                  <View>
                    <View style={styles.greyContainer}>
                      <Image source={qrmerchant} style={styles.imageOffer} />
                    </View>
                  </View>
                  <View style={styles.merchantContainer}>
                    <View>
                      <Text style={styles.merchantText}>{language.QR_GPN__MERCHANT_NEW_REGIST_01}</Text>
                    </View>
                  </View>
                  <View style={styles.subMerchant}>
                    <Text style={styles.merchantSubText}>{language.QR_GPN__MERCHANT_NEW_REGIST_03}</Text>
                  </View>
                  
                </View>
              </View>
            </View>
            :
            <View>
              <Text style={styles.titleStyle}>{language.QR_GPN__MERCHANT_LIST}</Text>
              <FlatList enableEmptySections data={dataView} renderItem={this.renderListItem}/>
              
            </View>
          }
        </ScrollView>
        {isEmpty(data) ?
          <View>
            <View style={styles.buttonNext2}>
              <SinarmasButton onPress={getTnC} text={language.QR_GPN__MERCHANT_NEW_REGIST_08}/>
            </View>
          </View>
          :
          <Touchable style={styles.pb30}>
            <View>
              <View style={styles.buttonNext}>
                <SinarmasButton onPress={QRMerchantRegisterPage} text={language.QR_GPN__MERCHANT_NEW_REGIST_08}/>
              </View>
            </View>
          </Touchable>
        }
      </View>
    );
  }
}


export default QRMerchantList;
