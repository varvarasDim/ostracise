<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2113.4">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
    span.Apple-tab-span {white-space:pre}
  </style>
</head>
<body>
<p class="p1">$(document).ready(function(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>$('#newGame').modal(</p>
<p class="p1"><span class="Apple-converted-space">    </span>{'dismissible': false});</p>
<p class="p1"><span class="Apple-converted-space">  </span>$('#newGame').modal('open');</p>
<p class="p1"><span class="Apple-converted-space">  </span>$("#newGameBtn").focus()<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-tab-span">	</span>loadHighScores();</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>let highScoreMin;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>function loadHighScores() {</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>$.ajax({</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>url: 'https://api.mlab.com/api/1/databases/tetrishighscores/collections/scores?s={"score":-1}&amp;apiKey=E8dx03lqLdc5pG_K002t_lJrPOwDi1vG',</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>type: "GET",</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>success: (data) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">        </span>let scoreLog = `&lt;p class="score-title"&gt;&lt;u&gt;High Scores:&lt;/u&gt;&lt;/p&gt;`;</p>
<p class="p1"><span class="Apple-converted-space">        </span>highScoreMin = data[10].score;</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>for(var i = 0; i &lt;= 10; i++){</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>scoreLog += `&lt;p&gt;${data[i].name.slice(0, 7)}: ${data[i].score}&lt;/p&gt;`;</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>}</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>$('.highScores').html(scoreLog);</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>},</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>error: (xhr, status, err) =&gt; {</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>console.log(err);</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>}</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>});</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><span class="Apple-converted-space">  </span></p>
<p class="p1">let pause = true;</p>
<p class="p2"><br></p>
<p class="p1">const canvas = document.querySelector('.tetris');</p>
<p class="p1">const context = canvas.getContext('2d');</p>
<p class="p2"><br></p>
<p class="p1">const nextCanvas = document.querySelector('.next');</p>
<p class="p1">const nextContext = nextCanvas.getContext('2d');</p>
<p class="p2"><br></p>
<p class="p1">context.scale(20, 20);</p>
<p class="p1">nextContext.scale(30, 30);</p>
<p class="p2"><br></p>
<p class="p1">const arena = createMatrix(12, 20);</p>
<p class="p1">const nextArena = createMatrix(6, 6);</p>
<p class="p2"><br></p>
<p class="p1">const player = {</p>
<p class="p1"><span class="Apple-converted-space">  </span>pos: {x: 0, y: 0},</p>
<p class="p1"><span class="Apple-converted-space">  </span>matrix: null,</p>
<p class="p1"><span class="Apple-converted-space">  </span>score: 0,</p>
<p class="p1"><span class="Apple-converted-space">  </span>level: 1,</p>
<p class="p1"><span class="Apple-converted-space">  </span>dropInterval: 1000,</p>
<p class="p1"><span class="Apple-converted-space">  </span>DROP_SLOW: 100,</p>
<p class="p1"><span class="Apple-converted-space">  </span>next: null,</p>
<p class="p1">};</p>
<p class="p2"><br></p>
<p class="p1">let dropCounter = 0;</p>
<p class="p1">let DROP_FAST = 50;</p>
<p class="p2"><br></p>
<p class="p1">function arenaSweep(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>let rowCount = 1;</p>
<p class="p1"><span class="Apple-converted-space">  </span>outer: for(y=arena.length - 1; y &gt; 0; y--){</p>
<p class="p1"><span class="Apple-converted-space">    </span>for(x=0; x &lt; arena[y].length; x++){</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(arena[y][x] === 0) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>continue outer;</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>const row = arena.splice(y, 1)[0].fill(0);</p>
<p class="p1"><span class="Apple-converted-space">    </span>arena.unshift(row);</p>
<p class="p1"><span class="Apple-converted-space">    </span>y++;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>player.score += rowCount * 100;</p>
<p class="p1"><span class="Apple-converted-space">    </span>rowCount *= 2;</p>
<p class="p1"><span class="Apple-converted-space">    </span>let scoreStr = player.score.toString();</p>
<p class="p1"><span class="Apple-converted-space">    </span>if(scoreStr.length &gt; 3){</p>
<p class="p1"><span class="Apple-converted-space">      </span>let num = Number(scoreStr.slice(0, scoreStr.length - 3));</p>
<p class="p1"><span class="Apple-converted-space">      </span>player.level = num + 1;</p>
<p class="p1"><span class="Apple-converted-space">      </span>player.dropInterval = 1000 - (num * 50);</p>
<p class="p1"><span class="Apple-converted-space">      </span>player.DROP_SLOW = 1000 - (num * 50);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function collide(arena, player){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [m, o] = [player.matrix, player.pos];</p>
<p class="p1"><span class="Apple-converted-space">  </span>for(y=0; y&lt;m.length; y++){</p>
<p class="p1"><span class="Apple-converted-space">    </span>for(x=0; x &lt; m[y].length; x++){</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(m[y][x] !== 0 &amp;&amp; ( arena[y + o.y] &amp;&amp; arena[y + o.y][x + o.x]) !== 0){</p>
<p class="p1"><span class="Apple-converted-space">        </span>return true;</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>return false;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function createMatrix(w, h){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const matrix = [];</p>
<p class="p1"><span class="Apple-converted-space">  </span>while(h--){</p>
<p class="p1"><span class="Apple-converted-space">    </span>matrix.push(new Array(w).fill(0));</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>return matrix;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function createPiece(type){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (type === 'I'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>return [</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 1, 0, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 1, 0, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 1, 0, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 1, 0, 0]</p>
<p class="p1"><span class="Apple-converted-space">    </span>];</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else if (type === 'J'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>return [</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 2, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 2, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[2, 2, 0]</p>
<p class="p1"><span class="Apple-converted-space">    </span>];</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else if (type === 'L'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>return [</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 3, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 3, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 3, 3]</p>
<p class="p1"><span class="Apple-converted-space">    </span>];</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else if (type === 'O'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>return [</p>
<p class="p1"><span class="Apple-converted-space">      </span>[4,4],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[4,4]</p>
<p class="p1"><span class="Apple-converted-space">    </span>];</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else if (type === 'S'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>return [</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 5, 5],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[5, 5, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 0, 0]</p>
<p class="p1"><span class="Apple-converted-space">    </span>];</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (type === 'T'){</p>
<p class="p1"><span class="Apple-converted-space">      </span>return [</p>
<p class="p1"><span class="Apple-converted-space">        </span>[0, 0, 0],</p>
<p class="p1"><span class="Apple-converted-space">        </span>[6, 6, 6],</p>
<p class="p1"><span class="Apple-converted-space">        </span>[0, 6, 0]</p>
<p class="p1"><span class="Apple-converted-space">      </span>];</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else if (type === 'Z'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>return [</p>
<p class="p1"><span class="Apple-converted-space">      </span>[7, 7, 0],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 7, 7],</p>
<p class="p1"><span class="Apple-converted-space">      </span>[0, 0, 0]</p>
<p class="p1"><span class="Apple-converted-space">    </span>];</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function drawNext(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>nextContext.fillStyle = '#000';</p>
<p class="p1"><span class="Apple-converted-space">  </span>nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);<span class="Apple-converted-space"> </span></p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>drawMatrix(nextArena, {x: 0, y:0}, nextContext);</p>
<p class="p1"><span class="Apple-converted-space">  </span>drawMatrix(player.next, {x: 1, y: 1}, nextContext);</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function draw(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>context.fillStyle = '#000';</p>
<p class="p1"><span class="Apple-converted-space">  </span>context.fillRect(0, 0, canvas.width, canvas.height);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>drawMatrix(arena, {x: 0, y: 0}, context);</p>
<p class="p1"><span class="Apple-converted-space">  </span>drawMatrix(player.matrix, player.pos, context);</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function drawMatrix(mat, offset, cont){</p>
<p class="p1"><span class="Apple-converted-space">  </span>mat.forEach((row, y) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>row.forEach((value, x) =&gt;{</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(value !== 0){</p>
<p class="p1"><span class="Apple-converted-space">        </span>cont.fillStyle = colors[value];</p>
<p class="p1"><span class="Apple-converted-space">        </span>cont.fillRect(x + offset.x, y + offset.y, 1, 1);</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function merge(arena, player){</p>
<p class="p1"><span class="Apple-converted-space">  </span>player.matrix.forEach((row, y) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>row.forEach((value, x) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(value !== 0){</p>
<p class="p1"><span class="Apple-converted-space">        </span>arena[y + player.pos.y][x + player.pos.x] = value;</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function playerDrop(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>player.pos.y++;</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(collide(arena, player)){</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.pos.y--;</p>
<p class="p1"><span class="Apple-converted-space">    </span>merge(arena, player);</p>
<p class="p1"><span class="Apple-converted-space">    </span>playerReset();</p>
<p class="p1"><span class="Apple-converted-space">    </span>arenaSweep();</p>
<p class="p1"><span class="Apple-converted-space">    </span>updateScore();</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>dropCounter = 0;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function playerMove(dir){</p>
<p class="p1"><span class="Apple-converted-space">  </span>player.pos.x += dir;</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(collide(arena, player)){</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.pos.x -= dir;</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function playerReset(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const pieces = 'IJLOSTZ';</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(player.next === null){</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.next = createPiece(pieces[pieces.length * Math.random() | 0]);</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.matrix = player.next;</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.next = createPiece(pieces[pieces.length * Math.random() | 0]);</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>drawNext();</p>
<p class="p1"><span class="Apple-converted-space">  </span>player.pos.y = 0;</p>
<p class="p1"><span class="Apple-converted-space">  </span>player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(collide(arena, player)){</p>
<p class="p1"><span class="Apple-converted-space">    </span>pauseGame();</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.removeEventListener('keydown', keyListener);</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.removeEventListener('keyup', keyListener);</p>
<p class="p1"><span class="Apple-converted-space">    </span>// clearPlayer();</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function clearPlayer(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>player.dropInterval = 1000;</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.DROP_SLOW = 1000;</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.score = 0;</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.level = 1;</p>
<p class="p1"><span class="Apple-converted-space">    </span>arena.forEach(row =&gt; row.fill(0));</p>
<p class="p1"><span class="Apple-converted-space">    </span>updateScore();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function playerRotate(dir){</p>
<p class="p1"><span class="Apple-converted-space">  </span>const pos = player.pos.x</p>
<p class="p1"><span class="Apple-converted-space">  </span>let offset = 1;</p>
<p class="p1"><span class="Apple-converted-space">  </span>rotate(player.matrix, dir);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>while(collide(arena, player)){</p>
<p class="p1"><span class="Apple-converted-space">    </span>player.pos.x += offset;</p>
<p class="p1"><span class="Apple-converted-space">    </span>offset = -(offset + (offset &gt; 0 ? 1 : -1));</p>
<p class="p1"><span class="Apple-converted-space">    </span>if(offset &gt; player.matrix[0].length) {</p>
<p class="p1"><span class="Apple-converted-space">      </span>rotate(player.matrix, -dir);</p>
<p class="p1"><span class="Apple-converted-space">      </span>player.pos.x = pos;</p>
<p class="p1"><span class="Apple-converted-space">      </span>return;</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function rotate(matrix, dir){</p>
<p class="p1"><span class="Apple-converted-space">  </span>for(y=0; y &lt; matrix.length; y++){</p>
<p class="p1"><span class="Apple-converted-space">    </span>for(x=0; x &lt; y; x++){</p>
<p class="p1"><span class="Apple-converted-space">      </span>[ matrix[x][y], matrix[y][x], ] = [ matrix[y][x], matrix[x][y], ];</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(dir &gt; 0){</p>
<p class="p1"><span class="Apple-converted-space">    </span>matrix.forEach(row =&gt; row.reverse());</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">    </span>matrix.reverse();</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">let lastTime = 0;</p>
<p class="p1">function update(time = 0){</p>
<p class="p1"><span class="Apple-converted-space">  </span>$('#pause').off();</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(!pause){</p>
<p class="p1"><span class="Apple-converted-space">    </span>const deltaTime = time - lastTime;</p>
<p class="p1"><span class="Apple-converted-space">    </span>lastTime = time;</p>
<p class="p1"><span class="Apple-converted-space">    </span>dropCounter += deltaTime;</p>
<p class="p1"><span class="Apple-converted-space">    </span>if(dropCounter &gt; player.dropInterval) {</p>
<p class="p1"><span class="Apple-converted-space">      </span>playerDrop();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>draw();</p>
<p class="p1"><span class="Apple-converted-space">    </span>requestAnimationFrame(update);</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">      </span>draw();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function updateScore(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>document.querySelector('.score').innerHTML = `&lt;p&gt;&lt;b&gt;&lt;u&gt;Score:&lt;/u&gt; ${player.score}&lt;/b&gt;&lt;/p&gt;`;</p>
<p class="p1"><span class="Apple-converted-space">  </span>document.querySelector('.level').innerHTML = `&lt;p&gt;&lt;b&gt;&lt;u&gt;Level:&lt;/u&gt; ${player.level}&lt;/b&gt;&lt;/p&gt;`;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">const colors = [</p>
<p class="p1"><span class="Apple-converted-space">  </span>null,<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>'#03A9F4',//I</p>
<p class="p1"><span class="Apple-converted-space">  </span>'#9C27B0',//J</p>
<p class="p1"><span class="Apple-converted-space">  </span>'#FFC107',//L</p>
<p class="p1"><span class="Apple-converted-space">  </span>'#E91E63',//O</p>
<p class="p1"><span class="Apple-converted-space">  </span>'#00BCD4',//S<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>'#8BC34A',//T</p>
<p class="p1"><span class="Apple-converted-space">  </span>'#3F51B5'//Z</p>
<p class="p1">];</p>
<p class="p2"><br></p>
<p class="p1">function keyListener(e){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(e.type === 'keydown'){</p>
<p class="p1"><span class="Apple-converted-space">    </span>if(e.keyCode === 37){</p>
<p class="p1"><span class="Apple-converted-space">      </span>playerMove(-1)</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if(e.keyCode === 39){</p>
<p class="p1"><span class="Apple-converted-space">      </span>playerMove(1);</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if(e.keyCode === 81){</p>
<p class="p1"><span class="Apple-converted-space">      </span>playerRotate(-1);</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if(e.keyCode === 87 || e.keyCode === 38){</p>
<p class="p1"><span class="Apple-converted-space">      </span>playerRotate(1);</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if(e.keyCode === 27){</p>
<p class="p1"><span class="Apple-converted-space">      </span>pauseGame();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>if (e.keyCode === 40) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (e.type === 'keydown') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (player.dropInterval !== DROP_FAST) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>playerDrop();</p>
<p class="p1"><span class="Apple-converted-space">            </span>player.dropInterval = DROP_FAST;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">        </span>player.dropInterval = player.DROP_SLOW;</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">};</p>
<p class="p2"><br></p>
<p class="p1">function pauseGame(){</p>
<p class="p1"><span class="Apple-converted-space">  </span>if(pause === true){<span class="Apple-tab-span">	</span></p>
<p class="p1"><span class="Apple-converted-space">    </span>pause = false;<span class="Apple-tab-span">	</span></p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#pause').modal({"onCloseStart": update() });</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#pause').modal('close');</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if(collide(arena, player)){</p>
<p class="p1"><span class="Apple-converted-space">      </span>pause = true;</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(player.score &gt; 0){</p>
<p class="p1"><span class="Apple-converted-space">      </span>$('#gameOver').modal({</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>'dismissible': false,</p>
<p class="p1"><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span><span class="Apple-tab-span">	</span>"onOpenEnd": function(){ $('#name').focus(); }<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">      </span>});</p>
<p class="p1"><span class="Apple-converted-space">      </span>$('#gameOver').modal('open');</p>
<p class="p1"><span class="Apple-converted-space">      </span>$('.yourScore').html(`&lt;p&gt;Your Score: ${player.score}`)</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">      </span>$('#newGame').modal({'dismissible': false});</p>
<p class="p1"><span class="Apple-converted-space">      </span>$('#newGame').modal('open');<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">      </span>pause = true;</p>
<p class="p1"><span class="Apple-converted-space">      </span>document.createEventListener</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#pause').modal({</p>
<p class="p1"><span class="Apple-converted-space">      </span>"dismissible": false,</p>
<p class="p1"><span class="Apple-converted-space">      </span>"onCloseStart": update() });</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#pause').modal('open');<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>$("#pauseBtn").focus();<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>$('body').on('keydown', (e)=&gt;{</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(e.keyCode === 39){</p>
<p class="p1"><span class="Apple-converted-space">        </span>$('#StartNewBtn').focus();</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">      </span>if(e.keyCode === 37){</p>
<p class="p1"><span class="Apple-converted-space">        </span>$("#pauseBtn").focus();<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>})</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function newGame(){</p>
<p class="p1"><span class="Apple-tab-span">	</span>loadHighScores();</p>
<p class="p1"><span class="Apple-converted-space">  </span>clearPlayer();</p>
<p class="p1"><span class="Apple-converted-space">  </span>pause = false;</p>
<p class="p1"><span class="Apple-converted-space">  </span>playerReset();</p>
<p class="p1"><span class="Apple-converted-space">  </span>update();</p>
<p class="p1"><span class="Apple-converted-space">  </span>updateScore(); <span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>document.addEventListener('keydown', keyListener);</p>
<p class="p1"><span class="Apple-converted-space">  </span>document.addEventListener('keyup', keyListener);</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">$('#highScore').on('submit', (e) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>e.preventDefault();</p>
<p class="p1"><span class="Apple-converted-space">  </span>let name = $('#name').val();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>$.ajax({</p>
<p class="p1"><span class="Apple-converted-space">    </span>url: 'https://api.mlab.com/api/1/databases/tetrishighscores/collections/scores?apiKey=E8dx03lqLdc5pG_K002t_lJrPOwDi1vG',</p>
<p class="p1"><span class="Apple-converted-space">    </span>data: JSON.stringify({</p>
<p class="p1"><span class="Apple-converted-space">      </span>"date": new Date,</p>
<p class="p1"><span class="Apple-converted-space">      </span>"name": name,</p>
<p class="p1"><span class="Apple-converted-space">      </span>"score": player.score,</p>
<p class="p1"><span class="Apple-converted-space">      </span>"level": player.level</p>
<p class="p1"><span class="Apple-converted-space">    </span>}),</p>
<p class="p1"><span class="Apple-converted-space">    </span>type: "POST",</p>
<p class="p1"><span class="Apple-converted-space">    </span>contentType: "application/json",</p>
<p class="p1"><span class="Apple-converted-space">    </span>success: (data) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>$('#highScore').html( '&lt;h4&gt;Thank You!&lt;/h4&gt;' );</p>
<p class="p1"><span class="Apple-converted-space">    </span>},</p>
<p class="p1"><span class="Apple-converted-space">    </span>error: (xhr, status, err) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>console.log(err);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">}); <span class="Apple-converted-space">   </span></p>
<p class="p2"><br></p>
<p class="p1">update();</p>
<p class="p2"><br></p>
</body>
</html>
