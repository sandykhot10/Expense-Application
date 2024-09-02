import React, { useState } from 'react';

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [member, setMember] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !member) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      title,
      amount: parseFloat(amount),
      member,
      timestamp: new Date().toLocaleString()
    };

    addExpense(newExpense);
    setTitle('');
    setAmount('');
    setMember('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Member:</label>
        <input
          type="text"
          value={member}
          onChange={(e) => setMember(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
