var plugins = {
	criteo:		true,
	googleadwordssale:		true,
	googleanalyticsecommerce:		true,
	pac_conversionswitch:		true,
	soquero:		true,
	tradedoubler:		false,
	zanoxsale:	true
};

var conf = [
{
	url:	"http://www.tirendo.de",
	tags:	{
		"canonical":	"http://www.tirendo.de/",
		"robots":		[ "index", "follow" ],
		"description":	true,
		"title":		"Tirendo.de – Reifen online kaufen."
	},
	content:	{
		"h1":		true,
		"h2":		true,
		"text":		"Reifenprofi",
		"link":		"pkw/reifen/winterreifen"
	}
},
{
	url:	"http://www.tirendo.de/?wmc",
	tags:	{
		"canonical":	"http://www.tirendo.de/",
		"robots":		[ "noindex", "follow" ]
	}
},
{
	url:	"http://www.tirendo.de/pkw/reifen/pirelli/",
	tags:	{
		"robots":		[ "index", "follow" ]
	}
},
{
	url:	"http://www.tirendo.de/pkw/reifen/pirelli/?wmc",
	tags:	{
		"canonical":	"http://www.tirendo.de/pkw/reifen/pirelli/",
		"robots":		[ "noindex", "follow" ]
	}
},
{
	url:	"http://www.tirendo.de/leicht-lkw/reifen/vredestein/",
	tags:	{
		"robots":		[ "noindex", "follow" ]
	}
},
{
	url:	"http://www.tirendo.de/komplettraeder/konfigurator/stahl/",
	tags:	{
		"robots":		[ "index", "follow" ]
	}
},
{
	url:	"http://www.tirendo.de/komplettraeder/mercedes/",
	tags:	{
		"robots":		[ "index", "follow" ]
	}
},
{
	url:	"http://www.tirendo.de/pirelli-p-2500-euro-4s-m-s-175-65-r14-82t-70261.html?wmc",
	tags:	{
		"canonical":	"http://www.tirendo.de/pkw/reifen/pirelli/p-2500-euro-4s/",
		"robots":		[ "noindex", "follow" ]
	}
},
{
	url:	"https://www.tirendo.de/cart/index/add?CartAddForm%5Bsku%5D%5B%5D=DEE44EB1FB3C7FA441488C8338543FB0&CartAddForm%5Bqty%5D%5B%5D=4",
	tags:	{
		"robots":		[ "noindex", "follow" ]
	},
	tracking:	{
		TC:	{
			contentId:	"cart.non-empty",
			currency:	"EUR",
			pageType:	"cart",
			product: "134591",
			productQuantity: "4"
		},
		plugins: plugins
	}
}
];
