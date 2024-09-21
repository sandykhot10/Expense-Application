import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import MemberLedger from './components/MemberLedger';
import './components/MemberLedger.css';
import './App.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import this for the autoTable functionality

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    const newExpenseWithTimestamp = {
      ...newExpense,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpenseWithTimestamp]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const selectMember = (member) => {
    setSelectedMember(member);
  };

  const memberLedger = expenses.filter(
    (expense) => expense.member === selectedMember
  );

  const totalForMember = memberLedger.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const updateMemberExpense = (amount, title) => {
    const newExpense = {
      id: Date.now(),
      member: selectedMember,
      title: title || 'Manual Adjustment',
      amount: amount,
      timestamp: new Date().toISOString(),
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const exportLedgerDataAsCSV = () => {
    const csvRows = [];
    const headers = ['Title', 'Amount', 'Timestamp'];
    csvRows.push(headers.join(','));

    memberLedger.forEach(expense => {
      const row = [
        expense.title,
        expense.amount,
        new Date(expense.timestamp).toLocaleString(),
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedMember}_ledger.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportLedgerDataAsPDF = () => {
    const doc = new jsPDF();
    const headers = [['Title', 'Amount', 'Timestamp']];
    const rows = memberLedger.map(expense => [
      expense.title,
      expense.amount,
      new Date(expense.timestamp).toLocaleString(),
    ]);

    doc.autoTable({
      head: headers,
      body: rows,
    });

    doc.save(`${selectedMember}_ledger.pdf`);
  };

  const groupedExpenses = expenses.reduce((acc, curr) => {
    acc[curr.member] = (acc[curr.member] || 0) + curr.amount;
    return acc;
  }, {});

  const totalOverall = Object.values(groupedExpenses).reduce((total, amount) => total + amount, 0);
  const members = [...new Set(expenses.map(expense => expense.member))];

  return (
    <div className="App">
      <header>
        <h1>Expense Ledger</h1>
      </header>
      <ExpenseForm addExpense={addExpense} members={members} />
      <div className="ledger-container">
        <h2>Ledger</h2>
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Total Amount</th>
              <th>Member Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedExpenses).map(([member, totalAmount]) => (
              <tr key={member}>
                <td>{member}</td>
                <td style={{ color: totalAmount < 0 ? 'red' : 'green' }}>
                  ${Math.abs(totalAmount).toFixed(2)}
                </td>
                <td>
                  <button onClick={() => selectMember(member)}>View Details</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2"><strong>Total:</strong></td>
                 <td style={{ textAlign: 'right', color: totalOverall < 0 ? 'red' : 'green' }}>
                ${Math.abs(totalOverall).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedMember && (
        <MemberLedger
          selectedMember={selectedMember}
          memberLedger={memberLedger}
          totalForMember={totalForMember}
          deleteExpense={deleteExpense}
          updateMemberExpense={updateMemberExpense}
          exportLedgerDataAsCSV={exportLedgerDataAsCSV} // Pass CSV function
          exportLedgerDataAsPDF={exportLedgerDataAsPDF} // Pass PDF function
        />
      )}
    </div>
  );
}

export default App;
