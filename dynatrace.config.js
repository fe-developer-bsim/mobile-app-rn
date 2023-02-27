module.exports = {
    react : {
        debug : true,

        lifecycle : {
            /**
             * Decide if you want to see Update Cycles as well
             */
            includeUpdate: false,

            /**
             * Filter for Instrumenting Lifecycle of Components / True = Will be instrumented
             */
            instrument: (filename) => {
                return false;
            }
        },

        input : {
            /**
             * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
             * True = Will be instrumented
             */
            instrument: (filename) => {
                return true;
            }
        }
    },
    android : {
        // Those configs are copied 1:1
        config : `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId '3130e06f-2c62-4a9a-a20a-b9d99cd1d90c'
                        beaconUrl 'https://www.banksinarmas.com:9999/mbeacon/932100d2-2ed5-4e3d-9883-57a51d103683'
                    }
                    userOptIn true
                }
            }
        }
        `
    },
    ios : {
        // Those configs are copied 1:1
        config : `
        <key>DTXApplicationID</key>
        <string>3130e06f-2c62-4a9a-a20a-b9d99cd1d90c</string>
        <key>DTXBeaconURL</key>
        <string>https://www.banksinarmas.com:9999/mbeacon/932100d2-2ed5-4e3d-9883-57a51d103683</string>
        <key>DTXLogLevel</key>
        <string>ALL</string>
        <key>DTXUserOptIn</key>
        <true/>
        `
    }
}
