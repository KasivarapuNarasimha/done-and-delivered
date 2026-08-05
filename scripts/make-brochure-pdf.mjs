import { writeFileSync } from "node:fs";

const stream = `BT
/F1 16 Tf
50 760 Td
(Nikhar Celio - Project Brochure) Tj
0 -28 Td
/F1 11 Tf
(Premium high-rise residential community at Gunjur, Bengaluru.) Tj
0 -20 Td
(RERA: PRM/KA/RERA/1251/446/PR/280426/008605) Tj
0 -20 Td
(Marketed by Done and Delivered) Tj
0 -20 Td
(Contact: +91 91104 17950 | Hemanthmukkara@doneanddelivered.co.in) Tj
0 -28 Td
(Configurations: 2 BHK + Study, 3 BHK (2T), 3 BHK (3T)) Tj
0 -18 Td
(Unit sizes: 1235, 1430, 1440, 1770, 1780, 1785, 1790 Sq.ft) Tj
0 -18 Td
(Facing: North, East, West) Tj
0 -18 Td
(Towers: Tower A 2B+G+27 | Tower B 2B+G+22 | 333 homes) Tj
0 -18 Td
(Location: Sy. No 67, Gunjur-Doddakannelli Road, Bengaluru 560087) Tj
0 -28 Td
(Replace this file with the official brochure PDF when available.) Tj
ET`;

const len = Buffer.byteLength(stream, "utf8");
const objects = [];
objects.push("1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n");
objects.push("2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n");
objects.push(
  "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj\n",
);
objects.push(`4 0 obj<< /Length ${len} >>stream\n${stream}\nendstream endobj\n`);
objects.push(
  "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n",
);

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += obj;
}
const xrefStart = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 6\n`;
pdf += `0000000000 65535 f \n`;
for (let i = 1; i <= 5; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

writeFileSync("public/projects/nikhar-celio/brochure.pdf", pdf);
console.log("brochure.pdf written");
