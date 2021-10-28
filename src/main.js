import React from 'react';
import ReactDOM from 'react-dom';
import './main.less';
import App from './App';
import { setAxios, _axios} from './common/request'

class FlowComp {
    constructor(options) {
        if (Array.isArray(options)) return;
        if (!(options instanceof Object)) return;
        this.options = options;
        this.init();
    }
    init() {
        // this.visible = true
        setAxios(this.options)
        _axios.get('approve-component/api/v1/activity/authority/'+this.options.businessKey).then((res)=>{
            this.options.onload(res&&{fieldAuth:res.data})
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
        this.container = document.getElementById('web-component-root');
        if(!this.container){
            var container = document.createElement('div');
            container.setAttribute('id','web-component-root')
            document.body.appendChild(container);
            this.container = container;
        }
        console.log(App)
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
        console.log('销毁')
        ReactDOM.unmountComponentAtNode(this.container)
    }
    
}

var dataCache = {}
const flowComp = function (options = {}) {

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
