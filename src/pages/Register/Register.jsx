import React from "react";
import { UserOutlined, LockOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/logo.png";
import { Button, Checkbox, Form, Input, message } from "antd";
import { register } from "../../api/authService";

function Register() {
   const [form] = Form.useForm();
   const navigate = useNavigate();

   const onFinish = async (values) => {
      try {
         if (values.password !== values.confirm_password) {
            message.error("Passwords do not match!");
            return;
         }

         const payload = {
            email: values.email,
            username: values.username || values.email.split('@')[0],
            password: values.password,
            first_name: values.first_name || "",
            last_name: values.last_name || "",
            address: values.address || "",
            contact_number: values.contact_number || "",
         };

         const res = await register(payload);

         message.success("Registration successful!");
         if (res.tokens?.access) {
            localStorage.setItem("token", res.tokens.access);
         }
         navigate("/stocks");
      } catch (err) {
         console.error("Register error:", err.response?.data);

         if (err.response?.data?.error?.email) {
            message.error("Email already registered!");
         } else {
            message.error("Registration failed! Please try again.");
         }
      }
   };


   return (
      <Form
         name="RegisterForm"
         form={form}
         className="login-form"
         autoComplete="off"
         onFinish={onFinish}
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

            <Form.Item name="username">
               <Input
                  placeholder="Username (optional)"
                  prefix={<IdcardOutlined style={{ fontSize: "17px" }} />}
                  className="input-field"
               />
            </Form.Item>

            <Form.Item name="first_name">
               <Input
                  placeholder="First Name"
                  prefix={<UserOutlined style={{ fontSize: "17px" }} />}
                  className="input-field"
               />
            </Form.Item>

            <Form.Item name="last_name">
               <Input
                  placeholder="Last Name"
                  prefix={<UserOutlined style={{ fontSize: "17px" }} />}
                  className="input-field"
               />
            </Form.Item>

            <Form.Item name="address">
               <Input
                  placeholder="Address"
                  prefix={<HomeOutlined style={{ fontSize: "17px" }} />}
                  className="input-field"
               />
            </Form.Item>

            <Form.Item name="contact_number">
               <Input
                  placeholder="Contact Number"
                  prefix={<PhoneOutlined style={{ fontSize: "17px" }} />}
                  className="input-field"
                  autoComplete="new-password"
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
                  autoComplete="new-password"
               />
            </Form.Item>

            <Form.Item
               name="confirm_password"
               rules={[{ required: true, message: "Please confirm your password!" }]}
            >
               <Input.Password
                  placeholder="Confirm Password"
                  prefix={<LockOutlined style={{ fontSize: "17px" }} />}
                  className="input-field"
                  autoComplete="new-password"
               />
            </Form.Item>



            <Form.Item className="login-btn">
               <Button type="primary" htmlType="submit" className="login-btn-full">
                  Register
               </Button>
            </Form.Item>

            <Form.Item className="signup-link" style={{ textAlign: "center" }}>
               <p>Already Login? <Link to="/">Sign In</Link></p>
            </Form.Item>
         </div>
      </Form>
   );
}

export default Register;
