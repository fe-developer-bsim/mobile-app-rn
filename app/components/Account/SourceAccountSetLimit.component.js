import styles from './SourceAccountSetLimit.styles';
import {View, Text, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator, getAllAccountsExcludeEmoneyFT} from '../../utils/transformer.util';
import AccountList from './AccountList.component';
import result from 'lodash/result';

class SourceAccount extends React.Component {
  static propTypes = {
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    getConfirmation: PropTypes.func,
    navigation: PropTypes.object,
  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }

  renderListItem = ({item}) => (<AccountList {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {accountsBiller, accountsTransfer, navigation} = this.props;
    const sourceType = result(navigation, 'state.params.sourceType', '');
    const isTopup = result(navigation, 'state.params.isTopup', '');
    const accountTransferCustom = isTopup ? getAllAccountsExcludeEmoneyFT(accountsTransfer) : accountsTransfer;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
         
          <View>
            <Text style={styles.subtitleTxt}>{language.CHOOSE_SOURCE_ACCOUNT}</Text>
          </View>
          <View>
            { sourceType === 'genericBiller' ?
              <FlatList enableEmptySections data={accountsBiller} renderItem={this.renderListItem} removeClippedSubviews={false}/>
              : sourceType === 'fundTransfer' ?
                <FlatList enableEmptySections data={accountTransferCustom} renderItem={this.renderListItem} removeClippedSubviews={false}/>
                :
                null
            }
            
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SourceAccount;
