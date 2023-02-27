import {View, Text, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardLessWithdrawalSourceAccount.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator} from '../../utils/transformer.util';
import CardLessWithdrawalAccItem from './CardLessWithdrawalAccItem.component';
import result from 'lodash/result';

class CardLessWithdrawalSourceAccount extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    navigation: PropTypes.object,
    goLanding: PropTypes.func,
    simasPoin: PropTypes.object,
    getUseSimas: PropTypes.func,
    simasConfig: PropTypes.object,
    selectingAccount: PropTypes.func,
    goBack: PropTypes.func
  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {selectingAccount = {}, navigation} = this.props;
    const form = result(navigation, 'state.params.formName', '');
    const field = result(navigation, 'state.params.fieldName', '');
    return selectingAccount ? selectingAccount(value, form, field) : {};
  }

  useSimas = () => {
    const {navigation, getUseSimas} = this.props;
    const emallData = result(navigation, 'state.params', {});
    const isUseSimas = 'yes';
    getUseSimas(isUseSimas, emallData);
  }

  renderListItem = ({item}) => (<CardLessWithdrawalAccItem {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {accounts} = this.props;
    const data = accounts;
    
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

export default CardLessWithdrawalSourceAccount;
