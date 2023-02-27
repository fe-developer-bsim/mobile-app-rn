module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('@dynatrace/react-native-plugin/lib/dynatrace-transformer')
  },
  
  reporter: require('@dynatrace/react-native-plugin/lib/dynatrace-reporter')
};