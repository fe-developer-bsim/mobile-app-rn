import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Clipboard} from 'react-native';
import styles from './EmoneyTopUpBankBranch.style';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import Touchable from '../../components/Touchable.component';
import {result} from 'lodash';

class ChooseCreditCard extends React.Component {
  static propTypes = {
    goToATM: PropTypes.func,
    goToPlatinum: PropTypes.func,
    goToOrami: PropTypes.func,
    goToAlfamart: PropTypes.func,
    mockImageLocation: PropTypes.bool,
    indigoEnabledNTB: PropTypes.bool,
    indigoEnabledETB: PropTypes.bool,
    platinumEnabledNTB: PropTypes.bool,
    platinumEnabledETB: PropTypes.bool,
    oramiEnabledNTB: PropTypes.bool,
    oramiEnabledETB: PropTypes.bool,
    alfamartEnabledNTB: PropTypes.bool,
    alfamartEnabledETB: PropTypes.bool,
    isLogin: PropTypes.bool,
    emoneyAccount: PropTypes.object,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed1: true,
    summaryCollapsed2: true,
    summaryCollapsed3: true,
    summaryCollapsed4: true,
    summaryCollapsed5: true,
    summaryCollapsed6: true,
  }

  summaryCollapse1 = () => {
    this.setState({summaryCollapsed1: !this.state.summaryCollapsed1});
  }
  summaryCollapse2 = () => {
    this.setState({summaryCollapsed2: !this.state.summaryCollapsed2});
  }
  summaryCollapse3 = () => {
    this.setState({summaryCollapsed3: !this.state.summaryCollapsed3});
  }
  summaryCollapse4 = () => {
    this.setState({summaryCollapsed4: !this.state.summaryCollapsed4});
  }
  summaryCollapse5 = () => {
    this.setState({summaryCollapsed5: !this.state.summaryCollapsed5});
  }
  summaryCollapse6 = () => {
    this.setState({summaryCollapsed6: !this.state.summaryCollapsed6});
  }

  copyAccountNumber = () => {
    const {emoneyAccount} = this.props;
    const accountNumber = result(emoneyAccount, 'accountNumber', '');
    Clipboard.setString(accountNumber);
  }

  render () {
    const showDetailAmt1 = this.state.summaryCollapsed1;
    const {emoneyAccount} = this.props;
    const accountNumber = result(emoneyAccount, 'accountNumber', '');
    return (
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            <View style={styles.titleTextContainer}>
              <Text style={[styles.titleText, styles.roboto]}>Choose bank</Text>
            </View>
            <View style={styles.rowContainerSpace}>
              <Text style={[styles.roboto]}>BCA</Text>
              <SimasIcon onPress={this.summaryCollapse1} name={'arrow'} size={13} style={showDetailAmt1 ? styles.arrowDown : styles.arrowUp}/>
            </View>
            <Collapsible collapsed={this.state.summaryCollapsed1} refName='summary'>
              <View style={styles.collapseContainer}>
                <View style={styles.rowContainerSpace}>
                  <View>
                    <Text style={[styles.roboto]}>Account Number</Text>
                    <Text style={[styles.bold, styles.roboto]}>{accountNumber}</Text>
                  </View>
                  <View>
                    <Touchable onPress={this.copyAccountNumber}>
                      <Text style={[styles.textRed, styles.roboto]}>COPY</Text>
                    </Touchable>
                  </View>
                </View>
                <View style={styles.greyLine} />
                <View style={styles.detailTitleContainer}><Text style={styles.bold}>Instruction</Text></View>
                <View style={styles.rowContainer}>
                  <View style={styles.numberContainer}><Text style={[styles.numberText]}>1</Text></View>
                  <View style={styles.rowText}><Text style={[styles.roboto]}>Login to </Text><Text style={[styles.bold, styles.roboto]}>m-BCA</Text></View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                  <View style={styles.rowText}><Text style={[styles.roboto]}>Login to </Text><Text style={[styles.bold, styles.roboto]}>m-BCA</Text></View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                  <View style={styles.rowText}><Text style={[styles.roboto]}>Login to </Text><Text style={[styles.bold, styles.roboto]}>m-BCA</Text></View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
                  <View style={styles.rowText}><Text style={[styles.roboto]}>Login to </Text><Text style={[styles.bold, styles.roboto]}>m-BCA</Text></View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.numberContainer}><Text style={styles.numberText}>5</Text></View>
                  <View style={styles.rowText}><Text style={[styles.roboto]}>Login to </Text><Text style={[styles.bold, styles.roboto]}>m-BCA</Text></View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.numberContainer}><Text style={styles.numberText}>6</Text></View>
                  <View style={styles.rowText}><Text style={[styles.roboto]}>Login to </Text><Text style={[styles.bold, styles.roboto]}>m-BCA</Text></View>
                </View>
              </View>
            </Collapsible>
          </View>
        </View>
      </ScrollView>
    );
  }

}

export default ChooseCreditCard;
