import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {language} from '../../config/language';
import styles from './EmoneySummary.styles';
import {currencyFormatter} from '../../utils/transformer.util';
import result from 'lodash/result';
import Poin from '../../assets/images/poin.png';
import Touchable from '../../components/Touchable.component';
import isEmpty from 'lodash/isEmpty';
import SimasIcon from '../../assets/fonts/SimasIcon';
import BackgroundTimer from 'react-native-background-timer';
import Collapsible from 'react-native-collapsible';

const totalSeconds = 60;

class Summary extends React.Component {
  static propTypes = {
    emoney: PropTypes.object,
    userName: PropTypes.string,
    simasPoin: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
  }

  state = {
    secondsRemaining: totalSeconds,
    disabled: false,
    summaryCollapsed: true,
    forexCollapsed: true,
    minHeight: 50,
    maxHeight: 100
  }

  tick = () => {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      this.setState({disabled: false});
    } else {
      this.setState({disabled: true});
    }
  }

  componentDidMount = () => {
    this.setState({disabled: false});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  reloadSimaspoin = () => {
    const {inquirySimasPoin} = this.props;
    this.setState({disabled: true});
    return inquirySimasPoin().then(() => {
      this.interval = BackgroundTimer.setInterval(this.tick, 1000);
      this.setState({
        secondsRemaining: totalSeconds,
        reload: false
      });
    }).catch(() => {
      this.setState({
        secondsRemaining: 0,
        reload: false,
      });
    });
  }

  _handleRef = (ref) => {
    this.contentHandle = ref;
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  render () {
    const {emoney, userName, simasPoin} = this.props;
    const poin = result(simasPoin, 'simasPoin.data.total_point');
    const {...reduxFormProps} = this.props;
    const {SimasPoinHistory} = reduxFormProps;
    const status = result(simasPoin, 'status');
    
    return (
      <View style={styles.container}>
        <View>
          <View>
            <View style={styles.nameContainer} >
              <Text style={styles.welcome}>{language.DASHBOARD__WELCOME}{userName}</Text>
            </View>
            { isEmpty(simasPoin) ?
              <Touchable  onPress={this.reloadSimaspoin} style={styles.touchableRowPoin}>
                <View style={styles.containerPoin} >
                  <Text style={styles.error}>{language.SIMAS_POIN__RELOAD} </Text>
                  <View style={styles.imageContainer}><SimasIcon name='reload' style={styles.iconStyle} size={10}/></View>
                </View>
              </Touchable>
              : status === 'loading' ?
                <View style={styles.touchableRowPoin}>
                  <View style={styles.containerPoin} >
                    <ActivityIndicator size='small' color={styles.red}/>
                  </View>
                </View>
                :
                <View style={styles.touchableRowPoin}>
                  { !isEmpty(poin) ?
                    <Touchable onPress={SimasPoinHistory} style={styles.containerPoin}>
                      <Text style={styles.stylePoin}>{poin === 0 ? '-' : currencyFormatter(poin)} </Text>
                      <View style={styles.imageContainer}><Image source={Poin} style={styles.poinImage}/></View>
                      <View style={styles.iconContainer}><SimasIcon name='simaspoin-mutasi' size={20} style={styles.iconStyleRed}/></View>
                    </Touchable>
                    :
                    <Touchable disabled={this.state.disabled} onPress={this.reloadSimaspoin} style={styles.containerPoin}>
                      <Text style={styles.error}>{language.SIMAS_POIN__RELOAD} </Text>
                      <View style={styles.imageContainer}><SimasIcon name='reload' style={styles.iconStyle} size={10}/></View>
                    </Touchable>
                  }
                </View>
            }
          </View>
        </View>
        <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
          <View style={styles.summary}>
            <View style={styles.row}>
              <Text style={styles.title}>{language.DASHBOARD__ACCOUNT_EMONEY}</Text>
              <Text style={styles.value}>Rp {currencyFormatter(result(emoney, 'availableBalance', ''))}</Text>
            </View>
          </View>
        </Collapsible>
        <Touchable onPress={this.summaryCollapse} style={styles.collapsibleContainer}>
          <View style={styles.collapsibleButton}/>
        </Touchable>
      </View>
    );
  }
}

export default Summary;
