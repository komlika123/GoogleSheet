# GoogleSheet

This project is a web-based spreadsheet application with customizable grids, basic formatting options, and functionality for formulas and row/column operations.

## Features

1. **Interactive Grid**:
   - A dynamic grid with 50 rows and 26 columns by default.
   - Editable cells for user input.

2. **Toolbar Functionalities**:
   - **Formatting Options**: Apply bold and italic styles to selected cells.
   - **Font Size Adjustment**: Change font size using a dropdown menu (12px, 14px, or 16px).
   - **Row and Column Operations**: Insert and delete rows or columns dynamically.
   - **Built-in Functions**: Support for SUM, AVERAGE, MAX, MIN, COUNT, TRIM, UPPER, and LOWER.

3. **Formula Bar**:
   - Displays the content or formula of the currently selected cell.
   - Allows direct input or editing of formulas.

4. **Column Resizing**:
   - Resize columns using a draggable handle on their edges.

5. **Dynamic Headers**:
   - Alphabetical column headers (A-Z).
   - Numeric row headers (1-50).

## Technologies Used

- **HTML**: Provides the structure of the application.
- **CSS**: Handles the styling, including a modern responsive layout.
- **JavaScript**: Implements interactivity and functionality, such as cell selection, formula evaluation, and resizing.

## Installation and Setup

1. **Download or Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd spreadsheet-clone
   ```

3. **Open the Application in Your Browser**:
   Double-click on `index.html` or use the `open` command:
   ```bash
   open index.html
   ```

## How to Use

1. **Editing Cells**:
   - Click on a cell to select it and type to input data.
   - Press Enter to save the input.

2. **Toolbar Options**:
   - Apply bold or italic formatting using the toolbar buttons.
   - Adjust font size from the dropdown menu.
   - Use buttons to insert or delete rows and columns.

3. **Formulas**:
   - Input formulas in the format `=FUNCTION(arguments)` in the formula bar.
   - Example: `=SUM(10,20)` calculates the sum of 10 and 20.

4. **Functions**:
   - Select a predefined function from the dropdown menu to apply it to the selected cell.

5. **Column Resizing**:
   - Hover over a column edge to reveal the resize handle and drag to adjust the width.

## Limitations

- **Basic Formula Parsing**: Advanced features like cell referencing (`A1:A5`) are not yet supported.
- **No Data Persistence**: Changes will not be saved upon page reload.
- **Cell Dependency Management**: Automatic updates for dependent cells are not implemented.

## Future Enhancements

1. **Cell References**:
   - Support referencing other cells in formulas (e.g., `=SUM(A1:A5)`).

2. **Data Persistence**:
   - Save grid data to local storage or a backend database.

3. **Advanced Features**:
   - Add support for nested formulas and more complex calculations.

4. **Improved UI/UX**:
   - Implement drag-and-drop functionality for rows and columns.
   - Enhance mobile responsiveness.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For questions or feedback, reach out to tarukomlika01@gmail.com

