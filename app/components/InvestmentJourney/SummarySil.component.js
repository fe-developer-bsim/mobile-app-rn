import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './SummarySil.styles';
import {formatForexAmount} from '../../utils/transformer.util';
import {result, map} from 'lodash';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import Collapsible from 'react-native-collapsible';

const totalSeconds = 60;

class Summary extends React.Component {
  static propTypes = {
    summaryDetail: PropTypes.object,
    goToEmFund: PropTypes.func,
    infoPolis: PropTypes.object,
    emFundEnabled: PropTypes.bool,
    getFlagEmergencyFund: PropTypes.bool,
    totalNilaiPolis: PropTypes.array,
    lastUpdate: PropTypes.string
  }

  state = {
    secondsRemaining: totalSeconds,
    disabled: false,
    minHeight: 50,
    maxHeight: 100,
    summaryCollapsed: true,
  }

  componentDidMount = () => {
    this.setState({disabled: false});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }


  render () {
    const {totalNilaiPolis, lastUpdate} = this.props;
    const summaryText = this.state.summaryCollapsed  ? 'Show Detail' :  'Hide Detail';

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <View style={styles.nameContainer} >
              <Text style={styles.welcome}>Summary Portofolio</Text>
              <Touchable onPress={this.summaryCollapse} style={[styles.collapsibleContainer]}>
                <Text style={styles.details}>{summaryText}</Text> 
              </Touchable>
            </View>
          </View>
        </View>
        <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
          <View style={styles.borderGreyTop}/>
          <View style={styles.titleTotalSummary}>
            <Text style={styles.title}>{language.INQUIRY__SIL_TOTAL_POLICY_SUMMARY}</Text>
          </View>
          {map(totalNilaiPolis, (value, k) => {
            const kurs = result(value, 'kurs', '');
            const totalNilaiPolisSummary = result(value, 'totalNilaiPolis', 0);
            return (
              <View key={k} style={styles.row}>
                <Text style={styles.titleKurs}>{kurs} </Text>
                <Text style={styles.value}>{formatForexAmount(totalNilaiPolisSummary, kurs)}</Text>
              </View>);
          }
          )}
          <View style={styles.titleLastUpdate}>
            <Text style={styles.titleTime}>{language.INQUIRY__SIL_LAST_UPDATE}</Text>
            <Text style={styles.valueTime}>{lastUpdate}</Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default Summary;
