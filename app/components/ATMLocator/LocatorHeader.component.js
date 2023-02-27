import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './LocatorHeader.component.styles';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';

class LocatorHeader extends React.Component {
  state = {
    isMapView: true,
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    navProps: PropTypes.object,
    setParams: PropTypes.func.isRequired,
  }
  goToFilter = () => {
    this.props.navigate('Locator', {params: this.state.isMapView});
  }

  changeView = () => {
    const isMapView = !this.state.isMapView;
    this.setState({isMapView: isMapView});
    this.props.setParams({isMapView: isMapView});
  }

  render () {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.changeView} disabled ={this.state.isMapView} style={this.state.isMapView ? styles.touchableContainerLeftActive : styles.touchableContainerLeft}>
          <Text style={this.state.isMapView ? styles.textActive : styles.textinActive}>{language.ATM_LOCATOR__MAPVIEW}</Text>
        </Touchable>
        <View style={styles.padding}/>
        <Touchable onPress={this.changeView} disabled ={!this.state.isMapView} style={!this.state.isMapView ? styles.touchableContainerRightActive : styles.touchableContainerRight}>
          <Text style={!this.state.isMapView ? styles.textActive : styles.textinActive}>{language.ATM_LOCATOR__LISTVIEW}</Text>
        </Touchable>
      </View>
    );
  }
}

export default LocatorHeader;
