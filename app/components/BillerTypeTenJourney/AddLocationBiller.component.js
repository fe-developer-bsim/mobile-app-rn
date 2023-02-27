import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {language} from '../../config/language';
import styles from './AddLocationBiller.style';
import {size, result, filter, lowerCase, includes} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';

class FAQComponent extends React.Component {
  static propTypes = {
    searchlist: PropTypes.array,
    goToAddArea: PropTypes.func
  }

  state = {
    searchlist: [],
    searchText: ''
  }
  onChangeInput = (text) => {
    const {searchlist} = this.props;
    const filterAreaExist = filter(searchlist, function (o) {
      return includes(lowerCase(result(o, 'label', '')), lowerCase(text));
    });
    this.setState({
      searchText: text
    });
    this.setState({
      searchlist: text === '' ? [] : filterAreaExist
    });
  }

  render () {
    const {searchlist = [], goToAddArea} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bgSearch}>
          <View style={styles.searchTxtInput}>
            <TextInput
              style={styles.searchInput}
              underlineColorAndroid={'transparent'}
              placeholder={language.GENERIC_BILLER__INPUT_AREA__PLACEHOLDER}
              onChangeText={this.onChangeInput}
              disabled={false}
              onFocus={this.onFocusSearch}
              onBlur={this.onBlurSearch}
              onSubmitEditing={this.onBlurSearch}
              value={this.state.searchText}
            />
          </View>
          <View style={styles.searchIcon}>
            <SimasIcon name={'search'} size={18} style={styles.icon}/>
          </View>
        </View>
        <View style={styles.lineBlack}/>

        {size(this.state.searchlist) > 0 || this.state.searchText !== '' ?
          <ScrollView contentContainerStyle={styles.content}>
            {this.state.searchlist.map((searchlistArea, i) => (
              <View>
                <Touchable key={i} style={styles.rowArea} onPress={goToAddArea(searchlistArea)}>
                  <View style={styles.row}>
                    <View style={styles.contentContainer}>
                      <Text style={styles.pageTitle}>{searchlistArea.label}</Text>
                    </View>
                  </View>
                  <View style={styles.searchIcon}>
                    <SimasIcon name={'chevron'} size={18} style={styles.iconPick}/>
                  </View>
                </Touchable>
                <View style={styles.lineBlack}/>
              </View>
            ))}
          </ScrollView>
          :
          <ScrollView contentContainerStyle={styles.content}>
            {searchlist.map((searchlistArea, i) => (
              <View>
                <Touchable key={i} style={styles.rowArea} onPress={goToAddArea(searchlistArea)}>
                  <View style={styles.row}>
                    <View style={styles.contentContainer}>
                      <Text style={styles.pageTitle}>{searchlistArea.label}</Text>
                    </View>
                  </View>
                  <View style={styles.searchIcon}>
                    <SimasIcon name={'chevron'} size={18} style={styles.iconPick}/>
                  </View>
                </Touchable>
                <View style={styles.lineBlack}/>
              </View>
            ))}
          </ScrollView>
        }
      </View>
    );
  }
}

export default FAQComponent;
