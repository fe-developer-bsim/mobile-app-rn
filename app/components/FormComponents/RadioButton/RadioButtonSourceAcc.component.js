import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import styles from './RadioButtonSourceAcc.styles';
import Touchable from '../../Touchable.component';
import noop from 'lodash/noop';
import result from 'lodash/result';
import FundTransferMethodDetail from '../../FundTransferJourney/FundTransferMethodDetail.component.js';
import {language} from '../../../config/language';
import * as Utils from '../../../utils/transformer.util';
import FromNew from '../../../assets/images/FromNew.png';
import WebView from 'react-native-webview';

class RadioButton extends Component {
  static propTypes = {
    options: PropTypes.array,
    input: PropTypes.object,
    onPressRadioButton: PropTypes.func,
    warningText: PropTypes.string,
    renderContainer: PropTypes.object,
    renderRow: PropTypes.bool,
    renderFull: PropTypes.bool,
    renderOptionSublabelWithoutRow: PropTypes.bool,
    timeConfig: PropTypes.object
  };

  static defaultProps = {
    options: [], // option = [{label: '', value: ''}, ...]
    input: {
      onChange: noop,
    }
  };

  setSelectedOption = (selectedOption, option) =>
    option.value === this.props.input.value.value;

  renderOptionFull = (option, selected, onSelect, index) => {
    const {warningText = '', timeConfig} = this.props;
    if (result(option, 'disabled', false)) {
      return (
        <View>
          <View style={styles.optionContainer}>
            <View style={styles.optionStyle}>
              <View style={styles.buttonDisabled}>
                {selected && <View style={styles.buttonActive} />}
              </View>
              <View style={styles.labelContainer}>
                <View style={styles.flex2}>
                  <Text style={styles.boldTextDisabled}>{option.label}</Text>
                </View>
                <View style={styles.flex1Skn}>
                  {option.value === 'skn' ? (
                    <View style={styles.skn}>
                      <Text style={styles.sknText}>
                        {language.TRANSFER__TRANSFER_SKN}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.smallGreyText}>
                        {option.sublabelTitle}
                      </Text>
                      <Text style={styles.smallGreyText}>
                        {option.sublabel}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <FundTransferMethodDetail
                disabled={result(option, 'disabled', false)}
                type={option.value}
                textStyle={styles.textStyleDisabled}
                timeConfig={timeConfig}
              />
            </View>
            {warningText !== '' && (
              <View style={styles.webViewContainer}>
                <WebView
                  style={styles.webViewStyle}
                  source={{html: warningText}}
                />
              </View>
            )}
          </View>
          <View style={styles.greyLineFull} />
        </View>
      );
    } else {
      return (
        <Touchable onPress={onSelect} key={index}>
          <View>
            <View style={styles.optionContainer}>
              <View style={styles.optionStyle}>
                <View
                  style={
                    selected ? styles.buttonStyleSelect : styles.buttonStyle
                  }
                >
                  {selected && <View style={styles.buttonActive} />}
                </View>
                <View style={styles.labelContainer}>
                  <View style={styles.flex2}>
                    <Text style={styles.boldTextStyle}>{option.label}</Text>
                  </View>
                  <View style={styles.flex1Skn}>
                    {option.value === 'skn' ? (
                      <View style={styles.skn}>
                        <Text style={styles.sknText}>
                          {language.TRANSFER__TRANSFER_SKN}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.smallText}>
                          {option.sublabelTitle}
                        </Text>
                        <Text style={styles.smallText}>{option.sublabel}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <FundTransferMethodDetail
                  disabled={result(option, 'disabled', false)}
                  type={option.value}
                  textStyle={styles.textStyle}
                  timeConfig={timeConfig}
                />
              </View>
              {warningText !== '' && (
                <View style={styles.webViewContainer}>
                  <WebView
                    style={styles.webViewStyle}
                    source={{html: warningText}}
                  />
                </View>
              )}
            </View>
            <View style={styles.greyLineFull} />
          </View>
        </Touchable>
      );
    }
  };

  renderOption = (option, selected, onSelect, index) => {
    const {warningText = ''} = this.props;
    const balances = result(option, 'balances.availableBalance', '');
    const currency = result(option, 'currency', '');
    return (
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionStyle}>
            <View>
              <Image source={FromNew} style={styles.imgIcon} />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.textStyleName}>{option.name}</Text>
              <Text style={styles.textStyleAccNumber}>
                {option.accountNumber}
              </Text>
              <Text style={styles.textStyleProductType}>
                {option.productType}
              </Text>
              <Text style={styles.textStyleBalances}>
                {language.SEND__AVAILABLE_BALANCE}: {currency}{' '}
                {Utils.balanceFormatter(balances)}
              </Text>
            </View>
            <View style={styles.optionStyleRadioBtn}>
              <View style={styles.buttonStyle}>
                {selected && <View style={styles.buttonActive} />}
              </View>
            </View>
          </View>
          {warningText !== '' && (
            <View style={styles.webViewContainer}>
              <WebView
                style={styles.webViewStyle}
                source={{html: warningText}}
              />
            </View>
          )}
        </View>
      </Touchable>
    );
  };

  renderOptionSublabelWithoutRow = (option, selected, onSelect, index) => {
    const {warningText = ''} = this.props;
    return (
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionStyle}>
            <View style={styles.buttonStyle}>
              {selected && <View style={styles.buttonActive} />}
            </View>
            <View>
              <Text style={styles.textStyle}>{option.label}</Text>
              <Text style={styles.textStyle}>{option.sublabel}</Text>
            </View>
          </View>
          {warningText !== '' && (
            <View style={styles.webViewContainer}>
              <WebView
                style={styles.webViewStyle}
                source={{html: warningText}}
              />
            </View>
          )}
        </View>
      </Touchable>
    );
  };

  renderOptionRow = (option, selected, onSelect, index) => {
    const {onPressRadioButton = noop, warningText = ''} = this.props;
    return (
      <View style={styles.halfWidth}>
        <Touchable onPress={onSelect} key={index}>
          <View>
            <View style={styles.optionStyle}>
              <View style={styles.buttonStyle}>
                {selected && <View style={styles.buttonActive} />}
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.textStyle} onPress={onPressRadioButton}>
                  {option.label}
                </Text>
                <Text style={styles.textStyle}>{option.sublabel}</Text>
              </View>
            </View>
            {warningText !== '' && (
              <View style={styles.webViewContainer}>
                <WebView
                  style={styles.webViewStyle}
                  source={{html: warningText}}
                />
              </View>
            )}
          </View>
        </Touchable>
      </View>
    );
  };

  renderContainer = (optionNodes) => <View>{optionNodes}</View>;

  renderContainerRow = (optionNodes) => (
    <View style={styles.renderContainerRow}>{optionNodes}</View>
  );

  render () {
    const {
      options,
      input,
      renderRow = false,
      renderFull = false,
      renderOptionSublabelWithoutRow = false,
    } = this.props;
    return (
      <RadioButtons
        options={options}
        onSelection={input.onChange}
        selectedOption={input.value}
        renderOption={
          renderOptionSublabelWithoutRow
            ? this.renderOptionSublabelWithoutRow
            : renderRow
              ? this.renderOptionRow
              : renderFull
                ? this.renderOptionFull
                : this.renderOption
        }
        renderContainer={
          renderRow ? this.renderContainerRow : this.renderContainer
        }
        testOptionEqual={this.setSelectedOption}
      />
    );
  }
}

export default RadioButton;
