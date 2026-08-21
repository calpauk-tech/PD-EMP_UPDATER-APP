const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const mappingLogicReplacement = `                            if (addRemoveHeader) {
                                const rowVal = String(row[addRemoveHeader] || '').trim();
                                if (rowVal.toLowerCase() === 'x' || rowVal.toUpperCase() === 'REMOVE') {
                                    actionValue = rowVal;
                                }
                            }`;

code = code.replace(
    /if \(addRemoveHeader\) \{\s*const rowVal = String\(row\[addRemoveHeader\] \|\| ''\)\.trim\(\);\s*if \(rowVal === 'x' \|\| rowVal === 'REMOVE'\) \{\s*actionValue = rowVal;\s*\}\s*\}/,
    mappingLogicReplacement
);

fs.writeFileSync('App.tsx', code);
console.log('App.tsx updated robustness');
