import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, Text} from 'react-native';
import QuickPickListItemQR from './QuickPickListItemQR.component';
import {wrapMethodInFunction} from '../../utils/transformer.util';

import noop from 'lodash/noop';
import result from 'lodash/result';
import styles from './QuickPickList.style';
import {language} from '../../config/language';


class QuickPickList extends Component {
  static propTypes = {
    listOfItems: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryTextKey: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    checkedCity: PropTypes.object,
  }

  renderItem = ({item}) => {
    const {textKey = '', subtextKey = '', secondaryTextKey = '', onSelect = noop, disabled = false, checkedCity} = this.props;
    const subtext = result(item, subtextKey, '');
    const text = result(item, textKey, '');
    const secondaryText = result(item, secondaryTextKey, '');
    const checked = result(item, 'code', '') === result(checkedCity, 'code', '');
    return <QuickPickListItemQR text={text} subtext={subtext} secondaryText={secondaryText} onPress={wrapMethodInFunction(onSelect, item)} checked={checked}
      disabled={disabled}/>;
  }

  render () {
    const {listOfItems = [], ...extraProps} = this.props;
    // const dataSource = ds.cloneWithRows(listOfItems);

    return <View style={styles.container}>
      {(listOfItems.length > 0)
        ? (<FlatList keyboardShouldPersistTaps='handled' removeClippedSubviews={false} style={styles.listView}
          data={listOfItems}
          enableEmptySections={true}
          renderItem={this.renderItem}
          {...extraProps}
        />)
        : (<Text style={styles.emptyList}>{language.QUICK_PICK_LIST__NOTHING_TO_SHOW}</Text>)
      }
    </View>;
  }

}

export default QuickPickList;
