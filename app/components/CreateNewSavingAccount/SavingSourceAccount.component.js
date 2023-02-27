import {View, Text, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavingSourceAccount.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator} from '../../utils/transformer.util';
import SavingAccounts from './SavingAccounts.component';

class SavingSourceAccount extends React.Component {
  static propTypes = {
    filteredAccount: PropTypes.array,
    getConfirmation: PropTypes.func,
    navigation: PropTypes.object,
    savingProductType: PropTypes.string,
    filteredAccountSavingValasExcept: PropTypes.array,
  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }


  renderListItem = ({item}) => (<SavingAccounts {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {filteredAccount, savingProductType, filteredAccountSavingValasExcept} = this.props;
    const data = savingProductType === 'savingValas' ? filteredAccountSavingValasExcept : filteredAccount;
    
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titleTxt}>{language.CGV__PAY_FROM}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subtitleTxt}>{language.CGV__ACCOUNTS}</Text>
          </View>
          <View>
            <FlatList enableEmptySections data={data} renderItem={this.renderListItem} removeClippedSubviews={false}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SavingSourceAccount;
