/*global Gun:false, console:false*/
// https://github.com/amark/gun/wiki/API-(v0.3.x)

// auxiliary functions to apply to .val()
var p = function(v) { console.log(v); }; // prints to console

localStorage.clear(); // kinda evil, just to discard eventual presence of old demo data

//var g = Gun(location.origin + '/gun'); // sync with server peer
var g = Gun(); // volatile demo



function setUpExample() {
    // nodes
    var N_JOHN = 'person/john';
    var N_ANNE = 'person/anne';
    var N_RICK = 'person/rick';
    var N_ELSA = 'person/elsa';

    // sets
    var S_CHILDREN_JOHN_ANNE = 'set/children_of/person_john/person_anne';

    // edges
    var E_HUSBAND_OF = 'husband_of';
    var E_WIFE_OF = 'wife_of';
    var E_CHILDREN = 'children';

    g.get(N_JOHN).put({name:'john doe', age:35, gender:'m'});
    g.get(N_ANNE).put({name:'anne smith', age:32, gender:'f'});

    g.get(N_JOHN).path(E_HUSBAND_OF).put( g.get(N_ANNE) );
    g.get(N_ANNE).path(E_WIFE_OF   ).put( g.get(N_JOHN) );

    g.get(N_RICK).put({name:'rick doe', age:5, gender:'m'});
    g.get(N_ELSA).put({name:'elsa doe', age:8, gender:'f'});

    g.get(S_CHILDREN_JOHN_ANNE).set( g.get(N_RICK) );
    g.get(S_CHILDREN_JOHN_ANNE).set( g.get(N_ELSA) );

    g.get(N_JOHN).path(E_CHILDREN).put( g.get(S_CHILDREN_JOHN_ANNE) );
    g.get(N_ANNE).path(E_CHILDREN).put( g.get(S_CHILDREN_JOHN_ANNE) );
}



function summonExample() {
    g
    .get('person/anne')
    .get('person/rick')
    .get('person/elsa')
    .get('person/john')
    .get('set/children_of/person_john/person_anne');
}



setUpExample();
//summonExample();
