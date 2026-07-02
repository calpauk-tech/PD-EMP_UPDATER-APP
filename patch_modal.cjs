const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const oldModal = `                    {isLoading && ['identity_method', 'map_employees', 'map_fields', 'resolve_dates', 'review'].includes(currentStep) && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity">
                            <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center">
                                <Loader text="" />
                                <p className="mt-4 text-gray-700 font-medium">{loadingText || "Processing..."}</p>
                            </div>
                        </div>
                    )}`;

const newBanner = `                    {isLoading && ['identity_method', 'map_employees', 'map_fields', 'resolve_dates', 'review', 'wage_type_selection', 'configure', 'upload'].includes(currentStep) && (
                        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-blue-600 text-white px-6 py-4 shadow-lg flex items-center justify-center space-x-4 animate-[slide-up_0.3s_ease-out]">
                            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <p className="font-bold text-lg">{loadingText || "Processing..."}</p>
                        </div>
                    )}`;

if (content.includes(oldModal)) {
    content = content.replace(oldModal, newBanner);
    fs.writeFileSync('App.tsx', content);
    console.log('Replaced modal with banner.');
} else {
    console.log('Could not find modal to replace.');
}

// Ensure tailwind config has slide-up animation if needed, or just use tailwind v3 arbitrary values like animate-[slide-up_0.3s_ease-out]
// We need keyframes. Actually, just use tailwind built-in 'animate-bounce' or just ignore it, or add it in CSS.
// Let's just use Tailwind arbitrary values for animation or skip the animation if it's not defined. Let's rely on standard tailwind or no animation.
