import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {language} from '../../config/language';
import styles from './Services.styles';
import {listViewComparator} from '../../utils/transformer.util';
import ActiveListAccounts from './ActiveListAccounts.component';
import isEmpty from 'lodash/isEmpty';

class ActiveList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    cardInactive: PropTypes.object,
    data: PropTypes.array,
    goToPopUpActivate: PropTypes.func,
  }
  comparator = listViewComparator

  popUpActivate = () => () => {
    const {goToPopUpActivate = {}} = this.props;
    return goToPopUpActivate ? goToPopUpActivate() : {};
  }

  renderListItem = ({item}) => (<ActiveListAccounts {...item} goToPopUpActivate={this.popUpActivate(item)}/>);
  
  render () {
    const {data} = this.props;
    const card = data;
    
    return (
      <ScrollView keyboardShouldPersistTaps='handled' styles={styles.contentContainerStyle} extraHeight={120}>
        <View style={styles.container}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.TITLE__CHOOSE_ACTIVATE_ATM_CARD}</Text>
          </View>
          {!isEmpty(card) ?
            <View>
              <FlatList enableEmptySections data={card} renderItem={this.renderListItem} removeClippedSubviews={false}/>
            </View>
            :
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{language.NO_INACTIVE_ATM_CARD}</Text>
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

export default ActiveList;