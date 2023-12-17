const Artwork = require('./Artwork');

class Artist {
  constructor(name, ID, email, password) {
    this.name = name;
    this.ID = ID;
    this.email = email;
    this.password = password;
    this.Artwork = [];
    this.followers = [];
    this.following = [];
    this.profilePicture = null; // assuming its an image object idk what type it should be
    this.likes = [];
  }

  //Create a new profile
  static createProfile(name, ID, email, password) {
    return new Artist(name, ID, email, password);
  }

  //Delete profile
  deleteProfile() {
    // I'm going to implement logic for profile deletion :)
    console.log(`Profile for ${this.name} deleted.`);
  }

  //Change artist name
  changeName(newName) {
     // Validate that the new name is a non-empty string
     if (typeof newName === 'string' && newName.trim() !== '') {
      this.name = newName;
      console.log("Name changed successfully.");
    } else {
      console.log("Invalid name. Name not changed.");
    }
  }


  //Change password
  changePassword(oldPassword, newPassword) {
    if (oldPassword === this.password) {
      this.password = newPassword;
      console.log("Password changed successfully.");
    } else {
      console.log("Incorrect old password. Password not changed.");
    }
  }

   //Add an artwork to the artist's collection
  addArtwork(title, medium, year, desc, img) {
    const artwork = new Artwork(title, medium, year, this.name, this.ID, desc, img);
    this.Artwork.push(artwork);
  }

   //Edit an artwork
  editArtwork(artworkIndex, newTitle, newMedium, newYear, newName, newID, newDesc, newImage) {
    const artwork = this.Artwork[artworkIndex];
     if (artwork) {
      artwork.title = newTitle || artwork.title;
      artwork.medium = newMedium || artwork.medium;
      artwork.year = newYear || artwork.year;
      artwork.authorName = newName || artwork.authorName; 
      artwork.authorID = newID || artwork.authorID;
      artwork.description = newDesc || artwork.description;
      artwork.image = newImage || artwork.image;

      console.log("Artwork edited successfully.");
    } else {
      console.log("Artwork not found.");
    }
  }

  // Find an artwork by title
  findArtworkByTitle(title) {
    const foundArtwork = this.Artwork.find(artwork => artwork.getTitle() === title);

    if (foundArtwork) {
      console.log(`Artwork found: ${foundArtwork.getTitle()}`);
    } else {
      console.log(`Artwork with title '${title}' not found.`);
    }

    return foundArtwork;
  }

  //Delete an artwork
  deleteArtwork(artworkIndex) {
    if (artworkIndex >= 0 && artworkIndex < this.Artwork.length) {
      this.Artwork.splice(artworkIndex, 1);
      console.log("Artwork deleted successfully.");
    } else {
      console.log("Artwork not found.");
    }
  }

  //Add a follower
  addFollower(follower) {
    // Check if the follower is not already in the followers list
    if (!this.followers.includes(follower)) {
      this.followers.push(follower);
      console.log(`${follower.name} is now following ${this.name}.`);
    } else {
      console.log(`${follower.name} is already a follower.`);
    }
  }

  //Follow another artist
  follow(artist) {
     // Check if the artist is not already in the following list
    if (!this.following.includes(artist)) {
      this.following.push(artist);
      artist.addFollower(this); // Notify the followed artist that they have a new follower
      console.log(`Followed ${artist.name} successfully.`);
    } else {
      console.log(`${artist.name} is already in the following list.`);
    }
  }

  //Unfollow an artist
  unfollow(artist) {
    const index = this.following.indexOf(artist);
    if (index !== -1) {
      this.following.splice(index, 1);
      artist.removeFollower(this); // Notify the unfollowed artist that they lost a follower
      console.log(`Unfollowed ${artist.name} successfully.`);
    } else {
      console.log("Artist not found in following list.");
    }
  }

  // Remove a follower
  removeFollower(follower) {
    const index = this.followers.indexOf(follower);
    if (index !== -1) {
      this.followers.splice(index, 1);
      console.log(`${follower.name} unfollowed ${this.name}.`);
    } else {
      console.log(`${follower.name} is not a follower.`);
    }
  }
  
  //Set profile picture
  setProfilePicture(profilePicture) {
    this.profilePicture = profilePicture;
  }

  //Change the profile picture
  changeProfilePicture(newProfilePicture) {
    this.profilePicture = newProfilePicture;
    console.log("Profile picture changed successfully.");
  }

  //Remove the profile picture
  removeProfilePicture() {
    this.profilePicture = null;
    console.log("Profile picture removed successfully.");
  }

  //Like an artwork
  likeArtwork(artwork) {
    this.likes.push(artwork);
  }
}

 /*Example: working
 console.log('This is an example:');
 const artist = Artist.createProfile("John Doe", 200501, "john.doe@example.com", "password123");
 const artist2 = Artist.createProfile("Mary", 200501, "thatMary@example.com", "password321");
 artist.addArtwork("Sunset", "Oil on Canvas", 2021, "A beautiful sunset painting", null);
 artist.addArtwork("Abstract", "Acrylic on Paper", 2022, "An abstract art piece", null);

 
 console.log(artist);
 artist.follow(artist2);
 artist.unfollow(artist2); 
 artist.changeName("John Smith");
 artist.changePassword("password123", "newpassword456");
 artist.editArtwork(0, "New Sunset", "watercolors", 2021, artist.name, artist.ID, "A pretty sunset painting", null);
 artist.deleteArtwork(1);
 
 artist.setProfilePicture("https://example.com/new-profile.jpg");
 artist.removeProfilePicture();
 artist2.follow(artist);

 console.log(artist);
 console.log(artist2)*/