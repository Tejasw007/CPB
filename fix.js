const fs = require('fs');
const files = ['app/cards/page.tsx', 'app/loans/page.tsx', 'app/security/page.tsx'];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/onClick="[^"]*"/g, 'onClick={() => {}}');
  c = c.replace(/onSubmit="[^"]*"/g, 'onSubmit={(e) => e.preventDefault()}');
  c = c.replace(/maxLength=\{[^\}]*\}/g, 'maxLength={10}');
  c = c.replace(/rows=\{[^\}]*\}/g, 'rows={3}');
  c = c.replace(/viewbox=/g, 'viewBox=');
  fs.writeFileSync(f, c);
});
