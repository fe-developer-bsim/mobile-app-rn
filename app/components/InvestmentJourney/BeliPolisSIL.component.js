import React from 'react';
import PropTypes from 'prop-types';
import {Text, FlatList, View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './BeliPolisSIL.styles';
import {listViewComparator, listLang} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';

class BeliPolisSIL extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    goToNextPage: PropTypes.func
  }
  comparator = listViewComparator;
  
  renderList = ({item}) => {
    const {goToNextPage} = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={goToNextPage(item)}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{listLang(item.code)}</Text> 
            </View>
            <SimasIcon name={'arrow'} size={15} style={styles.blackArrow}/>
          </View>
        </Touchable>
        <View style={styles.greyLine} />
      </View>
    );
  }

  render () {
    
    const {items} = this.props;
    return (
      <View style={styles.tabInvestmentContainer}>
        <FlatList enableEmptySections data={items} renderItem={this.renderList}/>
      </View>
    );
  }
}

export default BeliPolisSIL;