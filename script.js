
const ROWS = 50;
const COLS = 26;
const grid = document.getElementById('grid');
const formulaInput = document.getElementById('formula-input');
let selectedCell = null;
let data = {};

// Initialize the grid
function initGrid() {
    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.appendChild(createCell('', 'header-cell'));
    
    for (let i = 0; i < COLS; i++) {
        headerRow.appendChild(createCell(String.fromCharCode(65 + i), 'header-cell'));
    }
    grid.appendChild(headerRow);

    // Create data rows
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement('tr');
        row.appendChild(createCell(i + 1, 'row-header'));
        
        for (let j = 0; j < COLS; j++) {
            const cell = createCell('', 'cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);
            cell.contentEditable = true;
            cell.addEventListener('click', () => selectCell(cell));
            cell.addEventListener('input', () => updateFormulaBar(cell));
            
            // Add resize handle
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'resize-handle';
            resizeHandle.addEventListener('mousedown', initResize);
            cell.appendChild(resizeHandle);
            
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function createCell(content, className) {
    const cell = document.createElement('td');
    cell.className = className;
    cell.textContent = content;
    return cell;
}

function selectCell(cell) {
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }
    selectedCell = cell;
    cell.classList.add('selected');
    formulaInput.value = cell.getAttribute('data-formula') || cell.textContent;
}

function updateFormulaBar(cell) {
    if (cell === selectedCell) {
        formulaInput.value = cell.textContent;
    }
    updateDependencies(cell);
}

// Function handling
function applyFunction() {
    const functionSelect = document.getElementById('functions');
    const selectedFunction = functionSelect.value;
    
    if (!selectedCell || !selectedFunction) return;
    
    const formula = `=${selectedFunction}()`;
    formulaInput.value = formula;
    selectedCell.setAttribute('data-formula', formula);
    
    // Reset select
    functionSelect.value = '';
}

// Mathematical functions
const functions = {
    SUM: range => range.reduce((sum, val) => sum + (parseFloat(val) || 0), 0),
    AVERAGE: range => functions.SUM(range) / range.filter(val => !isNaN(parseFloat(val))).length,
    MAX: range => Math.max(...range.map(val => parseFloat(val) || -Infinity)),
    MIN: range => Math.min(...range.map(val => parseFloat(val) || Infinity)),
    COUNT: range => range.filter(val => !isNaN(parseFloat(val))).length,
    TRIM: range => range.map(val => val.trim()),
    UPPER: range => range.map(val => val.toUpperCase()),
    LOWER: range => range.map(val => val.toLowerCase())
};

// Formatting functions
function applyFormat(format) {
    if (!selectedCell) return;
    
    switch (format) {
        case 'bold':
            selectedCell.style.fontWeight = 
                selectedCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
            break;
        case 'italic':
            selectedCell.style.fontStyle = 
                selectedCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
            break;
    }
}

function applyFontSize() {
    if (!selectedCell) return;
    const fontSize = document.getElementById('fontSize').value;
    selectedCell.style.fontSize = `${fontSize}px`;
}

// Row and column operations
function insertRow() {
    if (!selectedCell) return;
    const rowIndex = parseInt(selectedCell.getAttribute('data-row'));
    const row = document.createElement('tr');
    row.appendChild(createCell(ROWS + 1, 'row-header'));
    
    for (let j = 0; j < COLS; j++) {
        const cell = createCell('', 'cell');
        cell.setAttribute('data-row', ROWS);
        cell.setAttribute('data-col', j);
        cell.contentEditable = true;
        cell.addEventListener('click', () => selectCell(cell));
        cell.addEventListener('input', () => updateFormulaBar(cell));
        row.appendChild(cell);
    }
    
    const referenceRow = grid.children[rowIndex + 1];
    grid.insertBefore(row, referenceRow);
    updateRowNumbers();
}

function deleteRow() {
    if (!selectedCell) return;
    const rowIndex = parseInt(selectedCell.getAttribute('data-row'));
    grid.deleteRow(rowIndex + 1);
    updateRowNumbers();
}

function insertColumn() {
    if (!selectedCell) return;
    const colIndex = parseInt(selectedCell.getAttribute('data-col'));
    
    // Update header
    const headerCell = createCell(String.fromCharCode(65 + COLS), 'header-cell');
    grid.rows[0].insertBefore(headerCell, grid.rows[0].cells[colIndex + 1]);
    
    // Update data rows
    for (let i = 1; i <= ROWS; i++) {
        const cell = createCell('', 'cell');
        cell.setAttribute('data-row', i - 1);
        cell.setAttribute('data-col', COLS);
        cell.contentEditable = true;
        cell.addEventListener('click', () => selectCell(cell));
        cell.addEventListener('input', () => updateFormulaBar(cell));
        grid.rows[i].insertBefore(cell, grid.rows[i].cells[colIndex + 1]);
    }
}

function deleteColumn() {
    if (!selectedCell) return;
    const colIndex = parseInt(selectedCell.getAttribute('data-col'));
    
    for (let i = 0; i <= ROWS; i++) {
        grid.rows[i].deleteCell(colIndex + 1);
    }
}

// Column resize handling
function initResize(e) {
    e.preventDefault();
    const cell = e.target.parentElement;
    const startX = e.pageX;
    const startWidth = cell.offsetWidth;
    
    function onMouseMove(e) {
        const width = startWidth + (e.pageX - startX);
        cell.style.width = `${width}px`;
    }
    
    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Helper functions
function updateRowNumbers() {
    for (let i = 1; i < grid.rows.length; i++) {
        grid.rows[i].cells[0].textContent = i;
    }
}

function updateDependencies(cell) {
    // Implementation for updating dependent cells would go here
    // This would involve tracking cell dependencies and recalculating formulas
}

// Initialize the grid when the page loads
initGrid();

// Formula bar handling
formulaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && selectedCell) {
        e.preventDefault();
        const formula = formulaInput.value;
        selectedCell.setAttribute('data-formula', formula);
        selectedCell.textContent = evaluateFormula(formula);
    }
});

function evaluateFormula(formula) {
    // Basic formula evaluation - would need to be expanded for real use
    if (formula.startsWith('=')) {
        try {
            const functionMatch = formula.match(/^=(\w+)\((.*)\)$/);
            if (functionMatch) {
                const [_, functionName, range] = functionMatch;
                const values = range.split(',').map(cell => cell.trim());
                return functions[functionName](values);
            }
            return eval(formula.substring(1));
        } catch (e) {
            return '#ERROR!';
        }
    }
    return formula;
}
