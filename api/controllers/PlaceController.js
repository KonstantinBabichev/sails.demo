/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {

    console.log('========================== req.body : ==========================');
    console.log(req.body);
    console.log('========================== req.body : ==========================');

    var params = {
      title		: req.param('title'),
      body		: req.param('body'),
      address		: req.param('address'),
      geo		: req.param('geo'),
      images		: req.param('images'),
      image		: req.param('image')
    };

    Place.create(params).exec(function (err, place) {
      console.log('created !!!');
      console.log(place);
      res.json({
        todo: 'done'
      });
      //if (err) return res.send(500);
    });
  }
};

