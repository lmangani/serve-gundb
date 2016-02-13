/*global Gun:false, console:false*/
// https://github.com/amark/gun/wiki/API-(v0.3.x)


var p = function(v) { console.log(v); };

var g = Gun(location.origin + '/gun');
//var g = Gun();


function setUpExample() {
    // nodes
    var N_JOHN = 'person/john';
    var N_ANNE = 'person/anne';
    var N_RICK = 'person/rick';
    var N_ELSA = 'person/elsa';

    // edges
    var E_HUSBAND_OF = 'husband_of';
    var E_WIFE_OF = 'wife_of';
    var E_CHILDREN = 'children';

    // auxiliary. we can use node.back too
    var a, b;

    a = g.get(N_JOHN).put({name:'john doe', age:35, gender:'m'});
    b = g.get(N_ANNE).put({name:'anne smith', age:32, gender:'f'});

    a.path(E_HUSBAND_OF).put(b);
    b.path(E_WIFE_OF   ).put(a);

    var c, d;
    c = g.get(N_RICK).put({name:'rick doe', age:5, gender:'m'});
    d = g.get(N_ELSA).put({name:'elsa doe', age:8, gender:'f'});

    a.path(E_CHILDREN).set(c);
    a.path(E_CHILDREN).set(d);

    var e;
    a.path(E_CHILDREN).val(function(e) {
        b.path(E_CHILDREN).put(e);
    });
}

function summonExample() {
    g.get('person/anne')
    .get('person/rick')
    .get('person/elsa')
    .get('person/john')
    .path('children');
}

//setUpExample();
summonExample();
