const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
    {
        match_time: { type: Number, required: true },
        match_status: { type: String, enum: ["live", "vs"], default: "vs" },
        home_team_name: { type: String, required: true },
        home_team_logo: { type: String, required: true },
        away_team_name: { type: String, required: true },
        away_team_logo: { type: String, required: true },
        league_name: { type: String, required: true },
        servers: [
            {
                name: { type: String },
                stream_url: { type: String },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
