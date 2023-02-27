import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SendSourceAcc.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {listViewComparator} from '../../utils/transformer.util';
import SendAccounts from './SendAccounts.component';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import poin from '../../assets/images/poin.png';
import SimasIcon from '../../assets/fonts/SimasIcon';


class SendSourceAcc extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    navigation: PropTypes.object,
    goLanding: PropTypes.func,
    simasPoin: PropTypes.object,
    getUseSimas: PropTypes.func,
    simasConfig: PropTypes.object,
    dispatch: PropTypes.func,
  }
  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }

  useSimas = () => {
    const {navigation, getUseSimas} = this.props;
    const emallData = result(navigation, 'state.params', {});
    const isUseSimas = 'yes';
    getUseSimas(isUseSimas, emallData);
  }

  renderListItem = ({item}) => (<SendAccounts {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {accounts, goLanding, simasPoin, navigation, simasConfig} = this.props;
    const usingSimas = result(simasConfig, 'enableDebetFromSimasPoin', '');
    const totalAmount = result(navigation, 'state.params.totalAmount', '');
    const data = accounts;
    const simasPoint = result(simasPoin, 'simasPoin.data.total_point', '') === '' ? 0 : result(simasPoin, 'simasPoin.data.total_point', '');
    
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titleTxt}>{language.CGV__PAY_FROM}</Text>
              <Touchable onPress={goLanding}>
                <View style={styles.buttonTxt}>
                  <Text>{language.CGV__CANCELLATION}</Text>
                </View>
              </Touchable>
            </View>
          </View>
          <View>
            <Text style={styles.subtitleTxt}>{language.CGV__ACCOUNTS}</Text>
          </View>
          <View>
            <FlatList enableEmptySections data={data} renderItem={this.renderListItem}/>
          </View>

          { usingSimas === 'no' ?
            null
            :
            <View>
              <View>
                <Text style={styles.subtitleTxt}>{language.CGV__SIMAS_POIN}</Text>
              </View>
              <View>
                <View style={styles.bgWhite}>
                  <Touchable onPress={this.useSimas}>
                    <View style={styles.row}>
                      <View style={styles.iconContainer}>
                        <Text style={styles.simasTxt}>{language.CGV__SIMAS}</Text>
                        <Image source={poin} style={styles.imageOffer} />
                      </View>
                      <View style={styles.infoContainer}>
                        <View style={styles.pad2}>
                          <Text style={styles.accTxt}>{language.CGV__RP} {currencyFormatter(totalAmount)}</Text>
                        </View>
                        <View style={styles.pad2}>
                          <Text style={styles.typeTxt}>{language.CGV__SIMAS_USED}</Text>
                        </View>
                        <View style={styles.pad2}>
                          <View style={styles.row2}>
                            <Text style={styles.pointTxt}>{currencyFormatter(totalAmount)} </Text>
                            <View style={styles.imageContainer}><Image source={poin} style={styles.poinImage}/></View>
                          </View>
                        </View>
                        <View style={styles.pad2}>
                          <Text style={styles.balanceTxt}>{language.CGV__AVAIL_BALANCE2}  {currencyFormatter(simasPoint)} {language.CGV__POIN}</Text>
                        </View>
                      </View>
                      <View style={styles.arrowContainer}>
                        <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                      </View>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SendSourceAcc;
