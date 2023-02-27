import {View, Text, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceAccount.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator} from '../../utils/transformer.util';
import AccountList from './AccountList.component';

class LoanSourceAccount extends React.Component {
  static propTypes = {
    listAccounts: PropTypes.array,
    getConfirmation: PropTypes.func,
  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }

  renderListItem = ({item}) => (<AccountList {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {listAccounts} = this.props;
    
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
            <FlatList enableEmptySections data={listAccounts} renderItem={this.renderListItem} removeClippedSubviews={false}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default LoanSourceAccount;
