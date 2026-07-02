const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

// 1. Add isLoading to WageTypeSelectionProps
content = content.replace('interface WageTypeSelectionProps {', 'interface WageTypeSelectionProps {\n    isLoading?: boolean;');
content = content.replace('const WageTypeSelection: React.FC<WageTypeSelectionProps> = ({ missingGroups, hasExistingWageTypes, onComplete, onBack }) => {', 'const WageTypeSelection: React.FC<WageTypeSelectionProps> = ({ missingGroups, hasExistingWageTypes, onComplete, onBack, isLoading }) => {');

// 2. Add isLoading to IdentitySelectorProps
content = content.replace('interface IdentitySelectorProps {', 'interface IdentitySelectorProps {\n    isLoading?: boolean;');
content = content.replace('const IdentitySelector: React.FC<IdentitySelectorProps> = ({ headers, onNext, onBack }) => {', 'const IdentitySelector: React.FC<IdentitySelectorProps> = ({ headers, onNext, onBack, isLoading }) => {');

// 3. Add isLoading to EmployeeMapperProps
content = content.replace('interface EmployeeMapperProps {', 'interface EmployeeMapperProps {\n    isLoading?: boolean;');
content = content.replace("const EmployeeMapper: React.FC<EmployeeMapperProps> = ({ rows, employees, initialMapping, matchMethod = 'NAME', onComplete, onCancel, onBack, onShowHelp }) => {", "const EmployeeMapper: React.FC<EmployeeMapperProps> = ({ rows, employees, initialMapping, matchMethod = 'NAME', onComplete, onCancel, onBack, onShowHelp, isLoading }) => {");

// 4. Add isLoading to FieldMapperProps
content = content.replace('interface FieldMapperProps {', 'interface FieldMapperProps {\n    isLoading?: boolean;');
content = content.replace('const FieldMapper: React.FC<FieldMapperProps> = ({ fileHeaders, availableTargets, onComplete, onCancel, initialMapping, onShowHelp, duplicateHeadersWarning, usedIdentityColumns }) => {', 'const FieldMapper: React.FC<FieldMapperProps> = ({ fileHeaders, availableTargets, onComplete, onCancel, initialMapping, onShowHelp, duplicateHeadersWarning, usedIdentityColumns, isLoading }) => {');

// 5. Add isLoading to DateAmbiguityResolver
content = content.replace('const DateAmbiguityResolver: React.FC<{\n    items: AmbiguousDateItem[];\n    onUpdate: (id: string, century: 1900 | 2000) => void;\n    onContinue: () => void;\n    onBack: () => void;\n}> = ({ items, onUpdate, onContinue, onBack }) => {', 'const DateAmbiguityResolver: React.FC<{\n    items: AmbiguousDateItem[];\n    onUpdate: (id: string, century: 1900 | 2000) => void;\n    onContinue: () => void;\n    onBack: () => void;\n    isLoading?: boolean;\n}> = ({ items, onUpdate, onContinue, onBack, isLoading }) => {');

// 6. Update instances of IdentitySelector, EmployeeMapper, FieldMapper, DateAmbiguityResolver, WageTypeSelection in App
content = content.replace(/<IdentitySelector\s/g, '<IdentitySelector isLoading={isLoading} ');
content = content.replace(/<EmployeeMapper\s/g, '<EmployeeMapper isLoading={isLoading} ');
content = content.replace(/<FieldMapper\s/g, '<FieldMapper isLoading={isLoading} ');
content = content.replace(/<DateAmbiguityResolver\s/g, '<DateAmbiguityResolver isLoading={isLoading} ');
content = content.replace(/<WageTypeSelection\s/g, '<WageTypeSelection isLoading={isLoading} ');

// 7. Update buttons in WageTypeSelection
content = content.replace(
    /<button onClick=\{handleComplete\} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700">/g,
    '<button onClick={handleComplete} disabled={isLoading} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}'
);

// 8. Update buttons in IdentitySelector
content = content.replace(
    /<button onClick=\{handleContinue\} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">/g,
    '<button onClick={handleContinue} disabled={isLoading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}'
);

// 9. Update buttons in EmployeeMapper
content = content.replace(
    /<button onClick=\{handleProcess\} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">/g,
    '<button onClick={handleProcess} disabled={isLoading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}'
);

// 10. Update buttons in FieldMapper
content = content.replace(
    /<button onClick=\{confirmProcess\} className="px-5 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">/g,
    '<button onClick={confirmProcess} disabled={isLoading} className="px-5 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}'
);

// 11. Update buttons in DateAmbiguityResolver
content = content.replace(
    /<button onClick=\{onContinue\} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2">/g,
    '<button onClick={onContinue} disabled={isLoading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}'
);


fs.writeFileSync('App.tsx', content);
console.log('Patch complete.');
