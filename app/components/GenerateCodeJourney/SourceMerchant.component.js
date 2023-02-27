import {View, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceMerchant.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator} from '../../utils/transformer.util';
import MerchantList from './MerchantList.component';

class SourceAccount extends React.Component {
  static propTypes = {
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    getConfirmation: PropTypes.func,
    navigation: PropTypes.object,
    billerLKD: PropTypes.object

  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }

  renderListItem = ({item}) => (<MerchantList {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {billerLKD} = this.props;
    
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View style={styles.row}>
            <FlatList enableEmptySections data={billerLKD} renderItem={this.renderListItem} removeClippedSubviews={false}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SourceAccount;
