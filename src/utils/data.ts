import XLSX from 'xlsx';

export const xlsxToJson = async (file) => {
  const reader = new FileReader();
  await reader.readAsArrayBuffer(file);
  console.log(reader.result);
  const workbook = XLSX.read(reader.result, { type: 'buffer' });
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
};
