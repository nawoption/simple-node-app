const { fetchJsonp } = require("../utils/helper");

const fetchServerURL = async (roomNum) => {
    const url = `https://json.vnres.co/room/${roomNum}/detail.json`;
    const jsonData = await fetchJsonp(url);

    if (jsonData && jsonData.code === 200) {
        const stream = jsonData.data.stream;
        return { m3u8: stream.m3u8, hdM3u8: stream.hdM3u8 };
    }

    return { m3u8: null, hdM3u8: null };
};

const fetchMatches = async (timeData) => {
    const url = `https://json.vnres.co/match/matches_${timeData}.json`;
    const jsonData = await fetchJsonp(url);

    if (!jsonData || jsonData.code !== 200) return [];

    const matches = jsonData.data;
    const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp (seconds)

    const matchBufferBefore = 600; // 10 minutes before match start
    const matchDuration = 90 * 60; // 90 minutes in seconds
    const extraTime = 30 * 60; // Extra 30 minutes for stoppage/injury time
    const matchEndTime = matchDuration + extraTime; // Total match duration

    return await Promise.all(
        matches.map(async (match) => {
            try {
                const { matchTime, subCateName, hostName, hostIcon, guestName, guestIcon, anchors } = match;
                const matchTimestamp = Math.floor(matchTime / 1000); // Convert to seconds

                let matchStatus = "vs"; // Default to "vs" (upcoming match)

                if (currentTime >= matchTimestamp - matchBufferBefore && currentTime <= matchTimestamp + matchEndTime) {
                    matchStatus = "live"; // Match is currently live
                } else if (currentTime > matchTimestamp + matchEndTime) {
                    matchStatus = "finished"; // Match has already finished
                }

                const serversList = [];
                if (matchStatus === "live") {
                    for (const anchor of anchors) {
                        const serverRoom = anchor.anchor.roomNum;
                        const { m3u8, hdM3u8 } = await fetchServerURL(serverRoom);

                        if (m3u8) serversList.push({ name: "Soco SD", stream_url: m3u8 });
                        if (hdM3u8) serversList.push({ name: "Soco HD", stream_url: hdM3u8 });
                    }
                }

                return {
                    match_time: matchTimestamp.toString(),
                    match_status: matchStatus,
                    home_team_name: hostName,
                    home_team_logo: hostIcon,
                    away_team_name: guestName,
                    away_team_logo: guestIcon,
                    league_name: subCateName,
                    servers: serversList,
                };
            } catch (error) {
                console.error("Error processing match:", error);
                return null;
            }
        })
    );
};

module.exports = { fetchMatches };
