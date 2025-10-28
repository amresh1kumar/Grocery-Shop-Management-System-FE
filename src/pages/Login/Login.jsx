import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import Image from "../../assets/images/logo.png"
import { Button, Checkbox, Form, Input, message } from "antd";
import { login } from "../../api/authService"; // backend login API


// const Login = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   // const onFinish = (values) => {
//   //   console.log("Success:", values);
//   //   navigate("/stocks");
//   // };


//   const onFinish = async (values) => {
//     try {
//       const payload = {
//         username: values.username,
//         password: values.password,
//       };

//       const res = await login(payload);

//       // Token save karo
//       if (res.tokens?.access) {
//         localStorage.setItem("token", res.tokens.access);
//       }

//       // Success message (optional)
//       message.success("Login successful!");

//       navigate("/stocks");
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       message.error(err.response?.data?.detail || "Login failed! Please try again.");
//     }
//   };


//   return (
//     <Form
//       name="LoginForm"
//       form={form}
//       className="login-form"
//       initialValues={{ remember: true }}
//       autoComplete="off"
//       onFinish={onFinish}
//       onFinishFailed={(errorInfo) => {
//         console.log("Failed:", errorInfo);
//       }}
//     >
//       <div className="all-items">
//         <img src={Image} alt="logo" className="logo" />

//         <Form.Item
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your mobile number or email!",
//             },
//           ]}
//         >
//           <Input
//             type="email"
//             placeholder="Mobile Number or Email"
//             prefix={<UserOutlined style={{ fontSize: "17px" }} />}
//             className="input-field"
//           />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your password!" }]}
//         >
//           <Input.Password
//             placeholder="Please input your password!"
//             prefix={<LockOutlined style={{ fontSize: "17px" }} />}
//             className="input-field"
//           />
//         </Form.Item>

//         <Form.Item className="rem-forgot">
//           <div className="rem-forgot-inner">
//             <Checkbox>Remember me</Checkbox>
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </div>
//         </Form.Item>

//         <Form.Item className="login-btn">
//           <Button type="primary" htmlType="submit">
//             Login
//           </Button>
//         </Form.Item>

//         <Form.Item className="login-btn">
//           <Link to="/billing">
//             <Button type="primary">Seller</Button>
//           </Link>
//         </Form.Item>

//         <Form.Item className="signup-link">
//           <p>
//             Don't have an account? <Link to="/Register">Sign Up</Link>
//           </p>
//         </Form.Item>
//       </div>
//     </Form>

//   );
// };

// export default Login;


const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const payload = {
        email: values.username, // backend expects email
        password: values.password,
      };

      const res = await login(payload);

      // Token store
      if (res.tokens?.access) {
        localStorage.setItem("token", res.tokens.access);
      }

      message.success("Login successful!");
      navigate("/stocks");
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

        {/* Email */}
        <Form.Item
          name="username"
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

        {/* Password */}
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

        {/* Remember Me + Forgot */}
        <Form.Item className="rem-forgot">
          <div className="rem-forgot-inner">
            <Checkbox>Remember me</Checkbox>
            <Link to="/forgot-password" style={{ float: "right" }}>
              Forgot Password?
            </Link>
          </div>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="login-btn">
          <Button type="primary" htmlType="submit" className="login-btn-full">
            Login
          </Button>
        </Form.Item>
        <Form.Item className="login-btn">
          <Link to="/billing"> <Button type="primary">Seller</Button> </Link>
        </Form.Item>

        {/* Already Login (centered) */}
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