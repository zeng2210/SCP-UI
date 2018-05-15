import dict from './dict'
// 翻译数据字典
export default function transDict (str, dictName) {
  // console.log('字典入参', str, dictName)
  if (!str) return ''
  let DICT_DESC = '' // 初始化翻译后参数
  // 翻译字典
  for (let i = 0; i < dict[dictName].length; i++) {
    if (dict[dictName][i].DICT_VALUE === str) {
      DICT_DESC = dict[dictName][i].DICT_DESC
    }
  }
  // console.log('翻译出来的数据字典', DICT_DESC)
  return DICT_DESC
}
