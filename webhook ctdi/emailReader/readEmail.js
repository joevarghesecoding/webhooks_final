const cardMaker = require('../cardMaker/cardMaker.js')

const readEmail = async (sender, subject, body) => {

    //check mce engineering or not

    //Station
    const station = body.substring(body.search('51-')+3, body.search('51-')+6);
    console.log("readEmail station " + station);
    //Slot ID
    const slot_id = body.substring(body.search('SLOT ')+5,body.search('SLOT ')+6);
    console.log("readEmail slot_id " + slot_id);
    //Model
    const model = body.substring(body.search("-")+1,body.indexOf("-")+12);
    console.log("readEmail model " + model);
    //Test
    const test = body.substring(body.indexOf(":")+1, body.indexOf(" ", body.indexOf(":")+2));
    console.log("readEmail test " + test);
    //Time

    try {
        let card = await cardMaker.makeRev2ModelBlockCard(station, slot_id, model, test);
        return card;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { readEmail };