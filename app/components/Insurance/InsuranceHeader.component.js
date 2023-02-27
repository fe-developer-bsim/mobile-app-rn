import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import map from 'lodash/map';
import {getVarName, isEmptyOrNull, recursiveMap} from '../../utils/transformer.util';
import styles from './InsuranceHeader.component.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {noop, result} from 'lodash';

class InsuranceHeader extends Component {
  static propTypes = {
    headerDisplay: PropTypes.object,
    headerKey: PropTypes.string,
    customHeader: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    avoidedDisplay: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    customView: PropTypes.object,
  }
  
  subHeaderView = (text, key) => <Text style={styles.subHeader} key={key}>{text}</Text>

  render () {
    const {headerDisplay, headerKey = getVarName({headerKey}), avoidedDisplay = {}, customHeader = {}, customView = {}} = this.props; 
    const iconSize = 26;
    const avoidedView = map(avoidedDisplay, (objKey) => ({[`${objKey}`]: noop}));
    return (
      <View>
        {
          map(headerDisplay, (object, key) => (
            (Object.values(customHeader).includes(key) && isEmptyOrNull(customView[key])) || isEmptyOrNull(object) ? 
              null :
              <View style={styles.statusBarRow} key={headerKey + key}>
                <View>
                  {
                    (Object.values(customHeader).includes(key)) ? 
                      customView[key](object, headerDisplay + key)
                      :
                      <View>
                        <Text style={styles.header}>{result(object, 'header', headerKey)}</Text>
                        {
                          recursiveMap(result(object, 'subHeader', {}), this.subHeaderView, '', avoidedDisplay, avoidedView)
                        }
                      </View>
                  }
                </View>
                <View>
                  <Touchable onPress={object.func}>
                    <View style={styles.iconContainer}>
                      <SimasIcon name={'edit'} size={iconSize} style={styles.icon}/>
                    </View>
                  </Touchable>
                </View>
              </View>
          ))
        } 
        <View style={styles.paddingGrey} />   
      </View>
    );
  }
}

export default InsuranceHeader;