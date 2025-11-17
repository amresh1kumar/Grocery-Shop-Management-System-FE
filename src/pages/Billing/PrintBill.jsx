// import React, { forwardRef } from "react";

// const PrintBill = forwardRef(({ client, items, total }, ref) => {
//    return (
//       <div ref={ref} style={{ padding: "20px" }}>

//          <h2 style={{ textAlign: "center" }}>Grocery Shop</h2>

//          <p>Client Name: {client?.name}</p>
//          <p>Mobile: {client?.mobile}</p>

//          <hr />

//          {items.map((item, i) => (
//             <p key={i}>
//                {i + 1}. {item.itemName} — {item.quantity} × {item.price} = {item.total}
//             </p>
//          ))}

//          <hr />
//          <h3>Total: ₹{total}</h3>
//       </div>
//    );
// });

// export default PrintBill;

import React, { forwardRef } from "react";
import "./PrintBill.css";
import Image from "../../assets/images/logo.png"


const PrintBill = forwardRef(({ client, items, total }, ref) => {
   const invoiceId = Math.floor(100000 + Math.random() * 900000);
   const date = new Date();

   return (
      <div ref={ref} className="print-wrapper">
         <div className="bill-container">

            {/* Header */}
            <h1 className="shop-title">Grocery Shop</h1>
            <p className="shop-address">Raipur, Chhattisgarh, India</p>
            <p className="shop-phone">Tel +917856324856</p>

            {/* Right-side Image */}
            <img
               src={Image}
               alt="Shopping"
               className="bill-header-img"
            />

            {/* Invoice Details */}
            <div className="invoice-section">
               <p>Invoice ID: {invoiceId}</p>
               <p>Client Name: {client?.name || "N/A"}</p>
               <p>
                  {date.toLocaleDateString()} | {date.toLocaleTimeString()}
               </p>
            </div>

            <hr className="dashed-line" />

            {/* Item List */}
            <table className="bill-table">
               <tbody>
                  {items.map((item, index) => (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td className="price-col">{item.total.toFixed(2)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>

            <hr className="dashed-line" />

            {/* Total */}
            <div className="total-section">
               <span className="total-text">Total:</span>
               <span className="total-amount">{total}</span>
            </div>

            {/* Footer */}
            <div className="thankyou-section">
               <p>~ Thanks for shopping! ~</p>
               <p>~ Please Visit Again ~</p>
            </div>
         </div>
      </div>
   );
});

export default PrintBill;
