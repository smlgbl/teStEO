var plugins = {
	criteo:		true,
	googleadwordssale:		true,
	googleanalyticsecommerce:		true,
	pac_conversionswitch:		true,
	soquero:		true,
	tradedoubler:		true,
	zanoxsale:	true
};

var conf = [
{
	url:	"http://www.natue.com.br",
	tags:	{
		"robots":		[ "index", "follow" ]
	},
	tracking:	{
		TC:	{
			contentId:	"startpage",
			currency:	"BRL",
			pageType:	"homepage"
		},
		plugins: plugins
	}
},
{
	url:	"http://www.natue.com.br/catalog",
	tags:	{
		"robots":		[ "index", "follow" ]
	},
	tracking:	{
		TC:	{
			contentId:	"catalog.overview",
			currency:	"BRL",
			pageType:	"catalog"
		},
		plugins: plugins
	}
},
{
	url:	"http://www.natue.com.br/detoxgreen-300g-sanavita-3961.html",
	tags:	{
		"robots":		[ "index", "follow" ]
	},
	tracking:	{
		TC:	{
			contentId:	"product.1501031331",
			currency:	"BRL",
			pageType:	"product",
			locationId: "catalog.index.detail",
			productStatus: "view"
		},
		plugins: plugins
	}
},
{
	url:	"https://www.natue.com.br/cart/index/add?sku=1501031331&qty=1",
	tags:	{
		"robots":		[ "noindex", "nofollow" ]
	},
	tracking:	{
		TC:	{
			contentId:	"cart.add",
			currency:	"BRL",
			pageType:	"cart",
			locationId: "cart.index.index",
			product: "1501031331",
			productQuantity: "1"
		},
		plugins: plugins
	}
},
{
	url:	"http://www.natue.com.br/checkout",
	tags:	{
		"robots":		[ "index", "follow" ]
	},
	tracking:	{
		TC:	{
			contentId:	"checkout.register",
			currency:	"BRL",
			pageType:	"checkout"
		},
		plugins: plugins
	}
}];
