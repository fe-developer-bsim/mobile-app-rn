import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './SILChoosePolisInquiry.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {listViewComparator} from '../../utils/transformer.util';
import noop from 'lodash/noop';


class SmartInvestaLinkPolisComponent extends React.Component {
  static propTypes = {
    items: PropTypes.object,
    onGoNext: PropTypes.func,
    onGoNextBuy: PropTypes.func
  }
  
  comparator = listViewComparator

  render () {
    const {onGoNext = noop, onGoNextBuy, items} = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={onGoNext(items)}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{language.SINARMAS__INQ_POLIS}</Text> 
            </View>
            <SimasIcon name={'arrow'} size={15} style={styles.blackArrow}/>
          </View>
        </Touchable>
        <View style={styles.greyLine} />
        < Touchable onPress={onGoNextBuy}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{language.SINARMAS__BUY_POLIS}</Text> 
            </View>
            <SimasIcon name={'arrow'} size={15} style={styles.blackArrow}/>
          </View>
        </Touchable>
        <View style={styles.greyLine} />
      </View>
      
    );
  }
}

export default SmartInvestaLinkPolisComponent;
