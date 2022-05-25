const router = require('express').Router();
const Constellation = require('../models/Constellation');

//Create
router.post('/', async (req, res) => {

    const {name, abbreviation, coordinates} = req.body;

    const constellation = {
        name,
        abbreviation,
        coordinates
    };

    try {
        await Constellation.findOne({ name: name, abbreviation: abbreviation, coordinates: coordinates})
        .then(async constellation => {
            if(constellation){
                    let errors = [];
                    errors.push({msg: 'Constellation already exists'});
                    return res.status(500).json({error: errors})
                } else {
                    try {
                        await Constellation.create(constellation);
                        
                        res.status(201).json({message: 'Success inserted constellation'})
                    } catch (error) {
                        res.status(500).json({error: error})
                    }
                }
            })
    } catch (error) {
        res.status(500).json({error: error})
    }

});

//Read
router.get('/', async (req, res) => {
    try {
        const constellations = await Constellation.find();
        
        res.status(200).json(constellations);
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;
    
    try {

        const constellation = await Constellation.findOne({_id: id})
        
        if (!constellation) {
            res.status(422).json({ message: 'Constellation not found' });
            return
        }
        
        res.status(200).json(constellation);

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const {name, abbreviation, coordinates} = req.body;

    const constellation = {
        name,
        abbreviation,
        coordinates
    };

    try {

        const updatedConstellation = await Constellation.updateOne({_id: id}, constellation);

        if(updatedConstellation.matchedCount === 0) {
            res.status(422).json({ message: 'Constellation not found or not updated' });
            return
        }
        
        res.status(200).json(constellation);

    } catch (error) {
        res.status(500).json({ error: error });
    }

});

//delete
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const constellation = await Constellation.findOne({_id: id})
    if (!constellation) {
        res.status(422).json({ message: 'Constellation not found' });
        return
    }

    try {

        await Constellation.deleteOne({_id: id});

        res.status(200).json({message: 'Constellation removed successfuly'});

    } catch (error) {
        res.status(500).json({ error: error });
    }

})

module.exports = router;