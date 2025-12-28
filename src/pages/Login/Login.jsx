import React, { useContext } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import Image from "../../assets/images/logo.png"
import { Button, Checkbox, Form, Input, message } from "antd";
import { login } from "../../api/authService";
import { AuthContext } from "../../auth/AuthProvider";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login: contextLogin  } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      const res = await login(payload);
      if (res.tokens?.access) {
        contextLogin(res.tokens.access); // 🔥 CONTEXT LOGIN
        message.success("Login successful!");
        navigate("/stocks", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      message.error(err.response?.data?.error || "Invalid email or password!");
    }
  };

  return (
    <Form
      name="LoginForm"
      form={form}
      className="login-form"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => {
        console.log("Failed:", errorInfo);
      }}
    >
      <div className="all-items">
        <img src={Image} alt="logo" className="logo" />

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input
            type="email"
            placeholder="Email"
            prefix={<UserOutlined style={{ fontSize: "17px" }} />}
            className="input-field"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined style={{ fontSize: "17px" }} />}
            className="input-field"
          />
        </Form.Item>

        <Form.Item className="rem-forgot">
          <div className="rem-forgot-inner">
            <Checkbox>Remember me</Checkbox>
            <Link to="/forgot-password" style={{ float: "right" }}>
              Forgot Password?
            </Link>
          </div>
        </Form.Item>

        <Form.Item className="login-btn">
          <Button type="primary" htmlType="submit" className="login-btn-full">
            Login
          </Button>
        </Form.Item>
        <Form.Item className="login-btn">
          <Link to="/billing"> <Button type="primary">Seller</Button> </Link>
        </Form.Item>

        <Form.Item className="signup-link" style={{ textAlign: "center" }}>
          <p>
            Don't have an account? <Link to="/Register">Sign Up</Link>
          </p>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Login;