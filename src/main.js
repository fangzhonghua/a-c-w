import React from 'react';
import ReactDOM from 'react-dom';
import './main.less';
import App from './App';
import { setAxios, _axios} from './common/request'
import lang from "ac-lang-cn";
import utils from './common/utils';

class FlowComp {
    constructor(options) {
        if (Array.isArray(options)) return;
        if (!(options instanceof Object)) return;
        this.options = options;
        this.options.bpmHost||(this.options.bpmHost=window.flowCompParams.host)
        this.options.lang = utils.getlang(this.options.lang)
        this.init();
    }
    init() {
        // this.visible = true
        setAxios(this.options)
        _axios.get('/approve-component/api/v1/activity/authority/'+this.options.businessKey).then((res)=>{
            this.options.onload(res&&{fieldAuth:res.data})
        })
        this.lang_is_ready = this.setlang().then(res=>console.log(res))
    }
    setlang() {
        lang.init({}, null);
        lang.setPack(require('./locale/pack.json')[this.options.lang]) // 本地多语包
        lang.lang = this.options.lang;
        const langUrl = utils.getLangUrl(this.options.bpmHost)
        return new Promise((resolve)=>{
            lang.jsonp(this.options.tenantId,'ys_OA_XTLCZX',langUrl,(data)=>{
                lang.setPack(data) // 在线多语包
                resolve('webapprove load langurage from online')
            },'YS',false,false);
            setTimeout(()=>{
                resolve('webapprove load langurage from local')
            },5000)
        })
    }
    hideApp() {
        // this.visible = false
        // this.insertDom()
        this.destroy()
    }
    showFlowBox() {
        // this.visible = true
        this.insertDom()
    }
    async insertDom() {
        await this.lang_is_ready
        this.container = document.getElementById('web-component-root');
        if(!this.container){
            var container = document.createElement('div');
            container.setAttribute('id','web-component-root')
            document.body.appendChild(container);
            this.container = container;
        }
        ReactDOM.render(
            <React.StrictMode>
              <App 
                // visible={this.visible}
                options={this.options}
                hideApp={this.hideApp.bind(this)}
              />
            </React.StrictMode>,
            this.container
        );
    }
    involkeInitCallback() {
        this.options.onload({fieldAuth:"authData"})
    }
    destroy() {
        console.log(lang.template("P_YS_PF_ECON-FE_0001309293") /* "销毁" */)
        ReactDOM.unmountComponentAtNode(this.container)
    }
    
}
var dataCache = {}
const flowComp = function (options = {}) {
    console.log(lang.template("P_YS_OA_XTLCZX_0001447584") /* "删除常用语" */)
    const businessKey = options.businessKey
    let compIns
    // 首次实例化
    if (!dataCache[businessKey]) {
      dataCache[businessKey] = new FlowComp(options)
    // 上次实例已废弃，需重新实例化（单据撤回并重新提交）
    } else if (options.force) {
      const fnOptionMap = dataCache[businessKey].fnOptionMap
      dataCache[businessKey] = new FlowComp({ ...dataCache[businessKey]._options, force: true })
      dataCache[businessKey].fnOptionMap = fnOptionMap
      return dataCache[businessKey].showFlowBox(fnOptionMap.showFlowBox)
    // 上次实例依然有效
    } else {
      Object.assign(dataCache[businessKey].options, options, { force: false })
      dataCache[businessKey].options.force = false
    }
    compIns = dataCache[businessKey]
    compIns.BPMInsReadyPromise = new Promise(resolve => {
      compIns.BPMReadyResolve = resolve
    })
    compIns.options.onload = options.onload
    compIns.involkeInitCallback()
    return compIns
  }
  window.flowComp = flowComp
