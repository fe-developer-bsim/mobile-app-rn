import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text, Image} from 'react-native';
import styles from './MerchantListHistory.component.style';
import {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import {result, map} from 'lodash';
import Touchable from '../Touchable.component';
import isEmpty from 'lodash/isEmpty';
import {language} from '../../config/language';
import directDebitBg from '../../assets/images/direct-debit-bg.png';
import logo from '../../assets/images/garuda-indonesia.png';
import {Dimensions} from 'react-native';

class MerchantListHistory extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    unlinkMerchant: PropTypes.func,
    directDebitPartnerList: PropTypes.array,
    userName: PropTypes.string,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar/>)

  render () {
    const {unlinkMerchant, userName, directDebitPartnerList} = this.props;
    const {width} = Dimensions.get('window');
    const trueWidth = width + 5;
    const trueHeight = (trueWidth * 14) / 17;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerTab} contentContainerStyle={styles.scrollContainer}>
          {
            isEmpty(directDebitPartnerList) ? 
              null
              :
              <View style={styles.rowTop}>
                <Text style={styles.redLine}/>
              </View>
          }
          
          {
            !isEmpty(directDebitPartnerList) ?
              <View>
                <Text style={styles.historyTitle}>{language.PUSH_INVOICE_MERCHANT_HISTORY_TITLE}</Text>
              </View> 
              : null
          }
          {
            isEmpty(directDebitPartnerList) ?
              <View>
                <View>
                  <Text style={styles.emptyHeading}>{language.DASHBOARD__WELCOME} {userName}!</Text>
                </View>
                <View>
                  <Text style={styles.emptySubHead}>{language.PUSH_INVOICE_EMPTY_PARTNER}</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image source={directDebitBg} style={{width: trueWidth, height: trueHeight}}/>
                </View>
                <View>
                  <Text style={styles.bottomText1}>{language.PUSH_INVPOCE_EMPTY_PARTNER_BOTTOM_1}</Text>
                </View>
                <View>
                  <Text style={styles.bottomText2}>{language.PUSH_INVPOCE_EMPTY_PARTNER_BOTTOM_2}</Text>
                </View>
                
              </View>
              :
              map(directDebitPartnerList, (value, k) => {
                const partnerName = result(value, 'partnerName', '');
                const dateConnected = result(value, 'dateConnected', '');
                const accToken = result(value, 'accToken', '');
                const data = {'accToken': accToken, 'partnerName': partnerName};
                return (
                  <View key={k} style={styles.listView}>
                    <View style={styles.containerList}>
                      <View style={styles.logo}>
                        <Image source={logo} style={{width: 50, height: 50}}/>
                      </View>
                      <View>
                        <View style={styles.rowCenter}>
                          <Text style={styles.textTotalAmount}>{partnerName} </Text>
                        </View>
                        <View style={styles.rowDate}>
                          <Text style={styles.dateConnected1}>{language.PUSH_INVOICE_DATE_CONNECTED} </Text>
                          <Text style={styles.dateConnected2}>{dateConnected}</Text>
                        </View>
                        <Touchable onPress={unlinkMerchant(data)}>
                          <View style={styles.rowDc}>
                            <Text style={styles.textPending}>{language.PUSH_INVOICE_DISCONNECT}</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                );
              }
              )
          }
        </ScrollView>
      </View>
    );
  }
}
export default MerchantListHistory;