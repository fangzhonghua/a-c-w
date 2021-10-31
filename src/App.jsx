import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import './App.less';
import lang from "ac-lang-cn";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  onClose() {
    this.props.hideApp();
  }
  componentDidMount() {
    this.setState({
      visible:true
    })
  }
  render() {
    const { options } = this.props;
    const { visible } = this.state;
    return <div className={`approve-component ${visible?'visible':'hide'}`}>
      <div className='content'>
      </div>
      <Drawer title={options.btn} placement="right" onClose={this.onClose.bind(this)} visible={visible}>
          <p>{options.btn}</p>
          <p>{lang.template("P_YS_OA_XTLCZX_0001428068") /* "保存常用语" */}</p>
          <p>{lang.template("P_YS_OA_XTLCZX_0001428070") /* "取消保存常用语" */}</p>
      </Drawer>
    </div>
  }
}
App.propTypes = {
  options: PropTypes.object,
  hideApp: PropTypes.func
};
export default App;
