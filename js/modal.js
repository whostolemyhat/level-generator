(function($) {
    $.fn.modal = function(form, options) {

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

        var form = $(form);
        if(form.length === 1) {
            return this.each(function() {
                $(this).click(function() {
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
                    if(form.find('.closemodal').length === 0) {
                        $('<a href="#" title="Close" class="closemodal">Close</a>').prependTo(form);
                    }
                    form.appendTo('body').centre().show();
                    return false;
                });
                
                function hideModal() {
                    $(form).hide();
                    $('#overlay').hide();
                }

                $(document).keyup(function(e) {
                    if (e.keyCode === 27) {
                        hideModal();
                    }
                });
                
                // .live() works with jQuery 1.4+
                // can update to .on() (1.7+)
                $('#overlay, .closemodal').on('click touch', function() {
                    hideModal();
                    return false;
                });
                
            });
        } else {
            if(window.console&&window.console.log) {
                window.console.log("Modal: Either element to display doesn't exist or there is more than one! (use an id instead of class)");
            }
        }
    };
    
    $.fn.centre = function() {
        this.css({'position':'absolute', 'z-index':'999'});
        this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
        this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
        return this;
    };
    
}(jQuery));
