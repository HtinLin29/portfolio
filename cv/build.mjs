// Builds the CV PDF and its web preview image from cv/resume.html using headless Chrome.
//   node cv/build.mjs
// Set CHROME_PATH if Chrome isn't in the default Windows location.
import { execFileSync } from 'node:child_process'
import { existsSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const source = pathToFileURL(join(here, 'resume.html')).href

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean)
const chrome = candidates.find((p) => existsSync(p))
if (!chrome) throw new Error('Chrome not found — set CHROME_PATH')

const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--virtual-time-budget=8000']

const pdf = join(root, 'public', 'HtinLin_Aung_CV.pdf')
execFileSync(chrome, [...common, '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, source], { stdio: 'ignore' })
console.log('PDF     →', pdf)

// A4 at 96dpi is 794×1123; render at 2× so the in-page CV viewer stays readable.
const png = join(root, 'public', 'cv-preview.png')
execFileSync(
  chrome,
  [...common, '--window-size=794,1123', '--force-device-scale-factor=2', `--screenshot=${png}`, source],
  { stdio: 'ignore' },
)
console.log('Preview →', png)

// Link positions (as fractions of the page) so the site's CV viewer can make
// the preview image clickable. resume.html reports them when loaded with #links.
const dom = execFileSync(chrome, [...common, '--window-size=794,1123', '--dump-dom', `${source}#links`], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
})
const match = dom.match(/<pre id="cv-links">([\s\S]*?)<\/pre>/)
if (!match) throw new Error('Could not read link positions from resume.html')
const json = match[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const links = join(root, 'public', 'cv-links.json')
writeFileSync(links, JSON.stringify(JSON.parse(json), null, 2) + '\n')
console.log('Links   →', links, `(${JSON.parse(json).length})`)
