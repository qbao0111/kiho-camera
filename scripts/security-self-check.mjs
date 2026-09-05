import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(
  new URL("../src/data/google-apps-script.js", import.meta.url),
  "utf8"
);

let appendedRow;
let sentEmail;
const sheet = {
  getLastRow: () => 1,
  appendRow: (row) => {
    appendedRow = row;
  },
  getName: () => "Rental Requests",
};
const context = {
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: (name) =>
        name === "RENTAL_REQUEST_WEBHOOK_SECRET" ? "test-secret" : null,
    }),
  },
  SpreadsheetApp: {
    getActiveSpreadsheet: () => ({
      getSheetByName: () => sheet,
      insertSheet: () => sheet,
      getName: () => "Test Spreadsheet",
    }),
  },
  Utilities: { formatDate: () => "28/08/2026 12:00:00" },
  MailApp: { sendEmail: (message) => (sentEmail = message) },
  ContentService: {
    MimeType: { JSON: "json" },
    createTextOutput: (body) => ({
      body,
      setMimeType() {
        return this;
      },
    }),
  },
};

vm.createContext(context);
vm.runInContext(source, context);

const result = context.doPost({
  postData: {
    contents: JSON.stringify({
      secret: "test-secret",
      customerName: "=IMPORTXML(\"https://example.com\")",
      phone: "0325500399",
      equipmentName: "+SUM(1,1)",
      rentalDate: "2026-08-29",
      returnDate: "2026-08-30",
      note: "<img src=x onerror=alert(1)>",
      source: "@website",
      notificationEmail: "admin@example.com",
    }),
  },
});

assert.equal(JSON.parse(result.body).success, true, result.body);
assert.match(appendedRow[1], /^'=/);
assert.match(appendedRow[3], /^'\+/);
assert.match(appendedRow[7], /^'@/);
assert.ok(!sentEmail.htmlBody.includes("<img src=x"));
assert.ok(sentEmail.htmlBody.includes("&lt;img src=x onerror=alert(1)&gt;"));

const rejected = context.doPost({
  postData: { contents: JSON.stringify({ secret: "wrong" }) },
});
assert.equal(JSON.parse(rejected.body).code, "INVALID_SECRET");

const rawIntegrationSource = await readFile(
  new URL("../src/lib/services/integrations.ts", import.meta.url),
  "utf8"
);
const integrationSource = rawIntegrationSource.replace(/\r\n/g, "\n");
const functionStart = integrationSource.indexOf(
  "export function generateAppsScriptCode"
);
const functionEnd = integrationSource.indexOf(
  "/**\n * Execute a Connection Test",
  functionStart
);
assert.ok(functionStart >= 0 && functionEnd > functionStart);

const generatorSource = ts.transpileModule(
  integrationSource.slice(functionStart, functionEnd).replace("export ", ""),
  { compilerOptions: { target: ts.ScriptTarget.ES2022 } }
).outputText;
const generatorContext = {};
vm.createContext(generatorContext);
vm.runInContext(generatorSource, generatorContext);
const generatedSource = generatorContext.generateAppsScriptCode({
  sheetId: "test-sheet-id",
  sheetName: "Rental Requests",
});

appendedRow = undefined;
sentEmail = undefined;
vm.runInContext(generatedSource, context);
const generatedResult = context.doPost({
  postData: {
    contents: JSON.stringify({
      secret: "test-secret",
      customerName: "=IMPORTXML(\"https://example.com\")",
      phone: "0325500399",
      equipmentName: "+SUM(1,1)",
      rentalDate: "2026-08-29",
      returnDate: "2026-08-30",
      note: "<img src=x onerror=alert(1)>",
      source: "@website",
      notificationEmail: "admin@example.com",
    }),
  },
});
assert.equal(JSON.parse(generatedResult.body).success, true, generatedResult.body);
assert.match(appendedRow[1], /^'=/);
assert.match(appendedRow[3], /^'\+/);
assert.match(appendedRow[7], /^'@/);
assert.ok(!sentEmail.htmlBody.includes("<img src=x"));
assert.ok(sentEmail.htmlBody.includes("&lt;img src=x onerror=alert(1)&gt;"));

console.log("Security self-check passed.");
