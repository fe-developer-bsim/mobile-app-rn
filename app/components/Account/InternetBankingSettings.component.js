import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import styles from './InternetBankingSettings.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';
import {Field} from 'redux-form';
import ibank from '../../assets/images/ibank.png';

class InternetBankingSettings extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    toggleIB: PropTypes.object,
  }

  state = {
    toggleCheck: false,
  }

  handleIBtoggle = () => {
    const {toggleIB, handleSubmit} = this.props;
    const tog = true;
    this.setState({
      toggleCheck: toggleIB === 'YES' ? tog : !tog,
    });
    setTimeout(() => {
      handleSubmit();
    }, 500);
  }

  render () {
    const {toggleIB} = this.props;
    const tog = true;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.roboto]}>{language.TITLE_INTERNET_BANKING_PAGE}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.greyLine} />
          <View style={[styles.menu, styles.rowCenter]}>
            <View style={styles.rowCenter}>
              <View style={styles.iconContainer}>
                <Image source={ibank} style={styles.iconSize}/>
              </View>
              <View>
                <Text style={[styles.menuTitle, styles.roboto]}>{language.TITLE_INTERNET_BANKING}</Text>
              </View>
            </View>
            <View style={styles.rowCenter}>
              <View style={styles.switchRight}>
                <Field
                  name='checkIB'
                  component={Switch}
                  onChangeHandler={this.handleIBtoggle}
                  defaultValue={toggleIB === 'NO' ? !tog : tog}
                  fontSize={12}
                  colorBrand={false}
                  switchWidth={68}
                  switchHeight={32}
                  buttonWidth={25}
                  buttonHeight={25}
                />
              </View>
            </View> 
          </View>
          <View style={styles.greyLine} />
          <View style={[styles.menu, styles.rowCenter]}>
            <View style={styles.tipsBox}>
              <View style={styles.cautionMargin}>
                <View style={styles.width}>
                  <SimasIcon style={styles.cautionFill} name='caution-circle' size={25}/>
                </View>
              </View>
              <View>
                <View style={styles.tipsBoxText}>
                  <Text style={styles.tipsTxt}>{language.INTERNET_BANKING_TIPS_ONE}</Text>
                  <Text style={styles.tipsTxt}>{language.INTERNET_BANKING_TIPS_TWO}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default InternetBankingSettings;
