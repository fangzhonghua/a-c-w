export default {
  isStringEmpty (str) {
    return !str || typeof str === 'undefined' || str === 'undefined'
  },
  getlang(str) { 
    let _str = str.toLowerCase();
    _str = _str.replace('_','').replace('-','')
    let lang = 'zh_CN'
    switch(_str){
      case 'zhcn':
        lang = 'zh_CN'
        break;
      case 'enus':
        lang = 'en_US'
        break;
      case 'zhtw':
        lang = 'zh_TW'
        break; 
    }
    return lang
  },
  getLangUrl (str) {
    var langUrl = 'http://yonsuite-iter.yyuap.com/'
    if(str){
      if(str.indexOf('dev')>-1){
        langUrl = 'http://workbench.yyuap.com/'
      }else if(str.indexOf('daily')>-1){
        langUrl = 'https://u8c3ec-daily.yyuaps.com/';
      }else if(str.indexOf('pre')>-1){
        langUrl = 'https://3ec-y3me-pre.diwork.com/';
      }else {
        langUrl = 'http://yonsuite-iter.yyuap.com/'
      }
    }
    return langUrl;
  }
}