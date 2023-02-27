import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Carousel from '../Carousel/Carousel.component';
import styles from './SinarmasSekuritas.styles';
import SinarmasSekuritasInfo from './SinarmasSekuritasInfo.component';
import {result} from 'lodash';

class Casa extends React.Component {
  static propTypes = {
    productList: PropTypes.array,
    transactionList: PropTypes.array,
    goBuyReksadana: PropTypes.func,
    goSellReksadana: PropTypes.func,
    dataSummary: PropTypes.array, 
  }

  _renderItem = (data) => {
    const {goBuyReksadana, goSellReksadana} = this.props;
    const item = result(data, 'item', {});
    return (
      <View>
        <SinarmasSekuritasInfo item={item} goBuyReksadana={goBuyReksadana} goSellReksadana={goSellReksadana}/>
      </View> 
    );
  }

  render () {
    const {productList, goBuyReksadana, goSellReksadana} = this.props;
    return (
      <View style={styles.container}>
        <Carousel data={productList} renderCard={this._renderItem} goBuyReksadana={goBuyReksadana} goSellReksadana={goSellReksadana}/>
      </View>
    );
  }
}

export default Casa;
