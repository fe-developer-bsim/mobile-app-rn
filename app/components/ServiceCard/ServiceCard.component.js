import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Card from '../Card/Card.component';
import {SinarmasButton} from '../FormComponents';
import styles from './ServiceCard.styles';
import {bold, cardGreyLabelStyle, fontSizeSmallStyle, textLightGreyStyle} from '../../styles/common.styles';
import noop from 'lodash/noop';
import {language} from '../../config/language';

// TODO: - pass all the headings as props (TOP UP AGAIN, Last Top Up, etc)

const ServiceCard = ({billerName = '', date = '', footerLabel = 'Number', footerVal = '', amount = '', style, clickHandler = noop}) => (
  <Card style={style}>
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        <Text style={[styles.date, textLightGreyStyle]}>{language.SERVICE_CARD__LAST_TOPUP} <Text style={bold}>{date}</Text></Text>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.billerName}>{billerName}</Text>
      </View>
      <SinarmasButton onPress={clickHandler} style={styles.button}>
        <Text style={[styles.buttonText, bold]}>{language.SERVICE_CARD__TOPUP_AGAIN}</Text>
      </SinarmasButton>
    </View>
    <View footer style={[styles.cardFooter, cardGreyLabelStyle]}>
      <Text style={fontSizeSmallStyle}>{footerLabel} <Text style={bold}>{footerVal}</Text></Text>
      <Text style={fontSizeSmallStyle}>{language.SERVICE_CARD__AMOUNT} <Text style={bold}>{amount}</Text></Text>
    </View>
  </Card>
);

ServiceCard.propTypes = {
  date: PropTypes.string,
  footerLabel: PropTypes.string,
  footerVal: PropTypes.string,
  amount: PropTypes.string,
  clickHandler: PropTypes.func,
  billerName: PropTypes.string,
  style: PropTypes.object
};

export default ServiceCard;
