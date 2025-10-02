import React, { useState } from "react";
import "./Items.css";
import { Link ,useNavigate} from "react-router-dom";
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

const { Title } = Typography;
const { Option } = Select;

const clientColumns = [
   {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
   },
   {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
   },
   {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
   },
   {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
   },
   {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
   },
];

const clients = [
   { ID: 1, itemName: "Sunflower Oil", Quantity: 2, Price: 180, Category: "Oil" },
   { ID: 2, itemName: "Basmati Rice", Quantity: 1, Price: 120, Category: "Rice" },
   { ID: 3, itemName: "Wheat Flour", Quantity: 3, Price: 150, Category: "Grains" },
   { ID: 4, itemName: "Toor Dal", Quantity: 2, Price: 140, Category: "Pulses" },
   { ID: 5, itemName: "Sugar", Quantity: 4, Price: 100, Category: "Essentials" },
   { ID: 6, itemName: "Milk", Quantity: 6, Price: 60, Category: "Dairy" },
   { ID: 7, itemName: "Butter", Quantity: 2, Price: 250, Category: "Dairy" },
   { ID: 8, itemName: "Salt", Quantity: 1, Price: 20, Category: "Essentials" },
   { ID: 9, itemName: "Chana Dal", Quantity: 3, Price: 130, Category: "Pulses" },
   { ID: 10, itemName: "Moong Dal", Quantity: 2, Price: 160, Category: "Pulses" },
   { ID: 11, itemName: "Coconut Oil", Quantity: 1, Price: 220, Category: "Oil" },
   { ID: 12, itemName: "Green Tea", Quantity: 2, Price: 90, Category: "Beverages" },
   { ID: 13, itemName: "Coffee", Quantity: 1, Price: 200, Category: "Beverages" },
   { ID: 14, itemName: "Atta Biscuit", Quantity: 5, Price: 75, Category: "Snacks" },
   { ID: 15, itemName: "Namkeen", Quantity: 3, Price: 60, Category: "Snacks" }
];

function Items() {
   const [selectedCategory, setSelectedCategory] = useState(null);
   const navigate = useNavigate()

   const handleLogout=(()=>{
      logout(); // Token delete ho jayega
      navigate('/') // User ko login page par bhej de

   })



   const handleChange = (value) => {
      setSelectedCategory(value);
   };

   const filteredClients = selectedCategory
      ? clients.filter(client => client.Category === selectedCategory)
      : clients;


   const resetBtn = ()=>{
      
   }


   return (
      <Form className="items-container" layout="vertical">
         <h2 className="header-title">Grocery Shop Stocks Page</h2>

         <div className="form-section">
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
         </div>

         <Title level={3} className="section-title">Available Stocks</Title>

         <div className="filter-section">
            <Title level={4}>Filter by Category</Title>

            <Select
               showSearch
               allowClear
               style={{ width: 200 }}
               placeholder="Select Category"
               optionFilterProp="children"
               onChange={handleChange}
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
         </div>

         <div className="table-section">
            <Table
               dataSource={filteredClients}
               columns={clientColumns}
               pagination={false}
               size="small"
               scroll={{ y: 300 }}
               rowKey="ID"
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