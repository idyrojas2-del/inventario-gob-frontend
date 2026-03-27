const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('Table.js') || f.endsWith('SoporteTecnicoView.js'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add imports if not present
  if (content.includes('alert(') && !content.includes('import { showAlert')) {
    const importStatement = "\nimport { showAlert, showConfirm } from '../utils/Alerts';";
    // Insert after the last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport) + importStatement + content.slice(endOfLastImport);
    changed = true;
  }

  // Replace Edit alert
  // e.g. alert('📝 Editando ' + eq.id) -> showAlert('Editar', '📝 Editando ' + eq.id, 'info')
  // or alert('Editando ' + item.id) -> showAlert('Editar', 'Editando ' + item.id, 'info')
  const editRegex = /alert\('([^']+Editando[^']+)' \+ ([^\)]+)\)/g;
  if(editRegex.test(content)) {
    content = content.replace(editRegex, "showAlert('Editar', '$1' + $2, 'info')");
    changed = true;
  }
  
  const editRegex2 = /alert\('([^']+Editando)'\)/g;
  if (editRegex2.test(content)) {
      content = content.replace(editRegex2, "showAlert('Editar', '$1', 'info')");
      changed = true;
  }

  // Replace Delete alert
  // e.g. alert('🗑 Eliminando ' + eq.id) -> showConfirm('Eliminar', '¿Seguro que deseas eliminar?', () => showAlert('Eliminado', '🗑 Eliminando ' + eq.id, 'success'))
  const deleteRegex = /alert\('([^']+Eliminando[^']+)' \+ ([^\)]+)\)/g;
  if(deleteRegex.test(content)) {
    content = content.replace(deleteRegex, "showConfirm('Eliminar', '¿Estás seguro de que deseas eliminar este elemento?', () => showAlert('Eliminado', '$1' + $2, 'success'))");
    changed = true;
  }

  const deleteRegex2 = /alert\('([^']+Eliminando)'\)/g;
  if (deleteRegex2.test(content)) {
      content = content.replace(deleteRegex2, "showConfirm('Eliminar', '¿Estás seguro de que deseas eliminar este elemento?', () => showAlert('Eliminado', '$1', 'success'))");
      changed = true;
  }

  // Replace PDF alert
  // e.g. alert(`Generando reporte PDF de Administración para: ${periodo}`)
  const pdfRegex = /alert\(`([^`]+PDF[^`]+)`\)/g;
  if(pdfRegex.test(content)) {
    content = content.replace(pdfRegex, "showAlert('Reporte PDF', `$1`, 'info')");
    changed = true;
  }
  
  const pdfRegex2 = /alert\('([^']+PDF[^']+)'\)/g;
  if(pdfRegex2.test(content)) {
    content = content.replace(pdfRegex2, "showAlert('Reporte PDF', '$1', 'info')");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
});
