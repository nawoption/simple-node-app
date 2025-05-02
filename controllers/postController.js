const Match = require("../models/postModel");

exports.createMatch = async (req, res) => {
    try {
        const match = new Match(req.body);
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) return res.status(404).json({ error: "Match not found" });
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!match) return res.status(404).json({ error: "Match not found" });
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMatch = async (req, res) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);
        if (!match) return res.status(404).json({ error: "Match not found" });
        res.status(200).json({ message: "Match deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
