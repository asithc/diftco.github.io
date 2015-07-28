/** @jsx React.DOM */
 
var React = window.React;
var imagesloaded = require('imagesloaded');
var Masonry = require('masonry-layout');
 
var MasonryMixin = function(options) {
    return {
        masonry: false,
 
        imagesLoaded: function() {
            // make sure the imagesloaded plugin is only evaluated when in the browser

            imagesloaded(this.refs.masonryContainer.getDOMNode(), function(instance) {
                this.masonry.layout();
            }.bind(this));
        },
 
        componentDidMount: function(domNode) {
            // create masonry for specified container
            this.masonry = new Masonry(this.refs.masonryContainer.getDOMNode(), options);
 
            // focus the container
            this.refs.masonryContainer.getDOMNode().focus();
 
            // relayout when images are loaded
            this.imagesLoaded();

            var self = this;

            setTimeout(function() {
               self.masonry.layout(); 
            }, 1000);
        },
 
        componentDidUpdate: function() {
            // reload all items in container (bad for performance - should find a way to append/prepend by disabling react render)
            this.masonry.reloadItems();
 
            // relayout after reloading items
            this.masonry.layout();
 
            masonry = this.masonry;
            // relayout again when images are loaded
            this.imagesLoaded();

            // force resize event
            setTimeout(function() {
                window.dispatchEvent(new Event('resize'));
            }, 1);

        }
    };
};
 
module.exports = MasonryMixin;
