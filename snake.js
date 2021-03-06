(function () {

    /* initialize variables */
    var lastCode;
    var interval;
    var rows = 10;
    var cols = 10;
    //var posX = 0;
    //var posY = 0;
    var snake = {posX : 0,
                 posY : 0,
                 moveTo : function(x,y){
                        this.posX = x;
                        this.posY = y;
                 }};

    var snake2 = {posX : 7,
                  posY : 7,
                  moveTo : function(x,y){
                  this.posX = x;
                  this.posY = y;
        }};



    $(document).on('DOMContentLoaded', loaded);
    $(window).on('keydown', keyDown);

    function loaded() {
        movePixel();
        $('#score').text(100);
    }

    function keyDown(e) {

        if (interval && lastCode != e.keyCode) clearInterval(interval);

        if (lastCode != e.keyCode) {
            interval = setInterval(function () {
                keyAction(e);
            }, 80);
        }

        lastCode = e.keyCode;
    }

    function keyAction(e) {
        switch (e.keyCode) {
            case 37: snake.moveTo(snake.posX-1,snake.posY); break;
            case 38: snake.moveTo(snake.posX,snake.posY-1); break;
            case 39: snake.moveTo(snake.posX+1,snake.posY); break;
            case 40: snake.moveTo(snake.posX,snake.posY+1); break;
        }

        snake.posY = snake.posY > rows ? 0 : snake.posY < 0 ? rows - 1 : snake.posY;
        snake.posX = snake.posX > cols ? 0 : snake.posX < 0 ? cols - 1 :snake. posX;

        movePixel();
    }

    function movePixel() {
        matrix = initMatrix(rows, cols, snake.posX, snake.posY,snake2.posX,snake2.posY);
        drawMatrix(rows, cols, matrix);
    }

    function drawMatrix(rows, cols, matrix) {
        var stage = $('#stage').html('');
        for (var r = 0; r < rows; r += 1) {
            var row = $('<div class="row"></div>').appendTo(stage);
            for (var c = 0; c < cols; c += 1) {
                var col = $('<div class="col"></div>').appendTo(row);
                if (matrix[r][c] == true) {
                    col.addClass('black');
                }
            }
        }
    }

    function initMatrix(rows, cols, posX,posY,posX2,posY2) {
        var matrix = [];
        for (var r = 0; r < rows; r++) {
            var row = [];
            for (var c = 0; c < cols; c++) {
                row.push((r == posY && c == posX) || (r == posY2 && c == posX2)? true : false);
            }
            matrix.push(row);
        }
        return matrix;
    }

})()