import React from 'react';

function MemberLedger({ selectedMember,memberLedger, totalForMember, deleteExpense, exportLedgerData, downloadLink }) {
  return (
    <div>
      <h2>Member Ledger</h2>
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

      {/* Button to generate the link */}
      <button onClick={exportLedgerData}>Share Ledger Data</button>

      {/* Display the file link if it's generated */}
      {downloadLink && (
        <div>
          <a href={downloadLink} download={`${selectedMember}_ledger.csv`}>
            Click here to download {selectedMember}'s ledger
          </a>
        </div>
      )}
    </div>
  );
}

export default MemberLedger;
