const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

code = code.replace(
    /cancelText="Remove"/,
    'cancelText="Cancel"'
);

fs.writeFileSync('App.tsx', code);
console.log('App.tsx modal updated');
