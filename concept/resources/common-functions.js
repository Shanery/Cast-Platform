export function isEdge(key) {
  const regex_in = new RegExp('in_');
  const regex_out = new RegExp('out_');
  return key.match(regex_in) || key.match(regex_out);
}


export function toTitle(key) {
	var title = key.replace(/([A-Z])/g, function($1) {return " "+$1.toUpperCase();});
	title = title.replace("  ", " ");
	title = title.replace(/\b\w/g, function(l){ return l.toUpperCase() })
	return title;
};

export function isEmpty(item) {
	return Object.keys(item).length === 0 && item.constructor === Object
} 