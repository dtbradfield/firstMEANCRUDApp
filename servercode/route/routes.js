let express = require('express');
let router = express.Router();
const Item = require('../model/shoppingItem');

router.get('/items', (req, res, next) => {
    Item.find(function(err, items) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(items);
        }
    });
});

router.post('/items', (req, res, next) => {
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });

    newShoppingItem.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json({msg: "Item has been added to the database"})
        }
    });

});

router.put('/items/:id', (req, res, next) => {
    Item.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    },
        function(err, results) {
            if (err) {
                res.json(err)
            }
            else{
                res.json(results);
            }
        });
});

router.delete('/delete_route', (req, res, next) => {
    Item.remove({_id:req.params.id}, function(err, result){
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;
