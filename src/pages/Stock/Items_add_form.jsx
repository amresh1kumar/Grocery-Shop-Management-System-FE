import React from 'react'
import {
   Input,
   Form,
   Button,
   Select,
   message
} from "antd";
import { AddProduct } from '../../api/productService'

const { Option } = Select;

function Items_add_form({ onSuccess }) {

   const [form] = Form.useForm();

   const handlResetBtn = () => {
      form.resetFields();
   }

   const onFinish = async (values) => {
      // console.log("🎯 Form submit!", values);  // ⬅️ Test log

      try {
         const response = await AddProduct(values);
         console.log("✅ Success:", response);

         message.success("Product added successfully!");
         form.resetFields();

         if (onSuccess) {
            onSuccess();
         }

      } catch (error) {
         message.error("Failed to add product!");
      }
   }
   const onFinishFailed = (errorInfo) => {
      console.log("❌ Validation failed:", errorInfo);
   }

   return (
      <Form
         form={form}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         className="form-section"
         layout="vertical"
      >
         <Form.Item
            label="Item Name"
            name="item_name"
            rules={[{ required: true, message: 'Please enter item name!' }]}
         >
            <Input placeholder="Enter Item Name" />
         </Form.Item>

         <Form.Item
            label="Quantity"
            name="item_qty"
            rules={[{ required: true, message: 'Please enter quantity!' }]}
         >
            <Input type="number" placeholder="Enter Item Quantity" />
         </Form.Item>

         <Form.Item
            label="Price"
            name="item_price"
            rules={[{ required: true, message: 'Please enter price!' }]}
         >
            <Input type="number" placeholder="Enter Item Price" />
         </Form.Item>

         <Form.Item
            label="Category"
            name="item_category"
            rules={[{ required: true, message: 'Please select category!' }]}
         >
            <Input placeholder="Enter Item Category" />
         </Form.Item>

         <Form.Item 
         label="Action"
         >
            <Button style={{ marginRight:5, width:100, height:25} } type="primary" htmlType="submit">
               + Add Item
            </Button>

            <Button style={{ marginRight:5, width:100 ,height:25} } type="default" onClick={handlResetBtn}>
               Reset
            </Button>

         </Form.Item>
      </Form>
   )
}

export default Items_add_form

// for manual

// import React, { useState } from 'react'
// import {
//    Input,
//    Form,
//    Button,
//    Select,
// } from "antd";

// const { Option } = Select;
// function Items_add_form() {

//    const [itemName, setItemName] = useState("");
//    const [quantity, setQuantity] = useState("");
//    const [price, setPrice] = useState("");
//    const [category, setCategory] = useState("");


//    const handlResetBtn = () => {
//       setItemName("");
//       setQuantity("");
//       setPrice("");
//       setCategory("");
//    };



//    return (
//       <Form className="form-section" layout="vertical">
//          <Form.Item label="Item Name">
//             <Input
//                value={itemName}
//                onChange={(e) => setItemName(e.target.value)}
//                placeholder="Enter Item Name"
//             />
//          </Form.Item>

//          <Form.Item label="Quantity">
//             <Input
//                value={quantity}
//                onChange={(e) => setQuantity(e.target.value)}
//                placeholder="Enter Item Quantity"
//             />
//          </Form.Item>

//          <Form.Item label="Price">
//             <Input
//                value={price}
//                onChange={(e) => setPrice(e.target.value)}
//                placeholder="Enter Item Price"
//             />
//          </Form.Item>

//          <Form.Item label="Category">
//             <Select
//                value={category}
//                onChange={(value) => setCategory(value)}
//                placeholder="Select"
//             >
//                <Option value="Oil">Oil</Option>
//                <Option value="Rice">Rice</Option>
//                <Option value="Grains">Grains</Option>
//                <Option value="Pulses">Pulses</Option>
//                <Option value="Essentials">Essentials</Option>
//                <Option value="Dairy">Dairy</Option>
//                <Option value="Beverages">Beverages</Option>
//                <Option value="Snacks">Snacks</Option>
//             </Select>
//          </Form.Item>
//          <div className="btn-group">
//             <Button type="primary">Save</Button>
//             <Button type="primary">Edit</Button>
//             <Button danger>Delete</Button>
//             <Button type="default" onClick={handlResetBtn}>Reset</Button>
//          </div>
//       </Form>

//    )
// }


// export default Items_add_form