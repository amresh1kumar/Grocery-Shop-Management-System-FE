import React from "react";
import { Card, Row, Col, Statistic, Table } from "antd";
import {
   AppstoreOutlined,
   ShoppingOutlined,
   DollarOutlined,
} from "@ant-design/icons";
import "./StockDashboard.css";

const dashboardData = [
   {
      key: "1",
      name: "Oil",
      quantity: 100,
      price: 200,
      category: "Oil",
   },
   {
      key: "2",
      name: "Rice",
      quantity: 50,
      price: 60,
      category: "Grains",
   },
   {
      key: "3",
      name: "Sugar",
      quantity: 70,
      price: 45,
      category: "Grocery",
   },
];

const columns = [
   {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
   },
   {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
   },
   {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
   },
   {
      title: "Category",
      dataIndex: "category",
      key: "category",
   },
];

function StockDashboard() {
   const totalItems = dashboardData.reduce((sum, item) => sum + item.quantity, 0);
   const totalValue = dashboardData.reduce((sum, item) => sum + (item.quantity * item.price), 0);
   const uniqueCategories = [...new Set(dashboardData.map(item => item.category))].length;

   return (
      <div className="dashboard-container">

         <Row gutter={16}>
            <Col span={8}>
               <Card>
                  <Statistic
                     title="Total Items"
                     value={totalItems}
                     prefix={<ShoppingOutlined />}
                  />
               </Card>
            </Col>
            <Col span={8}>
               <Card>
                  <Statistic
                     title="Total Categories"
                     value={uniqueCategories}
                     prefix={<AppstoreOutlined />}
                  />
               </Card>
            </Col>
            <Col span={8}>
               <Card>
                  <Statistic
                     title="Total Stock Value (₹)"
                     value={totalValue}
                     prefix={<DollarOutlined />}
                  />
               </Card>
            </Col>
         </Row>

         <h2 className="dashboard-title">Stock Summary Table</h2>
         <Table dataSource={dashboardData} columns={columns} pagination={false} />
      </div>
   );
}

export default StockDashboard;
