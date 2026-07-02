const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const regex = /            <h2 className="text-2xl font-bold mb-4">Map Fields<\/h2>/m;

const replacement = `            <h2 className="text-2xl font-bold mb-4">Map Fields</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3 text-sm text-blue-800">
                        <p className="font-semibold mb-1">Only map fields you want to update</p>
                        <p>
                            You only need to map the fields you actively want to update in Planday. Any other columns in your file MUST be left unmapped (Ignore). 
                            For example, if your file contains employee names but you've mapped employees using their Payroll ID, leave the name columns unmapped. 
                            If your file contains Departments but you don't wish to update them, leave them unmapped.
                        </p>
                    </div>
                </div>
            </div>`;

code = code.replace(regex, replacement);
fs.writeFileSync('App.tsx', code);
console.log("Success");
