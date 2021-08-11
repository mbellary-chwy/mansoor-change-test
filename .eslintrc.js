module.exports = {
  extends: require.resolve('@chewy/ccl-eslint-config'),
  rules: {
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'security/detect-child-process': 'off',
    'unicorn/no-abusive-eslint-disable': 'warn',
  },
  globals: {
    cy: true,
  },
};
