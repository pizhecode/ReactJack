import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux';
import { httpPizhe } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //go
  const FormItem1 = 'username';//表单1名字
  const FormItem2 = 'password';//表单2名字
  const FormItem3 = 're_password';//表单2名字


  //点击登录完成
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async formValue => {
    await dispatch(httpPizhe(formValue,'/signup'))
    navigate('/login')
    message.success('注册成功')
  }

  return (
    <div className="login">
      <Card className="login-container">
        {/* <img className="login-logo" src={logo} alt="" /> */}
        <div className='loginTitle'>注册</div>
        {/* 注册表单 */}
        <Form validateTrigger={['onBlur']}  onFinish={onFinish}>
          {/* 手机号 */}
          {/* , {pattern: /^1[3-9]\d{9}$/,message: '手机号码格式不对'} */}
          <Form.Item name={FormItem1} rules={[{ required: true, message: '请输入手机号' }]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          {/* 密码 */}
          <Form.Item name={FormItem2} rules={[ { required: true, message: '请输入密码' },]}>
            <Input size="large" placeholder="请输入密码" maxLength={6}/>
          </Form.Item>
            {/* 密码2 */}
            <Form.Item name={FormItem3} rules={[ { required: true, message: '请输入密码' },]}>
            <Input size="large" placeholder="请输入密码" maxLength={6}/>
          </Form.Item>
          {/* 按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>注册</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login