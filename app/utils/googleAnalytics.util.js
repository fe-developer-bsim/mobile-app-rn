import {GoogleAnalyticsTracker, GoogleAnalyticsSettings} from 'react-native-google-analytics-bridge';
import env from '../config/env.config';

GoogleAnalyticsSettings.setDispatchInterval(env.GA_TRACKER_INTERVAL);
const tracker = new GoogleAnalyticsTracker(env.GA_TRACKER_ID);
// TODO ios GA campaign tracking disabled for now
// NativeModules.GoogleAnalyticsBridge.allowIDFA(env.GA_TRACKER_ID, true); // required by IOS for support for campaign management

export default tracker;
