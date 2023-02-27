import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './Locator.component.styles';
import {language} from '../../config/language';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabATM from './TabATM.component';
import TabBranch from './TabBranch.component';
import {theme} from '../../styles/core.styles';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
  },
  tabBarTextStyle: styles.tabText
};

class Locator extends React.Component {
  static propTypes = {
    isMapView: PropTypes.bool,
    atmList: PropTypes.array,
    goToSearch: PropTypes.func,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar />)

  componentWillMount () {
    this.setState({tabsRef: this.refs.Tabs});
    const {atmList} = this.props;
    const atm = [];
    const branch = [];
    atmList.map((data) => {
      if (data.atmLocatorCode === '001') {
        data.coordinate = {
          latitude: data.aTMLatitude,
          longitude: data.aTMLongitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        branch.push(data);
      } else {
        data.coordinate = {
          latitude: data.aTMLatitude,
          longitude: data.aTMLongitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        atm.push(data);
      }
    });

    this.setState({atm, branch});
  }

  render () {
    const {isMapView, goToSearch = noop} = this.props;
    const {atm, branch} = this.state;
    return (
      <View style={styles.container}>
        <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={this.changeTab} ref={'Tabs'}>
          <TabATM tabLabel={language.ATM_LOCATOR__TAB_ATM} isMapView={isMapView} atm={atm} goToSearch={goToSearch}/>
          <TabBranch tabLabel={language.ATM_LOCATOR__TAB_BRANCH} isMapView={isMapView} branch={branch} goToSearch={goToSearch}/>
        </ScrollableTabView>
      </View>
    );
  }
}

export default Locator;
