import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TxTravelHistory.styles';
import {language} from '../../config/language';
import {result, startCase, isEmpty} from 'lodash';
import {change} from 'redux-form';
import * as actionCreators from '../../state/actions/index.actions.js';
import Touchable from '../Touchable.component';
import {NavigationActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



class TxTravelHistory extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  }

  renderListHistory = (data, k) => {
    const fullName = result(data, 'firstName', '') + ' ' + result(data, 'lastName', '');
    return (
      <View key={k} style={styles.containerButtonList}>
        <View>
          <Touchable onPress={this.onSelectList(data)}>
            <Text>{fullName}</Text>
          </Touchable>
        </View>
        <View style={styles.buttonDelete}>
          <Touchable>
            <Text>{language.GENERIC__DELETE}</Text>
          </Touchable>
        </View>
      </View>
    );
  }

  onSelectList = (data2) => () => {
    const {dispatch, navigation} = this.props;
    dispatch(actionCreators.showSpinner());
    const today = new Date();
    const newBd = result(data2, 'birthDate', '') ?  new Date(result(data2, 'birthDate', today)) : today;
    const newIdExp = result(data2, 'IdExpiry', '') ?  new Date(result(data2, 'IdExpiry', today)) : today;
    const newPassExp = result(data2, 'expiryPassport', '') ?  new Date(result(data2, 'expiryPassport', today)) : today;
    const isInternational = result(navigation, 'state.params.isInternational', '');
    dispatch(change('txTravelDetail', 'passengerId', result(data2, 'id', '')));
    dispatch(change('txTravelDetail', 'tittle', {'name': startCase(result(data2, 'title', '')), 'display': startCase(result(data2, 'title', ''))}));
    dispatch(change('txTravelDetail', 'firstName', result(data2, 'firstName', '')));
    dispatch(change('txTravelDetail', 'lastName', result(data2, 'lastName', '')));
    dispatch(change('txTravelDetail', 'birthDate', newBd));
    dispatch(change('txTravelDetail', 'nationality', result(data2, 'nationality', '')));
    dispatch(change('txTravelDetail', 'phone', result(data2, 'mobilePhone', '')));
    dispatch(change('txTravelDetail', 'homePhone', result(data2, 'homePhone', '')));
    dispatch(change('txTravelDetail', 'email', result(data2, 'email', '')));
    dispatch(change('txTravelDetail', 'idNumber', result(data2, 'IdNumber', '')));
    dispatch(change('txTravelDetail', 'IdExpiry', newIdExp));
    if (isInternational) {
      dispatch(change('txTravelDetail', 'passportNumber', result(data2, 'passportNumber', '')));
      dispatch(change('txTravelDetail', 'coi', result(data2, 'coi', '')));
      dispatch(change('txTravelDetail', 'expiryPassport', newPassExp));
    }
    this.setState({
      showList: false
    });
    dispatch(NavigationActions.back());
    dispatch(actionCreators.hideSpinner());
  };

  render () {
    const {navigation} = this.props;
    const dataHistory = result(navigation, 'state.params.res.data.result', {});
    return (
      <KeyboardAwareScrollView style={styles.scrollWhite} >
        <View style={styles.container}>
          { !isEmpty(dataHistory) ?
            <View style={styles.listContainerHistory}>
              { dataHistory.map(this.renderListHistory) }
            </View>
            : null
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TxTravelHistory;
