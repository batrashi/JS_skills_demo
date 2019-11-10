function solve(input) {
    let concert = {
        bands: [],
        totalTime: 0,
    }

    //create band class
    class Band {
        constructor(name) {
            this.name = name;
            this.members = [];
            this.time = 0;
        }
    }

    //read commands
    for (let i = 0; i < input.length; i++) {
        let command = input[i];

        //valid commands
        if (command !== `start of concert`) {
            //ADD command
            if (command.includes(`Add;`)) {
                let addCommand = command.split(`; `).slice(1);
                let bandName = addCommand[0];
                let bandMembersArray = addCommand[1].split(`, `);

                //create band from ADD command
                let band = new Band(bandName);

                // add band if NOT in concert and push members
                if (!concert.bands.find(i => i.name === bandName)) {
                    for (let member of bandMembersArray) {
                        band.members.push(member);
                    }
                    concert.bands.push(band);
                } else if (concert.bands.find(i => i.name === bandName)) {
                    //add UNIQUE band members only
                    for (let member of bandMembersArray) {
                        if (!concert.bands.find(i => i.name === bandName).members.includes(member)) {
                            concert.bands.find(i => i.name === bandName).members.push(member);
                        }
                    }
                }
                //PLAY command
            } else if (command.includes(`Play;`)) {
                let playCommand = command.split(`; `).slice(1);
                let bandPlay = playCommand[0];
                let bandPlayTime = Number(playCommand[1]);

                //add band if not existing
                if (!concert.bands.find(i => i.name === bandPlay)) {
                    let band = new Band(bandPlay);
                    band.time += bandPlayTime;
                    concert.bands.push(band);
                    //update PLAYTIME if band exist
                } else if (concert.bands.find(i => i.name === bandPlay)) {
                    concert.bands.find(i => i.name === bandPlay).time += bandPlayTime;
                }
            }
        }
    }

    //calculate TOTAL concert time
    for (let band of concert.bands) {
        concert.totalTime += band.time;
    }

    //sort bands by time on stage descending and then by name ascending
    function sortBandsByTime(a, b) {
        if (a.time !== b.time) {
            return b.time - a.time;
        } else {
            return a.name.localeCompare(b.name);
        }
    }

    concert.bands.sort(sortBandsByTime);

    //print result
    console.log(`Total time: ${concert.totalTime}`);
    for (let band of concert.bands) {
        console.log(`${band.name} -> ${band.time}`);
    }

    if (concert.bands.find(i => i.name === input[input.length - 1])) {
        let bandToDisplay = concert.bands.find(i => i.name === input[input.length - 1]);
        console.log(bandToDisplay.name);

        for (let member of bandToDisplay.members) {
            console.log(`=> ${member}`);
        }
    }

}