import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm'; // Ensure this path is correct
import ExpenseList from './components/ExpenseList'; // Ensure this path is correct
import './App.css';

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
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        ...newExpense,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
      },
    ]);
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

  const groupedExpenses = expenses.reduce((acc, curr) => {
    acc[curr.member] = (acc[curr.member] || 0) + curr.amount;
    return acc;
  }, {});

  const totalOverall = Object.values(groupedExpenses).reduce((total, amount) => total + amount, 0);

  return (
    <div className="App">
      <header>
        <h1>Expense Ledger</h1>
      </header>
      <ExpenseForm addExpense={addExpense} />
      <div className="ledger-container">
        <h2 id='h21'>Ledger</h2>
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Total Amount</th>
              <th>Member</th>
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
              <td colSpan="2"><strong id='strong1'>Total:</strong></td>
              <td style={{ color: totalOverall < 0 ? 'red' : 'green' }}>
                ${Math.abs(totalOverall).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedMember && (
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
               <td style={{ color: selectedMember.totalAmount < 0 ? 'red' : 'green' }}>
                 {selectedMember.totalAmount < 0 ? '-' : '+'}${Math.abs(totalForMember).toFixed(2)}
               </td>
             </tr>
           </tbody>
         </table>
       </div>
     )}
   </div>
 );
}

export default App;