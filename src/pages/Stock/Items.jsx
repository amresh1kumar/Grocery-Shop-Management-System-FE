import React, { useEffect, useState, useContext } from "react";
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
import { ProductsList, DeleteProduct, UpdateProduct } from "../../api/productService"
import Items_add_form from "./Items_add_form";
import { AuthContext } from "../../auth/AuthProvider";

function Items() {

   const { Title } = Typography;
   const { Option } = Select;

   const clientColumns = [
      {
         title: "S.No",
         key: "sno",
         render: (text, record, index) => index + 1,
         width: 80
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
                  style={{ padding: 0, marginRight: 5, width: 70 }}
                  onClick={() => handleEdit(record)}
               >
                  Update
               </Button>
               <Button style={{ padding: 0, width: 70 }} danger onClick={() => handleDelete(record.id)}>
                  Delete
               </Button>
            </>

         ),
      },
   ];
   const [products, setProducts] = useState([])
   const [edit, setEdit] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [categories, setCategories] = useState([]);
   const [filters, setFilters] = useState({
      item_name: "",
      item_category: "",
   })
   const [form] = Form.useForm()
   const navigate = useNavigate()
   const { logout } = useContext(AuthContext);


   const loadCategories = async () => {
      try {
         const res = await ProductsList();

         const uniqueCats = [...new Set(res.map(p => p.item_category))];

         setCategories(uniqueCats);
      } catch (err) {
         console.log("Error loading categories:", err);
      }
   };

   const fetchProducts = async () => {
      try {
         const res = await ProductsList(filters);
         setProducts(res);
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
   const handlResetBtn = () => {
      form.resetFields();
      setFilters({
         item_name: "",
         item_category: ""
      });

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
      fetchProducts();
   }, [filters]);

   useEffect(() => {
      loadCategories();
   }, []);



   const handleLogout = () => {
      logout();
      navigate("/", { replace: true });
   };




   return (
      <div className="items-container">
         {/* Add Product Form */}
         <Items_add_form categories={categories} onSuccess={() => { fetchProducts(); loadCategories(); }} />

         <Title level={3} className="section-title">Available Stocks</Title>
         <div className="filter-section">
            <Title level={4}>Filter by Category</Title>
            <Select
               showSearch
               allowClear
               listHeight={200}

               style={{ width: 200 }}
               placeholder="Select Category"
               onChange={(value) =>
                  setFilters((prev) => ({ ...prev, item_category: value || "" }))
               }
            >
               {categories.map((cat, index) => (
                  <Option key={index} value={cat}>
                     {cat}
                  </Option>
               ))}
            </Select>
            <Button className="refresh-btn" onClick={handlResetBtn}>
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
               scroll={{ y: 500 }}
               rowKey="id"
            />
         </div>

         <div className="logout-section">

            <Button onClick={handleLogout} type="primary" danger icon={<LogoutOutlined />}>
               Logout
            </Button>

         </div>

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