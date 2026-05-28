const msg = "409 Error: Validation failed (custom_5224: Validation error - PropertyRequired: custom_5224) - Check for required fields and invalid field values. Remember to read the instructions for each field.";
const cf = { originalName: "custom_5224", description: "Test field 2" };

let enhanced = msg;
if (enhanced.toLowerCase().includes(cf.originalName.toLowerCase()) && !enhanced.includes(`(${cf.description})`)) {
    const escapedName = cf.originalName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_])${escapedName}([^a-zA-Z0-9_]|$)`, 'gi');
    enhanced = enhanced.replace(regex, `$1${cf.originalName} (${cf.description})$2`);
    
    if (enhanced === msg) {
        const fallbackRegex = new RegExp(escapedName, 'gi');
        enhanced = enhanced.replace(fallbackRegex, `${cf.originalName} (${cf.description})`);
    }
}
console.log(enhanced);
