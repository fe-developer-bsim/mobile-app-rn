import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './Products.styles';
import Touchable from '../../components/Touchable.component';
import {isEmpty} from 'lodash';

class TabProduct extends React.Component {
  static propTypes = {
    listProducts: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToTnC: PropTypes.func,
    show: PropTypes.bool
  }
  
  renderProducts = (item) => {
    const {goToTnC, currentLanguage, show} = this.props;
    const flag = show ? item.productEnabledETB : item.productEnabledNTB;
    const title = currentLanguage === 'id' ? item.productNameID : item.productNameEN;
    const description = currentLanguage === 'id' ? item.productDescID : item.productDescEN;
    
    return (
      <View>
        {flag === true ? 
          <View>
            <Touchable onPress={goToTnC(item)} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainerCC}>
                  <Image source={{uri: item.productImage}} style={styles.imageCC} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{title}</Text>
                  <Text style={styles.txtLight}>{description}</Text>
                </View>
              </View>
            </Touchable>
          </View> 
          : null
        } 
      </View>
    );
  }
    
  render () {
    const {listProducts} = this.props;
    return (
      <View style={styles.productContainer}>
        {isEmpty(listProducts) ? null : listProducts.map(this.renderProducts)}
      </View>
    );
  }
}
  
export default TabProduct;