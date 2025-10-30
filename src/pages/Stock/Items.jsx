import React, { useEffect, useState } from "react";
import "./Items.css";
import { Link, useNavigate } from "react-router-dom";
import {
   Input,
   Form,
   Button,
   Typography,
   Select,
   Table,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { FiRefreshCcw } from "react-icons/fi";
import "../../Components/Common.css";
import { logout } from "../../api/authService";
import { ProductsList } from "../../api/productService"

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
];


function Items() {
   const [products, setProducts] = useState([])
   const navigate = useNavigate()

   const handlClick = ()=>{
      navigate('/')
   }

   const fetchProducts = async () => {
      try {
         const res = await ProductsList();
         setProducts(res.data);
      } catch (err) {
         console.error("Fetch error:", err);
      }
   };


   useEffect(() => {
      fetchProducts()
   }, [])

   const handleLogout = (() => {
      logout();
      navigate('/')

   })

   return (
      <Form className="items-container" layout="vertical">
         <div style={{display:'flex', justifyContent:'center' ,gap:'100px'}}>
            <h2 className="header-title">Grocery Shop Stocks Page</h2>
            <Button onClick={handlClick}>+ item</Button>
         </div>

         {/* <div className="form-section">
            <Form.Item label="Item Name" name="itemName">
               <Input placeholder="Enter Item Name" />
            </Form.Item>

            <Form.Item label="Quantity" name="quantity">
               <Input placeholder="Enter Item Quantity" />
            </Form.Item>

            <Form.Item label="Price" name="price">
               <Input placeholder="Enter Item Price" />
            </Form.Item>

            <Form.Item label="Category" name="category">
               <Select placeholder='Select'>
                  <Option value="Oil">Oil</Option>
                  <Option value="Rice">Rice</Option>
                  <Option value="Grains">Grains</Option>
                  <Option value="Pulses">Pulses</Option>
                  <Option value="Essentials">Essentials</Option>
                  <Option value="Dairy">Dairy</Option>
                  <Option value="Beverages">Beverages</Option>
                  <Option value="Snacks">Snacks</Option>
               </Select>
            </Form.Item>

            <div className="btn-group">
               <Button type="primary">Save</Button>
               <Button type="primary">Edit</Button>
               <Button danger>Delete</Button>
               <Button type="default" onClick={resetBtn}>Reset</Button>
            </div>
         </div> */}

         {/* <Title level={3} className="section-title">Available Stocks</Title> */}

         {/* <div className="filter-section">
            <Title level={4}>Filter by Category</Title>

            <Select
               showSearch
               allowClear
               style={{ width: 200 }}
               placeholder="Select Category"
               optionFilterProp="children"
               // onChange={handleChange}
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

            <Button className="refresh-btn"><FiRefreshCcw /></Button>
            <Link to='/StockReport'>
               <Button className="report-btn" type="primary">Report</Button>
            </Link>
            <Link to="/StockDashboard">
               <Button type="primary">Dashboard</Button>
            </Link>
         </div> */}

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
      </Form>
   );
}

export default Items;