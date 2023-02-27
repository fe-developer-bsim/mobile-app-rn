import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {language} from '../../config/language';
import styles from './Services.styles';
import {listViewComparator} from '../../utils/transformer.util';
import BlockListAccounts from './BlockListAccounts.component';
import isEmpty from 'lodash/isEmpty';
import SimasIcon from '../../assets/fonts/SimasIcon';

class BlockList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    cardInactive: PropTypes.object,
    data: PropTypes.array,
    goToPopUpBlocked: PropTypes.func,
  }
  comparator = listViewComparator

  popUpBlocked = () => () => {
    const {goToPopUpBlocked = {}} = this.props;
    return goToPopUpBlocked ? goToPopUpBlocked() : {};
  }

  renderListItem = ({item}) => (<BlockListAccounts {...item} goToPopUpBlocked={this.popUpBlocked(item)}/>);
  
  render () {
    const {data} = this.props;
    const card = data;
    
    return (
      <View style={styles.iconContainerStyle}>
        <ScrollView keyboardShouldPersistTaps='handled' styles={styles.contentContainerStyle} extraHeight={120}>
          <View style={styles.container}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>{language.TITLE__CHOOSE_BLOCKED_ATM_CARD}</Text>
            </View>
            {!isEmpty(card) ?
              <View>
                <FlatList enableEmptySections data={card} renderItem={this.renderListItem} removeClippedSubviews={false}/>
              </View>
              :
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{language.NO_ACTIVE_ATM_CARD}</Text>
              </View>
            }
          </View>
        </ScrollView>
        <View style={styles.containerIcon}>
          <View style={styles.borderCaution}>
            <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
            <Text style={styles.caution}>{language.BLOCK_DISCLAIMER}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default BlockList;