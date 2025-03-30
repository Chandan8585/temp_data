const express = require('express');
const { sellerAuth } = require('../middlewares/sellerAuth');
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", sellerAuth, (req, res)=>{
      const seller = req.seller;
      console.log(seller);

      res.send(seller.firstName+ "sent the connection request");
})

module.exports= {requestRouter};