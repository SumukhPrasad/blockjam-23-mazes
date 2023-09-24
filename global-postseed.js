var cmaze = new MazeBoard(window["jam-map"]);
workspace=window["blockly-workspace"]

function drawCanvas() {
	var c = document.getElementById("jam-canvas");
	var ctx = c.getContext("2d");
     ctx.fillStyle = "#3f9b0b";
	ctx.fillRect(0, 0, c.width, c.height);
	for (let i_raw = 0; i_raw < cmaze.b.length; i_raw++) {
		const row = cmaze.b[i_raw];
		for (let j_raw = 0; j_raw < row.length; j_raw++) {
			const tile = row[j_raw];
			
               const i = ((c.height-(cmaze.b.length*50))/2)+i_raw*50;
               const j = ((c.width-(row.length*50))/2)+j_raw*50;

			ctx.fillStyle = [
				"transparent", 
				"#d4bb7e", 
				"#d4bb7e",
				"#d4bb7e"][tile];
			ctx.fillRect((j)+5, (i)+5, 40, 40);
			if (tile==2) {
				ctx.beginPath();
				ctx.arc((j)+25, (i)+25, 10, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'gray';
				ctx.fill();
				ctx.lineWidth = 5;
				ctx.strokeStyle = '#555';
				ctx.stroke();
			}
               if (tile==3) {
				ctx.beginPath();
				ctx.arc((j)+25, (i)+25, 10, 0, 2 * Math.PI, false);
				ctx.fillStyle = '#faa';
				ctx.fill();
				ctx.lineWidth = 5;
				ctx.strokeStyle = '#f22';
				ctx.stroke();
			}
		}
	}

     for (let i_raw = 0; i_raw < cmaze.__getBoard().length; i_raw++) {
		const row = cmaze.__getBoard()[i_raw];
		for (let j_raw = 0; j_raw < row.length; j_raw++) {
			const tile = row[j_raw];
			
               const i = ((c.height-(cmaze.b.length*50))/2)+i_raw*50;
               const j = ((c.width-(row.length*50))/2)+j_raw*50;
               
			if (tile==4) {
				ctx.beginPath();
				ctx.arc((j)+25, (i)+25, 10, 0, 2 * Math.PI, false);
				ctx.fillStyle = '#0077ff';
				ctx.fill();
				ctx.lineWidth = 5;
				ctx.strokeStyle = '#006cff';
				ctx.stroke();


				ctx.fillStyle = '#fff';
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#006cff';
                    switch (cmaze.heading) {
                         case 1:
                              ctx.beginPath();
                              ctx.moveTo((j)+25, (i)+10); // top
                              ctx.lineTo((j)+15, (i)+40); // bottom left
                              ctx.lineTo((j)+25, (i)+35); // bottom center
                              ctx.lineTo((j)+35, (i)+40); // bottom right
                              ctx.lineTo((j)+25, (i)+10); // top
                              ctx.fill();
                              ctx.stroke();
                              break;
                         case 2:
                              ctx.beginPath();
                              ctx.moveTo((j)+40, (i)+25); // top
                              ctx.lineTo((j)+10, (i)+15); // bottom left
                              ctx.lineTo((j)+15, (i)+25); // bottom center
                              ctx.lineTo((j)+10, (i)+35); // bottom right
                              ctx.lineTo((j)+40, (i)+25); // top
                              ctx.fill();
                              ctx.stroke();
                              break;
                         case 3:     
                              ctx.beginPath();
                              ctx.moveTo((j)+25, (i)+40); // top
                              ctx.lineTo((j)+15, (i)+10); // bottom left
                              ctx.lineTo((j)+25, (i)+15); // bottom center
                              ctx.lineTo((j)+35, (i)+10); // bottom right
                              ctx.lineTo((j)+25, (i)+40); // top
                              ctx.fill();
                              ctx.stroke();
                              break;
                         case 4:
                              ctx.beginPath();
                              ctx.moveTo((j)+10, (i)+25); // top
                              ctx.lineTo((j)+40, (i)+15); // bottom left
                              ctx.lineTo((j)+35, (i)+25); // bottom center
                              ctx.lineTo((j)+40, (i)+35); // bottom right
                              ctx.lineTo((j)+10, (i)+25); // top
                              ctx.fill();
                              ctx.stroke();
                              break;
                    }
			}
		}
	}
	ctx.stroke();
}

cmaze.updateCallback = drawCanvas;
drawCanvas();
window.globalMazeObject = cmaze;

let code = "";
javascriptGenerator.STATEMENT_PREFIX = 'window.highlightBlock(%1);\n';
javascriptGenerator.addReservedWords('highlightBlock');
javascriptGenerator.addReservedWords('code');
window.LoopTrap = 10;
javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

function highlightBlock(id) {
     workspace.highlightBlock(id);
}

function onChange() {
     if (workspace.isDragging()) return; // Don't update while changes are happening.
     try {
          code = javascriptGenerator.workspaceToCode(workspace);
          //var jsInterpreterObj = new acorn.Interpreter(code);
          //jsInterpreterObj.run();
     } catch (_err) {
          // Happens e.g. when deleting a function that is used somewhere.
          // Blockly will quickly recover from this, so it's not a big deal.
          // Just make sure the app doesn't crash until then.
          console.log(_err);
     }
}

var runningInterval;

workspace.addChangeListener(onChange);

function execute() {
     try {
          var running = false;
          workspace.highlightBlock(null);
          var lastBlockToHighlight = null;

          var jsInterpreterObj = new Interpreter(code, (interpreter, scope) => {
               interpreter.setProperty(
                    scope, 'highlightBlock',
                         interpreter.createNativeFunction(id => {
                              id = id ? id.toString() : '';
                              running = false;
                              workspace.highlightBlock(lastBlockToHighlight);
                              lastBlockToHighlight = id;
                         })
               );
               interpreter.setProperty(
                    scope, 'dbg_print',
                         interpreter.createNativeFunction(val => {
                              val = val ? val.toString() : '';
                              console.log(val);
                         })
               );
               
               //maze fns
               interpreter.setProperty(
                    scope, 'updateHeading',
                         interpreter.createNativeFunction(val => {
                              val = val ? val : '';
                              cmaze.updateHeading(val);
                         })
               );
               interpreter.setProperty(
                    scope, 'move',
                         interpreter.createNativeFunction(val => {
                              cmaze.move(val);
                         })
               );
     
               interpreter.setProperty(
                    scope, 'path_ahead_exists',
                         interpreter.createNativeFunction(val => {
                              return cmaze.doesPathExist(0);
                         })
               );
     
               interpreter.setProperty(
                    scope, 'path_to_right_exists',
                         interpreter.createNativeFunction(val => {
                              return cmaze.doesPathExist(1);
                         })
               );
     
               interpreter.setProperty(
                    scope, 'path_to_left_exists',
                         interpreter.createNativeFunction(val => {
                              return cmaze.doesPathExist(-1);
                         })
               );
     
               interpreter.setProperty(
                    scope, 'has_reached_destination',
                         interpreter.createNativeFunction(val => {
                              return cmaze.hasFinishedMaze();
                         })
               );
          });

          runningInterval = setInterval(() => {
               running = true;
               while (running) {
                    if (!jsInterpreterObj.step()) {
                         workspace.highlightBlock(lastBlockToHighlight);
                         clearInterval(runningInterval);
                         setTimeout(() => {
                              if (cmaze.hasFinishedMaze()) {
                                   
                                   var finisheddiv = document.createElement('div');
                                   finisheddiv.classList.add("submitted-notification")
                                   finisheddiv.innerHTML = `Yay! You've completed this maze! <a href="${window["heat-path"]}"><span style=\"font-weight: 300; margin-left: 20px\">View other questions</span></a>`
                                   document.body.appendChild(finisheddiv)


                                   document.getElementById("submission-form").submit()
                              }
                         }, 100);
                         setTimeout(() => {
                              workspace.highlightBlock(null);
                         }, 1000);
                         return;
                    }
               }
          }, 250);
     } catch (_err) {
          console.error(_err);
          window.alert('CATASTROPHIC ERROR!\n'+_err)
     }
}


function run() {
     cmaze.reset()
     execute();
}


var div=document.getElementById("canvasDiv")
var buttonsdiv = document.createElement('div');
buttonsdiv.style = "position : absolute; top: 20px; right: 20px; padding:0;"

var runbutton = document.createElement('button');
runbutton.classList.add("action-button")
runbutton.innerText = "Run blocks"
runbutton.style="color:green;"
runbutton.onclick = run;
var stopbutton = document.createElement('button');
stopbutton.classList.add("action-button")
stopbutton.innerText = "🛑"
stopbutton.onclick = function () {clearInterval(runningInterval);setTimeout(() => {workspace.highlightBlock(null);}, 1000);};

buttonsdiv.appendChild(runbutton)
buttonsdiv.appendChild(stopbutton)


div.appendChild(buttonsdiv)