const readingList = (collection) => {
    const reading = collection.getFilteredByTag("reading");
    return reading;
}

module.exports = readingList;