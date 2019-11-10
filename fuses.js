
/*Goal
You are going to write a program to predict whether a specific usage pattern of electrical appliances will cause the main fuse to blow.

You have three pieces of data.
1. There are n appliances in a room, each of them has an electrical current consumption value.
2. A usage pattern: you will click the power buttons of a list of appliances in a sequence, totally m clicks.Each click on a button will toggle the power status - when the power is OFF, a click will turn it ON.The next click will turn it OFF.
3. The capacity of the main fuse c in amperes[A].

The fuse will be blown if the sum of the consumed current of turned - on devices at some point exceeds the capacity of the main fuse c.

At the beginning, all appliances are OFF.
    Input
Line 1: Integers n m c, separated by a space
n is the number of devices, assume the devices have IDs from 1 to n
m is the number of button - clicking going to happen
c is the capacity of the main fuse in amperes[A]

Line 2: n integers, space separated, representing the electrical current consumption value of each appliance, listed from ID 1 to n

Line 3: m integers, space separated - a sequence of ID# you are going to click power buttons, that will toggle the device status in that exact sequence.
    Output
If the fuse was blown during the operation sequence, output one line:
Fuse was blown.

If the fuse did not blow, find the maximal consumed power by turned - on devices that occurred during the sequence.Output two lines:
Fuse was not blown.
Maximal consumed current was ?? A.

Follow examples of test cases for the expected format.
    Constraints
n and m are below 100
c is below 10000
Example
Input
5 2 10
11 6 11 10 10
3 3
Output
Fuse was blown.
*/

var inputs = readline().split(' ');
const n = parseInt(inputs[0]);
const m = parseInt(inputs[1]);
const c = parseInt(inputs[2]);

let appliances = [];

var inputs = readline().split(' ');
for (let i = 0; i < n; i++) {
    const nx = parseInt(inputs[i]);
    let device = {
        power: nx,
        status: false,
        id: i + 1
    }
    appliances.push(device);
}

let pressIdSeq = [];

var inputs = readline().split(' ');
for (let i = 0; i < m; i++) {
    const mx = parseInt(inputs[i]);
    pressIdSeq.push(mx);
}

let maxConsumption = Number.MIN_SAFE_INTEGER;
let consumption = 0;

for (let i = 0; i < pressIdSeq.length; i++) {
    let deviceId = pressIdSeq[i];
    let currentDevice = appliances.find(el => el.id === deviceId)

    if (currentDevice.status === false) {
        consumption += currentDevice.power;
        currentDevice.status = true;
    } else {
        consumption -= currentDevice.power;
        currentDevice.status = false;
    }

    if (consumption > maxConsumption) {
        maxConsumption = consumption;
    }

    if (consumption > c) {
        console.log(`Fuse was blown.`);
        break;
    } else if (i === pressIdSeq.length - 1) {
        console.log(`Fuse was not blown.`);
        console.log(`Maximal consumed current was ${maxConsumption} A.`);
    }
}