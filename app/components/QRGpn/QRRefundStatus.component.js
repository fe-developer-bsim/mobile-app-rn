import {View, Image, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRRefundStatus.styles';
import LogoImage from '../../assets/images/white-simobi.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';

class QRRefundStatus extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation, handleSubmit} = this.props;    
    const refundAmount = result(navigation, 'state.params.form.refundAmount', '');
    const refundCount = result(navigation, 'state.params.form.refundCount', '');
    return (
      <View style={styles.container}>
        <View style={styles.redContainer}>
          <Image source={LogoImage} style={styles.logoImage}/>        
          <View style={styles.regCont}>
            <View>
              <Text style={styles.merchantText}>{language.QR_GPN__REFUND_STATUS_01}</Text>            
              <Text style={styles.merchantText}>{language.QR_GPN__REFUND_STATUS_02}{refundAmount}</Text>
              <Text style={styles.merchantText}>{language.QR_GPN__REFUND_STATUS_03}{refundCount}{language.QR_GPN__REFUND_STATUS_04}</Text>
              <Text style={styles.merchantText}>{language.QR_GPN__REFUND_STATUS_05}</Text>
            </View>
            <View style={styles.plusContainer}>          
              <SimasIcon name={'check-black'} size={30} style={styles.plusIcon}/>
            </View>
          </View>
        </View>
        <View style={styles.whiteContainer}>
          <View style={styles.row}>
            <View>
              <View style={styles.plusContainer}>          
                <SimasIcon name={'bullet'} size={15} style={styles.bulletIcon}/>
              </View>
            </View>
            <View>
              <View style={styles.plusContainer}>          
                <SimasIcon name={'user-black'} size={40} style={styles.waitIcon}/>
              </View>
              <View style={styles.info2}>
                <Text style={styles.txt}>{language.QR_GPN__REFUND_STATUS_06}</Text>
                <Text style={styles.txt}>{language.QR_GPN__REFUND_STATUS_07}</Text>
                <Text style={styles.txt}>{language.QR_GPN__REFUND_STATUS_08}</Text>
              </View>
            </View>  
          </View>
        </View>   
        <View style={styles.buttonAgree}>
          <SinarmasButton onPress={handleSubmit} text={language.QR_GPN__REFUND_STATUS_09} />
        </View> 
      </View>        
    );
  }
}


export default QRRefundStatus;
