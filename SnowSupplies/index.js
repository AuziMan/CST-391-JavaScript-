// Application Dependencies
const { Album } = require('./lib/app/models/Album');
const { Track } = require('./lib/app/models/Track');
const { Supplies } = require('./lib/app/models/Supplies');


//const { SuppliesDAO } = require('./lib/app/database/SuppliesDAO.js');
const { SuppliesDAO } = require('./lib/app/database/SuppliesDAO.js');


const bodyParser = require('body-parser');

// Create instance of an Express Application on Port 3000
const express = require('express');
const app = express();
const port = 3000;
app.use(bodyParser.json()); 

// Database configuration
const dbHost = "localhost"
const dbPort = 3306;
const dbUsername = "root"
const dbPassword = "root"

// Set location of static resources and use the JSON body parser
app.use(express.static('app/images'))


// Route code begins
// GET Route at Root '/' that returns a Test Text message
app.get('/', function (_req, res)
{
    // Return Test Text
    console.log('In GET / Route');
    res.send('This is the default root Route.');
})
// GET Route at '/artists' that returns all Artists from the database
app.get('/Supplies', function (_req, res)
{
    // Return Artists List as JSON, call SuppliesDAO.findArtists(), and return JSON array of Artists (a string)
    console.log('In GET /Supplies Route');
    let dao = new SuppliesDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findSupplies(function(Supplies)
    {
        res.json(Supplies);
    });
})

app.post('/Supplies', function (req, res)
{
    console.log(req.body);
    
    // If invalid POST Body then return 400 response else add Album and Tracks to the database
    console.log('In POST /Supplies Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Supplies Posted"});
    }
    else
    {
        // Create an Album object model from Posted Data
        let supplies = new Supplies(req.body.id, req.body.Name, req.body.Description, req.body.Amount);
        
        // Call SuppliesDAO.create() to create an Album from Posted Data and return an OK response     
        let dao = new SuppliesDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(supplies, function(suppliesID)
        {
            if(suppliesID == -1)
                res.status(200).json({"error" : "Creating Supplies failed"})
            else
                res.status(200).json({"success" : "Creating Supplies passed with a Supplies ID of " + suppliesID});
        });     
      }
})


// PUT Route at '/albums' that updates an Album and its Tracks in the database
app.put('/updateSupplies', function (req, res)
{
    // If invalid PUT Body then return 400 response else update Album and Tracks to the database
    console.log('In PUT /updateSupplies Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Suppleis Posted"});
    }
    else
    {    
        let supplies = new Supplies(req.body.Id, req.body.Name, req.body.Description, req.body.Amount);

        // Call SuppliesDAO.update() to update an Album from Posted Data and return an OK response     
        let dao = new SuppliesDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(supplies, function(changes)
        {
            if(changes == 0)
                res.status(200).json({error : "Updating Supplies passed but nothing was changed"})
            else
                res.status(200).json({success : "Updating Supplies passed and data was changed"});
        });     
      }
})

// DELETE Route at '/albums/:artist/:id' that deletes an Album given an Album ID from the database
app.delete('/Supplies/:Id', function (req, res)
{
    // Get the Album
    console.log('In DELETE /albums Route with ID of ' + req.params.Id);
    let suppliesId = Number(req.params.Id);
 
    // Call SuppliesDAO.delete() to delete an Album from the database and return if passed
    let dao = new SuppliesDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(suppliesId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Album failed"})
        else
            res.status(200).json({"success" : "Delete Album passed"})
    });
 })



// Route code ends
// Start the Server
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
