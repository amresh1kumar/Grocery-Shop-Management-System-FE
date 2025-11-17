import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { Form, Input, Button, Table, Select, message } from "antd";
import { FiRefreshCcw } from "react-icons/fi";
import { ProductsList } from "../../api/productService";
import "./BillingPage.css";
import PrintBill from "./PrintBill";





const { Option } = Select;

const clientColumns = [
  { title: "Client Name", dataIndex: "name", key: "name" },
  { title: "Mobile No", dataIndex: "mobile", key: "mobile" },
];

const clients = [
  { key: 1, name: "Aman Kumar", mobile: "1111" },
  { key: 2, name: "Amresh", mobile: "12" },
  { key: 3, name: "Vikash", mobile: "12345" },

];


const productsColumns = [
  {
    title: 'S.No',
    key: "sno",
    render: (text, record, index) => index + 1,
    width: 80,
    align: "center"
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


const billColumns = [
  { title: "Item", dataIndex: "itemName", key: "itemName" },
  { title: "Qty", dataIndex: "quantity", key: "quantity" },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Total", dataIndex: "total", key: "total" },
];


const BillingPage = () => {
  const [form] = Form.useForm();
  const [searchMobile, setSearchMobile] = useState("");
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);



  const [filters, setFilters] = useState({
    item_category: "",
    item_name: "",
  });

  const billRef = useRef();

  const generateBill = useReactToPrint({
    contentRef: billRef,   // 👈 new required prop
    documentTitle: "Grocery Bill",
  });

  // const handleAddToBill = () => {
  //   const values = form.getFieldsValue();

  //   if (!values.itemName || !values.quantity || !values.price) {
  //     alert("Please fill item name, quantity and price!");
  //     return;
  //   }

  //   const newItem = {
  //     key: Date.now(),
  //     itemName: values.itemName,
  //     quantity: values.quantity,
  //     price: values.price,
  //     total: Number(values.quantity) * Number(values.price),
  //   };

  //   setBillItems((prev) => [...prev, newItem]);

  //   form.resetFields(["itemName", "quantity", "price"]);
  // };

  const handleAddToBill = () => {
    const values = form.getFieldsValue();

    if (!values.itemName || !values.quantity || !values.price) {
      alert("Please fill item name, quantity and price!");
      return;
    }

    const newItem = {
      key: Date.now(),
      itemName: values.itemName,
      quantity: Number(values.quantity),
      price: Number(values.price),
      total: Number(values.quantity) * Number(values.price),
    };

    setBillItems((prev) => {
      const updated = [...prev, newItem];

      //Calculate new grand total
      const sum = updated.reduce((acc, item) => acc + item.total, 0);
      setGrandTotal(sum);
      message.success("Product added successfully");
      return updated;
      
    });

    form.resetFields(["itemName", "quantity", "price"]);
  };


  const handleReset = () => {
    form.resetFields();
  }

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
      setProducts(res)
    } catch (err) {
      throw err;
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    loadCategories();
  }, []);

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
          <Button type="primary" onClick={handleAddToBill}>Add To Bill</Button>
        </Form.Item>
        <Form.Item>
          <Button danger onClick={handleReset}>Reset</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={generateBill}>
            Print Bill
          </Button>

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
      <div style={{ visibility: "hidden", position: "absolute" }}>
        <PrintBill
          ref={billRef}
          client={{
            name: form.getFieldValue("clientName"),
            mobile: form.getFieldValue("mobile")
          }}
          items={billItems}
          total={grandTotal}
        />
      </div>



      <div className="filter-section">
        {/* <span>Product Filter By Category</span> */}
        {/* <Select style={{ width: 200 }} placeholder="Select">
          <Option value="Colgate">Colgate</Option>
          <Option value="Shampoo">Shampoo</Option>
        </Select>
        <Button className="refresh-btn">
          <FiRefreshCcw />
        </Button> */}
        {/* <Link to="/billingReport">
          <Button type="primary" className="report-btn">
            Report
          </Button>
        </Link> */}
      </div>

      <div className="data-table-section">
        <div className="billing-items-left">
          <Select
            showSearch
            allowClear
            style={{ width: 220 }}
            placeholder="Select Category"
            onChange={(value) => setFilters((prev) => ({
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
          <Table
            dataSource={products}
            columns={productsColumns}
            pagination={false}
            size="small"
            scroll={{ y: "45vh" }}
            rowKey="id"
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  form.setFieldsValue({
                    itemName: record.item_name,
                    quantity: 1,
                    price: record.item_price,
                  });
                },
              };
            }}
          />

        </div>

        <div className="bill-list">
          <Table
            dataSource={billItems}
            columns={billColumns}
            pagination={false}
            size="small"
            scroll={{ y: 350 }}
          />
        </div>

        <div className="client-list">
          <Table
            dataSource={filteredClients}
            columns={clientColumns}
            pagination={false}
            size="small"
            scroll={{ y: 350 }}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  form.setFieldsValue({
                    clientName: record.name,
                    mobile: record.mobile,
                  });
                },
              };
            }}
          />
        </div>
      </div>

      <div className="bottom-actions">
        <Link to="/billingDashboard">
          <Button className="dashboard-btn">Dashboard</Button>
        </Link>
        {/* <span className="total-display">Total: ₹0.00</span> */}

        <span className="total-display">Total: ₹{grandTotal.toFixed(2)}</span>

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
