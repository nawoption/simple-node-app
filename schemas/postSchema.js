const Joi = require("joi");

const postScheama = {
    postAdd: Joi.object({
        match_time: Joi.number().required(),
        match_status: Joi.string().valid("live", "vs").default("vs"),
        home_team_name: Joi.string().required(),
        home_team_logo: Joi.string().uri().required(),
        away_team_name: Joi.string().required(),
        away_team_logo: Joi.string().uri().required(),
        league_name: Joi.string().required(),
        servers: Joi.array().items(
            Joi.object({
                name: Joi.string().optional(),
                stream_url: Joi.string().uri().optional(),
            })
        ),
    }),
};

module.exports = postScheama;
