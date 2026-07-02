const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const regex = /                                            <div className="flex flex-col gap-2">/m;

const replacement = `                                            <div className="flex flex-col gap-2">
                                                {bulkEditField === 'UPDATE - ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM' && (
                                                    <div className="p-2 mb-1 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded text-xs">
                                                        <strong>Warning:</strong> This overrides ALL valid from dates for all groups on the selected employees.
                                                    </div>
                                                )}`;

code = code.replace(regex, replacement);
fs.writeFileSync('App.tsx', code);
console.log("Success");
