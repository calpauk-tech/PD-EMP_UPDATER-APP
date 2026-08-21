const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// 1. Add ALL_DEPARTMENTS_ADD_REMOVE to generateTargetFields
code = code.replace(
    /targets\.push\(\{ key: 'ALL_DEPARTMENTS', label: '✨ All Departments \(split by comma\/semicolon\)' \}\);/,
    `targets.push({ key: 'ALL_DEPARTMENTS', label: '✨ All Departments (split by comma/semicolon)' });\n        targets.push({ key: 'ALL_DEPARTMENTS_ADD_REMOVE', label: '✨ All Departments - Add/Remove (x or REMOVE)' });`
);

// 2. Add state variables
code = code.replace(
    /const \[fieldMapping, setFieldMapping\] = useState<Map<string, string>>\(new Map\(\)\);/,
    `const [fieldMapping, setFieldMapping] = useState<Map<string, string>>(new Map());\n    const [departmentAddRemoveAction, setDepartmentAddRemoveAction] = useState<'x' | 'REMOVE' | null>(null);\n    const [pendingMapping, setPendingMapping] = useState<Map<string, string> | null>(null);\n    const [showDeptActionPrompt, setShowDeptActionPrompt] = useState(false);`
);

// 3. Update handleFieldMappingComplete to ask for prompt if needed
const processMappingOriginalStart = `    const handleFieldMappingComplete = (mapping: Map<string, string>) => {
        setFieldMapping(mapping);
        setIsLoading(true);
        setShowLoadingBar(true);
        setLoadingText("Applying mappings...");
        setTimeout(() => {`;

const processMappingReplacement = `    const processMapping = (mapping: Map<string, string>, globalDeptAction: 'x' | 'REMOVE' | null) => {
        setFieldMapping(mapping);
        setIsLoading(true);
        setShowLoadingBar(true);
        setLoadingText("Applying mappings...");
        setTimeout(() => {`;

code = code.replace(processMappingOriginalStart, processMappingReplacement);

// 4. We need to add the new handleFieldMappingComplete
const handleFieldMappingCompleteWrapper = `    const handleFieldMappingComplete = (mapping: Map<string, string>) => {
        const hasAllDepts = Array.from(mapping.values()).includes('ALL_DEPARTMENTS');
        const hasDeptAction = Array.from(mapping.values()).includes('ALL_DEPARTMENTS_ADD_REMOVE');

        if (hasAllDepts && !hasDeptAction && !departmentAddRemoveAction) {
            setPendingMapping(mapping);
            setShowDeptActionPrompt(true);
            return;
        }

        processMapping(mapping, departmentAddRemoveAction);
    };

    const processMapping = (mapping: Map<string, string>, globalDeptAction: 'x' | 'REMOVE' | null) => {
`;

code = code.replace(`    const processMapping = (mapping: Map<string, string>, globalDeptAction: 'x' | 'REMOVE' | null) => {\n`, handleFieldMappingCompleteWrapper);

// 5. Update the mapping logic inside processMapping
const mappingLogicOriginal = `                        if (targetKey === 'ALL_DEPARTMENTS') {
                            const val = String(row[header] || '');
                            const deptNames = val.split(/[,;]/).map(d => d.trim()).filter(Boolean);
                            deptNames.forEach(deptName => {
                                const matchingDept = definitions?.departments.find(d => d.name.toLowerCase() === deptName.toLowerCase());
                                if (matchingDept) {
                                    newRow[\`UPDATE - Department - \${matchingDept.name.trim()}\`] = "x";
                                }
                            });
                        } else if (targetKey === 'ALL_EMPLOYEE_GROUPS') {`;

const mappingLogicReplacement = `                        if (targetKey === 'ALL_DEPARTMENTS') {
                            const val = String(row[header] || '');
                            const deptNames = val.split(/[,;]/).map(d => d.trim()).filter(Boolean);
                            
                            // Find the value from ALL_DEPARTMENTS_ADD_REMOVE if mapped
                            let actionValue = globalDeptAction || "x"; // default to global or 'x'
                            
                            // Find which header maps to ALL_DEPARTMENTS_ADD_REMOVE
                            let addRemoveHeader = null;
                            for (let [h, k] of mapping.entries()) {
                                if (k === 'ALL_DEPARTMENTS_ADD_REMOVE') {
                                    addRemoveHeader = h;
                                    break;
                                }
                            }
                            
                            if (addRemoveHeader) {
                                const rowVal = String(row[addRemoveHeader] || '').trim();
                                if (rowVal === 'x' || rowVal === 'REMOVE') {
                                    actionValue = rowVal;
                                }
                            }
                            
                            deptNames.forEach(deptName => {
                                const matchingDept = definitions?.departments.find(d => d.name.toLowerCase() === deptName.toLowerCase());
                                if (matchingDept) {
                                    newRow[\`UPDATE - Department - \${matchingDept.name.trim()}\`] = actionValue;
                                }
                            });
                        } else if (targetKey === 'ALL_EMPLOYEE_GROUPS') {`;

code = code.replace(mappingLogicOriginal, mappingLogicReplacement);

// 6. Add ALL_DEPARTMENTS_ADD_REMOVE to ignore lists (e.g. ALL_HR_FIELDS check, availableFieldsToAddOptions check)
code = code.replace(
    /\['ALL_DEPARTMENTS', 'ALL_EMPLOYEE_GROUPS', 'ALL_EMPLOYEE_GROUPS_RATES', 'ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM', 'ALL_WAGE_SALARY_VALID_FROM'\]/g,
    `['ALL_DEPARTMENTS', 'ALL_DEPARTMENTS_ADD_REMOVE', 'ALL_EMPLOYEE_GROUPS', 'ALL_EMPLOYEE_GROUPS_RATES', 'ALL_EMPLOYEE_GROUPS_RATES_VALID_FROM', 'ALL_WAGE_SALARY_VALID_FROM']`
);

// Add the ALL_DEPARTMENTS_ADD_REMOVE to the ignore list in Map fields - Pass 2
code = code.replace(
    /targetKey !== 'IDENTITY_IGNORE' && targetKey !== 'ALL_DEPARTMENTS' && targetKey !== 'ALL_EMPLOYEE_GROUPS'/g,
    `targetKey !== 'IDENTITY_IGNORE' && targetKey !== 'ALL_DEPARTMENTS' && targetKey !== 'ALL_DEPARTMENTS_ADD_REMOVE' && targetKey !== 'ALL_EMPLOYEE_GROUPS'`
);

// 7. Render the prompt modal
// Where can we inject the modal?
// Right after <ConfirmModal ... /> would be a good place.
const modalToInject = `            <ConfirmModal
                isOpen={showDeptActionPrompt}
                onClose={() => setShowDeptActionPrompt(false)}
                title="Department Action"
                message="You have mapped 'All Departments', but not specified whether to add or remove them. Do you want to Add (x) or Remove these departments?"
                confirmText="Add (x)"
                cancelText="Remove"
                onConfirm={() => {
                    setDepartmentAddRemoveAction('x');
                    setShowDeptActionPrompt(false);
                    if (pendingMapping) {
                        processMapping(pendingMapping, 'x');
                    }
                }}
                secondaryConfirmAction={() => {
                    setDepartmentAddRemoveAction('REMOVE');
                    setShowDeptActionPrompt(false);
                    if (pendingMapping) {
                        processMapping(pendingMapping, 'REMOVE');
                    }
                }}
                secondaryConfirmText="Remove"
            />
`;

// However ConfirmModal doesn't have a way to return different actions easily unless we use secondaryConfirmAction.
// Wait, ConfirmModal has:
// onConfirm: () => void;
// secondaryConfirmAction?: () => void;
// secondaryConfirmText?: string;
// cancelText: string; (which just closes the modal in normal usage, wait let's look at ConfirmModal).

fs.writeFileSync('App.tsx', code);
console.log('App.tsx updated');
