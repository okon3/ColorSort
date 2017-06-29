$(document).ready(function () {
	colorSort.init();
});

var colorSort = {
	config: {
		size: 300 //Size in px
		, ms: 1
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
				colorSort.matrix[i][j] = new Array(Math.floor(Math.random() * 256)
					, Math.floor(Math.random() * 256)
					, Math.floor(Math.random() * 256));
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
		console.log("UPDATE");
	},
	startSort: function () {
		console.log("START SORT");
		colorSort.initSort();
		for (var i = 0; i < colorSort.config.size; i++) {
			colorSort.startTimer(i);
		}
		setInterval(function () {
			colorSort.update();
		}, colorSort.config.ms);
	},
	initSort: function () {
		colorSort.progress = new Array(colorSort.config.size);
		for (var i = 0; i < colorSort.config.size; i++) {
			colorSort.progress[i] = [];
			colorSort.progress[i][0] = 0; //progress
			colorSort.progress[i][1] = false; //swapped
			colorSort.progress[i][2] = 0; //interval
		}
	},
	startTimer: function (i) {
		colorSort.progress[i][2] = setInterval(function () {
			colorSort.bubbleSort(i);
		}, colorSort.config.ms);
	},
	bubbleSort: function (row) {
		var i = colorSort.progress[row][0];
		var hsl1 = colorSort.rgbToHsl(colorSort.matrix[row][i][0]
			, colorSort.matrix[row][i][1]
			, colorSort.matrix[row][i][2])[0];
		var hsl2 = colorSort.rgbToHsl(colorSort.matrix[row][i+1][0]
			, colorSort.matrix[row][i+1][1]
			, colorSort.matrix[row][i+1][2])[0];

		if (hsl1 > hsl2) {
			var temp = colorSort.matrix[row][i].slice(0);
			colorSort.matrix[row][i] = colorSort.matrix[row][i + 1].slice(0);
			colorSort.matrix[row][i + 1] = temp.slice(0);
			colorSort.progress[row][1] = true;
		}

		colorSort.progress[row][0] = colorSort.progress[row][0] + 1;

		if (i >= (colorSort.config.size - 2)) {
			if (colorSort.progress[row][1] === true) {
				colorSort.progress[row][0] = 0;
				colorSort.progress[row][1] = false
			} else {
				clearInterval(colorSort.progress[i][2]);
			}
		}
	},
	rgbToHsl: function (r, g, b) {
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h, s, l];
	}
}