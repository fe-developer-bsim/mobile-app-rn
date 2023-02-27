import React from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import DrawItem from './DrawItem.component';
import result from 'lodash/result';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import styles from './LuckyDrawList.component.styles';
import {language} from '../../config/language';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DemoList from '../../components/LuckyDraw/DrawItemDemo.component.js';

class LuckyDrawPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    header: PropTypes.string,
    luckyDrawTnC: PropTypes.func,
    simasPoin: PropTypes.object,
    testStorage: PropTypes.func,
    onOfferClick: PropTypes.func,
    demoAccount: PropTypes.bool
  }
  static defaultProps = {
    offers: [],
    emailDrawAlert: noop
  }

  rendereTnC = () => {
    const {luckyDrawTnC = {}} = this.props;
    return luckyDrawTnC ? luckyDrawTnC : {};
  }

  renderOffer = () => {
    const {onOfferClick = {}} = this.props;
    return onOfferClick ? onOfferClick : {};
  }

  rendertestStorage = () => {
    const {testStorage = {}} = this.props;
    return testStorage ? testStorage : {};
  }

  renderDemoAccount = () => {
    const {demoAccount = 'false'} = this.props;
    return demoAccount === true ? 'true' : 'false';
  }

  renderListItem = ({item}) => (<DrawItem {...item.item} key={item.index} type='detail' luckyDrawTnC={this.rendereTnC()} onOfferClick={this.renderOffer()} testStorage={this.rendertestStorage()} renderDemoAccount={this.renderDemoAccount()}/>)


  render () {
    const {simasPoin, demoAccount, testStorage, onOfferClick, luckyDrawTnC} = this.props;
    const undianList = result(simasPoin, 'simasPoin.data.dataUndian', []);
    const loading = result(simasPoin, 'loading', false);
    const reload = result(simasPoin, 'reload', false) || isEmpty(undianList);
    return (
      <View style={styles.container}>
        {demoAccount === true ?
          <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.containerContent}>
            <View>
              <DemoList data={undianList} renderItem={this.renderListItem} testStorage={testStorage} onOfferClick={onOfferClick} luckyDrawTnC={luckyDrawTnC}/>
            </View>
          </KeyboardAwareScrollView> :
          <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.containerContent}>
            { loading ?
              <View style={styles.errorContainer}>
                <ActivityIndicator size='large' color={styles.red}/>
              </View>
              : reload ?
                <View style={styles.noofferImage}>
                  <Text style={styles.informationVoucher}>{language.LUCKYDRAW__EMPTY}</Text>
                </View>
                :
                demoAccount === false ?
                  <View>
                    <FlatList enableEmptySections data={undianList} renderItem={this.renderListItem}/>
                  </View> :
                  <View>
                    <DemoList data={undianList} renderItem={this.renderListItem} testStorage={testStorage} onOfferClick={onOfferClick}/>
                  </View>
            }
          </KeyboardAwareScrollView>
        }
      </View>
    );
  }
}

export default LuckyDrawPage;
