import React, { useState } from 'react';
import './MemberLedger.css';

function MemberLedger({ selectedMember, memberLedger, totalForMember, deleteExpense, updateMemberExpense, exportLedgerDataAsCSV, exportLedgerDataAsPDF }) {
  const [inputAmount, setInputAmount] = useState('');
  const [inputTitle, setInputTitle] = useState('');

  const handleAmountChange = (event) => {
    setInputAmount(event.target.value);
  };

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleAddAmount = () => {
    const amount = parseFloat(inputAmount);
    if (!isNaN(amount)) {
      updateMemberExpense(amount, inputTitle);
      setInputAmount(''); // Reset input field
      setInputTitle(''); // Reset title field
    }
  };

  const handleSubtractAmount = () => {
    const amount = parseFloat(inputAmount);
    if (!isNaN(amount)) {
      updateMemberExpense(-amount, inputTitle);
      setInputAmount(''); // Reset input field
      setInputTitle(''); // Reset title field
    }
  };

  return (
    <div className="member-ledger">
      <h2>{selectedMember}'s Ledger</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberLedger.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td style={{ color: expense.amount < 0 ? 'red' : 'green' }}>
                {expense.amount < 0 ? '-' : '+'}${Math.abs(expense.amount).toFixed(2)}
              </td>
              <td>{new Date(expense.timestamp).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total:</strong></td>
            <td style={{ color: totalForMember < 0 ? 'red' : 'green' }}>
              {totalForMember < 0 ? '-' : '+'}${Math.abs(totalForMember).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Input field for adding or subtracting amounts */}
      <div className="modify-amount">
        <input
          type="text"
          placeholder="Enter title"
          value={inputTitle}
          onChange={handleTitleChange}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={inputAmount}
          onChange={handleAmountChange}
        />
        <button onClick={handleAddAmount}>Add</button>
        <button onClick={handleSubtractAmount}>Subtract</button>
      </div>

      {/* <button onClick={exportLedgerDataAsCSV}>Share Ledger as CSV</button> */}
      <button onClick={exportLedgerDataAsPDF}>Share Ledger as PDF</button>
    </div>
  );
}

export default MemberLedger;
