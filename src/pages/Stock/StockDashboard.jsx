import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table, Spin } from "antd";
import {
   AppstoreOutlined,
   ShoppingOutlined,
   DollarOutlined,
} from "@ant-design/icons";
import { DashboardSummary } from "../../api/productService";
import "./StockDashboard.css";

function StockDashboard() {
   const [stats, setStats] = useState(null);
   const [loading, setLoading] = useState(true);

   const columns = [
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
         title: "Price (₹)",
         dataIndex: "item_price",
         key: "item_price",
      },
      {
         title: "Category",
         dataIndex: "item_category",
         key: "item_category",
      },
   ];

   useEffect(() => {
      fetchDashboard();
   }, []);

   const fetchDashboard = async () => {
      try {
         const res = await DashboardSummary();
         setStats(res.data);
      } catch (error) {
         console.error("Dashboard error:", error);
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return (
         <div className="dashboard-loader">
            <Spin size="large" />
         </div>
      );
   }

   return (
      <div className="dashboard-container">

         {/* ===== STAT CARDS ===== */}
         <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
               <Card className="dashboard-card">
                  <Statistic
                     title="Total Items in Stock"
                     value={stats?.total_items}
                     prefix={<ShoppingOutlined />}
                  />
               </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
               <Card className="dashboard-card">
                  <Statistic
                     title="Total Categories"
                     value={stats?.total_categories}
                     prefix={<AppstoreOutlined />}
                  />
               </Card>
            </Col>

            <Col xs={24} sm={24} md={8}>
               <Card className="dashboard-card">
                  <Statistic
                     title="Total Stock Value (₹)"
                     value={stats?.total_value}
                     prefix={<DollarOutlined />}
                  />
               </Card>
            </Col>
         </Row>

         {/* ===== TABLE ===== */}
         <h2 className="dashboard-subtitle">Stock Summary Table</h2>

         <Table
            dataSource={stats?.items || []}
            columns={columns}
            pagination={false}
            rowKey="id"
            size="small"
            scroll={{ x: "max-content", y: 300 }}
         />
      </div>
   );
}

export default StockDashboard;
