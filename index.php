<!DOCTYPE html>
<!--
- Copyright (C) 2012 David Geary. This code is from the book
- Core HTML5 Canvas, published by Prentice-Hall in 2012.
-
- License:
-
- Permission is hereby granted, free of charge, to any person 
- obtaining a copy of this software and associated documentation files
- (the "Software"), to deal in the Software without restriction,
- including without limitation the rights to use, copy, modify, merge,
- publish, distribute, sublicense, and/or sell copies of the Software,
- and to permit persons to whom the Software is furnished to do so,
- subject to the following conditions:
-
- The above copyright notice and this permission notice shall be
- included in all copies or substantial portions of the Software.
-
- The Software may not be used to create training material of any sort,
- including courses, books, instructional videos, presentations, etc.
- without the express written consent of David Geary.
-
- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
- EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
- OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
- NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
- HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
- WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
- FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
- OTHER DEALINGS IN THE SOFTWARE.
-->

<html>
   <head>
     <title>Combining sprite behaviors</title>

      <style> 
         body {
            background: #dddddd;
         }

         #canvas {
            position: absolute;
            left: 0px;
            top: 20px;
            margin: 20px;
            background: #ffffff;
            border: thin inset rgba(100,150,230,0.5);
         }
      </style>
   </head>

  <body>
    <canvas id='canvas' width='1000' height='440'>
      Canvas not supported
    </canvas>
		<script src='js/stopwatch.js'></script>
    <script src='js/animationTimer.js'></script>
		<script src='js/requestNextAnimationFrame.js'></script>
    <script src='js/sprites.js'></script>
		<script src='player.js'></script>
		<script src='control.js'></script>
		<script src='background.js'></script>
    <script src='main.js'></script>		
  </body>
</html>
