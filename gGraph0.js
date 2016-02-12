function gGraph(g, gi) {
    'use strict';

    var fills = {
        obj:  'orange',
        prim: 'gray',
        'set': 'blue'
    };

    var nodes = [
        {id: 0, fill:'red', label:'zero', r:40},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
    ];

    var links = [
        {source: 0, target: 1, directed:true},
        {source: 1, target: 2, label:'x'},
        {source: 2, target: 0},
        {source: 3, target: 4}
    ];

    greuler({
        target: '#graph',
        directed: true,
        width: 480,
        data: {
            nodes: nodes,
            links: links
        }
    }).update()
};
