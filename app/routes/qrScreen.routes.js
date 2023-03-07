import { createStackNavigator } from 'react-navigation-stack';
import * as navHeaders from './navHeaders.config';
import QRScannerScreen from '../pages/QRPayment/QRScanner.page';

const QRGpnRoutes = createStackNavigator({
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
