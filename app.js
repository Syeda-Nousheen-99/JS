const company = {
    name: 'CEO',
    salary: 300000,
    subordinates: [
      {
        name: 'CTO',
        salary: 200000,
        subordinates: [
          {
            name: 'Dev1',
            salary: 100000,
            subordinates: []
          },
          {
            name: 'Dev2',
            salary: 110000,
            subordinates: []
          }
        ]
      },
      {
        name: 'CFO',
        salary: 190000,
        subordinates: [
          {
            name: 'Accountant1',
            salary: 90000,
            subordinates: []
          },
          {
            name: 'Accountant2',
            salary: 95000,
            subordinates: []
          }
        ]
      }
    ]
  };
  
  let departmentSalaries = {};
  let highestPaidEmployee = { name: '', salary: 0 };
  
  function traverseHierarchy(employee, department) {
    if (!departmentSalaries[department]) {
      departmentSalaries[department] = { totalSalary: 0, employees: [] };
    }
  
    // Add current employee's salary to the department's total salary


    departmentSalaries[department].totalSalary += employee.salary;
    departmentSalaries[department].employees.push(employee.name);
  
    // Check if current employee is the highest paid


    if (employee.salary > highestPaidEmployee.salary) {
      highestPaidEmployee = { name: employee.name, salary: employee.salary };
    }
  

    for (let subordinate of employee.subordinates) {
      traverseHierarchy(subordinate, employee.name);
    }
  }
  


  traverseHierarchy(company, company.name);
  
  // Find the top 3 departments with the highest total salary


  let topDepartments = Object.keys(departmentSalaries)
    .map(dept => ({ name: dept, ...departmentSalaries[dept] }))
    .sort((a, b) => b.totalSalary - a.totalSalary)
    .slice(0, 3);
    
  
  // Console summary with index

  console.log("Top 3 Department Summaries:");
  topDepartments.forEach((dept, index) => {
    console.log(`Index: ${index + 1}`);
    console.log(`Department: ${dept.name}`);
    console.log(`Total Salary: ${dept.totalSalary}`);
    console.log(`Employees: ${dept.employees.join(', ')}`);
    console.log('');
  });
  
  // Highest Paid Employee
  console.log("Highest Paid Employee:");
  console.log(`Name: ${highestPaidEmployee.name}`);
  console.log(`Salary: ${highestPaidEmployee.salary}`);
  
  