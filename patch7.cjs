const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const regex = /                \} else \{([ \t]*)                    if \(newFileJson\[rowIndex\]\[bulkEditField\] !== bulkEditValue\) \{/m;

const replacement = `                } else if (bulkEditField === 'UPDATE - ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM') {
                    // Update all valid from columns
                    let updatedRow = { ...newFileJson[rowIndex] };
                    let rowChanged = false;
                    Object.keys(updatedRow).forEach(col => {
                        if (col.startsWith('UPDATE - Group Valid From - ')) {
                            if (updatedRow[col] !== bulkEditValue) {
                                updatedRow[col] = bulkEditValue;
                                rowChanged = true;
                            }
                        }
                    });
                    
                    // Also set it in the pseudo column itself to show what was selected
                    if (updatedRow['UPDATE - ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM'] !== bulkEditValue) {
                        updatedRow['UPDATE - ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM'] = bulkEditValue;
                        rowChanged = true;
                    }
                    
                    if (rowChanged) {
                        newFileJson[rowIndex] = updatedRow;
                        hasChanges = true;
                    }
                } else {$1                    if (newFileJson[rowIndex][bulkEditField] !== bulkEditValue) {`;

code = code.replace(regex, replacement);
fs.writeFileSync('App.tsx', code);
console.log("Success");
