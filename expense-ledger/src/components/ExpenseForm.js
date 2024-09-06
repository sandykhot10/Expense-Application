import React, { useState } from 'react';

function ExpenseForm({ addExpense, members }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [member, setMember] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  const handleMemberChange = (e) => {
    const value = e.target.value;
    setMember(value);

    if (value) {
      // Filter members based on the input value
      const filtered = members.filter((m) =>
        m.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers([]);
    }
  };

  const handleMemberSelect = (selectedMember) => {
    setMember(selectedMember);
    setFilteredMembers([]); // Hide the recommendations after selection
  };

  const handleSubmit = (type) => {
    const newExpense = {
      title,
      amount: type === 'subtract' ? -Math.abs(parseFloat(amount)) : parseFloat(amount),
      member,
    };
    addExpense(newExpense);
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
                onChange={handleMemberChange}
              />
              {filteredMembers.length > 0 && (
                <ul className="recommendations">
                  {filteredMembers.map((m) => (
                    <li key={m} onClick={() => handleMemberSelect(m)}>
                      {m}
                    </li>
                  ))}
                </ul>
              )}
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
