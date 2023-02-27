import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './Tabs.styles';
import {result} from 'lodash';
import {language} from '../../config/language';

class Casa extends React.Component {
  static propTypes = {
    detailProductData: PropTypes.array,
    currentMerchant: PropTypes.array,

  }

  render () {
    const {detailProductData, currentMerchant} = this.props;
    const merchant = result(currentMerchant, 'name', '');

    const productCode = result(detailProductData, 'programId', '');
    const productCodeCMI = result(detailProductData, 'productCode', '');

    const spesification = result(detailProductData, 'shortDescription', []);

    const brand = result(detailProductData, 'brand', '');
    const length = result(detailProductData, 'length', '');
    const width = result(detailProductData, 'width', '');
    const height = result(detailProductData, 'height', '');
    const weight = result(detailProductData, 'weight', '');

    return (
      <View style={styles.tabInvestmentContainer}>
        <View style={styles.transparentContainer}>
          {
            merchant === 'ALFACART' ?
              <Text style={styles.textBrand}>{productCode}</Text>
              :
              <Text style={styles.textBrand}>{productCodeCMI}</Text>

          }
          <Text style={styles.textBrand}>{productCode}</Text>
        </View>
        <View style={styles.brandContainer}>
          <Text>{language.ALFACART_DETAIL_PRODUCT_SPESIFICATION_BRAND}{brand}</Text>
        </View>
        {
          merchant === 'ALFACART' ?
            <View style={styles.transparentContainer}>
              {spesification.map((item) => (
                <Text>
                  {item}
                </Text>
              ))}
            </View>
            :
            <View style={styles.transparentContainer}>
              <Text>{spesification}</Text>
            </View>
        }

        <View style={styles.brandContainer}>
          <Text>{language.ALFACART_DETAIL_PRODUCT_SPESIFICATION_LENGTH}{length} {'cm'}</Text>
          <Text>{language.ALFACART_DETAIL_PRODUCT_SPESIFICATION_WIDTH}{width} {'cm'}</Text>
          <Text>{language.ALFACART_DETAIL_PRODUCT_SPESIFICATION_HEIGHT}{height} {'cm'}</Text>
          <Text>{language.ALFACART_DETAIL_PRODUCT_SPESIFICATION_WEIGHT}{weight} {'gr'}</Text>
        </View>
      </View>

    );
  }
}

export default Casa;