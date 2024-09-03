import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [member, setMember] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amount && member) {
      addExpense({ title, amount: parseFloat(amount), member });
      setTitle('');
      setAmount('');
      setMember('');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="title">Title:</label></td>
              <td><input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="amount">Amount:</label></td>
              <td><input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="member">Member:</label></td>
              <td><input
                type="text"
                id="member"
                value={member}
                onChange={(e) => setMember(e.target.value)}
              /></td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Add Expense</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ExpenseForm;
