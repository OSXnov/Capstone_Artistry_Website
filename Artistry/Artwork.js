class Artwork {
  constructor(title, medium, year, authorName, authorID, description, image) {
    this.title = title;
    this.medium = medium;
    this.year = year;
    this.authorName = authorName;
    this.authorID = authorID;
    this.description = description;
    this.image = image;
  }
  //I'm going to investigate what other methods would be needed, so far these are what I could think of.
  // Setters and getters for each attribute
  setTitle(title) {
    this.title = title;
  }

  setMedium(medium) {
    this.medium = medium;
  }

  setYear(year) {
    this.year = year;
  }

  setAuthorName(authorName) {
    this.authorName = authorName;
  }

  setAuthorID(authorID) {
    this.authorID = authorID;
  }

  setDescription(description) {
    this.description = description;
  }

  setImage(image) {
    this.image = image;
  }

  getTitle() {
    return this.title;
  }

  getMedium() {
    return this.medium;
  }

  getYear() {
    return this.year;
  }

  getAuthorName() {
    return this.authorName;
  }

  getAuthorID() {
    return this.authorID;
  }

  getDescription() {
    return this.description;
  }

 getImage() {
    return this.image;
  }
}

module.exports = Artwork;