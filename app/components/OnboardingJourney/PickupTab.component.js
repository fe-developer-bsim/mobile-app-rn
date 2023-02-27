import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './ShippingTabComponent.style';
import {result} from 'lodash';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import ElevatedView from '../ElevatedView/ElevatedView.component';


class Casa extends React.Component {
  static propTypes = {
    addressResult: PropTypes.array,
    storeList: PropTypes.array,
    pickAddres: PropTypes.func,
    goTosearchStore: PropTypes.func
  }

  render () {
    const {addressResult, storeList, pickAddres, goTosearchStore} = this.props;
    const addressList = result(addressResult, 'data.result', []);

    return (
      <View style={styles.tabInvestmentContainer}>
        <View style={styles.transparentContainer}>
          <Text>{addressList}</Text>
        </View>

        <View style={styles.transparentContainer}>
          {storeList.map((item) => (
            <Touchable onPress={pickAddres(item, '0')}>
              <View style={styles.borderAddress}>
                <Text style={styles.addressText}>
                  {item.name}
                </Text>
                <Text>
                  {item.address1}
                </Text>
                <Text>
                  {item.nameCity}
                </Text>
                <Text>
                  {item.postalCode}
                </Text>
              </View>
            </Touchable>
          ))}
        </View>
        <View>
          <Touchable onPress={goTosearchStore} style={styles.FilterStyle}>
            <ElevatedView elevation={2} style={styles.filterButton}>
              <Text style={styles.blackText}>{language.ALFACART_FILTER_BUTTON_PICKUP}</Text>
              <SimasIcon name='filter' style={styles.filterIcon} size={15}/>
            </ElevatedView>
          </Touchable>
        </View>
      </View>


    );
  }
}

export default Casa;
