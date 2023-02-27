import {View, Image, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRTerminalStatus.styles';
import LogoImage from '../../assets/images/white-simobi.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';

class QRTerminalStatus extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  render () {
    const {handleSubmit} = this.props;    
    return (
      <View style={styles.container}>
        <View style={styles.redContainer}>
          <Image source={LogoImage} style={styles.logoImage}/>        
          <View style={styles.regCont}>
            <View>
              <Text style={styles.merchantText}>{language.QR_GPN__TERMINAL_SUCCESS_01}</Text>            
              <Text style={styles.merchantText}>{language.QR_GPN__TERMINAL_SUCCESS_02}</Text>
            </View>
            <View style={styles.plusContainer}>          
              <SimasIcon name={'check-black'} size={30} style={styles.plusIcon}/>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.whiteText}>{language.QR_GPN__TERMINAL_SUCCESS_03}</Text>
            <View style={styles.row}>
              <Text style={styles.whiteUnderlineText}>{language.QR_GPN__TERMINAL_SUCCESS_04}</Text>
              <Text style={styles.whiteText}>{language.QR_GPN__TERMINAL_SUCCESS_05}</Text>
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
                <SimasIcon name={'waiting'} size={40} style={styles.waitIcon}/>
              </View>
              <View style={styles.info2}>
                <Text style={styles.txt}>{language.QR_GPN__TERMINAL_SUCCESS_06}</Text>
                <Text style={styles.txt}>{language.QR_GPN__TERMINAL_SUCCESS_07}</Text>
                <Text style={styles.txt}>{language.QR_GPN__TERMINAL_SUCCESS_08}</Text>
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


export default QRTerminalStatus;
