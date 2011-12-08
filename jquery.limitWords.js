// Word count
(function($, window, document, undefined) {
                
    var pluginName = 'limitWords',
        defaults = {
            limit: 30,
            showWordsLeft: true,
            counterElement: 'counter' // Element showing words left (jQuery object)
        };
 
    function LimitWords(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
 
    LimitWords.prototype.init = function () {       
        var $textArea = $(this.element),
            self = this;
            
        $textArea.keypress(function () {
            if (self.checkInput() === false) {
                return false;
            }
        }).keyup(function (event) {
            if (event.keyCode === 8 || event.keyCode === 46) {
                self.checkInput();
            }
        });
    };
    
    LimitWords.prototype.checkInput = function () {
        var self = this,
            text = $(self.element).val(),
            fullStr = text + ' ',
            initialWhitespaceRegExp = /^[^\w\W]+/gi,
            leftTrimmedStr = fullStr.replace(initialWhitespaceRegExp, ''),
            nonAlphanumericsRegExp = /[^\w\W]+/gi,
            cleanedStr = leftTrimmedStr.replace(nonAlphanumericsRegExp, ' '),
            splitString = cleanedStr.split(/\s/g),
            wordCount = splitString.length -1;

        if (fullStr.length < 2) {
            wordCount = 0;
        }

        if (self.options.showWordsLeft) {
            self.options.counterElement.text(self.options.limit - wordCount);
        } else {
            self.options.counterElement.text(wordCount);
        }

        if (wordCount >= self.options.limit) {
            return false;
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new LimitWords(this, options));
            }
        });
    } 
})(jQuery, window, document);
