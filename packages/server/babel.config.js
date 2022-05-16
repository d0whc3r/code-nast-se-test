module.exports = {
  'env': {
    'test': {
      'presets': [['@babel/preset-env', { 'modules': false }]],
      'plugins': [['@babel/plugin-transform-modules-commonjs', { 'spec': true }]],
    },
  },
}
