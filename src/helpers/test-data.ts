export const responses = [
    "The wheels on the bus go round and round",
    "The doors on the bus go open and shut",
    "The people on the bus go up and down",
    "The wipers on the bus go swish swish swish",
    "The driver on the bus goes move on back",
    "The lights on the bus go blink blink blink",
    "The horn on the bus goes beep beep beep",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus.",
    "Phasellus lobortis risus diam, nec elementum justo eleifend vitae.",
    "Maecenas accumsan egestas egestas. Aenean tempus blandit nulla, vehicula luctus nisl luctus in. Etiam egestas ullamcorper lorem ac vehicula.",
    "Phasellus nibh ex, luctus et ligula ac, aliquam pharetra nulla. Etiam nec urna porttitor",
    "Cras nec volutpat enim. Quisque sit amet ipsum id sapien iaculis lacinia eu nec urna. Sed eu pharetra justo. Nunc blandit, augue vitae consectetur ultrices",
];

export function getRandomResponse() {
    return responses[Math.floor(Math.random() * responses.length)];
}
