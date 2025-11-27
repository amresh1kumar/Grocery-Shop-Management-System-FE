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
         console.log("Dashboard API Response:", res);
         setStats(res.data);
      } catch (error) {
         console.log("Dashboard error:", error);
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

         <Row gutter={16}>
            <Col span={8}>
               <Card>
                  <Statistic
                     title="Total Items in Stock"
                     value={stats?.total_items}
                     prefix={<ShoppingOutlined />}
                  />
               </Card>
            </Col>

            <Col span={8}>
               <Card>
                  <Statistic
                     title="Total Categories"
                     value={stats?.total_categories}
                     prefix={<AppstoreOutlined />}
                  />
               </Card>
            </Col>

            <Col span={8}>
               <Card>
                  <Statistic
                     title="Total Stock Value (₹)"
                     value={stats?.total_value}
                     prefix={<DollarOutlined />}
                  />
               </Card>
            </Col>
         </Row>

         <h2 className="dashboard-subtitle">Stock Summary Table</h2>

         <Table
            dataSource={stats?.items || []}
            columns={columns}
            pagination={false}
            rowKey="id"
            size="small"
            scroll={{ y: 300 }}

         />
      </div>

   );
}

export default StockDashboard;
