const moment = require("moment");

const groupByMonth = (data) => {
    const grouped = {};

    for (const item of data) {
        const monthKey = moment(item.date).format("YYYY-MM");

        if (!grouped[monthKey]) {
            grouped[monthKey] = [];
        }
        grouped[monthKey].push(item);
    }

    const sections = Object.entries(grouped).map(([monthKey, items]) => {
        const readableDate = moment(monthKey, "YYYY-MM").format("MMMM YYYY");

        return {
            date: readableDate,
            data: items,
        };
    });

    return sections;
};

module.exports = groupByMonth