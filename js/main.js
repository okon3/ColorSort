$(document).ready(function () {
	colorSort.init();
});

var colorSort = {
	config: {
		size: 200 //Size in px
	},
	/**
	 * Init function
	 */
	init: function () {
		colorSort.initCanvas(colorSort.config.size, colorSort.config.size); //Square
		colorSort.initMatrix(colorSort.config.size, colorSort.config.size);
		colorSort.update();
	},
	initCanvas: function (w, h) {
		var canvas = $('<canvas id="canvas"/>').prop({
			width: w,
			height: h
		});
		$('.container').prepend(canvas);

		colorSort.ctx = document.getElementById('canvas').getContext('2d');
	},
	initMatrix: function (w, h) {
		colorSort.matrix = new Array(h);
		for (var i = 0; i < h; i++) {
			colorSort.matrix[i] = new Array(w);
			for (var j = 0; j < colorSort.matrix[i].length; j++) {
				colorSort.matrix[i][j] = new Array(		Math.floor(Math.random() * 256)
													,	Math.floor(Math.random() * 256)
													,	Math.floor(Math.random() * 256));
			}
		}
	},
	update: function () {
		var myImageData = colorSort.ctx.createImageData(colorSort.config.size, colorSort.config.size);
		for (var i = 0; i < colorSort.config.size; i++) {
			for (var j = 0; j < colorSort.config.size; j++) {
				var imageDataIndex = 4 * j + 4 * i * colorSort.config.size;
				myImageData.data[imageDataIndex + 0] = colorSort.matrix[i][j][0];
				myImageData.data[imageDataIndex + 1] = colorSort.matrix[i][j][1];
				myImageData.data[imageDataIndex + 2] = colorSort.matrix[i][j][2];
				myImageData.data[imageDataIndex + 3] = 255;
			}
		}
		colorSort.ctx.putImageData(myImageData, 0, 0);
	}
}