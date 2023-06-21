import fruits from "./assets/lostItems/fruits.jpg";
import hydroflask from "./assets/lostItems/hydroflask.jpg";
import key from "./assets/lostItems/key.jpg";
import laptopSleeve from "./assets/lostItems/laptop sleeve.jpg";
import necklace from "./assets/lostItems/necklace.jpg";
import phone from "./assets/lostItems/phone.jpg";
import sonyEarbud from "./assets/lostItems/sony earbud.jpg";
import wallet from "./assets/lostItems/wallet.jpg";
import watch from "./assets/lostItems/watch.jpg";

const LostData = [
  {
    id: crypto.randomUUID(),
    owner: "Zendeya",
    founder: null,
    returned: false,
    dateReported: new Date("2015-03-25"),
    itemName: "Fruits",
    itemPicture: fruits,
    colour: "colourful",
    location: "Bus D1",
  },
  {
    id: crypto.randomUUID(),
    owner: "YanTing",
    founder: null,
    returned: false,
    dateReported: new Date("2020-04-21"),
    itemName: "Hydroflask",
    itemPicture: hydroflask,
    colour: "Pink",
    location: "Utown",
  },
  {
    id: crypto.randomUUID(),
    owner: "Wanning",
    founder: null,
    returned: false,
    dateReported: new Date("2001-11-01"),
    itemName: "watch",
    itemPicture: watch,
    colour: "Pink",
    location: "Techno Edge",
  },
  {
    id: crypto.randomUUID(),
    owner: "Vanessa",
    founder: null,
    returned: false,
    dateReported: new Date("2021-06-02"),
    itemName: "Key",
    itemPicture: key,
    colour: "Silver",
    location: "Sheares Hall",
  },
  {
    id: crypto.randomUUID(),
    owner: "Uganda",
    founder: null,
    returned: false,
    dateReported: new Date("2022-01-01"),
    itemName: "Laptop Sleeve",
    itemPicture: laptopSleeve,
    colour: "Black",
    location: "S16",
  },
  {
    id: crypto.randomUUID(),
    owner: "Tytus",
    founder: null,
    returned: false,
    dateReported: new Date("2023-04-24"),
    itemName: "Necklace",
    itemPicture: necklace,
    colour: "Gold",
    location: "COM3",
  },
  {
    id: crypto.randomUUID(),
    owner: "Sinner",
    founder: null,
    returned: false,
    dateReported: new Date("2013-05-17"),
    itemName: "Iphone",
    itemPicture: phone,
    colour: "Silver",
    location: "AS7",
  },
  {
    id: crypto.randomUUID(),
    owner: "Ryan",
    founder: null,
    returned: false,
    dateReported: new Date("2019-09-21"),
    itemName: "Sony Earbud",
    itemPicture: sonyEarbud,
    colour: "White",
    location: "Museum",
  },
  {
    id: crypto.randomUUID(),
    owner: "Quan quan",
    founder: null,
    returned: false,
    dateReported: new Date("2018-03-03"),
    itemName: "Wallet",
    itemPicture: wallet,
    colour: "black",
    location: "Science Pitstop",
  },
];

export default LostData;
