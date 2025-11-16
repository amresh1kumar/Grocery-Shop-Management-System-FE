import React, { useEffect, useState } from "react";
import "./Items.css";
import { Link, useNavigate } from "react-router-dom";
import {
   Input,
   Button,
   Typography,
   Select,
   Table,
   Modal,
   Form,
   message
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { FiRefreshCcw } from "react-icons/fi";
import "../../Components/Common.css";
import { logout } from "../../api/authService";
import { ProductsList, DeleteProduct,UpdateProduct } from "../../api/productService"
import Items_add_form from "./Items_add_form";

function Items() {

   const { Title } = Typography;
   const { Option } = Select;

   const clientColumns = [
      {
         title: "ID",
         dataIndex: "id",
         key: "id",
      },
      {
         title: "Item Name",
         dataIndex: "item_name",
         key: "item_name",
      },
      {
         title: "Quantity",
         dataIndex: "item_qty",
         key: "item_qty",
      },
      {
         title: "Price",
         dataIndex: "item_price",
         key: "item_price",
      },
      {
         title: "Category",
         dataIndex: "item_category",
         key: "item_category",
      },
      {
         title: 'Action',
         render: (_, record) => (
            <>
               <Button
                  type="primary"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleEdit(record)}
               >
                  Edit
               </Button>
               <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
               </Button>
            </>

         ),
      },
   ];
   const [products, setProducts] = useState([])
   const [edit, setEdit] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [form] = Form.useForm()
   const navigate = useNavigate()


   const fetchProducts = async () => {
      try {
         const res = await ProductsList();
         setProducts(res.data);
      } catch (err) {
         console.error("Fetch error:", err);
      }
   };

   const handleEdit = (record) => {
      setEdit(record)
      form.setFieldsValue(record);
      setIsModalOpen(true);
   }

   const handleUpdate = async () => {
      try {
         const values = await form.validateFields();
         await UpdateProduct(edit.id, values);
         message.success("Product updated successfully!");
         setIsModalOpen(false);
         fetchProducts();
      } catch (err) {
         message.error("Update failed!");
      }
   }


   const handleDelete = async (id) => {
      try {
         await DeleteProduct(id);
         message.success("Product delete successfully")
         fetchProducts()

      } catch (error) {
         message.error("Delete failed");

      }
   }
   useEffect(() => {
      fetchProducts()
   }, [])

   const handleLogout = (() => {
      logout();
      navigate('/')
   })

   return (
      <div className="items-container">
         {/* ⬅️ Add Product Form */}
         <Items_add_form onSuccess={fetchProducts} />
         <Title level={3} className="section-title">Available Stocks</Title>
         <div className="filter-section">
            <Title level={4}>Filter by Category</Title>
            <Select
               showSearch
               allowClear
               style={{ width: 200 }}
               placeholder="Select Category"
               optionFilterProp="children"
               filterOption={(input, option) =>
                  option?.children?.toLowerCase().includes(input.toLowerCase())
               }
            >
               <Option value="Oil">Oil</Option>
               <Option value="Rice">Rice</Option>
               <Option value="Grains">Grains</Option>
               <Option value="Pulses">Pulses</Option>
               <Option value="Essentials">Essentials</Option>
               <Option value="Dairy">Dairy</Option>
               <Option value="Beverages">Beverages</Option>
               <Option value="Snacks">Snacks</Option>
            </Select>
            <Button className="refresh-btn" onClick={fetchProducts}>
               <FiRefreshCcw />
            </Button>
            <Link to='/StockReport'>
               <Button className="report-btn" type="primary">Report</Button>
            </Link>
            <Link to="/StockDashboard">
               <Button type="primary">Dashboard</Button>
            </Link>
         </div>

         <div className="table-section">
            <Table
               dataSource={products}
               columns={clientColumns}
               pagination={false}
               size="small"
               scroll={{ y: 800 }}
               rowKey="id"
            />
         </div>

         <div className="logout-section">
            <Link to="/">
               <Button onClick={handleLogout} type="primary" danger icon={<LogoutOutlined />}>
                  Logout
               </Button>
            </Link>
         </div>

         {/* Edit Modal */}
         {/* <Modal
            title="Edit Author"
            open={isModalOpen}
            onOk={handleUpdate}
            onCancel={() => setIsModalOpen(false)}
         >
            <Form form={form} layout="vertical">
               <Form.Item
                  name="item_name"
                  label="Name"
                  rules={[
                     { required: true, message: "Please enter name" },
                     {
                        validator: (_, value) => {
                           if (!value) return Promise.resolve();
                           const isDuplicate = data.some(
                              (item) => item.item_name.toLowerCase() === value.toLowerCase()
                           );
                           return isDuplicate
                              ? Promise.reject(
                                 new Error("This name already exists!")
                              )
                              : Promise.resolve();
                        },
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="item_qty"
                  label="Qunatity"
                  rules={[
                     { required: true, message: "Please enter Qunatity" },
                     {
                        validator: (_, value) => {
                           if (!value) return Promise.resolve();
                           const isDuplicate = data.some(
                              (item) => item.item_qty.toLowerCase() === value.toLowerCase()
                           );
                           return isDuplicate
                              ? Promise.reject(
                                 new Error("This name already exists!")
                              )
                              : Promise.resolve();
                        },
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="item_price"
                  label="Price"
                  rules={[
                     { required: true, message: "Please enter Price" },
                     {
                        validator: (_, value) => {
                           if (!value) return Promise.resolve();
                           const isDuplicate = data.some(
                              (item) => item.item_price.toLowerCase() === value.toLowerCase()
                           );
                           return isDuplicate
                              ? Promise.reject(
                                 new Error("This name already exists!")
                              )
                              : Promise.resolve();
                        },
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="item_category"
                  label="Category"
                  rules={[
                     { required: true, message: "Please enter Category" },
                     {
                        validator: (_, value) => {
                           if (!value) return Promise.resolve();
                           const isDuplicate = data.some(
                              (item) => item.item_category.toLowerCase() === value.toLowerCase()
                           );
                           return isDuplicate
                              ? Promise.reject(
                                 new Error("This name already exists!")
                              )
                              : Promise.resolve();
                        },
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
            </Form>

         </Modal> */}

         <Modal
            title="Edit Author"
            open={isModalOpen}
            onOk={handleUpdate}
            onCancel={() => setIsModalOpen(false)}
         >
            <Form form={form} layout="vertical">

               <Form.Item
                  name="item_name"
                  label="Name"
                  rules={[{ required: true, message: "Please enter name" }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="item_qty"
                  label="Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="item_price"
                  label="Price"
                  rules={[{ required: true, message: "Please enter price" }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="item_category"
                  label="Category"
                  rules={[{ required: true, message: "Please enter category" }]}
               >
                  <Input />
               </Form.Item>

            </Form>
         </Modal>

      </div>
   );
}

export default Items;