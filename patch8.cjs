const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const regex = /                                        <\/div>\n                                    <\/div>\n                                <\/div>\n                            <\/div>\n                        <\/div>\n                    \)\}\n                <\/div>\n            <\/div>\n        <\/div>\n    \);/m;

const replacement = `                                        </div>
                                    </div>
                                    {bulkEditField === 'UPDATE - ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM' && (
                                        <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded text-sm">
                                            <strong>Warning:</strong> Applying this will override all previously entered valid from dates for all groups on the selected employees.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('App.tsx', code);
    console.log("Success");
} else {
    console.log("Target not found!");
}
