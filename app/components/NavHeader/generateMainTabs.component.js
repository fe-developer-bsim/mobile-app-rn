import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import styles from './generateMainTabs.style';
import {NavigationActions} from 'react-navigation';
import Tooltip from 'react-native-walkthrough-tooltip';
import {language} from '../../config/language';
import {result} from 'lodash';
import TutorialContent from '../ProductOptions/TutorialContent.component';
import {addOrder, finishOrder} from '../../state/thunks/onboarding.thunks';
import SimasIcon from '../../assets/fonts/SimasIcon';
import qrisScan from '../../assets/images/qris_scan.png';
import {theme} from '../../styles/core.styles';


class NavLeftLogo extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    tutorialProduct: PropTypes.object,
    iconName: PropTypes.string,
    isScan: PropTypes.string,
    focused: PropTypes.string,
    focusedIcon: PropTypes.string,
    unFocusedIcon: PropTypes.string,

  }

  goToNextPage = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.navigate({routeName: 'EmoneyRegistration'}));
  }

  addOrder = () => {
    const {dispatch} = this.props;
    dispatch(addOrder());
  }
  finishOrder = () => {
    const {dispatch} = this.props;
    dispatch(finishOrder());
  }

  render () {
    const {tutorialProduct, isScan, focused, focusedIcon, unFocusedIcon} = this.props;
    const tutorialON = result(tutorialProduct, 'tutorialON', '');
    const order = result(tutorialProduct, 'order', '');
    const iconName = focused ? focusedIcon : unFocusedIcon;
    const iconStyle = {color: focused ? theme.pinkBrand : theme.black};
    // const iconStyleScan = {color: focused ? theme.white : theme.white, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: Platform.OS === 'ios' ? 10 : 12, bottom: 3.5};
    return (
      <View>
        { isScan === true ?
          <Tooltip
            animated
            isVisible={tutorialON ? order === 3 : false}
            content={<TutorialContent text={language.TOOLTIP_4}
              order={order} next={this.addOrder} />}
            placement='top' onClose={this.finishOrder}
          >
            <View style={styles.iconScan}>
              <Image source={qrisScan} style={styles.pictureIcon}/>
            </View>
          </Tooltip>
          :
          <View>
            { focusedIcon === 'new-home-active' ?
              <Tooltip
                animated
                isVisible={tutorialON ? order === 0 : false}
                content={<TutorialContent text={language.TOOLTIP__HOME_1}
                  order={order} next={this.addOrder} />}
                placement='top' onClose={this.finishOrder}
              >
                <SimasIcon name={iconName} size={isScan === true ? 50 : 25} style={iconStyle} />
              </Tooltip>
              : focusedIcon === 'new-profile-active' ?
                <Tooltip
                  animated
                  isVisible={tutorialON ? order === 4 : false}
                  content={<TutorialContent text={language.TOOLTIP_5}
                    order={order} finish={this.finishOrder} />}
                  placement='top' onClose={this.finishOrder}
                >
                  <SimasIcon name={iconName} size={isScan === true ? 50 : 25} style={iconStyle} />
                </Tooltip>
                :
                <SimasIcon name={iconName} size={isScan === true ? 50 : 25} style={iconStyle} />
            }
          </View>
        }
      </View>
    );
  }
}

export default NavLeftLogo;
