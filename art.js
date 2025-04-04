const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const jsonPath = path.join(__dirname, 'paintings.json');

    let paintings;
    fs.readFile(jsonPath, (err,data) => {
        if (err)
            console.log("Unable to read json data file");
        else
        paintings = JSON.parse(data);
    });

    app.get('/start',function(request,response){
        response.sendFile(__dirname+"/static/tester.html");
    });
    app.get('/',(req,resp)=>{resp.json(paintings)});

    app.get('/:id',(req,resp)=>{
        const paintingid = req.params.id;
        const matches = paintings.filter(obj => paintingid == obj.paintingID);
        resp.json(matches);
    });

    app.get('/gallery/:id',(req,resp) => {
        const galleryid = req.params.id;
        const matches = paintings.filter(obj => galleryid == obj.galleryID);
        resp.json(matches);
    });
    app.get('artist/:id', (req,resp) =>{
        const artistid = req.params.id;
        const matches = paintings.filter(obj=>artistid==obj.artist.artistID);
        resp.json(matches);
    });
    app.get('/year/:min/:max',(req,resp)=>{
        const minYear = req.params.min;
        const maxYear = req.params.max;
        const matches = paintings.filter(obj=>(minYear<=obj.yearOfWork)&&(maxYear>=obj.yearOfWork));
        resp.json(matches);
    });
    let port = 8080;
    app.listen(port, () =>{
        console.log("Server running at port=" + port);
    });