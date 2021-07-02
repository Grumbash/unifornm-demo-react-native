module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: ['transform-react-jsx-source'],
    },
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
