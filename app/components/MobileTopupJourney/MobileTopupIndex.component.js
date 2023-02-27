import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import NavListItem from '../NavListItem/NavListItem.component';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import styles from './MobileTopupIndex.style.js';
import {language} from '../../config/language';

class MobileTopupIndex extends Component {
  static propTypes = {
    onNewTopup: PropTypes.func,
    onRecentTopup: PropTypes.func,
    recentTopupList: PropTypes.array
  }

  render () {
    const {recentTopupList, onNewTopup, onRecentTopup} = this.props;
    return (
      <View style={styles.container}>
        <NavListItem label={language.PAY_MOBILE_TOP_UP__INNER_TITLE} subtitle={language.PAY_MOBILE_TOP_UP__INNER_SUBTITLE} featureIconName='mobile-topup' onPress={onNewTopup}/>
        <Text style={styles.pickTopupHeader}>{language.MOBILE_TOPUP__SELECT_RECENT}</Text>
        <QuickPickList listOfItems={recentTopupList} textKey='subscriberNoInput' subtextKey='biller.name' secondaryTextKey='amount.label' onSelect={onRecentTopup}/>
      </View>
    );
  }
}

export default MobileTopupIndex;
