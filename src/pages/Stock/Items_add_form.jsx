import React from 'react'

function Items_add_form() {
   return (
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
   )
}

export default Items_add_form