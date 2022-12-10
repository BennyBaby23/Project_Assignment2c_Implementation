const express = require('express');
const { create } = require('hbs');

const router =express.Router(); 

const Movie = require('../../models/movie');


router.get('/', (req,res,next) => {

   
    Movie.find((err, movies) => {
        if(err){
            console.log(err);
            res.json('Error!').status(500);
        }else{
            res.json(movies).status(200);
        }
    });
    
});

//crud functionality
//create
router.post('/', (req,res,next) => {
//  console.log(req.body);
//  res.status(200).json(req.body);

if(!req.body. movieName){
    res.status(400).json({'ValidationError': 'Movie Name is a required field'});
}else if(!req.body.rating){
    res.status(400).json({'ValidationError': 'Rating is a required field'});
}else{
    Movie.create({
        movieName: req.body.movieName,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        summary: req.body.summary

    },(err, newMovie)=>{
        if(err){
            console.log(err);
            res.status(500).json({'ErrorMessage': 'Server threw an exception'});
        }
        else{
            res.status(200).json(newMovie);
        }

    })
}

});

//update
router.put('/_id', (req, res, next)=> {
    if(!req.body. movieName){
        res.status(400).json({'ValidationError': 'Movie Name is a required field'});
    }else if(!req.body.rating){
        res.status(400).json({'ValidationError': 'Rating is a required field'});
    }else{
        Movie.findOneAndUpdate({
            _id: req.params._id
        },{
            movieName: req.body.movieName,
            releaseDate: req.body.releaseDate,
            rating: req.body.rating,
            summary: req.body.summary
        },(err, updatedMovie) =>{
            if(err){
                console.log(err);
                res.status(500).json({'ErrorMessage': 'Server threw an exception'});
            }else{
                res.status(200).json(updatedMovie);
            }

        });
    }

})

//delete
router.delete('/_id', (req, res, next)=>{
    Movie.remove({
        _id: req.params._id
    },(err)=>{
        if(err){
            console.log(err);
            res.status(500).json({'ErrorMessage': 'Server threw an exception'});
        }else{
            res.status(200).json({'successfully deleted': 'true'});
        }

    })
});

module.exports = router;