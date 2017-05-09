function ClozeCard(full, deleted){

	if(!(this instanceof ClozeCard)){

		return new ClozeCard(full, deleted);
	}

	var blank = wordDelete(full, deleted);

	this.partial = getPartial(full, deleted);

	this.cloze = full.slice(blank[0], blank[1]);

	function getPartial(full, deleted) {

	    var start = full.slice(0, blank[0]);
	    
	    var end = full.slice(blank[1], full.length);

	    return start + "..." + end;
  }

  function wordDelete(full, deleted) {

    var start = full.indexOf(deleted);

    if (start !== -1) {
      return [start, start + deleted.length];
    }
    throw new Error("Cloze deletion not found in input text.");
  }
}

ClozeCard.prototype.displayCard = function displayCard() {

  return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");

};

module.exports = ClozeCard;