# serve-gundb

A [gundb](http://gun.js.org/enterprise/) node server with added utils.


## setup

	[sudo] npm install


## run

	node serve.js

or

	nohup node serve.js &


## what you get

Beside setting up the server itself, you get:

* **gIntrospect** - way of obtaining info out of local graph items
* **gGraph** - renders local graph, using
[cytoscape.js](http://js.cytoscape.org/) and
[cose-bilkent layout](https://github.com/cytoscape/cytoscape.js-cose-bilkent#api)



## public APIs


### gIntrospect

```javascript
var gi = gIntrospect( <gunInstance> g )

gi.classify( <gun graph item or its key|soul string> o )
// returns object with, depending what you pass it:
// {isKey:true, val:<soul/key>}
// {isSet:true, val:<array of soul/key>}
// {isObj:true, val:{primitives:{ attrs and vals }, references: { attrs and souls/keys }}}

gi.logAll()
// prints items to console

gi.visitAll( <function> cb )
// for each item, passes classify result
```


### gGraph

```javascript
var render = gGraph( <gunInstance> g , <gIntrospect> gi, <Element|string> parentEl )
// renders graph immediately and returns function to render again (doesn't require arguments)
```
