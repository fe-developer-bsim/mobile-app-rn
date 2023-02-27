import React, {Component} from 'react';
import FAQComponent from '../../components/Help/FAQ.component';
import {FAQcontent} from '../../config/FAQcontent.config';
export default class FAQform extends Component {
  render () {
    return (
      <FAQComponent FAQcontent={FAQcontent}/>
    );
  }
}
