
/*Goal
THEY put you in a square shape room, with N meters on each side.
THEY want to know everything about you.
THEY are observing you.
THEY placed some candles in the room.

Every candle makes L "light" in the spot they are, and every spot in square shape gets one less "light" as the next ones.If a spot is touched by two candles, it will have the larger "light" it can have.Every spot has the base light of 0.

You can hide only, if you find a dark spot which has 0 "light".
How many dark spots you have ?

    You will receive a map of the room, with the empty places(X) and Candles(C) in N rows, each character separated by a space.

Example for the light spread N = 5, L = 3:
X X X X X
X C X X X
X X X X X
X X X X X
X X X X X

2 2 2 1 0
2 3 2 1 0
2 2 2 1 0
1 1 1 1 0
0 0 0 0 0
Input
Line 1: An integer N for the length of one side of the room.
    Line 2: An integer L for the base light of the candles.
Next N lines: N number of characters(as c), separated by one space.
    Output
Line 1 : The number of places with zero light.
    Constraints
0 < N <= 25
0 < L < 10
Example
Input
5
3
X X X X X
X C X X X
X X X X X
X X X X X
X X X X X
Output
9
*/

const N = parseInt(readline());
const L = parseInt(readline());
let roomMap = [];
let shadows = 0;

for (let i = 0; i < N; i++) {
    const LINE = readline();
    roomMap.push(LINE.split(' '));
}

for (let i = 0; i < roomMap.length; i++) {

    for (let j = 0; j < roomMap[i].length; j++) {
        let spot = roomMap[i][j];

        if (spot === `C`) {

            for (let k = i - L + 1; k < i + L; k++) {
                for (let m = j - L + 1; m < j + L; m++) {

                    if (roomMap[k] && roomMap[m]) {
                        if ((roomMap[k][m] === `X`) || (typeof roomMap[k][m] === `number` && roomMap[k][m] < L - Math.max(Math.abs(i - k), Math.abs(j - m)))) {
                            roomMap[k][m] = L - Math.max(Math.abs(i - k), Math.abs(j - m));
                        }
                    }
                }
            }
        }
    }
}

for (let i = 0; i < roomMap.length; i++) {
    for (let j = 0; j < roomMap.length; j++) {
        if (roomMap[i][j] === `X`) {
            shadows++;
        }
    }
}

console.log(shadows);