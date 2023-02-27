import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import styles from './SimasPoinHistory.component.styles';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import HistoryItem from './HistoryItem.component';
import {listViewComparator, getLastThirtyDaysTrx} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NoSimasPoin from '../../assets/images/no-simaspoin.png';
import {language} from '../../config/language';

class SimasPoinHistory extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    header: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
    onOrderDetail: PropTypes.func,
    simasPoinHistory: PropTypes.object,
  }

  comparator = listViewComparator

  renderBrand = (type = []) => {
    const trxList = result(type, 'lastTrxResult', []);
    return (
      <View style={styles.brandPadding}>
        <View style={styles.brandContainer}><Text style={styles.brand}>{language.SIMAS_POIN__LAST_TRANSACTIONS}</Text></View>
        {trxList.map(this.renderListItem)}
      </View>
    );
  }

  renderListItem = (item) => (<HistoryItem {...item} type='detail' />)

  render () {

    const {simasPoinHistory = []} = this.props;
    const itemList = result(simasPoinHistory, 'data', []);
    const trxList = getLastThirtyDaysTrx(itemList);
    const loading = result(simasPoinHistory, 'loading', false);
    const reload = result(simasPoinHistory, 'reload', false) || isEmpty(simasPoinHistory);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.containerContent}>
        { loading ?
          <View style={styles.errorContainer}>
            <ActivityIndicator size='large' color={styles.red}/>
          </View>
          : reload ?
            <View style={styles.brandPadding}>
              <View style={styles.noofferImage}>
                <Image source={NoSimasPoin} style={styles.emptyCartImage} resizeMode='cover'/>
                <Text style={styles.informationVoucher}>{language.SIMAS_POIN__EMPTY}</Text>
              </View>
            </View>
            :
            <View>
              {trxList.map(this.renderBrand)}
            </View>
        }
      </KeyboardAwareScrollView>
    );
  }
}

export default SimasPoinHistory;
