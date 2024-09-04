import React from 'react';

function ExpenseList({ expenses, deleteExpense, selectMember }) {
  // Group expenses by member
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.member]) {
      acc[expense.member] = [];
    }
    acc[expense.member].push(expense);
    return acc;
  }, {});

  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Total Amount</th>
            <th>Member</th>
            <th>Timestamp</th>
            
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedExpenses).map((member) => {
            const memberExpenses = groupedExpenses[member];
            const memberTotal = memberExpenses.reduce((total, expense) => total + expense.amount, 0);

            return (
              <React.Fragment key={member}>
                <tr>
                  <td colSpan="4">
                    <strong>{member}</strong> - Total: ${memberTotal.toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => selectMember(member)}>View Details</button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr>
            <td colSpan="1"></td>
            <td><strong>Total: ${totalAmount.toFixed(2)}</strong></td>
            <td colSpan="3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
