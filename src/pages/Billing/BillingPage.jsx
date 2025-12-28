import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { Form, Input, Button, Table, Select, message } from "antd";
import { FiRefreshCcw } from "react-icons/fi";
import { ProductsList, UpdateProduct, customerInfoList, addCustomerInfo } from "../../api/productService";
import "./BillingPage.css";
import PrintBill from "./PrintBill";
import { Popconfirm } from "antd";

const BillingPage = () => {


  const { Option } = Select;

  const clientColumns = [
    { title: "Client Name", dataIndex: "customer_name", key: "name" },
    { title: "Mobile No", dataIndex: "customer_contact_no", key: "ontact_no" },
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


  const [form] = Form.useForm();
  const [searchMobile, setSearchMobile] = useState("");
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [filters, setFilters] = useState({
    item_category: "",
    item_name: "",
  });

  const billRef = useRef();

  const generateBill = useReactToPrint({
    contentRef: billRef,   // 👈 new required prop
    documentTitle: "Grocery Bill",
  });



  // const handleRemoveBillItem = async (record) => {
  //   // 🔁 OPTIONAL: stock wapas add karna ho to
  //   const product = products.find(p => p.item_name === record.itemName);

  //   if (product) {
  //     try {
  //       await UpdateProduct(product.id, {
  //         increase_qty: record.quantity, // backend me stock wapas
  //       });
  //     } catch (err) {
  //       message.error("Stock rollback failed");
  //     }
  //   }

  //   // ❌ bill item remove
  //   const updated = billItems.filter(item => item.key !== record.key);

  //   setBillItems(updated);

  //   // 🔢 grand total recalc
  //   const sum = updated.reduce((acc, item) => acc + item.total, 0);
  //   setGrandTotal(sum);

  //   message.success("Item removed from bill");

  //   // 🔄 product list refresh
  //   fetchProducts();
  // };

  const handleRemoveBillItem = async (record) => {
    try {
      // 🔺 STOCK ROLLBACK
      await UpdateProduct(record.productId, {
        increase_qty: record.quantity,
      });

      message.success("Stock restored successfully");
    } catch (err) {
      message.error("Stock rollback failed");
      return;
    }

    // ❌ Remove item from bill
    const updated = billItems.filter(item => item.key !== record.key);
    setBillItems(updated);

    // 🔢 Recalculate grand total
    const sum = updated.reduce((acc, item) => acc + item.total, 0);
    setGrandTotal(sum);

    // 🔄 Refresh products list
    fetchProducts();
  };


  const billColumns = [
    { title: "Item", dataIndex: "itemName", key: "itemName" },
    { title: "Qty", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Remove this item?"
          onConfirm={() => handleRemoveBillItem(record)}
        >
          <Button danger size="small">❌</Button>
        </Popconfirm>
      )

    },
  ];


  // const handleAddToBill = () => {
  //   const values = form.getFieldsValue();

  //   if (!values.itemName || !values.quantity || !values.price) {
  //     alert("Please fill item name, quantity and price!");
  //     return;
  //   }

  //   const newItem = {
  //     key: Date.now(),
  //     itemName: values.itemName,
  //     quantity: Number(values.quantity),
  //     price: Number(values.price),
  //     total: Number(values.quantity) * Number(values.price),
  //   };

  //   setBillItems((prev) => {
  //     const updated = [...prev, newItem];

  //     //Calculate new grand total
  //     const sum = updated.reduce((acc, item) => acc + item.total, 0);
  //     setGrandTotal(sum);
  //     message.success("Product added successfully");
  //     return updated;

  //   });

  //   form.resetFields(["itemName", "quantity", "price"]);
  // };


  // const handleAddToBill = () => {
  //   const values = form.getFieldsValue();

  //   if (!values.itemName || !values.quantity || !values.price) {
  //     alert("Please fill item name, quantity and price!");
  //     return;
  //   }

  //   // STOCK VALIDATION
  //   if (Number(values.quantity) > Number(values.stock)) {
  //     message.error("Not enough stock available!");
  //     return;
  //   }

  //   const newItem = {
  //     key: Date.now(),
  //     itemName: values.itemName,
  //     quantity: Number(values.quantity),
  //     price: Number(values.price),
  //     total: Number(values.quantity) * Number(values.price),
  //   };

  //   setBillItems((prev) => {
  //     const updated = [...prev, newItem];
  //     const sum = updated.reduce((acc, item) => acc + item.total, 0);
  //     setGrandTotal(sum);
  //     message.success("Product added successfully");
  //     return updated;
  //   });

  //   form.resetFields(["itemName", "quantity", "price", "stock"]);
  // };


  const handleAddToBill = async () => {
    const values = form.getFieldsValue();

    if (!values.itemName || !values.quantity || !values.price) {
      alert("Please fill item name, quantity and price!");
      return;
    }

    // STOCK VALIDATION
    if (Number(values.quantity) > Number(values.stock)) {
      message.error("Not enough stock available!");
      return;
    }

    // 🔥 PRODUCT ID nikalo selected item ka
    const selectedProduct = products.find(
      (p) => p.item_name === values.itemName
    );

    if (!selectedProduct) {
      message.error("Product not found!");
      return;
    }

    // 🔥 BACKEND STOCK REDUCE CALL
    try {
      await UpdateProduct(selectedProduct.id, {
        reduce_qty: values.quantity, // backend me jayega
      });

      message.success("Stock reduced successfully!");
    } catch (err) {
      message.error("Stock update failed!");
      return;
    }

    // 🔥 BILL ME ADD KARO
    const newItem = {
      key: Date.now(),
      productId: selectedProduct.id,   // ✅ VERY IMPORTANT
      itemName: values.itemName,
      quantity: Number(values.quantity),
      price: Number(values.price),
      total: Number(values.quantity) * Number(values.price),
    };

    setBillItems((prev) => {
      const updated = [...prev, newItem];
      const sum = updated.reduce((acc, item) => acc + item.total, 0);
      setGrandTotal(sum);
      return updated;
    });

    // 🔥 LOCAL STOCK UI update karne ke liye products reload kar lo
    fetchProducts();

    // RESET FIELDS
    form.resetFields(["itemName", "quantity", "price", "stock"]);
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

  const fetchCustomerInfo = async () => {
    try {
      const res = await customerInfoList()
      setCustomerInfo(res)

    } catch (error) {
      message.error('problem in fetching customer informations')

    }

  }


  const handleSaveCustomer = async () => {
    const values = form.getFieldsValue();

    if (!values.clientName || !values.mobile) {
      message.warning("Please enter client name and mobile number");
      return;
    }

    try {
      await addCustomerInfo({
        customer_name: values.clientName,
        customer_contact_no: values.mobile,
      });

      message.success("Customer saved successfully");
      fetchCustomerInfo(); // 🔄 table refresh
    } catch (error) {
      if (error.response?.status === 400) {
        message.error("Mobile number already exists");
      } else {
        message.error("Failed to save customer");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    loadCategories();
    fetchCustomerInfo();
  }, []);

  const filteredCustomerInfo = customerInfo.filter((customer) =>
    customer.customer_contact_no
      ?.toLowerCase()
      .includes(searchMobile.toLowerCase())
  );


  const handleMobileSearchChange = (e) => {
    setSearchMobile(e.target.value);
  };




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
        <Form.Item name="stock" hidden>
          <Input type="hidden" />
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
          <Button type="primary" onClick={handleSaveCustomer}>
            Save Mobile No + Client Name
          </Button>

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

      <div className="data-table-section">
        <div className="billing-items-left">
          <Select
            showSearch
            allowClear
            listHeight={200}
            style={{ width: 200, height: 35, marginBottom: 5 }}
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
            // style={{maxHeight:400}}
            rowKey="id"
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  form.setFieldsValue({
                    itemName: record.item_name,
                    quantity: 1,
                    price: record.item_price,
                    stock: record.item_qty
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
            rowKey="id"
            scroll={{ y: 350 }}
          />
        </div>

        <div className="client-list">
          {/* <Table
            dataSource={customerInfo}
            columns={clientColumns}
            pagination={false}
            rowKey="id"

            size="small"
            scroll={{ y: 350 }}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  form.setFieldsValue({
                    clientName: record.customer_name,
                    mobile: record.customer_contact_no,
                  });
                },
              };
            }}
          /> */}
          <Table
            dataSource={filteredCustomerInfo}
            columns={clientColumns}
            pagination={false}
            rowKey="id"
            size="small"
            scroll={{ y: 350 }}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  form.setFieldsValue({
                    clientName: record.customer_name,
                    mobile: record.customer_contact_no,
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
          <Button className="logout-btn">
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BillingPage;
