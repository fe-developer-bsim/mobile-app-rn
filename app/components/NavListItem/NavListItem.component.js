import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import styles from './NavListItem.styles';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';


export default class NavListItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    featureIconName: PropTypes.string,
    footer: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    iconSize: PropTypes.number,
    theme: PropTypes.oneOf(['primary', 'plain', 'depositButtonStyle']),
    status: PropTypes.string,
  }
  static defaultProps = {
    subtitle: null
  }

  toastComingSoon = () => {
    const {status = ''} = this.props;
    Toast.show(status === 'disable' ? language.DASHBOARD__CREDIT_CARD_DISABLE_CA : language.DASHBOARD__CREDIT_CARD_SOON);
  }

  render () {
    const {featureIconName, iconSize = 30, label, subtitle, onPress, disabled = false, style, theme = 'primary', footer = '', status = ''} = this.props;
    let navItem = null;
    const comingsoon = language.CGV_COMING_SOON;
    if (theme === 'primary') {
      navItem = (
        <Touchable onPress={!disabled ? onPress : null} underlayColor={theme.primary} onShowUnderlay={this.showUnderlay} onHideUnderlay={this.onHideUnderlay}>
          <View style={[styles.container, style, disabled ? styles.disabled : {}]}>
            <View style={styles.paddingContent}>
              <View style={styles.buttonContainer}>
                <View style={styles.featureIconContainer}>
                  {featureIconName && <SimasIcon name={featureIconName} size={iconSize} style={styles.featureIcon}/>}
                </View>
                <View style={styles.labelContainer}>
                  <Text style={styles.title}>{label}</Text>
                  {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                  {footer ? <Text style={styles.footer}>{footer}</Text> : null}
                </View>
                <View style={styles.navIconContainer}>
                  <SimasIcon name={'arrow'} size={10} style={styles.navIcon}/>
                </View>
              </View>
            </View>
          </View>
        </Touchable>);
      return navItem;
    }
    if (theme === 'plain') {
      navItem = (<View style={styles.optionItemContainer}>
        <Touchable style={styles.optionItem} onPress={onPress}>
          <Text style={styles.optionText}>{label}</Text>
          <SimasIcon name='arrow' style={styles.navIcon} />
        </Touchable>

      </View>);
      return navItem;
    }

    if (theme === 'none') {
      navItem = (<View style={styles.optionItemContainer}>
        <View style={styles.optionItem} onPress={onPress}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>);
      return navItem;
    }

    if (theme === 'VCC') {
      navItem = (<View>
        <View style={styles.optionBox}>
          {status === 'soon' ?
            <Touchable onPress={this.toastComingSoon} style={styles.optionItem}>
              <View style={styles.boxstatus}>
                <Text style={styles.optionTextV}>{label}</Text>
                <View style={status === 'new' ? styles.optionRed : status === 'soon' ? styles.optionKet : null}>
                  <Text style={styles.optionTextKet}>{status === 'new' ? status : status === 'soon' ? comingsoon : null}</Text>
                </View>
              </View>
              <SimasIcon name='arrow' style={styles.navIcon} />
            </Touchable>
            : status === 'disable' ?
              <Touchable onPress={this.toastComingSoon} style={styles.optionItem}>
                <View style={styles.boxstatus}>
                  <Text style={styles.optionTextV}>{label}</Text>
                  <View style={status === 'new' ? styles.optionRed : status === 'soon' ? styles.optionKet : null}>
                    <Text style={styles.optionTextKet}>{status === 'new' ? status : status === 'soon' ? comingsoon : null}</Text>
                  </View>
                </View>
                <SimasIcon name='arrow' style={styles.navIcon} />
              </Touchable>
              :
              <Touchable style={styles.optionItem} onPress={onPress}>
                <View style={styles.boxstatus}>
                  <Text style={styles.optionTextV}>{label}</Text>
                  <View style={status === 'new' ? styles.optionRed : status === 'soon' ? styles.optionKet : null}>
                    <Text style={styles.optionTextKet}>{status === 'new' ? status : status === 'soon' ? comingsoon : null}</Text>
                  </View>
                </View>
                <SimasIcon name='arrow' style={styles.navIcon} />
              </Touchable> }
        </View>

        <View style={styles.summaryArea}/>
      </View>);
      return navItem;
    }

    if (theme === 'VCCN') {
      navItem = (<View>
        <View style={styles.optionBox}>
          {status === 'soon' ?
            <Touchable onPress={this.toastComingSoon} style={styles.optionItem}>
              <View style={styles.boxstatus}>
                <Text style={styles.optionTextV}>{label}</Text>
                <View style={status === 'new' ? styles.optionRed : status === 'soon' ? styles.optionKet : null}>
                  <Text style={styles.optionTextKet}>{status === 'new' ? status : status === 'soon' ? comingsoon : null}</Text>
                </View>
              </View>
              <SimasIcon name='arrow' style={styles.navIcon} />
            </Touchable>
            :
            <Touchable style={styles.optionItem} onPress={onPress}>
              <View style={styles.boxstatus}>
                <Text style={styles.optionTextV}>{label}</Text>
                <View style={status === 'new' ? styles.optionRed : status === 'soon' ? styles.optionKet : null}>
                  <Text style={styles.optionTextKet}>{status === 'new' ? status : status === 'soon' ? comingsoon : null}</Text>
                </View>
              </View>
              <SimasIcon name='arrow' style={styles.navIcon} />
            </Touchable>}
        </View>

      </View>);
      return navItem;
    }

    if (theme === 'depositButtonStyle') {
      navItem = (
        <Touchable onPress={!disabled ? onPress : null} underlayColor={theme.primary} onShowUnderlay={this.showUnderlay} onHideUnderlay={this.onHideUnderlay}>
          <View style={[styles.containerDeposit, style, disabled ? styles.disabled : {}]}>
            <View style={styles.buttonContainer}>
              <View style={styles.featureIconContainer}>
                {featureIconName && <SimasIcon name={featureIconName} size={iconSize} style={styles.featureIcon}/>}
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.title}>{label}</Text>
                {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                {footer ? <Text style={styles.footer}>{footer}</Text> : null}
              </View>
              <View style={styles.navIconContainer}>
                <SimasIcon name={'arrow'} size={10} style={styles.navIcon}/>
              </View>
            </View>
          </View>
        </Touchable>);
      return navItem;
    }
    return null;
  }
}
