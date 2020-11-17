module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      { 'modules': false }
    ],
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
        isTSX: true,
        allExtensions: true
      }
    ],
    '@babel/preset-react'
  ]
};
