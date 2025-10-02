// import React from "react";
// import { Form, Input, Button, Select, Table } from "antd";
// import "./BillingPage.css";
// import '..//../Components/Common.css'
// import { FiRefreshCcw } from "react-icons/fi";


// const { Option } = Select;

// const BillingPage = () => {
//   const [form] = Form.useForm();

//   const clientColumns = [
//     { title: "ClientName", dataIndex: "name", key: "name" },
//     { title: "MobileNo", dataIndex: "mobile", key: "mobile" },
//   ];

//   const clients = [
//     { key: 1, name: "Aman Kumar", mobile: "1111" },
//     { key: 2, name: "Amresh", mobile: "12" },
//     { key: 3, name: "Vikash", mobile: "12345" },
//     { key: 4, name: "Unknown", mobile: "12345" },
//     { key: 2, name: "Amresh", mobile: "12" },
//     { key: 3, name: "Vikash", mobile: "12345" },
//     { key: 4, name: "Unknown", mobile: "12345" },
//     { key: 2, name: "Amresh", mobile: "12" },
//     { key: 3, name: "Vikash", mobile: "12345" },
//     { key: 4, name: "Unknown", mobile: "12345" },
//     { key: 2, name: "Amresh", mobile: "12" },
//     { key: 3, name: "Vikash", mobile: "12345" },
//     { key: 4, name: "Unknown", mobile: "12345" },
//   ];

//   return (
//     <div className="billing-container">
//       <h2 className="header-title">
//         Grocery Shop Billing Page
//       </h2>
//       <Form form={form} layout="inline" className="billing-form">
//         <Form.Item name="itemName">
//           <Input placeholder="Items Name" />
//         </Form.Item>
//         <Form.Item name="quantity">
//           <Input placeholder="Quantity" />
//         </Form.Item>
//         <Form.Item name="mobile">
//           <Input placeholder="Mobile Number" />
//         </Form.Item>
//         <Form.Item name="clientName">
//           <Input placeholder="Client Name" />
//         </Form.Item>
//         <Form.Item name="price">
//           <Input placeholder="Price" />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary">Add To Bill</Button>
//         </Form.Item>
//         <Form.Item>
//           <Button danger>Reset</Button>
//         </Form.Item>
//         <Form.Item>
//           <Button>Add MobileNo + ClientName</Button>
//         </Form.Item>
//         <Form.Item name="mobileSearch">
//           <Input placeholder="Mobile Number Search" />
//         </Form.Item>
//         <Form.Item>
//           <Button>Search</Button>
//         </Form.Item>
//       </Form>

//       <div className="filter-section">
//         <span>Product Filter By Category</span>
//         <Select style={{ width: 200, marginLeft: 10 }} placeholder='Select'>
//           <Option value="Colgate">Colgate</Option>
//           <Option value="Shampoo">Shampoo</Option>
//         </Select>
//         <Button className="refresh-btn">

//           <FiRefreshCcw />
//         </Button>
//         <Button type="primary" className="report-btn">Report</Button>
//       </div>

//       <div className="data-table-section">
//         <div className="billing-items-header">
//           <span>Items</span>
//           <span>ID</span>
//           <span>Quantity</span>
//           <span>Price</span>
//           <span>Total</span>
//         </div>
//         <div className="client-list">
//           <Table
//             dataSource={clients}
//             columns={clientColumns}
//             pagination={false}
//             size="small"
//             scroll={{ y: 350 }}
//           />
//         </div>
//       </div>
//       <div className="bottom-actions">
//         <Button className="dashboard-btn">Dashboard</Button>
//         <span className="total-display">Total: ₹0.00</span>
//         <Button type="primary" danger className="logout-btn">Logout</Button>
//       </div>
//     </div>
//   );
// };

// export default BillingPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Table, Select } from "antd";
import { FiRefreshCcw } from "react-icons/fi";
import "./BillingPage.css";

const { Option } = Select;

const clientColumns = [
  { title: "Client Name", dataIndex: "name", key: "name" },
  { title: "Mobile No", dataIndex: "mobile", key: "mobile" },
];

const clients = [
  { key: 1, name: "Aman Kumar", mobile: "1111" },
  { key: 2, name: "Amresh", mobile: "12" },
  { key: 3, name: "Vikash", mobile: "12345" },
  { key: 4, name: "Unknown", mobile: "12345" },
  { key: 5, name: "Ravi", mobile: "88888" },
  { key: 6, name: "Priya", mobile: "99999" },
  { key: 7, name: "Ankit", mobile: "77777" },
  { key: 8, name: "Sneha", mobile: "66666" },
  { key: 9, name: "Rohit", mobile: "55555" },
  { key: 10, name: "Pooja", mobile: "44444" },
  { key: 11, name: "Manish", mobile: "33333" },
  { key: 12, name: "Neha", mobile: "22222" },
  { key: 13, name: "Karan", mobile: "10101" },
  { key: 14, name: "Simran", mobile: "12121" },
  { key: 15, name: "Deepak", mobile: "13131" },
];

const BillingPage = () => {
  const [form] = Form.useForm();
  const [searchMobile, setSearchMobile] = useState("");

  const handleMobileSearchChange = (e) => {
    setSearchMobile(e.target.value);
  };

  const filteredClients = searchMobile
    ? clients.filter((client) => client.mobile.includes(searchMobile))
    : clients;

  return (
    <div className="billing-container">
      <h2 className="header-title">Grocery Shop Billing Page</h2>

      <Form form={form} layout="inline" className="billing-form">
        <Form.Item name="itemName">
          <Input placeholder="Items Name" />
        </Form.Item>
        <Form.Item name="quantity">
          <Input placeholder="Quantity" />
        </Form.Item>
        <Form.Item name="mobile">
          <Input placeholder="Mobile Number" />
        </Form.Item>
        <Form.Item name="clientName">
          <Input placeholder="Client Name" />
        </Form.Item>
        <Form.Item name="price">
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Add To Bill</Button>
        </Form.Item>
        <Form.Item>
          <Button danger>Reset</Button>
        </Form.Item>
        <Form.Item>
          <Button>Save Mobile No + Client Name</Button>
        </Form.Item>
        <Form.Item name="mobileSearch">
          <Input
            placeholder="Search by Mobile No"
            value={searchMobile}
            onChange={handleMobileSearchChange}
          />
        </Form.Item>
      </Form>

      <div className="filter-section">
        <span>Product Filter By Category</span>
        <Select style={{ width: 200 }} placeholder="Select">
          <Option value="Colgate">Colgate</Option>
          <Option value="Shampoo">Shampoo</Option>
        </Select>
        <Button className="refresh-btn">
          <FiRefreshCcw />
        </Button>
        <Link to="/billingReport">
          <Button type="primary" className="report-btn">
            Report
          </Button>
        </Link>
      </div>

      <div className="data-table-section">
        {/* ✅ Left: Item Info (dummy placeholder layout) */}
        <div className="billing-items-left">
          <div className="billing-items-header">
            <div className="billing-col item-id">Item ID</div>
            <div className="billing-col quantity">Quantity</div>
            <div className="billing-col price">Price</div>
            <div className="billing-col total">Total</div>
          </div>
        </div>

        {/* ✅ Right: Client Info Table */}
        <div className="client-list">
          <Table
            dataSource={filteredClients}
            columns={clientColumns}
            pagination={false}
            size="small"
            scroll={{ y: 350 }}
          />
        </div>
      </div>

      <div className="bottom-actions">
        <Link to="/billingDashboard">
          <Button className="dashboard-btn">Dashboard</Button>
        </Link>
        <span className="total-display">Total: ₹0.00</span>
        <Link to="/">
          <Button type="primary" danger className="logout-btn">
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BillingPage;
