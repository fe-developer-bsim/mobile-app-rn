import React from 'react';
import PropTypes from 'prop-types';
import {Text, FlatList, View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './ChooseInvestment.styles';
import {listViewComparator, listLang} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result, filter} from 'lodash';

class Investment extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    goToNextPage: PropTypes.func,
    investmentDataView: PropTypes.func,
    inquiryASJ: PropTypes.func,
    simasSekuritas: PropTypes.func,
    investmentAccounts: PropTypes.object,
    isSearch: PropTypes.bool,
    nextRouteName: PropTypes.string,
  }
  comparator = listViewComparator;
  
  renderList = ({item}) => {
    const {goToNextPage} = this.props;
    return (
      <View>
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
      </View>
    );
  }

  render () {
    
    const {items, isSearch, investmentAccounts, nextRouteName} = this.props;
    const item = result(investmentAccounts, 'type', '');
    const itemInvestment = nextRouteName === 'portofolio_mutualfund' ? filter(item, {'type': 'portofolio_mutualfund'}) : filter(item, {'type': 'portofolio_bancassurance'});

    return (
      <View style={styles.tabInvestmentContainer}>
        {
          isSearch ?
            <FlatList enableEmptySections data={itemInvestment} renderItem={this.renderList}/>
            :
            <FlatList enableEmptySections data={items} renderItem={this.renderList}/>
        }
      </View>
    );
  }
}

export default Investment;
