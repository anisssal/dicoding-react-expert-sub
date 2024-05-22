import { readFile, writeFile } from 'node:fs/promises';
import { getIconsCSS } from '@iconify/utils';
import { locate } from '@iconify/json';

/**
 * List of icons. Key is icon set prefix, value is array of icons
 *
 * @type {Record<string, string[]>}
 */
const icons = {
    'bx': ['upvote', 'downvote'],
    'bxs': ['upvote', 'downvote'],
};

// Parse each icon set
let code = '';
// eslint-disable-next-line no-restricted-syntax,guard-for-in
for (const prefix in icons) {
    // Find location of .json file
    const filename = locate(prefix);

    // Load file and parse it
    /** @type {import("@iconify/types").IconifyJSON} */
        // eslint-disable-next-line no-await-in-loop
    const iconSet = JSON.parse(await readFile(filename, 'utf8'));

    // Get CSS
    const css = getIconsCSS(iconSet, icons[prefix]);

    // Add it to code
    code += css;
}

// Save CSS file
await writeFile('src/styles/icon_style.css', code, 'utf8');
// eslint-disable-next-line no-console
console.log(`Saved CSS (${code.length} bytes)`);
