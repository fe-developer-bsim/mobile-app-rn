import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import styles from './HeaderCgv.styles';
import cgvIconImage from '../../assets/images/cgvCinemas.png';

class HeaderCgv extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }
  render () {
    return (
      <View style={styles.container}>
        <View>
          <Image source={cgvIconImage} style={styles.imageCgv}/>
        </View>
      </View>);
  }
}

export default HeaderCgv;
