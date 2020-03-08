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
    show: true
  };
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
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
                  {this.state.show ?
                    <Row key="login-page">
                      <Login switchPage={this.onClick} />
                    </Row>
                    :
                    <Row key="signup-page">
                      <SignUp switchPage={this.onClick} />
                    </Row>}
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
    const callback = () => { this.props.switchPage() }

    await axios.post('http://localhost:4000/api/register ', { ...values })
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
                { type: 'email', message: 'asdasd' }
              ]} >
                <Input placeholder="Email" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block className="btn-mitrais">
                Register
              </Button>
              <br />
              <Button htmlType="button" block className="btn-mitrais">
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
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" block className="btn-mitrais">
                Submit
                          </Button>
              <Divider>OR</Divider>
              <Button type="primary" htmlType="button" onClick={this.props.switchPage} block className="btn-mitrais">
                Sign Up
                          </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    )
  }
}

export default App;
