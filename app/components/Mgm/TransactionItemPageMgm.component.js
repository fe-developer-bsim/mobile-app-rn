import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './TransactionItemMgm.styles';
import Touchable from '../Touchable.component';
import REWARD from '../../assets/images/REWARD.png';


class TransactionItem extends React.Component {
  getDetailTransactionHistoryState = () => this.props.getDetailTransactionHistory(this.props.idStatement, this.props.name, this.props.date, this.props.event, this.props.transactionType, this.props.poinType, this.props.poin)
  render () {
    const {event, name, date, style, status, transactionLength, index, formMyHistoryReward, transactionType, poinType, poin} = this.props;
  
    return (
      <View>
        {formMyHistoryReward === 'myHistoryReward' ? 
          <View>
            <Touchable style={[styles.container, style]} onPress={this.getDetailTransactionHistoryState}>
              <View style={styles.detailsContainer}>
                <View style={styles.rowIcon}>
                  {transactionLength === index + 1 ?
                    null : <View style={styles.iconRewardPage}>
                      <Image source={REWARD} style={styles.pictureIcon}/>
                    </View>
                  }
                  <View style={styles.detailsTextContainer}>
                    <Text style={styles.transactionHeading}>{poinType}</Text>
                    <Text style={styles.transactionDate}>{event}</Text>
                    <Text style={styles.transactionDate}>{date}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.poinContainer}>
                {transactionType === 'Credit' ?
                  <Text style={styles.poinCredit}>+{poin}</Text>  
                  : 
                  <Text style={styles.poinDebit}>-{poin}</Text>  
                }
              </View>
              <View style={styles.iconSecondPage}>
                <SimasIcon name='arrow' size={10} style={styles.iconDetail}/>
              </View>
            </Touchable>

            {transactionLength === index + 1 ?
              null : <View style={styles.greyLine}/>
            }
          </View>
          : 
          <View>
            <View style={[styles.container, style]}>
              <View style={styles.detailsContainerInviting}>
                <View>
                  <Text style={styles.transactionHeading}>{name}</Text>
                  <View>
                    <Text style={styles.transactionDate}>{status} {event}</Text>
                    {/* <Text style={styles.transactionDate}>{date}</Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.transactionDate}>{date}</Text>
              </View>
              <View style={styles.secondPage} />
            </View>
            {transactionLength === index + 1 ?
              null : <View style={styles.greyLine}/>
            }
          </View>
        }
      </View>);
  }

  static propTypes = {
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    date: PropTypes.string,
    style: PropTypes.object,
    statementId: PropTypes.string,
    getDetailTransactionHistory: PropTypes.func,
    transactionCode: PropTypes.string,
    accountTransactions: PropTypes.object,
    isShariaAccount: PropTypes.bool,
    transactionLength: PropTypes.number,
    index: PropTypes.string,
    status: PropTypes.string,
    event: PropTypes.string,
    formMyHistoryReward: PropTypes.string,
    idStatement: PropTypes.string,
    transactionType: PropTypes.string,
    poinType: PropTypes.string,
    poin: PropTypes.string
  }
}
export default TransactionItem;
