/*    
   JQuery ScriptSafe Plugin by Johnny Richardson
   www.thejohnshow.com

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/*
   DESCRIPTION:
   Custom jQuery plugin that listens for mouse events on the given selector and runs function passed in, but adds preventing default behavior for script calls.
   With a few exceptions, this can be used for any href hooks that call client-side code in lieu of a, .click() handler, which can fail if the element has not yet rendered.
   -- 'methodToRun' may be either an argument-less function passed without () or inside a closure if it has arguments 
   -- e.g. $('link_object').runScript(myFunc) or $('link_object').runScript(function() { myFunc(param1, param2); })

*/
$.fn.runScript = function(methodToRun) {

   // First, check if the element being referenced exists yet. If not, this method has been called before rendering, and
   // we need to bind the click at document-level and listen for any future event (deferred).
   if(this.length === 0)
   {
      $("body").off("click", this.selector);
      $("body").on("click", this.selector, function(event){
         event.preventDefault();
         
         methodToRun();
      });
   }
   else 
   {
      // Second, check and see if this element is already assigned a click handler and remove if so
      if(this.data !== undefined && this.data('events') !== undefined && this.data('events').click !== undefined)
         this.unbind('click');
         
      this.click(function(event) { 
         event.preventDefault();
         
         methodToRun();
      });
   }
};

/* 
// runScriptMouseOver and runScriptMouseOut work the same as runScript() above but for mouseover/out on elements
*/

// Run script on element mouseover
$.fn.runScriptMouseOver = function(methodToRun) {

   // First, check if the element being referenced exists yet. If not, this method has been called before rendering, and
   // we need to bind the click at document-level and listen for any future event (deferred).
   if(this.length === 0)
   {
      $("body").on("mouseenter", this.selector, function(event){
         event.preventDefault();
         
         methodToRun();
      });
   }
   else 
   {
      // Second, check and see if this element is already assigned a mouseenter handler and remove if so
      if(this.data !== undefined && this.data('events') !== undefined && (this.data('events').mouseenter !== undefined || this.data('events').mouseover !== undefined) )
      {
         this.unbind('mouseenter');
         this.unbind('mouseover');
      }

      this.mouseenter(function(event) { 
         event.preventDefault();
         
         methodToRun();
      });
   }

   // Return this element for chaining
   return this;
};

// Run script on element mouseleave
$.fn.runScriptMouseLeave = function(methodToRun) {

   // First, check if the element being referenced exists yet. If not, this method has been called before rendering, and
   // we need to bind the click at document-level and listen for any future event (deferred).
   if(this.length === 0)
   {
      $("body").on("mouseleave", this.selector, function(event){
         event.preventDefault();
         
         methodToRun();
      });
   }
   else 
   {
      // Second, check and see if this element is already assigned a mouseleave handler and remove if so
      if(this.data !== undefined && this.data('events') !== undefined && this.data('events').mouseleave !== undefined)
         this.unbind('mouseleave');
         
      this.mouseleave(function(event) {
         event.preventDefault();
         
         methodToRun();
      });
   }
};