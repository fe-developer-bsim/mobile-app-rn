import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmoneyHeader.component.styles';
import {View, Text} from 'react-native';
import Touchable from '../Touchable.component';
import {gotoRegisterEmoney} from '../../state/thunks/onboarding.thunks';

class EmoneyHeader extends React.Component {
 
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    setParams: PropTypes.func.isRequired,
  }
  goToEmoneyRegister = () => {
    const {dispatch} = this.props;
    dispatch(gotoRegisterEmoney());
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.row}>
            <Touchable onPress={this.goToEmoneyRegister} style={styles.iconBox}>
              <Text style={styles.redText}>SKIP</Text>
            </Touchable>
          </View>         
          <View style={styles.additionalPadding}/>
        </View>
      </View>
    );
  }
}

export default EmoneyHeader;
