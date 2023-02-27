import {View, Text, FlatList, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import styles from './QRRefundCode.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import {listViewComparator, wrapObjectInFunction} from '../../utils/transformer.util';
import QRRefundList from './QRRefundList.component';
import {ScrollableTabView, DefaultTabBar} from '@valdio/react-native-scrollable-tabview';
import {theme} from '../../styles/core.styles';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
    borderRadius: 5
  },
  tabBarTextStyle: styles.tabText
};

class QRRefundCode extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    getRefundCreate: PropTypes.func,
    goToRefundInfo: PropTypes.func,
  }
  comparator = listViewComparator

  state = {
    tab: 'Active',
  }

  tabNames = ['Active', 'Used']

  changeTab = ({i, from}) => {
    if (i === from)
      return;
    const activeTab = this.tabNames[i];
    this.setState({activeTab}, () => {
      if (activeTab === 'Active') this.setState({tab: 'Active'});
      else if (activeTab === 'Used') this.setState({tab: 'Used'});
    });
  }

  renderListItemRefundInfo = (value) => () => {
    const {goToRefundInfo = {}} = this.props;
    return goToRefundInfo ? goToRefundInfo(value) : {};
  }

  renderListItem = ({item}) => (<QRRefundList {...item} getRefundInfo={this.renderListItemRefundInfo(item)} />);

  goRefundCreate = () => {
    const {navigation, getRefundCreate} = this.props;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    getRefundCreate(merchantId);
  };

  renderTabBar = wrapObjectInFunction(<DefaultTabBar/>);
  
  render () {
    
    const {navigation} = this.props;
    const {tab} = this.state;
    const data = result(navigation, 'state.params.codeList', []);
    const dataActive = filter(data, {'rcode_redeem_flag': '0'});
    const dataUsed = filter(data, {'rcode_redeem_flag': '1'});
    return (
      <View style={styles.halfWidth}>
        { isEmpty(data) ?
          <View style={styles.containerEmpty}>
            <Text style={styles.txt}>{language.QR_GPN__REFUND_NULL}</Text>
          </View>
          :
          <View style={tab === 'Active' ? isEmpty(dataActive) ? styles.tabContainerEmpty : styles.tabContainer : tab === 'Used' ? isEmpty(dataUsed) ? styles.tabContainerEmpty : styles.tabContainer : styles.tabContainer}>
            <ScrollableTabView {...tabBarConfig} tabBarPositon= 'overlayTop' locked={true} renderTabBar={this.renderTabBar} onChangeTab={this.changeTab}>
              <View tabLabel={'Active'} style={styles.containerTab}>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{paddingBottom: 20}} style={isEmpty(dataActive) ? null : styles.bgGrey}>
                  { isEmpty(dataActive) ?
                    <View style={styles.emptyText}>
                      <Text style={styles.txt}>{language.QR_GPN__REFUND_ACTIVE_NULL}</Text>
                    </View>
                    :
                    <View>
                      <FlatList enableEmptySections data={dataActive} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                    </View>
                  }
                </ScrollView>
              </View>
              <View tabLabel={'Used'} style={styles.containerTab}>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{paddingBottom: 20}} style={isEmpty(dataUsed) ? null : styles.bgGrey}>
                  { isEmpty(dataUsed) ?
                    <View style={styles.emptyText}>
                      <Text style={styles.txt}>{language.QR_GPN__REFUND_USED_NULL}</Text>
                    </View>
                    :
                    <View>
                      <FlatList enableEmptySections data={dataUsed} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                    </View>
                  }
                </ScrollView>
              </View>
            </ScrollableTabView>
          </View>
        }
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={this.goRefundCreate} text={language.QR_GPN__REFUND_CREATE} />
        </View>
      </View>
    );
  }
}

export default QRRefundCode;
