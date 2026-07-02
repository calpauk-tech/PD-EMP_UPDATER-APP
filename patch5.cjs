const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// Add option to dropdown
code = code.replace(
    /        if \(hasGroups\) options\.push\(\{ value: "ALL_EMPLOYEE_GROUPS", label: "✨ All Employee groups \(wages\)" \}\);/,
    `        if (hasGroups) {
            options.push({ value: "ALL_EMPLOYEE_GROUPS", label: "✨ All Employee groups (wages)" });
            options.push({ value: "ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM", label: "✨ All Employee groups rates valid from" });
        }`
);

// Add logic to handleAddField
code = code.replace(
    /        else if \(fieldKey === "ALL_EMPLOYEE_GROUPS"\) \{/,
    `        else if (fieldKey === "ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM") {
            // Do nothing here, it's a bulk operation that needs to prompt, or maybe it should add columns?
            // Wait, if it's in the add field dropdown, it should add ALL group valid from columns?
            // "When the user set a bulk value for this, it will update ALL group rate valid from dates in the update table (it might also override previous entered dates in the update table or file, so please alert users about this when choosing this option."
            // So if they add it, we shouldn't just "add" columns. It's a special bulk operation.
        }
        else if (fieldKey === "ALL_EMPLOYEE_GROUPS") {`
);

fs.writeFileSync('App.tsx', code);
console.log("Success");
