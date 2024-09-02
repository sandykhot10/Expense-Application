import React from 'react';

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Member</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount.toFixed(2)}</td>
              <td>{expense.member}</td>
              <td>{expense.timestamp}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && <p>No expenses recorded.</p>}
    </div>
  );
}

export default ExpenseList;
