// kudos to amark himself, this code is his too.

// this pseudo code does not check/handle errors, or provide a callback, or anything. Maybe somebody else can polish this up.
Gun.chain.unset = function(ref) {
  var gun = this;
  ref.val(function(node){
     var soul = Gun.is.node.soul(node);
     gun.path(soul).put(null);
   });
  return ref; // set returns the item, so shouldn't unset?
}
