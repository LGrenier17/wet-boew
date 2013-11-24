/*
 * @title WET-BOEW Focus
 * @overview User agent safe way of assigning focus to an element
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @pjackson28
 */
(function( $, vapour ) {
"use strict";

var $document = vapour.doc,
	hash = vapour.pageUrlParts.hash,
	clickEvents = "click.wb-focus vclick.wb-focus",
	linkSelector = "a[href]",
	$linkTarget;

// Bind the setfocus event
$document.on( "setfocus.wb", function ( event ) {
	var $elm = $( event.target );

	// Set the tabindex to -1 (as needed) to ensure the element is focusable
	$elm
		.filter( ":not([tabindex], a, button, input, textarea, select)" )
			.attr( "tabindex", "-1" );

	// Assigns focus to an element (delay allows for revealing of hidden content)
	setTimeout(function () {
		return $elm.focus();
	}, 1 );
});


// Set focus to the target of a deep link from a different page
// (helps browsers that can't set the focus on their own)
if ( hash && ( $linkTarget = $( hash ) ).length !== 0 ) {
	$linkTarget.trigger( "setfocus.wb" );
}
	
// Helper for browsers that can't change keyboard and/or event focus on a same page link click
$document.on( clickEvents, linkSelector, function( event ) {
	var testHref = event.currentTarget.getAttribute( "href" );

	// Same page links only
	if ( testHref.charAt( 0 ) === "#" && ( $linkTarget = $( testHref ) ).length !== 0 ) {
		$linkTarget.trigger( "setfocus.wb" );
	}
});

})( jQuery, vapour );