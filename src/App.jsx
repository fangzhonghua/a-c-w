import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import './App.less';

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
        {/* 注释fzh */}
      {options.btn}
      </div>
            <Drawer title={options.btn} placement="right" onClose={this.onClose.bind(this)} visible={visible}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    </div>
  }
}
App.propTypes = {
  options: PropTypes.object,
  hideApp: PropTypes.func
};
export default App;