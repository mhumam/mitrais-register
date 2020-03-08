import React, { Component } from 'react';
import { Layout, Row, Col, Spin, Form, Input, Button, Divider, Radio, notification, DatePicker } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description
  });
};

class App extends Component {
  state = {
    show: true,
    page: 'login'
  };

  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }

  switchToPage = (page) => {
    this.setState({ page });
  }

  render() {
    const isLoading = false;
    return (
      <Layout>
        <Content>
          <Spin spinning={isLoading}>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <img src="/assets/images/background-login-2.jpg" alt="Mitrais" className="background-login" />
                <QueueAnim className="demo-content">
                  {
                    (this.state.page === 'login') ?
                      <Row key="login-page">
                        <Login switchToPage={this.switchToPage} />
                      </Row> :
                      (this.state.page === 'signup') ?
                        <Row key="signup-page">
                          <SignUp switchToPage={this.switchToPage} />
                        </Row> : <HomePage switchToPage={this.switchToPage} />
                  }
                </QueueAnim>
              </Col>
            </Row>
          </Spin>
        </Content>
      </Layout>

    );
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  onFinish = async values => {
    values.dateofbirth = (values.dateofbirth) ? moment(values.dateofbirth).format("YYYY/MM/DD") : null;

    /* Loading true */
    this.setState({ isLoading: true });

    /* callback switch page */
    const callback = () => { this.props.switchToPage('login') }

    await axios.post('https://apimitrais.herokuapp.com/api/register', { ...values })
      .then(function (response) {
        const { status } = response.data;
        openNotificationWithIcon('success', 'Success', status.message);

        /* call switch page */
        callback();
      })
      .catch(function (error) {
        const { data } = error.response;
        const { status } = data;
        openNotificationWithIcon('error', 'Error', status.message)
      });

    /* close loading */
    this.setState({ isLoading: false });
  };


  render() {
    return (
      <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }} xl={{ span: 8, offset: 8 }} style={{ marginTop: '100px' }}>
        <div className="box-login">
          <img src="/assets/images/mitrais-logo.png" alt="Mitrais" style={{ width: '120px' }} />
          <Divider>Registration</Divider>
          <Spin indicator={antIcon} spinning={this.state.isLoading}>
            <Form layout="vertical" name="register" initialValues={{ remember: true }} onFinish={this.onFinish}>
              <Form.Item label="Mobile Number" name="mobilephone" extra="Example : 085-742-899834"
                rules={[
                  { required: true, message: 'Please input your mobile number!' },
                  { pattern: new RegExp("^(([0-9]{3})|[0-9]{3}-)[0-9]{3}-[0-9]{6}$"), message: 'Please input format indonesian' }
                ]}>
                <Input placeholder="Mobile Phone" maxLength={15} />
              </Form.Item>
              <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: 'Please input your first name!' }]}>
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: 'Please input your last name!' }]}>
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item label="Date Of Birth" name="dateofbirth">
                <DatePicker placeholder="Date Of Birth" />
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Format email invalid' }
              ]} >
                <Input placeholder="Email" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block className="btn-mitrais">
                Register
              </Button>
              &nbsp;
              <Button htmlType="button" block className="btn-mitrais" onClick={() => this.props.switchToPage('login')}>
                Back
              </Button>
            </Form>
          </Spin>
        </div>
      </Col>
    )
  }
}

class Login extends Component {
  onFinish = values => {
    this.props.switchToPage('homepage');
  }

  render() {
    return (
      <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }} xl={{ span: 8, offset: 8 }} style={{ marginTop: '100px' }}>
        <div className="box-login">
          <img src="/assets/images/mitrais-logo.png" alt="Mitrais" style={{ width: '120px' }} />
          <Divider>Login</Divider>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Format email invalid' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" block className="btn-mitrais">
                Submit
              </Button>
              <Divider>OR</Divider>
              <Button type="primary" htmlType="button" onClick={() => this.props.switchToPage('signup')} block className="btn-mitrais">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    )
  }
}

class HomePage extends Component {
  render() {
    return (
      <Col xs={24} sm={24} md={{ span: 8, offset: 8 }} lg={{ span: 8, offset: 8 }} xl={{ span: 8, offset: 8 }} style={{ marginTop: '100px' }}>
        <div className="box-login">
          <img src="/assets/images/mitrais-logo.png" alt="Mitrais" style={{ width: '120px' }} />
          <Divider>Welcome to Mitrais</Divider>
          <Form layout="vertical" name="register" initialValues={{ remember: true }} onFinish={this.onFinish}>

            <Button type="primary" htmlType="submit" block onClick={() => this.props.switchToPage('login')}>
              Logout
            </Button>
            &nbsp;
            </Form>
        </div>
      </Col>
    )
  }
}

export default App;
