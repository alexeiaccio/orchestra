const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const TOKEN_PATH = 'token.json'
const SHEET_ID = '1QeqghNtgfZYamy-Tq70yXMIaItwqo2mXWzTGxVF23uI'

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

const writeSheet = (range, values) =>
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    authorize(JSON.parse(content), auth => writeToRange(auth, range, values))
  })

function writeToRange(auth, range, values) {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: SHEET_ID,
      range: range,
      includeValuesInResponse: true,
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'USER_ENTERED',
      responseDateTimeRenderOption: 'FORMATTED_STRING',
      resource: {
        values: values,
      },
    },
    function(err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log(result.data)
      }
    }
  )
}

module.exports = writeSheet
