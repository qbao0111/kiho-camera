import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : /\.[jt]sx?$/.test(name) ? [name] : [];
  });
}

const images = [];
for (const file of files('src')) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && ['Image', 'img'].includes(node.tagName.getText(source))) {
      const props = Object.fromEntries(node.attributes.properties.map(prop => [prop.name?.getText(source) || 'spread', prop.initializer?.getText(source) || 'true']));
      images.push({ file: file.replaceAll('\\', '/'), line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, tag: node.tagName.getText(source), ...props });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
console.log(JSON.stringify(images, null, 2));
