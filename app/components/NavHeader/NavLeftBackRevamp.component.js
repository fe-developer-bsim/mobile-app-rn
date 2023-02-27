import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftBackRevamp.styles';
import Touchable from '../Touchable.component';
import {NavigationActions} from 'react-navigation';
import SimasIcon from '../../assets/fonts/SimasIcon';

class NavLeftBackRevamp extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    remittance: PropTypes.bool,
  }

  goBack = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.back());
  }
  
  render () {
    return (
      <View>
        <Touchable onPress={this.goBack} style={styles.container}>
          <View>
            <SimasIcon name={'arrow'} size={20} style={styles.arrowWhite}/>
          </View>
        </Touchable>
      </View>);
  }
}

export default NavLeftBackRevamp;
