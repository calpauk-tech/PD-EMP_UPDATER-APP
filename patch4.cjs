const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// Update WageTypeSelectionProps
code = code.replace(
    /onComplete: \(selections: Map<string, string>, overwrite: boolean\) => void;/,
    `onComplete: (selections: Map<string, string>, overwrite: boolean, validFromDate: string) => void;`
);

// Add state for date
code = code.replace(
    /const \[formError, setFormError\] = useState<string \| null>\(null\);/,
    `const [formError, setFormError] = useState<string | null>(null);
    const [validFromDate, setValidFromDate] = useState<string>("");`
);

// Update submitSelections
code = code.replace(
    /onComplete\(result, overwrite\);/,
    `onComplete(result, overwrite, validFromDate);`
);
code = code.replace(
    /onComplete\(groupSelections, overwrite\);/,
    `onComplete(groupSelections, overwrite, validFromDate);`
);

// Add the date input UI in WageTypeSelection
// Find "Select Wage Type"
code = code.replace(
    /             <h2 className="text-2xl font-bold mb-4">Select Wage Type<\/h2>/,
    `             <h2 className="text-2xl font-bold mb-4">Set Additional Info for Group Rates</h2>`
);
code = code.replace(
    /                Should all rates for these groups be set as HourlyRate, ShiftRate, or would you like to set wage type per employee group\? Note that this only applies to mapped rates\./,
    `                Please specify the valid from date for these rates, and select the wage type.`
);

code = code.replace(
    /<div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">/,
    `
            <div className="mb-8 pt-6 border-t border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">Group Rates Valid From Date (Optional)</label>
                <input 
                    type="date" 
                    value={validFromDate}
                    onChange={(e) => setValidFromDate(e.target.value)}
                    className="w-full sm:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">If left blank, rates will be valid from today's date.</p>
            </div>
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">`
);

// Update handleWageTypeSelectionsComplete signature
code = code.replace(
    /const handleWageTypeSelectionsComplete = \(selections: Map<string, string>, overwrite: boolean\) => \{/,
    `const handleWageTypeSelectionsComplete = (selections: Map<string, string>, overwrite: boolean, validFromDate: string) => {`
);

// Inside handleWageTypeSelectionsComplete, also apply the validFromDate
code = code.replace(
    /const existingType = String\(newRow\[\`UPDATE - Group Wage Type - \$\{group\}\`\] \|\| ''\)\.trim\(\);/,
    `const existingType = String(newRow[\`UPDATE - Group Wage Type - \${group}\`] || '').trim();
                    const existingDate = String(newRow[\`UPDATE - Group Valid From - \${group}\`] || '').trim();
                    if (validFromDate && (overwrite || !existingDate)) {
                        newRow[\`UPDATE - Group Valid From - \${group}\`] = validFromDate;
                    }`
);

fs.writeFileSync('App.tsx', code);
console.log("Success");
