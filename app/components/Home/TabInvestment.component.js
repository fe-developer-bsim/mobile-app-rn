import React from 'react';
import PropTypes from 'prop-types';
import {Text, FlatList, View, ImageBackground} from 'react-native';
import {listViewComparator} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import styles from './Tabs.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import {groupBy, result} from 'lodash';
import mutualFundImage from '../../assets/images/mutual-fund.png';
import bancassuranceImage from '../../assets/images/bancassurance.png';

class Casa extends React.Component {
  static propTypes = {
    accountList: PropTypes.array,
    transactions: PropTypes.array,
    navigateToTransactions: PropTypes.func,
    setCarouselReference: PropTypes.func,
    onSnapToItem: PropTypes.func,
    loadingError: PropTypes.bool,
    showReload: PropTypes.bool,
    showLoader: PropTypes.bool,
    onReloadPress: PropTypes.func,
    activeTab: PropTypes.string,
    investmentAccounts: PropTypes.object,
    investmentDataView: PropTypes.func,
    investmentDataViewSIL: PropTypes.func,
    investmentView: PropTypes.func
  }
  comparator = listViewComparator;

  renderList = ({item}) => {
    const {investmentView} = this.props;
    const groupTypes = result(item, '0.type');
    return (
      <View>
        {
          groupTypes === 'portofolio_mutualfund' ?
            <Touchable onPress={investmentView(item, groupTypes)}>
              <View style={styles.othersCardContainer}>
                <ImageBackground source={mutualFundImage} borderRadius={15} style={styles.backgroundImage}>
                  <View style={styles.rowOthers}>
                    <Text style={styles.typeLabel}>{language.SINARMAS_REKSADANA}</Text>   
                    <SimasIcon name={'arrow'} size={20} style={styles.whiteArrow}/>                    
                  </View>
                </ImageBackground>              
              </View>
            </Touchable>            
            :
            groupTypes === 'portofolio_bancassurance' ?
              <Touchable onPress={investmentView(item, groupTypes)} >          
                <View style={styles.othersCardContainer}>
                  <ImageBackground source={bancassuranceImage} borderRadius={15} style={styles.backgroundImage}>          
                    <View style={styles.rowOthers}>
                      <Text style={styles.typeLabel}>{language.SINARMAS_BANCASSURANCE}</Text>   
                      <SimasIcon name={'arrow'} size={20} style={styles.whiteArrow}/>                    
                    </View>
                  </ImageBackground>              
                </View>
              </Touchable>            
              :
              null
        }
      </View>
    );
  }

  render () {
    
    const {investmentAccounts = {}} = this.props;
    const types = result(investmentAccounts, 'type', []);
    const groupType = groupBy(types, 'type');
    return (
      <View style={styles.tabInvestmentContainer}>
        <FlatList enableEmptySections data={Object.values(groupType)} renderItem={this.renderList}/>
      </View>

    );
  }
}

export default Casa;
