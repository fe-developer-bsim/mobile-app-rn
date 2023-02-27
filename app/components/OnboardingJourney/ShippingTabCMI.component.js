import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './ShippingTabComponent.style';
import {result, reverse, sortBy} from 'lodash';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import {SinarmasButton} from '../../components/FormComponents';

class Casa extends React.Component {
  static propTypes = {
    addressResult: PropTypes.array,
    alfacartShipmentAddress: PropTypes.array,
    pickAddres: PropTypes.func,
    goToFormFillAddres: PropTypes.func,
    editAddress: PropTypes.func,
    deleteAddress: PropTypes.func,
    defaultAlfaAddress: PropTypes.func,
    merchant: PropTypes.string,
    // currentMerchant: PropTypes.array,
    // confrimButtonCMI: PropTypes.func,
  }

  render () {
    const {addressResult, alfacartShipmentAddress, goToFormFillAddres, editAddress, deleteAddress, defaultAlfaAddress, pickAddres} = this.props;
    const addressList = result(addressResult, 'data.result', []);
    const sortingAddress = reverse(sortBy(alfacartShipmentAddress, ['isDefault']));

    return (
      <View style={styles.tabInvestmentContainer}>
        <View style={styles.transparentContainer}>
          <Text>{addressList}</Text>
        </View>
        <View style={styles.transparentContainer}>
          {sortingAddress.map((value) => (
            <Touchable onPress={ pickAddres(value, '1')}>

              <View style={styles.borderAddress}>
                <Text style={styles.addressText}>
                  Alamat {value.addressMark}
                </Text>

                <Text>
                  {value.name}
                </Text>
                <Text>
                  {value.address1}
                </Text>
                <Text>
                  {value.postalCode}
                </Text>
                <View style={styles.greyLine2}/>

                <Text>
                  {value.mobilePhone}
                </Text>
                <Text>
                  {value.email}
                </Text>
                <View style={styles.menuBar}>
                  <Touchable onPress={defaultAlfaAddress(value) }>
                    <Text style={styles.colorButtonNew}>{language.ALFACART__SET_AS_PRIMARY_ADDRESS}</Text>
                  </Touchable>
                  <Text>
                    {'|'}
                  </Text>
                  <Touchable onPress={editAddress(value)}>
                    <Text style={styles.colorButtonNew}>{language.ALAFACART_EDIT_ADDRESS}</Text>
                  </Touchable>
                  <Text>
                    {'|'}
                  </Text>
                  <Touchable onPress={deleteAddress(value)}>
                    <Text style={styles.colorButtonNew}>{language.GENERIC__DELETE}</Text>
                  </Touchable>
                </View>
              </View>
            </Touchable>

          ))}

        </View>
        <View style={styles.greyLine2}/>
        <View style={styles.buttonCenter}>
          <SinarmasButton onPress={goToFormFillAddres}>
            <Text style={styles.textProductTitle2}>{language.ADD_NEW_ADDRESS_TEXT__BUTTON}</Text>
          </SinarmasButton>
        </View>
      </View>

    );
  }
}

export default Casa;
