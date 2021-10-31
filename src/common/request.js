import * as _axios from 'axios'
import utils from './utils'

const setAxios = (options) =>{
  let { lang, appsource, tenantId, userId } = options
  if (utils.isStringEmpty(tenantId)) {
    tenantId = ''
  }
  _axios.defaults.headers['Accept-language'] = lang
  _axios.defaults.headers['Content-Type'] = 'application/json'
  _axios.defaults.headers['tenantAppSource'] = appsource
  _axios.defaults.headers['tenantId'] = tenantId
  _axios.defaults.headers['userId'] = userId
  _axios.defaults.withCredentials = true
  _axios.defaults.baseURL = options.bpmHost

  _axios.interceptors.response.use((response) => {
      // console.log('response',response)
      return response.data && response.status && response.headers ? response.data : response
  })

}

export { setAxios, _axios }
