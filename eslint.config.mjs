import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'comma-dangle': ['error', 'never'],
    'style/comma-dangle': ['error', 'never'],
    // 'style/no-tabs': 'off',
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style']
    }],
    'ts/no-use-before-define': 'off',
    'vue/define-macros-order': 'off'
  }
})
