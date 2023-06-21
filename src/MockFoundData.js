import bottle from "./assets/foundItems/bottle.jpg";
import airpods from "./assets/foundItems/airpods.jpg";
import card from "./assets/foundItems/card.jpg";
import dino from "./assets/foundItems/dino.jpg";
import purpleBottle from "./assets/foundItems/lost bottle.jpg";
import cap from "./assets/foundItems/lost cap.jpg";
import laptop from "./assets/foundItems/lost laptop.jpg";
import charger from "./assets/foundItems/lost macbook charger.jpg";
import rightAirpod from "./assets/foundItems/lost right airpod.jpg";
import specs from "./assets/foundItems/lost spec.jpg";

const FoundData = [
  {
    id: crypto.randomUUID(),
    founder: "Alice",
    owner: null,
    returned: false,
    dateReported: new Date("2015-03-25"),
    itemName: "Nalgene bottle",
    itemPicture: bottle,
    colour: "blue",
    location: "Utown",
  },
  {
    id: crypto.randomUUID(),
    founder: "Bob",
    owner: null,
    returned: false,
    dateReported: new Date("2023-01-26"),
    itemName: "Airpods Pro with white case and black chain",
    itemPicture: airpods,
    colour: "white",
    location: "S17",
  },
  {
    id: crypto.randomUUID(),
    founder: "Christ",
    owner: null,
    returned: true,
    dateReported: new Date("2021-12-13"),
    itemName: "Dinosaur keychain",
    itemPicture: dino,
    colour: "green",
    location: "IT",
  },
  {
    id: crypto.randomUUID(),
    founder: "Deen",
    owner: null,
    returned: false,
    dateReported: new Date("2010-12-13"),
    itemName: "Student Card",
    itemPicture: card,
    colour: "-",
    location: "LT27 Busstop",
  },
  {
    id: crypto.randomUUID(),
    founder: "Elise",
    owner: null,
    returned: false,
    dateReported: new Date("2013-11-11"),
    itemName: "Nalgene bottle",
    itemPicture: purpleBottle,
    colour: "Purple",
    location: "Raffles Hall",
  },
  {
    id: crypto.randomUUID(),
    founder: "Farhan",
    owner: null,
    returned: false,
    dateReported: new Date("2016-1-19"),
    itemName: "Cap",
    itemPicture: cap,
    colour: "grey",
    location: "PGP bus stop",
  },
  {
    id: crypto.randomUUID(),
    founder: "Gia",
    owner: null,
    returned: false,
    dateReported: new Date("2019-9-13"),
    itemName: "Laptop",
    itemPicture: laptop,
    colour: "Grey",
    location: "CLB",
  },
  {
    id: crypto.randomUUID(),
    founder: "Hansel",
    owner: null,
    returned: false,
    dateReported: new Date("2023-12-13"),
    itemName: "Macbook charger",
    itemPicture: charger,
    colour: "White",
    location: "Lighthouse",
  },
  {
    id: crypto.randomUUID(),
    founder: "Issac",
    owner: null,
    returned: false,
    dateReported: new Date("2021-04-01"),
    itemName: "Right airpod",
    itemPicture: rightAirpod,
    colour: "White",
    location: "Utown starbucks",
  },
  {
    id: crypto.randomUUID(),
    founder: "Julia",
    owner: null,
    returned: false,
    dateReported: new Date("2042-12-15"),
    itemName: "Spectacles",
    itemPicture: specs,
    colour: "Pink",
    location: "Deck",
  },
];

export default FoundData;
