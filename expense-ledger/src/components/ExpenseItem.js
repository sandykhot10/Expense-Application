import React, { useEffect, useState } from 'react';

function ExpenseItem({ expense }) {

  const [data,setdata]=useState(null);

  useEffect(()=>{
    console.log(expense);
    localStorage.setItem("expense",JSON.stringify(expense));
    const storedExpense = localStorage.getItem('expense');

    const expenseObject = storedExpense ? JSON.parse(storedExpense) : null;


    setdata(expenseObject);
    console.log(data);

  },[])
  return (
    <li>
      {data == null? (<>{expense.title}  - ${expense.amount.toFixed(2)}</>) : (<>{data.title}  - ${data.amount.toFixed(2)}</>) } 
    </li>
  );
}

export default ExpenseItem;
