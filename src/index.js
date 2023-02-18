const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
// const CreateDatabaSE = require('./createDatabase');
// CreateDatabaSE();
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require('./connector')

const getOrders = (req, res) => {
    const {limit, offset} = req.query;
    if (limit || offset) {
        try {
        connection.query(
            `SELECT * FROM orders LIMIT ${limit} OFFSET ${offset}`,
            (err, result) => {
                if(err) {
                    console.log("Error in Query: ", err);
                    return res.status(500).json({message: "Internal Server Error"});
                }
                res.status(200).json({
                    message: "Data Fetched Successfully",
                    result
                });
            }
        );
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "Limit or Offset is missing"});
        }
    } else {
        res.status(404).json({message: "Something went wrong"});
    }
}

app.get('/api/orders', getOrders);


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;