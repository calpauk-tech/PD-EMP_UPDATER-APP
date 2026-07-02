const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const oldBtn1 = '<button onClick={handleGoToUpload} disabled={isLoading} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">';
const newBtn1 = '<button onClick={handleGoToUpload} disabled={isLoading} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}';

const oldBtn2 = '<button onClick={handleDownloadTemplate} disabled={isLoading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">';
const newBtn2 = '<button onClick={handleDownloadTemplate} disabled={isLoading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">\n{isLoading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}';

content = content.replace(oldBtn1, newBtn1);
content = content.replace(oldBtn2, newBtn2);
fs.writeFileSync('App.tsx', content);
