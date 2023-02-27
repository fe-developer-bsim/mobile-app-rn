import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftOnboard.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {informationPopup} from '../../state/thunks/dashboard.thunks';

class NavLeftOnboard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    props: PropTypes.func
  }

  saveReducer = () => {
    const {dispatch} = this.props;
    dispatch(informationPopup());
  }

  render () {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.saveReducer}>
          <View>
            <SimasIcon name={'caution-reverse'} size={28} style={styles.burger} />
          </View>
        </Touchable>
      </View>);
  }
}

export default NavLeftOnboard;
