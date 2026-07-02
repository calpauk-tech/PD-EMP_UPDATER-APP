const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const regex = /                        \} else if \(targetKey === 'ALL_WAGE_SALARY_VALID_FROM'\) \{([\s\S]*?)                    \}\);\n                    mappedRows\.push\(newRow\);\n                \}\);/m;

const replacement = `                        } else if (targetKey === 'ALL_WAGE_SALARY_VALID_FROM') {$1                    });

                    // Cleanup: If a group rate is missing/blank for this row, remove its wage type, valid from, and salary code
                    const activeGroupsForRates = new Set<string>();
                    Object.keys(newRow).forEach(key => {
                        if (key.startsWith('UPDATE - Group Rate - ')) {
                            const val = newRow[key];
                            if (val !== undefined && val !== null && String(val).trim() !== '') {
                                activeGroupsForRates.add(key.replace('UPDATE - Group Rate - ', ''));
                            }
                        }
                    });

                    Object.keys(newRow).forEach(key => {
                        if (key.startsWith('UPDATE - Group Wage Type - ') || 
                            key.startsWith('UPDATE - Group Valid From - ') || 
                            key.startsWith('UPDATE - Group Salary Code - ')) {
                            
                            let gName = '';
                            if (key.startsWith('UPDATE - Group Wage Type - ')) gName = key.replace('UPDATE - Group Wage Type - ', '');
                            else if (key.startsWith('UPDATE - Group Valid From - ')) gName = key.replace('UPDATE - Group Valid From - ', '');
                            else if (key.startsWith('UPDATE - Group Salary Code - ')) gName = key.replace('UPDATE - Group Salary Code - ', '');
                            
                            if (gName && !activeGroupsForRates.has(gName)) {
                                delete newRow[key];
                            }
                        }
                    });

                    mappedRows.push(newRow);
                });`;

if (regex.test(code)) {
    // Add the missing ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM to the replaced block too
    let newCode = code.replace(regex, replacement);
    // Find ALL_WAGE_SALARY_VALID_FROM block and insert ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM before it
    newCode = newCode.replace(
        /\} else if \(targetKey === 'ALL_WAGE_SALARY_VALID_FROM'\) \{/g,
        `} else if (targetKey === 'ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM') {
                            const val = String(row[header] || '').trim();
                            if (val) {
                                groupOrderForRates.forEach(groupName => {
                                    newRow[\`UPDATE - Group Valid From - \${groupName}\`] = val;
                                });
                            }
                        } else if (targetKey === 'ALL_WAGE_SALARY_VALID_FROM') {`
    );
    
    fs.writeFileSync('App.tsx', newCode);
    console.log("Success");
} else {
    console.log("Target not found!");
}
