const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const modalToInject = `
                <ConfirmModal
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

code = code.replace(/(<ConfirmModal\s+isOpen={showConfirmModal})/, modalToInject + '\n                $1');

fs.writeFileSync('App.tsx', code);
console.log('App.tsx updated');
