Blockly.Blocks['maze_if'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("if path"), "NAME_if")
			.appendField(new Blockly.FieldDropdown([
				["ahead", "path_ahead"],
				["to left", "path_to_left"],
				["to right", "path_to_right"]
			]), "DIR")
			.appendField(new Blockly.FieldLabelSerializable("exists"), "NAME_exists");
		this.appendStatementInput("DO")
			.setCheck(null);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#5CA699");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
javascriptGenerator['maze_if'] = function(block) {
	var statements_do = javascriptGenerator.statementToCode(block, 'DO');
	var code = `dbg_print('blockly_debug at block_id_${block.id}: ${block.getFieldValue('DIR')}'); if (${block.getFieldValue('DIR')}_exists()) {${statements_do}}\n`;
	return code;
};

Blockly.Blocks['maze_if_else'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("if path"), "NAME_if")
			.appendField(new Blockly.FieldDropdown([
				["ahead", "path_ahead"],
				["to left", "path_to_left"],
				["to right", "path_to_right"]
			]), "DIR")
			.appendField(new Blockly.FieldLabelSerializable("exists"), "NAME_exists");
		this.appendStatementInput("DO")
			.setCheck(null);
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("else"), "NAME_else");
		this.appendStatementInput("DO_else")
			.setCheck(null);

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#5CA699");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
javascriptGenerator['maze_if_else'] = function(block) {
	var statements_do = javascriptGenerator.statementToCode(block, 'DO');
	var statements_doelse = javascriptGenerator.statementToCode(block, 'DO_else');
	var code = `dbg_print('blockly_debug at block_id_${block.id}: ${block.getFieldValue('DIR')}'); if (${block.getFieldValue('DIR')}_exists()) {${statements_do}} else {${statements_doelse}}\n`;
	return code;
};

Blockly.Blocks['maze_until'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("repeat until 🚩 is reached"), "NAME_until");
		this.appendStatementInput("DO")
			.setCheck(null)
			.appendField(new Blockly.FieldLabelSerializable("do"), "NAME_do");

		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#5CA699");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
javascriptGenerator['maze_until'] = function(block) {
	var statements_do = javascriptGenerator.statementToCode(block, 'DO');
	var code = `dbg_print('blockly_debug at block_id_${block.id}: while'); while (!has_reached_destination()) {${statements_do}}\n`;
	return code;
};

Blockly.Blocks['maze_move'] = {
	init: function() {
		this
			.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("take step forward"), "NAME")
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#5CA699");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
javascriptGenerator['maze_move'] = function(block) {
	return `dbg_print('blockly_debug at block_id_${block.id}: move ');move();\n`;
}

Blockly.Blocks['maze_turn'] = {
	init: function() {
		this
			.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("turn"), "NAME")
			.appendField(new Blockly.FieldDropdown([
				["clockwise (the character's right)", "clockwise"],
				["anti-clockwise (the character's left)", "anticlockwise"]
			]), "dir")
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#5CA699");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
javascriptGenerator['maze_turn'] = function(block) {
	return `dbg_print('blockly_debug at block_id_${block.id}: turn ${block.getFieldValue('dir')} ');updateHeading(("${block.getFieldValue('dir')}" == "clockwise" ? 1 : -1));\n`;
}

Blockly.Blocks['console_dbg'] = {
	init: function() {
		this
			.appendDummyInput()
			.appendField(new Blockly.FieldLabelSerializable("console_dbg"), "NAME")
			.appendField(new Blockly.FieldTextInput("debugger text..."), "dbg_txt")
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#000000");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
javascriptGenerator['console_dbg'] = function(block) {
	return `dbg_print('blockly_debug_function at block_id_${block.id}: ${block.getFieldValue('dbg_txt')} ');\n`;
}

let blocks = {
	"kind": "categoryToolbox",
	"contents": [
		/*{
         "kind": "category",
         "name": "Logic",
         "contents": [
           {
             "kind": "block",
             "type": "controls_if"
           },
           {
             "kind": "block",
             "type": "logic_operation"
           },
           {
             "kind": "block",
             "type": "logic_boolean"
           },
           {
             "kind": "block",
             "type": "logic_compare"
           },
           {
             "kind": "block",
             "type": "logic_negate"
           },
           {
             "kind": "block",
             "type": "logic_null",
           },
           {
             "kind": "block",
             "type": "logic_ternary"
           }
         ]
       },
       {
       "kind": "category",
       "name": "Control",
       "contents": [
         {
           "kind": "block",
           "type": "controls_repeat_ext"
         },
         {
           "kind": "block",
           "type": "controls_repeat",
         },
         {
           "kind": "block",
           "type": "controls_whileUntil"
         },
         {
           "kind": "block",
           "type": "controls_for"
         },
         {
           "kind": "block",
           "type": "controls_forEach"
         },
         {
           "kind": "block",
           "type": "controls_flow_statements"
         }
       ]
     },*/
		{
			kind: "category",
			name: "Maze",
			colour: "#5CA699",
			contents: [{
					kind: "block",
					type: "maze_move",
				},
				{
					kind: "block",
					type: "maze_turn",
				},

				{
					"kind": "block",
					"type": "maze_if",
				},
				{
					"kind": "block",
					"type": "maze_if_else",
				},
				{
					"kind": "block",
					"type": "maze_until",
				},
			],
		},
		{
			kind: "category",
			name: "dbg",
			colour: "#000000",
			contents: [{
				kind: "block",
				type: "console_dbg",
			}, ],
		}
	]
};


window["workspaceConfiguration"] = {
     toolbox: blocks,
     collapse : false, 
     comments : true, 
     disable : true, 
     maxBlocks : Infinity, 
     trashcan : true, 
     horizontalLayout : true, 
     toolboxPosition : 'end',
     renderer: "zelos",
     theme: "zelos",
     grid : {
          spacing : 20, 
          length : 3, 
          colour : '#ddd', 
          snap : true
     }, 
     zoom : {
          controls : true, 
          wheel : true, 
          startScale : 1, 
          maxScale : 3, 
          minScale : 0.3, 
          scaleSpeed : 1.2
     }
}

window["blockly-workspace"] = Blockly.inject('blocklyDiv', window["workspaceConfiguration"]);

function __isArrayInArray(arr, item){
     var item_as_string = JSON.stringify(item);
   
     var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
     });
     return contains;
}

function __copyVar(v) {
     return JSON.parse(JSON.stringify(v))
}

class MazeBoard {
	constructor(board, updateCallback) {
		this.b = board;
		this.current_c = this.__getCoordinates(this.b, 2);
		this.updateCallback = (typeof updateCallback == undefined) ? null : updateCallback;
		// heading spec
		//   1
		// 4 0 2
		//   3
		// All mazes start with heading 2
		this.heading = 2;

		// board spec:
		// 0: no path
		// 1: path
		// 2: start
		// 3: end
		// 4: current pos
		// 5: legal moves
		// 6: imminent move pos -- illegal
		// 7: imminent move pos -- legal
		this.__updateState();
		/*setInterval(() => {
			this.updateHeading((this.heading + 1) % 4 ? (this.heading + 1) % 4 : 4);
			//console.log(this.heading)
		}, 1000);*/

		this.reset = function () {
			this.b = board;
			this.current_c = this.__getCoordinates(this.b, 2);
			this.heading = 2;
			this.__updateState();
		}
	}

	updateHeading(change) {
		var newHeading = this.heading+change;
		this.heading = ((newHeading % 4) ? newHeading % 4 : 4);
		this.__updateState();
	}

	move() {
		if (!this.__isNextMoveLegal()) return false;

		this.current_c = this.__getNextMovePos();
		this.__updateState();

		return true;
	}

	doesPathExist(val) {
		var expectedHeading = ((this.heading+val % 4) ? this.heading+val % 4 : 4)
		switch (expectedHeading) {
			case 1:
				return this.__isMoveLegal([this.current_c[0] - 1, this.current_c[1]]);
			case 4:
				return this.__isMoveLegal([this.current_c[0], this.current_c[1] - 1]);
			case 2:
				return this.__isMoveLegal([this.current_c[0], this.current_c[1] + 1]);
			case 3:
				return this.__isMoveLegal([this.current_c[0] + 1, this.current_c[1]]);
			}
	}

	hasFinishedMaze() {
		return this.__areArraysEqual(this.__getCoordinates(this.b, 3), this.__getCoordinates(this.current_board_state, 4));
	}

	__areArraysEqual(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;

		for (var i = 0; i < a.length; ++i) {
		  if (a[i] !== b[i]) return false;
		}
		return true;
	   }

	__isMoveLegal(expectedMove) {
		return __isArrayInArray(this.__computeLegalMoves(), expectedMove)
	}

	__getBoard() {
		return this.current_board_state
	}

	__getBoardText() {
		var textRepr = '';
		for (const row of this.current_board_state) {
			for (const e of row) {
				switch (e) {
				case 0:
					textRepr += `<span style="color: rgba(255, 255, 255, 0.25);">[${e}]</span>`;
					break;
				case 1:
					textRepr += `<span style="color: #ccc;">[${e}]</span>`;
					break;
				case 2:
					textRepr += `<span style="color: yellow;">[${e}]</span>`;
					break;
				case 3:
					textRepr += `<span style="color: green;">[${e}]</span>`;
					break;
				case 4:
					textRepr += `<span style="color: blue;">[${e}]</span>`;
					break;
				case 5:
					textRepr += `<span style="color: white;">[${e}]</span>`;
					break;
				case 6:
					textRepr += `<span style="color: red;">[${e}]</span>`;
					break;
				case 7:
					textRepr += `<span style="color: lightgreen;">[${e}]</span>`;
					break;
				}
			}
			textRepr += '<br>';
		}

		textRepr += `<br>heading ${this.heading}<br>legalMoves ${JSON.stringify(this.__computeLegalMoves())}<br>nextMove ${JSON.stringify(this.__getNextMovePos())}<br>nextMoveLegal ${this.__isNextMoveLegal()}<br>`;
		return textRepr;
	}

	__getCoordinates(array, char) {
		for (let i = 0; i < array.length; i++) {
			const i2 = array[i].indexOf(char);
			if (i2 !== -1)
				return [i, i2];
		}
		return undefined;
	}

	__computeLegalMoves() {
		var moves = [];

		//x
		if (this.b[this.current_c[0]][this.current_c[1] + 1]>0) {
			moves.push([this.current_c[0], this.current_c[1] + 1]);
		}
		if (this.b[this.current_c[0]][this.current_c[1] - 1]>0) {
			moves.push([this.current_c[0], this.current_c[1] - 1]);
		}

		//y
		if (this.b[this.current_c[0] + 1][this.current_c[1]]>0) {
			moves.push([this.current_c[0] + 1, this.current_c[1]]);
		}
		if (this.b[this.current_c[0] - 1][this.current_c[1]]>0) {
			moves.push([this.current_c[0] - 1, this.current_c[1]]);
		}
		//console.log(this.b, this.current_board_state, moves)
		return moves;
	}

	__isNextMoveLegal() {
		if (__isArrayInArray(this.__computeLegalMoves(), this.__getNextMovePos())) {
			return true;
		} else {
			return false;
		}
	}

	__getNextMovePos() {
		switch (this.heading) {
		case 0:
			return [this.current_c[0], this.current_c[1]];
		case 1:
			return [this.current_c[0] - 1, this.current_c[1]];
		case 4:
			return [this.current_c[0], this.current_c[1] - 1];
		case 2:
			return [this.current_c[0], this.current_c[1] + 1];
		case 3:
			return [this.current_c[0] + 1, this.current_c[1]];
		}
	}

	__updateState() {
		this.current_board_state = __copyVar(this.b);
		this.current_board_state[this.current_c[0]][this.current_c[1]] = 4;
		this.__computeLegalMoves().forEach(element => {
			this.current_board_state[element[0]][element[1]] = 5;
		});
		if (!this.__isNextMoveLegal()) {
			this.current_board_state[this.__getNextMovePos()[0]][this.__getNextMovePos()[1]] = 6;
		} else {
			this.current_board_state[this.__getNextMovePos()[0]][this.__getNextMovePos()[1]] = 7;
		}
		

		if (this.updateCallback) {
			this.updateCallback();
		}
	}
}

var div=document.getElementById("canvasDiv")
var canvas = document.createElement('canvas');
canvas.id = "jam-canvas"
canvas.height = window.innerHeight
canvas.width = window.innerWidth/2
div.appendChild(canvas); 
