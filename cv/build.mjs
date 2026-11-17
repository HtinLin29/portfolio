// Builds the CV PDF and its web preview image from cv/resume.html using headless Chrome.
//   node cv/build.mjs
// Set CHROME_PATH if Chrome isn't in the default Windows location.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
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
