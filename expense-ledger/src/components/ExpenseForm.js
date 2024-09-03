import React, { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [member, setMember] = useState('');

  const handleSubmit = (type) => {
    const value = parseFloat(amount);
    if (!title || !amount || !member || isNaN(value)) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const finalAmount = type === 'subtract' ? -Math.abs(value) : Math.abs(value);

    addExpense({
      title,
      amount: finalAmount,
      member,
    });

    setTitle('');
    setAmount('');
    setMember('');
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="title">Title:</label>
            </td>
            <td>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="amount">Amount:</label>
            </td>
            <td>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="member">Member:</label>
            </td>
            <td>
              <input
                type="text"
                id="member"
                value={member}
                onChange={(e) => setMember(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="button-group">
              <button onClick={() => handleSubmit('add')} className="add-btn">
                Add Money
              </button>
              <button onClick={() => handleSubmit('subtract')} className="subtract-btn">
                Subtract Money
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseForm;
