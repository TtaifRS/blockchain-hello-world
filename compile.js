import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import solc from 'solc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf-8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const compileData = (JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox)

export default compileData
