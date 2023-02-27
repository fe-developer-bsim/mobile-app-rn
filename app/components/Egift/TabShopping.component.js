import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './TabShop.styles';
import TabSimasPoin from '../Egift/TabSimasPoin.component';


class ShopPage extends React.Component {
  static propTypes = {
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    getShoppingList: PropTypes.func,
    getEgiftPage: PropTypes.func,
    category: PropTypes.string,
    maximumNumberOfEachPage: PropTypes.string
  }

  onPressTab = () => {
    const {getShoppingList, category} = this.props;
    getShoppingList(category);
  }

  render () {
    const {egiftList = [], goToDetail, getEgiftPage, category, maximumNumberOfEachPage} = this.props;
    return (
      <View style={styles.containerTab}>
        <TabSimasPoin egiftList={egiftList} category={category} goToDetail={goToDetail} getShoppingList={this.onPressTab} getEgiftPage={getEgiftPage} maximumNumberOfEachPage={maximumNumberOfEachPage}/>
      </View>
    );
  }
}

export default ShopPage;
