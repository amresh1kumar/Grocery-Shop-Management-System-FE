import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";

const Dashboard = () => {
   return (
      <div className="dashboard-container">
         <div className="dashboard-header">
            <h2>Grocery Shop Dashboard</h2>
            <Link to='/billing'>
               <Button type="primary">Go to Billing Page</Button>
            </Link>
         </div>

         <Row gutter={16} className="dashboard-summary">
            <Col xs={24} sm={12} md={6}>
               <Card className="summary-card" title="Total Sales" bordered={false}>
                  ₹25,000
               </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
               <Card className="summary-card" title="Today's Orders" bordered={false}>
                  120
               </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
               <Card className="summary-card" title="Clients" bordered={false}>
                  40
               </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
               <Card className="summary-card" title="Out of Stock" bordered={false}>
                  5 Items
               </Card>
            </Col>
         </Row>

         <Row gutter={16} className="dashboard-widgets">
            <Col xs={24} md={12}>
               <Card title="Recent Orders" className="widget-card">
                  {/* Add order table or summary here */}
                  <p>No recent orders yet.</p>
               </Card>
            </Col>
            <Col xs={24} md={12}>
               <Card title="Top Selling Products" className="widget-card">
                  {/* Add product stats/chart here */}
                  <p>No data available.</p>
               </Card>
            </Col>
         </Row>
      </div>
   );
};

export default Dashboard;
