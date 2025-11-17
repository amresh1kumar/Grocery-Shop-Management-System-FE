import React, { useState, useEffect } from "react";
import { Table, Select, Typography } from "antd";
import { ProductsList } from "../../api/productService";

function StockReport() {
   const { Title } = Typography;
   const { Option } = Select;

   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [filters, setFilters] = useState({
      item_category: "",
      item_name: "",
   });

   const loadCategories = async () => {
      try {
         const res = await ProductsList();
         const unique = [...new Set(res.map((p) => p.item_category))];
         setCategories(unique);
      } catch (err) {
         console.log("Category load error:", err);
      }
   };

   const fetchProducts = async () => {
      try {
         const res = await ProductsList(filters);
         setProducts(res);
      } catch (err) {
         console.log("Fetch error:", err);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, [filters]);

   useEffect(() => {
      loadCategories();
   }, []);

   const columns = [
      {
         title: "S.No",
         key: "sno",
         render: (text, record, index) => index + 1,
         width: 80,
         align: "center",
      },
      { title: "Item Name", dataIndex: "item_name", key: "item_name", align: "center" },
      { title: "Quantity", dataIndex: "item_qty", key: "item_qty", align: "center" },
      { title: "Price", dataIndex: "item_price", key: "item_price", align: "center" },
      {
         title: "Category",
         dataIndex: "item_category",
         key: "item_category",
      },
   ];

   return (
      <>
         <h2
            style={{
               textAlign: "center",
               fontWeight: 700,
               fontSize: "22px",
               margin: 20,
            }}
         >
            Stock Report
         </h2>

         <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Select
               showSearch
               allowClear
               style={{ width: 220 }}
               placeholder="Select Category"
               onChange={(value) =>
                  setFilters((prev) => ({
                     ...prev,
                     item_category: value || "",
                  }))
               }
            >
               {categories.map((cat, index) => (
                  <Option key={index} value={cat}>
                     {cat}
                  </Option>
               ))}
            </Select>
         </div>

         <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
               dataSource={products}
               columns={columns}
               pagination={false}
               size="small"
               scroll={{ y: "70vh" }}
               rowKey="id"
               style={{ width: 1100 }}
            />
         </div>
      </>
   );
}

export default StockReport;
