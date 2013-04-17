// ================================ SELECTORS ==========================

var robotsTag = 'meta[name=robots]';
var canonicalTag = 'link[rel=canonical]';
var titleTag = 'title';
var descTag = 'meta[name=description]';
var keywordsTag = 'meta[name=keywords]';
var standardSelectorToWaitFor = 'body';
var bodySelector = standardSelectorToWaitFor;

//================================= ENVIRONMENT ========================

var standardWaitingTime = 15000;

var defaultSettings = {
	method: "post",
	data: {
		username: "projecta",
		password: "mate20mg"
	}
};

//================================== Helpers ============================
casper.canonicalTagExists = function() {
	this.test.assertExists( canonicalTag, "canonical tag exists" );
};

casper.canonicalTagDoesntExist = function() {
	this.test.assertDoesntExist( canonicalTag, "canonical tag doesn't exist" );
};

casper.canonicalTagEquals = function( what ) {
	this.canonicalTagExists();
	this.test.assertEquals( this.getElementAttribute(canonicalTag, 'href'), what, "Canonical tag equals " + what );
};

casper.canonicalTagDoesntExist = function() {
	this.test.assertDoesntExist( canonicalTag, "canonical tag doesn't exist" );
};

casper.metaRobotsContains = function( what ) {
	this.test.assertExists( robotsTag, "Found 'robots' meta tag" );
	var robotsContent = this.getElementAttribute( robotsTag, "content" );
	this.test.assert( robotsContent.indexOf( what ) >= 0, "Robot tag contains " + what );
	// check opposites
	if( what.indexOf( "no" ) !== 0 ) 
		this.test.assert( robotsContent.indexOf( "no" + what ) == -1, "Robot tag doesn't contain no" + what );
};

casper.checkKeywords = function( keywords ) {
	this.test.assertExists( keywordsTag, "Keywords definition found" );
	if( ! utils.isArray( keywords ) ) keywords = [ keywords ];
	var foundKeywords = this.getElementAttribute( keywordsTag, 'content' );
	keywords.forEach( function( k ) {
		this.test.assert( foundKeywords.indexOf( k ) >= 0, "Found keyword " + k );
	}, this );
};

casper.xRobotsHeaderDoesntExist = function( response ) {
	this.waitForSelector( standardSelectorToWaitFor, 
		function success() {
			this.test.assert( null === response.headers.get('X-Robots'), "No X-Robots header found" );
		},
		function fail() {
			this.test.assert( null === response.headers.get('X-Robots'), "No X-Robots header found" );
		}, standardWaitingTime
	);
};

casper.checkTitleTag = function( should ) {
	switch( typeof should ) {
		case "boolean":
			if( should === true ) this.test.assertExists( titleTag, "Title tag exists" );
			else this.test.assertDoesntExist( titleTag, "Title Tag doesn't exist" );
			break;
		case "string":
			this.test.assertExists( titleTag, "Title tag exists" );
			title = this.fetchText( titleTag );
			pageTitle = this.getTitle();
			this.test.assertEquals( title, pageTitle, "Title tag equals page title" );
			this.test.assertEquals( title, should, "Title tag equals " + should );
			break;
		default:
			this.test.assert( false, "Config for titleTag is wrong! " + typeof should + " : " + should );
	}
};

casper.checkDescription = function( should ) {
	switch( typeof should ) {
		case "boolean":
			if( should === true ) this.test.assertExists( descTag, "Description tag exists" );
			else this.test.assertDoesntExist( descTag, "Description Tag doesn't exist" );
			break;
		case "string":
			this.test.assertExists( descTag, "Description tag exists" );
			this.test.assertEquals( this.getElementAttribute( descTag, 'content' ), should, "Description tag contains " + should );
			break;
		default:
			this.test.assert( false, "Config for Description tag is wrong! " + typeof should + " : " + should );
	}
};

casper.pageContainsTag = function( tag, content ) {
	this.test.assertSelectorExists( tag, tag + " exists in page" );
	this.test.assertSelectorHasText( tag, content, tag + " contains " + content);
};

casper.pageContainsText = function( what ) {
	this.test.assertSelectorExists( bodySelector, "body is available");
	this.test.assertSelectorHasText( bodySelector, what, "body contains " + what );
};

casper.pageContainsLink = function( link ) {
	this.test.assertSelectorExists( 'a' );
	var links = this.evaluate( function() {
		var elements = document.querySelectorAll('a');
		return [].map.call( elements, function( elem ) {
			return elem.getAttribute('href');
		});
	});
	this.test.assert( links !== null, "Links found in page" );
	var linkIndex = -1;
	if( links !== null && links.length > 0 ) {
		this.test.assert( links.some( function( elem, index ) {
			if( elem.indexOf( link ) >= 0 ) {
				linkIndex = index;
				return true;
			}
		}), "fitting link found - " + link + " : " + links[linkIndex] );
	}
};

//============================ Test ====================================
casper.test.comment("Test an array of urls and tags");

casper.start().each( conf, function( self, page ) {
	self.thenOpen( page.url, function( response ) {
		casper.test.comment( "Running tests for " + page.url );
//		if( page.headers ) {
//			if( page.headers['X-Robots'] === false ) {
				this.xRobotsHeaderDoesntExist( response );
//			}
//		}

		if( page.tags ) {
			if( page.tags.canonical ) {
				this.canonicalTagEquals( page.tags.canonical );
			} else {
				this.canonicalTagDoesntExist();
			}
			if( page.tags.robots ) {
				if( utils.isArray( page.tags.robots ) ) {
					page.tags.robots.forEach( function( elem ) {
						this.metaRobotsContains( elem );
					}, this );
				} else {
					this.metaRobotsContains( page.tags.robots );
				}
			}
			if( page.tags.description ) {
				this.checkDescription( page.tags.description );
			}
			if( page.tags.title ) {
				this.checkTitleTag( page.tags.title );
			}
			if( page.tags.keywords ) {
				this.checkKeywords( page.tags.keywords );
			}
		}

		if( page.content ) {
			Object.keys( page.content ).forEach( function( elem ) {
				switch( elem ) {
					case "text":
						this.pageContainsText( page.content.text );
						break;
					case "link":
						this.pageContainsLink( page.content.link );
						break;
					default:
						if( typeof page.content[elem] === 'string' ) {
							this.pageContainsTag( elem, page.content[elem] );
						} else {
//							this.pageDoesntContainTag( elem );
						}
				}
			}, this );
		}

		if( page.tracking ) {
			if( page.tracking.TC ) {
				this.test.assert(
						this.evaluate( function() {
							return ( TC && typeof TC === 'object' );
						} ), "TC object found"
						);
				Object.keys( page.tracking.TC ).forEach( function( key ) {
					var k = key;
					var v = page.tracking.TC[k];
					this.test.assert( this.evaluate( function( k ) {
						return ( TC && typeof TC === 'object' && TC[k] && typeof TC[k] === 'string' );
					}, k ) , "TC object contains element " + k );
					this.test.assert( this.evaluate( function( k, v ) {
						return ( TC && typeof TC === 'object' && TC[k] && TC[k] == v );
					}, k, v ) , "TC object's element " + k + " contains " + v );
				}, this );
			}
			if( page.tracking.plugins ) {
				this.test.assert(
						this.evaluate( function() {
							return ( pacTracking.plugins && typeof pacTracking.plugins === 'object' );
						} ), "pacTracking.plugins object found"
						);
				Object.keys( page.tracking.plugins ).forEach( function( key ) {
					var k = key;
					var v = page.tracking.plugins[k];
					if( v ) {
						this.test.assert( 
							this.evaluate( 
								function( k ) {
									return ( pacTracking.plugins && 
										typeof pacTracking.plugins === 'object' && 
										pacTracking.plugins[k] && 
										typeof pacTracking.plugins[k] === 'function' 
										);
								}, k 
								) , "plugins object contains element " + k 
							);
						this.test.assert( this.evaluate( function( k, v ) {
							return ( pacTracking.pluginConfig && 
								typeof pacTracking.pluginConfig === 'object' && 
								pacTracking.pluginConfig[k] && 
								typeof pacTracking.pluginConfig[k] === 'object' );
						}, k 
						) , "pluginConfig object contains element " + k 
							);
					}
				}, this );
			}
		}

	});
});

casper.run(function() {
	this.test.done();
});

