const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

code = code.replace(
    /        else if \(fieldKey === "ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM"\) \{([\s\S]*?)        \}\n        else if \(fieldKey === "ALL_EMPLOYEE_GROUPS"\) \{/m,
    `        else if (fieldKey === "ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM") {
            fieldsToAdd.push("UPDATE - ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM");
        }
        else if (fieldKey === "ALL_EMPLOYEE_GROUPS") {`
);

fs.writeFileSync('App.tsx', code);
console.log("Success");
