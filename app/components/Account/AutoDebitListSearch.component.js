import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TextInput} from 'react-native';
import styles from './AutoDebitListSearch.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {listViewComparator} from '../../utils/transformer.util';
import isEmpty from 'lodash/isEmpty';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {result} from 'lodash';
import LayeredIcon from '../LayeredIcon/LayeredIcon.component';
import Touchable from '../Touchable.component';


class AutoDebitListSearch extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    billerFavorite: PropTypes.array,
    billerList: PropTypes.array,
    masterData: PropTypes.array,
    autoDebitList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  }

  state = {
    masterData: [],
    data: [],
    search: '',
  }

  componentWillMount () {
    const {autoDebitList} = this.props;
    this.setState({
      data: autoDebitList,
      masterData: autoDebitList
    });
  }

  onChangeInput = (text) => {
    const {masterData} = this.state;
    let result;
    if (text === '') {
      result = masterData;
    } else {
      result = masterData.filter((i) => i.merchantName.toUpperCase().includes(text.toUpperCase()));
    }
    this.setState({data: result, search: text});
  }

  onCloseDelete = () => {
    this.setState({
      search: ''
    });
    this.beginingPosition();
  }

  beginingPosition = () => {
    const {autoDebitList} = this.props;
    this.setState({
      data: autoDebitList,
    });
  }
  componentWillUnmount () {
    this.beginingPosition();
  }
  comparator = listViewComparator

  renderDataList = ({item}) => {
    const bulletCircle = [{
      iconName: 'bullet-red', iconSize: 20, iconStyle: styles.outterBullet},
    {
      iconName: 'bullet-red', iconSize: 6, iconStyle: styles.innerBullet
    }];
    const accountName = result(item, 'item.accountName', '');
    const accountNumber = result(item, 'item.accountNumber', '');
    const amount = result(item, 'item.amount', '');
    const merchantName = result(item, 'item.merchantName', '');
    const period = result(item, 'item.periode', '');
    const subscriberNumber = result(item, 'item.subscriberNumber', '');
    return (
      <View key={item.index} style={styles.objectData}> 
    
        <View style={[styles.historyItem]}>
          <View style={[styles.flex, styles.row]}>
            <View style={styles.iconStore}>
              <SimasIcon name='outlet' style={styles.store} size={30}/>
            </View>
            <View>
              <Text style={styles.subNo}>{merchantName}</Text>
              <Text style={styles.subtext}>{subscriberNumber}</Text>
            </View>
          </View>
        </View>          
        <View style={[styles.sourceAccount, styles.rowAdditional]}>
          <View style={styles.iconStore}>
            <LayeredIcon layers={bulletCircle}/>
          </View>
          <View style={styles.textContainer}>
            <Text>{language.AUTODEBIT__LIST_ACCOUNT}</Text>
            <Text>{accountName}</Text>
            <Text>{accountNumber}</Text>
          </View>
        </View>
        <View style={[styles.information, styles.rowAdditional]}>
          <View style={styles.iconStore}>
            <SimasIcon name={'new-send'} size={30} style={styles.cash}/>
          </View>
          <View style={styles.textContainer}>
            <Text>{language.AUTODEBIT__LIST_NOMINAL}</Text>
            <Text>{amount}</Text>
          </View>
        </View>
        <View style={[styles.period, styles.rowAdditional]}>
          <View style={styles.iconStore}>
            <SimasIcon name={'calendar'} size={30} style={styles.calendar}/>
          </View>
          <View style={styles.textContainer}>
            <Text>{language.AUTODEBIT__LIST_PERIOD}</Text>
            <Text>{period}</Text>
          </View>
        </View>

      </View>
    );
  }

  render () {

    const {data, search, masterData} = this.state;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.viewContainer} extraHeight={120} style={styles.viewContainer} enableOnAndroid={true}>
        <View style={styles.outerContainer}>
          <View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInput}>
                <TextInput 
                  underlineColorAndroid={'transparent'}
                  placeholder={language.AUTODEBIT__LIST_SEARCH_TITLE}
                  onChangeText={this.onChangeInput}
                  placeholderTextColor='#848484'
                  autoFocus={true}
                  style={styles.textInput}
                  value={search}
                />
              </View>
              {
                search === '' ?
                  <View>
                    <SimasIcon name={'search'} size={15} style={styles.searchATMButton}/>
                  </View> :
                  <Touchable onPress={this.onCloseDelete}>
                    <SimasIcon name={'close-black'} size={15} style={styles.searchATMButton}/>
                  </Touchable> 
              }
              
            </View>
          </View>
          <View style={styles.separator} />
          {!isEmpty(masterData) ? 
            <View>
              {
                !isEmpty(data) ? 
                  <View style={styles.listView}>
                    <FlatList
                      data={data}
                      renderItem={this.renderDataList}/>
                  </View> :
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{language.AUTODEBIT__LIST_NOT_FOUND}</Text>
                  </View> 
              }
            </View>
            :
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{language.AUTODEBIT__LIST_EMPTY}</Text>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default AutoDebitListSearch;
