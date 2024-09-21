import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //go
  const FormItem1 = 'username';//表单1名字
  const FormItem2 = 'password';//表单2名字 

  //MA
  // const FormItem1 = 'mobile';//表单1名字 13800000002
  // const FormItem2 = 'code';//表单2名字   246810

  //点击登录完成
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async loginForm => {
    const result = await dispatch(fetchLogin(loginForm, '/login'));
    if (result.success) {
      message.success(result.msg);
      navigate('/');
    } else {
      message.error(result.msg);
    }
  };

  return (
    <div className="login">
      <Card className="login-container">
        {/* <img className="login-logo" src={logo} alt="" /> */}
        <div className='loginTitle'>登录</div>
        {/* 登录表单 */}
        <Form validateTrigger={['onBlur']}  onFinish={onFinish}>
          {/* 手机号 */}
          {/* , {pattern: /^1[3-9]\d{9}$/,message: '手机号码格式不对'} */}
          <Form.Item name={FormItem1} rules={[{ required: true, message: '请输入手机号' }]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          {/* 验证码 */}
          <Form.Item name={FormItem2} rules={[ { required: true, message: '请输入验证码' },]}>
            <Input size="large" placeholder="请输入验证码" maxLength={6}/>
          </Form.Item>
          {/* 按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login