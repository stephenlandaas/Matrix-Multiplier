function grabInputs() {
	let m1Rows = document.forms["matrixDimensionInputs"]["m1r"].value;
	let m1Cols = document.forms["matrixDimensionInputs"]["m1c"].value;
	let m2Rows = document.forms["matrixDimensionInputs"]["m2r"].value;
	let m2Cols = document.forms["matrixDimensionInputs"]["m2c"].value;

	if ((m1Rows == "") || (m1Cols == "") || (m2Rows == "") || (m2Cols == "")) {
		alert("Please fill in all of the required fields.");
	}
	else if (m1Cols != m2Rows) {
		alert("The two matrices are unable to be multiplied.");
	}
	else {
		 document.getElementById("matrixDimensionInputs").style.display = "none";
		 createTables(m1Rows, m1Cols, m2Rows, m2Cols);
	}
}

function generateTable(rows, cols, matrixId) {
	let t = document.getElementById(matrixId);
	let input = null;
	let row = null;
	let cell = null;

	t.style.display = "inline-block";

	for (let i = 0; i < rows; i++) {
		row = t.insertRow();
		for (let j = 0; j < cols; j++) {
			input = document.createElement("input");
			input.style.height = "1.5em";
			input.style.width = "2em";
			input.type = "text";
			cell = row.insertCell();
			cell.style.padding = "0.1em";
			cell.appendChild(input);
	  }
	}
}



function createTables(m1Rows, m1Cols, m2Rows, m2Cols) {
	generateTable(m1Rows, m1Cols, "matrix1Table");
	generateTable(m2Rows, m2Cols, "matrix2Table");

	document.getElementById("sub2").style.display = "inline-block";
}


function generateProductResults() {
	// Called upon submission
	let matrix1Array = genArray("matrix1Table");
	let matrix2Array = genArray("matrix2Table");
	let m1Rows = document.getElementById("matrix1Table").rows.length;
	let m1Cols = document.getElementById("matrix1Table").rows[0].cells.length;
	let m2Cols = document.getElementById("matrix2Table").rows[0].cells.length;
	let resultantMatrix = [];
	let t = document.getElementById("matrixProduct");
	let row = null;
	let cell = null;

	resultantMatrix = calculateProduct(matrix1Array, matrix2Array, m1Rows, m1Cols, m2Cols);

	document.getElementById("matrixInputs").style.display = "none";

	t.style.display = "inline-block";

	for (let i = 0; i < m1Rows; i++) {
		row = t.insertRow(); 
		for (let j = 0; j < m2Cols; j++) {
			cell = row.insertCell();
			cell.style.padding = "0.3em";
			cell.style.fontWeight = "bold";
			cell.style.border = "0.025em solid #000000";
			cell.innerHTML = resultantMatrix[i][j];
		}
	}
}



function genArray(matrixName) {
  let matrixTable = document.getElementById(matrixName);
	let matrixArray = [];

	for (let i = 0; i < matrixTable.rows.length; i++) {
		matrixArray.push([]);
		for (let j = 0; j < matrixTable.rows[i].cells.length; j++) {
			matrixArray[i].push(matrixTable.rows[i].cells[j].children[0].value);
		}
	}

	return matrixArray;
}



function calculateElement(matrix1Array, matrix2Array, m1Cols, currentRow, currentCol) {
	let element = 0;

	for (let i = 0; i < m1Cols; i++) {
		element += (matrix1Array[currentRow][i]) * (matrix2Array[i][currentCol]) 
	}

	return element;
}



function calculateProduct(matrix1Array, matrix2Array, m1Rows, m1Cols, m2Cols) {
	let resultantMatrix = [];

	for (let i = 0; i < m1Rows; i++) {
		resultantMatrix.push([]);
		for (let j = 0; j < m2Cols; j++) {
			resultantMatrix[i].push(calculateElement(matrix1Array, matrix2Array, m1Cols, i, j));
		}
	}

	return resultantMatrix;
}
