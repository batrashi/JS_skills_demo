function solve(input) {
    for (let i = 0; i < input.length; i++) {
        let command = input[i];

        //create artist and song
        if (command !== `end`) {
            let artistSongArray = command.split(`:`);
            let artist = artistSongArray[0];
            let song = artistSongArray[1];

            //check if ARTIST is valid
            //starts with capital letter, followed by lowercase letters
            //Can also contain apostrophe( ' ), and whitespace " "

            let artistValid = false;
            let capitalRegEx = new RegExp(/^[A-Z]/);
            let lowerApoWhiteRegEx = new RegExp(/[^a-z'\s]/, `g`);

            if (capitalRegEx.test(artist)) {
                let stringExceptCapital = artist.slice(1);
                if (!lowerApoWhiteRegEx.test(stringExceptCapital)) {
                    artistValid = true;
                }
            }

            //check if SONG is valid
            //contains only capital letters, and whitespaces

            let songValid = false;
            let capitalWhiteRegEx = new RegExp(/[^A-Z\s]/, `g`);

            if (!capitalWhiteRegEx.test(song)) {
                songValid = true;
            }

            //check if line is valid: artist + song
            if (artistValid && songValid) {
                //encrypt
                let key = artist.length;

                //encrypt ARTIST
                let encryptedArtist = ``;
                for (let char of artist) {
                    if (char !== ` ` && char !== `'`) {
                        let encryptedCharCode = char.charCodeAt(0);
                        let incrementedCharCode = 0;

                        if (encryptedCharCode >= 65 && encryptedCharCode <= 90) {
                            if (encryptedCharCode + key > 90) {
                                incrementedCharCode = 65 + ((encryptedCharCode + key) - 90 - 1);
                                encryptedArtist += String.fromCharCode(incrementedCharCode);
                            } else {
                                incrementedCharCode += encryptedCharCode + key;
                                encryptedArtist += String.fromCharCode(incrementedCharCode);
                            }
                        } else if (encryptedCharCode >= 97 && encryptedCharCode <= 122) {
                            if (encryptedCharCode + key > 122) {
                                incrementedCharCode = 97 + ((encryptedCharCode + key) - 122 - 1);
                                encryptedArtist += String.fromCharCode(incrementedCharCode);
                            } else {
                                incrementedCharCode += encryptedCharCode + key;
                                encryptedArtist += String.fromCharCode(incrementedCharCode);
                            }
                        }
                    } else if (char === ` ` || char === `'`) {
                        encryptedArtist += char;
                    }
                }

                //encrypt SONG
                let encryptedSong = ``;
                for (let char of song) {
                    if (char !== ` ` && char !== `'`) {
                        let encryptedCharCode = char.charCodeAt(0);
                        let incrementedCharCode = 0;

                        if (encryptedCharCode >= 65 && encryptedCharCode <= 90) {
                            if (encryptedCharCode + key > 90) {
                                incrementedCharCode = 65 + ((encryptedCharCode + key) - 90 - 1);
                                encryptedSong += String.fromCharCode(incrementedCharCode);
                            } else {
                                incrementedCharCode += encryptedCharCode + key;
                                encryptedSong += String.fromCharCode(incrementedCharCode);
                            }
                        } else if (encryptedCharCode >= 97 && encryptedCharCode <= 122) {
                            if (encryptedCharCode + key > 122) {
                                incrementedCharCode = 97 + ((encryptedCharCode + key) - 122 - 1);
                                encryptedSong += String.fromCharCode(incrementedCharCode);
                            } else {
                                incrementedCharCode += encryptedCharCode + key;
                                encryptedSong += String.fromCharCode(incrementedCharCode);
                            }
                        }
                    } else if (char === ` ` || char === `'`) {
                        encryptedSong += char;
                    }
                }
                //Print result
                console.log(`Successful encryption: ${encryptedArtist}@${encryptedSong}`);
            } else {
                console.log(`Invalid input!`);
            }
        } else {
            return;
        }
    }
}