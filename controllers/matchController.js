const { fetchMatches } = require("../services/mathService");

// const getMatches = async (req, res) => {
//     try {
//         const currentDate = new Date().toISOString().split("T")[0].replace(/-/g, "");
//         const nextDay = new Date(Date.now() + 86400000).toISOString().split("T")[0].replace(/-/g, "");
//         const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0].replace(/-/g, "");

//         const matchTimes = [yesterday, currentDate, nextDay];
//         const allMatches = [];

//         for (const time of matchTimes) {
//             const matches = await fetchMatches(time);
//             allMatches.push(...matches.filter(Boolean));
//         }

//         res.json(allMatches);
//     } catch (error) {
//         console.error("Error fetching matches:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const getMatches = async (req, res) => {
    try {
        const currentDate = new Date();
        const yesterday = new Date(currentDate);
        const tomorrow = new Date(currentDate);

        yesterday.setDate(currentDate.getDate() - 1);
        tomorrow.setDate(currentDate.getDate() + 1);

        const formatDate = (date) => date.toISOString().split("T")[0].replace(/-/g, "");

        const matchDates = {
            yesterday: formatDate(yesterday),
            today: formatDate(currentDate),
            tomorrow: formatDate(tomorrow),
        };

        // Fetch matches for each day
        const [yesterdayMatches, todayMatches, tomorrowMatches] = await Promise.all([
            fetchMatches(matchDates.yesterday),
            fetchMatches(matchDates.today),
            fetchMatches(matchDates.tomorrow),
        ]);

        res.json({
            yesterday: yesterdayMatches,
            today: todayMatches,
            tomorrow: tomorrowMatches,
        });
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getMatches };
