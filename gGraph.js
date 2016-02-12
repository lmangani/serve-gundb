function gGraph(g, gi) {
    'use strict';

    var nodes = [
        //{id:'kspacey',   label:'Kevin Spacey'}
    ];

    var edges = [
        //{from:'kspacey',   to:'swilliams', label:'a'}
    ];

    var genId = function() {
        return ( ~~(Math.random() * Math.pow(32, 6)) ).toString(32);
    };

    var forObj = function(o, cb) {
    	for (var k in o) {
    		if (!o.hasOwnProperty(k)) { continue; }
    		cb(o[k], k);
    	}
    };

    gi.visitAll(function(o) {
        var color = ( o.isObj ? '#FAA' : (o.isSet ? '#AFA' : '#AAF') );

        if (o.isKey) {
            edges.push({from:o.id, to:o.val, label:''});
        }
        else if (o.isSet) {
            o.val.forEach(function(ref) {
                edges.push({from:o.id, to:ref, label:''});
            });
        }
        else {
            forObj(o.val.primitives, function(v, k) {
                var id = genId();
                edges.push({from:o.id, to:id, label:k});
                nodes.push({id:id, label:v.toString(), backgroundColor:'#CCC'});
            });
            forObj(o.val.references, function(v, k) {
                var id = genId();
                edges.push({from:o.id, to:v, label:k});
            });
        }

        nodes.push({id:o.id, label:o.id, backgroundColor:color});
    });

    var c = window.dagreCanvas({
		nodes: nodes,
		edges: edges,
		layout: {
			marginx: 10,
			marginy: 10,

			nodes: {
				fontFamily:      'sans-serif',
				fontHeight:      14,
				fontStyle:       '', // '' | 'bold' | 'italic' | 'bold italic'
				padding:         6,
				labelColor:      '#000',
				backgroundColor: '#EEE'
			},

			edges: {
				fontFamily: 'sans-serif',
				fontHeight: 12,
				fontStyle:  '', // '' | 'bold' | 'italic' | 'bold italic'
				padding:    1,
				lineWidth:  1,
				lineColor:  '#777',
				labelColor: '#000'
			}
		}
	});

	document.querySelector('#graph').appendChild(c);
};
