// import React from 'react'
// import {
//    Input,
//    Form,
//    Button,
//    Select,
//    message
// } from "antd";
// import { AddProduct } from '../../api/productService'

// const { Option } = Select;

// function Items_add_form({ onSuccess }) {

//    const [form] = Form.useForm();

//    const handlResetBtn = () => {
//       form.resetFields();
//    }

//    const onFinish = async (values) => {
//       // console.log("🎯 Form submit!", values);  // ⬅️ Test log

//       try {
//          const response = await AddProduct(values);
//          console.log("✅ Success:", response);

//          message.success("Product added successfully!");
//          form.resetFields();

//          if (onSuccess) {
//             onSuccess();
//          }

//       } catch (error) {
//          message.error("Failed to add product!");
//       }
//    }
//    const onFinishFailed = (errorInfo) => {
//       console.log("❌ Validation failed:", errorInfo);
//    }

//    return (
//       <Form
//          form={form}
//          onFinish={onFinish}
//          onFinishFailed={onFinishFailed}
//          className="form-section"
//          layout="vertical"
//       >
//          <Form.Item
//             label="Item Name"
//             name="item_name"
//             rules={[{ required: true, message: 'Please enter item name!' }]}
//          >
//             <Input placeholder="Enter Item Name" />
//          </Form.Item>

//          <Form.Item
//             label="Quantity"
//             name="item_qty"
//             rules={[{ required: true, message: 'Please enter quantity!' }]}
//          >
//             <Input type="number" placeholder="Enter Item Quantity" />
//          </Form.Item>

//          <Form.Item
//             label="Price"
//             name="item_price"
//             rules={[{ required: true, message: 'Please enter price!' }]}
//          >
//             <Input type="number" placeholder="Enter Item Price" />
//          </Form.Item>

//          <Form.Item
//             label="Category"
//             name="item_category"
//             rules={[{ required: true, message: 'Please select category!' }]}
//          >
//             <Input placeholder="Enter Item Category" />
//          </Form.Item>

//          <Select
//             showSearch
//             allowClear
//             style={{ width: 200 }}
//             placeholder="Select Category"
//             onChange={(value) =>
//                setFilters((prev) => ({ ...prev, item_category: value || "" }))
//             }
//          >
//             {categories.map((cat, index) => (
//                <Option key={index} value={cat}>
//                   {cat}
//                </Option>
//             ))}
//          </Select>

//          <Form.Item
//             label="Action"
//          >
//             <Button style={{ marginRight: 5, width: 100, height: 25 }} type="primary" htmlType="submit">
//                + Add Item
//             </Button>

//             <Button style={{ marginRight: 5, width: 100, height: 25 }} type="default" onClick={handlResetBtn}>
//                Reset
//             </Button>

//          </Form.Item>
//       </Form>
//    )
// }

// export default Items_add_form



import React, { useState, useEffect } from 'react'
import {
   Input,
   Form,
   Button,
   Select,
   message,
   Divider,
   Space
} from "antd";
import { AddProduct } from '../../api/productService'

const { Option } = Select;

function Items_add_form({ onSuccess, categories = [] }) {

   const [form] = Form.useForm();
   const [newCategory, setNewCategory] = useState("");
   const [categoryList, setCategoryList] = useState(categories);

   useEffect(() => {
      setCategoryList(categories);
   }, [categories]);


   const handlResetBtn = () => {
      form.resetFields();
      setNewCategory("");
   };

   const addNewCategory = () => {
      if (!newCategory.trim()) {
         message.warning("Please enter category name");
         return;
      }

      if (categoryList.includes(newCategory)) {
         message.info("Category already exists");
         return;
      }

      setCategoryList(prev => [...prev, newCategory]);
      form.setFieldsValue({ item_category: newCategory });
      setNewCategory("");
      message.success("Category added");
   };

   const onFinish = async (values) => {
      try {
         await AddProduct(values);
         message.success("Product added successfully!");
         form.resetFields();

         if (onSuccess) onSuccess();
      } catch (error) {
         message.error("Failed to add product!");
      }
   };

   return (
      <Form
         form={form}
         onFinish={onFinish}
         layout="vertical"
         className="form-section"
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

         {/* ✅ CATEGORY (SELECT + ADD NEW) */}
         <Form.Item
            label="Category"
            name="item_category"
            rules={[{ required: true, message: "Please select or add category!" }]}
         >
            <Select
               showSearch
               allowClear
               listHeight={200}

               placeholder="Select or add category"
               popupRender={(menu) => (
                  <>
                     {menu}
                     <Divider style={{ margin: "8px 0" }} />
                     <Space style={{ padding: "0 8px 4px" }}>
                        <Input
                           placeholder="Add new category"
                           value={newCategory}
                           onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <Button type="primary" onClick={addNewCategory}>
                           Add
                        </Button>
                     </Space>
                  </>
               )}
            >
               {categoryList.map((cat, index) => (
                  <Select.Option key={index} value={cat}>
                     {cat}
                  </Select.Option>
               ))}
            </Select>
         </Form.Item>


         <Form.Item>
            <Button
               type="primary"
               htmlType="submit"
               style={{ marginRight: 8 }}
            >
               + Add Item
            </Button>

            <Button onClick={handlResetBtn}>
               Reset
            </Button>
         </Form.Item>
      </Form>
   );
}

export default Items_add_form;



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