const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const target = `                        } else if (targetKey === 'ALL_WAGE_SALARY_VALID_FROM') {
                            const val = String(row[header] || '').trim();
                            if (val) {
                                groupOrderForRates.forEach(groupName => {
                                    newRow[\`UPDATE - Group Valid From - \${groupName}\`] = val;
                                });
                                newRow[\`UPDATE - Fixed Salary - valid from\`] = val;
                            }
                        }
                    });
                    mappedRows.push(newRow);`;

const replacement = `                        } else if (targetKey === 'ALL_WAGE_SALARY_VALID_FROM') {
                            const val = String(row[header] || '').trim();
                            if (val) {
                                groupOrderForRates.forEach(groupName => {
                                    newRow[\`UPDATE - Group Valid From - \${groupName}\`] = val;
                                });
                                newRow[\`UPDATE - Fixed Salary - valid from\`] = val;
                            }
                        } else if (targetKey === 'ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM') {
                            const val = String(row[header] || '').trim();
                            if (val) {
                                groupOrderForRates.forEach(groupName => {
                                    newRow[\`UPDATE - Group Valid From - \${groupName}\`] = val;
                                });
                            }
                        }
                    });

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
                            
                            if (!activeGroupsForRates.has(gName)) {
                                delete newRow[key];
                            }
                        }
                    });

                    mappedRows.push(newRow);`;

if (code.includes(target)) {
    fs.writeFileSync('App.tsx', code.replace(target, replacement));
    console.log("Success");
} else {
    console.log("Target not found!");
}
