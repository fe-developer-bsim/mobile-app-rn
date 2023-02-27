import {View, Text, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CloseCard.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator} from '../../utils/transformer.util';
import CloseCardAccount from './CloseCardAccounts.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import isEmpty from 'lodash/isEmpty';

class CloseCard extends React.Component {
  static propTypes = {
    filteredAccount: PropTypes.array,
    navigation: PropTypes.object,
    savingProductType: PropTypes.string,
    getAccountData: PropTypes.func,
    filteredAccountSavingValas: PropTypes.array
  }
  comparator = listViewComparator

  renderDataSaving=(values) => () => {
    const {getAccountData = {}} = this.props;
    return getAccountData ? getAccountData(values) : {};
  }

  renderListItem = ({item}) => (<CloseCardAccount {...item} getAccountData={this.renderDataSaving(item)}/>);

  render () {
    const {filteredAccountSavingValas} = this.props;
    const data =  filteredAccountSavingValas;
    const listAcc = data;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titleTxt}>{language.CLOSE__SAVING_ACCOUNT_SUBHEADER}</Text>
            </View>
          </View>
          {!isEmpty(listAcc) ?
            <View>
              <FlatList enableEmptySections data={listAcc} renderItem={this.renderListItem} removeClippedSubviews={false}/>
            </View>
            :
            <View>
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{language.NO_ACTIVE_ATM_CARD}</Text>
              </View>
            </View>
          }

          <View style={styles.containerIcon}>
            <View style={styles.borderCaution}>
              <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
              <Text style={styles.caution}>{language.CLOSE__SAVING_ACCOUNT_DISCLAIMER}</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default CloseCard;
