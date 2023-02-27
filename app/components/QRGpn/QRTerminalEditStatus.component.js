import {View, Image, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRTerminalEditStatus.styles';
import LogoImage from '../../assets/images/white-simobi.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';

class QRTerminalEditStatus extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object
  }

  render () {
    const {handleSubmit, navigation} = this.props;    
    const cashierName = result(navigation, 'state.params.data.username', '');
    return (
      <View style={styles.container}>
        <View style={styles.redContainer}>
          <Image source={LogoImage} style={styles.logoImage}/>        
          <View style={styles.regCont}>
            <View>
              <Text style={styles.merchantText}>{language.QR_GPN__TERMINALDEL_SUCCESS_01}</Text>            
              <Text style={styles.merchantText}>{cashierName}</Text>
              <Text style={styles.merchantText}>{language.QR_GPN__TERMINALEDIT_SUCCESS_03}</Text>                          
            </View>
            <View style={styles.plusContainer}>          
              <SimasIcon name={'check-black'} size={30} style={styles.plusIcon}/>
            </View>
          </View>
          <View style={styles.info} />
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
                <SimasIcon name={'call'} size={40} style={styles.waitIcon}/>
              </View>
              <View style={styles.info2}>
                <View style={styles.row}>
                  <Text style={styles.txt}>{language.QR_GPN__TERMINALDEL_SUCCESS_06}</Text>
                  <Text style={styles.txtUnderline}>{language.QR_GPN__TERMINALDEL_SUCCESS_07}</Text>
                  <Text style={styles.txt}>{language.QR_GPN__TERMINALDEL_SUCCESS_08}</Text>
                </View>
                <Text style={styles.txt}>{language.QR_GPN__TERMINALDEL_SUCCESS_09}</Text>                
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


export default QRTerminalEditStatus;
