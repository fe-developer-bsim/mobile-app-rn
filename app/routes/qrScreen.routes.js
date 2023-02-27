import {StackNavigator} from 'react-navigation';
import * as navHeaders from './navHeaders.config';
import QRScannerScreen from '../pages/QRPayment/QRScanner.page';

const QRGpnRoutes = StackNavigator({
  QRScannerLanding: {
    screen: QRScannerScreen,
    navigationOptions: navHeaders.PayHeaderConfig
  },
}, {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerMode: 'none',
});

export default QRGpnRoutes;
