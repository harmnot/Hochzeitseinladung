const Bride = require("../model/bride.js");

class Controller {
  static async upload(req, res, next) {
    try {
      const createCouple = await Bride.create({
        name_male: req.body.male_name,
        name_female: req.body.female_name,
        wedding_date: req.body.wedding_date,
        time_at: req.body.time_at,
        location: req.body.location
      });
      req
        .status(201)
        .json({ message: `succesfully create this Bride`, data: createCouple });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
