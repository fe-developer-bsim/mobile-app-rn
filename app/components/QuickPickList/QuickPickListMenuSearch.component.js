import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text} from 'react-native';
import QuickPickListItemMenuSearch from './QuickPickListItemMenuSearch.component';
import QuickPickListSearchItem from './QuickPickListSearchItem.component';
import {wrapMethodInFunction} from '../../utils/transformer.util';

import noop from 'lodash/noop';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import styles from './QuickPickListMenuSearch.style';
import Touchable from '../../components/Touchable.component';


class QuickPickList extends Component {
  static propTypes = {
    listOfItems: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryTextKey: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    listType: PropTypes.string,
    recommendationData: PropTypes.array,
    renderDataRecomen: PropTypes.func,
    dataRecentSearch: PropTypes.array,
    clearRecentSearch: PropTypes.func,

  }

  renderItem = ({item}) => {
    const  {textKey = '', subtextKey = '', secondaryTextKey = '', onSelect = noop, disabled = false, listType = ''} = this.props;
    const subtext = result(item, subtextKey, '');
    const text = result(item, textKey, '');
    const secondaryText = result(item, secondaryTextKey, '');

    return  listType === 'search' ?
      <QuickPickListSearchItem text={text} subtext={subtext} secondaryText={secondaryText} onPress={wrapMethodInFunction(onSelect, item)} disabled={disabled}/>
      :
      <QuickPickListItemMenuSearch text={text} subtext={subtext} secondaryText={secondaryText} onPress={wrapMethodInFunction(onSelect, item)} disabled={disabled}/>;
  }

  render () {
    const {listOfItems = [], recommendationData, renderDataRecomen, clearRecentSearch, dataRecentSearch, ...extraProps} = this.props;
    // const dataSource = ds.cloneWithRows(listOfItems);
    return <View style={styles.container}>
      {(listOfItems.length > 0) ? 
        <View>
          <Text style={styles.styleMessageResult}>Results</Text>
          <FlatList keyboardShouldPersistTaps='handled' removeClippedSubviews={false} style={styles.listView}
            data={listOfItems}
            enableEmptySections={true}
            renderItem={this.renderItem}
            {...extraProps}/>
        </View>
        :   
        null
      }

      <View style={styles.containerRecommend}>
        <Text style={styles.styleMessage}>Recommendation</Text>
      </View>
      <View style={styles.serviceItemRow}>
        {recommendationData.map(renderDataRecomen)}
      </View>

      <View style={styles.containerRecentRow} >
        <View style={styles.textEstoreTitle} >
          <Text style={styles.styleMessage}>Recent Search</Text>
        </View>
        <View style={styles.textBillPayStyle2} >
          <Touchable onPress={clearRecentSearch}>
            <Text style={styles.styleMessageSeeAllBiller}>Clear</Text>
          </Touchable>
        </View>

      </View>
      <View style={styles.serviceItemRow}>
        {
          isEmpty(dataRecentSearch) ? null :
            dataRecentSearch.map(renderDataRecomen)
        }
      </View>
    </View>;
  }

}

export default QuickPickList;
