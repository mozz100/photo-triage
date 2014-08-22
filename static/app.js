$(function() {
    var allJpegs;
    var photo = $('#photo');
    var photo1 = $('#photonext1'), photo2 = $('#photonext2');
    var caption = $('#caption');
    var winHeight;

    function setSize() {
        winHeight = $(window).height();
        photo.css("max-height", winHeight - 50 + 'px');

    }
    setSize();
    $(window).resize(setSize);

    var index = 0;
    function getUrl(i) {
        return '/h:' + Math.min(800, winHeight - 50) + '/' + allJpegs[i].fname;
    }
    function setPhoto(i) {
        index = i;
        photo.attr('src', getUrl(i));
        // preload next couple of images
        if (i < allJpegs.length - 2) {
            photo1.attr('src', getUrl(i+1));
        }
        if (i < allJpegs.length - 3) {
            photo2.attr('src', getUrl(i+2));
        }

        var txt = index+1 + ' of ' + allJpegs.length;
        if (allJpegs[i].rating) {
            txt += ' (' + new Array( allJpegs[i].rating + 1 ).join('*') + ')';
        } 
        caption.text(txt);
    };

    function left() {
        index -= 1;
        if (index < 0) {
            index = allJpegs.length - 1;
        }
        setPhoto(index);
    };
    function right() {
        index += 1;
        if (index >= allJpegs.length) {
            index = 0;
        }
        setPhoto(index);
    };
    function up() {
        // inc rating by 1
        rate(Math.min(3, allJpegs[index].rating + 1));
    };
    function down() {
        // dec rating by 1
        rate(Math.max(0, allJpegs[index].rating - 1));
    };
    function rate(rating) {
        allJpegs[index].rating = rating;
        $.post('/rate/' + index + '/' + rating, function() {;
            setPhoto(index);
        });
    };
    function exit() {
        $.post('/exit', function () {
            alert('Exited');
        });
    }
    function save() {
        $.post('/save', function() {
            alert('Saved');
        });
    }

    //load list of photos
    $.getJSON('/photos.json')
    .done(function(data) {
        allJpegs = data;
        setPhoto(0);
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
            left();
            break;

            case 38: // up
            up();
            break;

            case 39: // right
            right();
            break;

            case 40: // down
            down();
            break;

            case 48: // zero
            rate(0);
            break;

            case 48: // zero
            rate(0);
            break;

            case 49: // one
            rate(1);
            break;

            case 50: // two 
            rate(2);
            break;

            case 51: // three
            rate(3);
            break;

            // case 52: // four
            // rate(4);
            // break;

            // case 53: // five
            // rate(5);
            // break;

            case 88:  // x
            exit();
            break;

            case 83:  // s
            save();
            break;

            default: 
            console.log(e.which);
            return;
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    $("body").touchwipe({
         wipeLeft: function() { right(); },
         wipeRight: function() { left(); },
         wipeUp: function() { down(); },
         wipeDown: function() { up(); },
         min_move_x: 20,
         min_move_y: 20,
         preventDefaultEvents: false
    });

});

document.ontouchmove = function(event){
    event.preventDefault();
}