import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import QuickPickListItemSend from './QuickPickListItemSend.component';
import {wrapMethodInFunction} from '../../utils/transformer.util';

import noop from 'lodash/noop';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import styles from './QuickPickListSend.style';
import {language} from '../../config/language';


class QuickPickList extends Component {
  static propTypes = {
    listOfItems: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryTextKey: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    onDeleteClick: PropTypes.func,
    payeeStatus: PropTypes.object
  }

  renderItem = ({item}) => {
    const  {textKey = '', subtextKey = '', secondaryTextKey = '', onSelect = noop, onDeleteClick = noop, disabled = false} = this.props;
    const subtext = result(item, subtextKey, '');
    const text = result(item, textKey, '');
    const secondaryText = result(item, secondaryTextKey, '');
    return <QuickPickListItemSend text={text} subtext={subtext} secondaryText={secondaryText} onPress={wrapMethodInFunction(onSelect, item)}
      disabled={disabled} onDelete={wrapMethodInFunction(onDeleteClick, item)}/>;
  }

  render () {
    const {listOfItems = [], payeeStatus, ...extraProps} = this.props;
    // const dataSource = ds.cloneWithRows(listOfItems);
    return <View style={styles.container}>

      {
        !isEmpty(payeeStatus) ?
          <View style={styles.activityContainer}>
            <ActivityIndicator size='large'/>
          </View>
          :
          (listOfItems.length > 0)
            ? (<FlatList keyboardShouldPersistTaps='handled' removeClippedSubviews={false} style={styles.listView}
              data={listOfItems}
              enableEmptySections={true}
              renderItem={this.renderItem}
              {...extraProps}
            />)
            :
            (<View style={styles.emptyListContainer}>
              <Text style={styles.emptyList}>{language.PAY_BILLS__HISTORY_NOTHING}</Text>
            </View>)
      }
    </View>;
  }

}

export default QuickPickList;