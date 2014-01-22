// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function($) {
    $.fn.modal = function(options) {

        var defaults = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 900,
            position: 'fixed',
            bgColour: '#000'
        };

        var o = $.extend(defaults, options);

        // var form = $(form);
        // if(form.length === 1) {
            return this.each(function() {
                // $(this).click(function() {
                    // check if overlay already exists
                    if($('#overlay').length === 0) {
                        // if not, create it
                        // fadeTo allows opacity to work
                        $('<div id="overlay" />').appendTo('body')
                            .css({
                                'top': o.top,
                                'left': o.left,
                                'right': o.right,
                                'bottom': o.bottom,
                                'z-index': o.zIndex,
                                'position': o.position,
                                'background-color': o.bgColour
                            })
                            .fadeTo('fast', 0.5);
                        
                    } else {
                        // if so, use it
                        $('#overlay').show();
                    }
                    // only add 'Close' button on first click
                    if($(this).find('.closemodal').length === 0) {
                        $('<a href="#" title="Close" class="closemodal">Close</a>').prependTo(this);
                    }
                    $(this).addClass('modal-content').appendTo('body').centre().show();
                    // return false;
                // });
                
                function hideModal() {
                    $('.modal-content').hide();
                    $('#overlay').hide();
                }

                $(document).keyup(function(e) {
                    if (e.keyCode === 27) {
                        hideModal();
                    }
                });
                
                // .live() works with jQuery 1.4+
                // can update to .on() (1.7+)
                $('#overlay, .closemodal').on('click touch', function(e) {
                    e.preventDefault();
                    hideModal();
                    // return false;
                });
                
            });
        // } else {
        //     if(window.console&&window.console.log) {
        //         window.console.log("Modal: Either element to display doesn't exist or there is more than one! (use an id instead of class)");
        //     }
        // }
    };
    
    $.fn.centre = function() {
        this.css({'position':'absolute', 'z-index':'999'});
        // this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
        this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
        return this;
    };
    
}(jQuery));
