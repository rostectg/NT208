import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { logIn } from '../redux/action/user-action';
import { axiosInstance } from './../apis/api-config';

function LoginPage({ setUserName }) {
  const [form] = Form.useForm();
  const auth = useSelector((state) => state.user.auth)
  const userName = Form.useWatch('username', form);
  const dispatch = useDispatch();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }

  if (auth) {
    userName && setUserName(userName)
    notification.success({ message: "Log in successfully", duration: 3 })
    return <Navigate to="/" replace />;
  }

  const handleLogIn = async (values) => {
    // dispatch(logIn(values))
    const res = await axiosInstance.post('/api/auth/login', values)
      .then((response) => {

        console.log(response.headers.toJSON);
      })
  }

  const handleLogInFailed = () => {
    notification.error({ message: "Log in failed", duration: 3 })
  }
  return (
    <div className='w-1/3 h-2/5 fixed top-1/4 left-1/3 bg-slate-300 px-6 py-6 rounded-2xl'>
      <h2 className='text-center text-3xl font-bold mb-4 text-black'>Log In</h2>
      <Form className='capitalize'
        {...layout}
        form={form}
        name='login'
        onFinish={handleLogIn}
        onFinishFailed={handleLogInFailed}
        initialValues={{
          remember: true,
        }}>
        <Form.Item style={{ color: "#fff" }} label='username' name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='password' name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type='primary' htmlType='submit'>Log In</Button>
        </Form.Item>
        <h4 className='text-black text-center'>Don't have an account? <a className='text-sky-500' href='register'>Register here!</a></h4>
      </Form>
    </div>
  );
}

export default LoginPage;