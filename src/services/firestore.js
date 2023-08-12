import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

let cachedGearList = null;

export async function getGearList(forceUpdate) {
  if (cachedGearList && !forceUpdate) {
    return cachedGearList;
  }
  const result = [];
  const querySnapshot = await getDocs(collection(db, "gear"));
  querySnapshot.forEach((doc) => {
    result.push({ ...doc.data(), id: doc.id });
  });
  cachedGearList = result;
  return result;
}

export async function editGearItem(id, data) {
  await updateDoc(doc(db, "gear", id), data);
}

export async function deleteGearItem(id) {
  await deleteDoc(doc(db, "gear", id));
}

export async function addGearItems(items) {
  await items.forEach((item) => {
    addDoc(collection(db, "gear"), item);
  });
}

export async function getProjectsList() {
  return [
    {
      title: "Interview scene",
      dates: ["2023-08-15"],
      gearList: {
        "Sennheiser EW 122P-G3 (rx) wireless": 4,
        "Sennheiser EW 122P-G3 (tx) wireless": 4,
        "Sennheiser MKE-2 Gold lavalier mic": 3,
        "Neumann KMR-82i shotgun mic": 1,
        "Zoom F8 field recorder": 1,
        "K-tek Boompole": 1,
      },
      priceList: {
        "Sennheiser EW 122P-G3 (rx)": 1600,
        "Sennheiser EW 122P-G3 (tx)": 1600,
        "Sennheiser MKE-2 Gold": 1950,
        "Neumann KMR-82i": 1800,
        "Zoom F8": 1700,
        "K-tek Boompole": 0,
        engineer: 8000,
      },
      notes: "Don't forget batteries\nPassport is required!",
      location: "Bolshaya Novodmitrovskaya, 2",
      contacts: [{ name: "Oleg", role: "producer", tel: "+79121234567" }],
      engineer: { name: "Mikhail", tel: "+79121234567" },
      helpers: [{ name: "Zhenya", tel: "+79998463971" }],
      id: "1",
    },
    {
      title: "Voiceover Session",
      dates: ["2023-08-20"],
      gearList: {
        "Neumann TLM 103": 2,
        "Focusrite Scarlett 2i2": 1,
        "Pop Filter": 2,
        "Sennheiser HD 280 Pro": 3,
        "Mic Stand": 2,
      },
      priceList: {
        "Neumann TLM 103": 1200,
        "Focusrite Scarlett 2i2": 150,
        "Pop Filter": 40,
        "Sennheiser HD 280 Pro": 100,
        "Mic Stand": 40,
        "Voiceover Talent": 500,
      },
      notes: "Script provided\nSetup time: 1 hour",
      location: "Studio 5A, SoundWorks Studios",
      contacts: [
        { name: "Alexandra", role: "producer", tel: "+79125551234" },
        { name: "Michael", role: "sound engineer", tel: "+79127774321" },
      ],
      engineer: { name: "Olga", tel: "+79129998888" },
      helpers: [],
      id: "2",
    },
    {
      title: "Outdoor Music Festival",
      dates: ["2023-09-10", "2023-09-11"],
      gearList: {
        "Midas M32": 1,
        "JBL SRX835P Speakers": 4,
        "Shure SM58": 5,
        "Wireless Microphone System": 2,
        "Stage Monitors": 6,
        "Power Generators": 2,
        "Lighting Rig": 1,
      },
      priceList: {
        "Midas M32": 4000,
        "JBL SRX835P Speakers": 2000,
        "Shure SM58": 100,
        "Wireless Microphone System": 500,
        "Stage Monitors": 600,
        "Power Generators": 1500,
        "Lighting Rig": 800,
        "Sound Engineer (per day)": 1000,
        "Lighting Technician (per day)": 800,
      },
      notes: "Rain contingency plan required\nFood vendors booked",
      location: "Greenfield Park, Main Stage",
      contacts: [
        { name: "Natalia", role: "event manager", tel: "+79129997766" },
        { name: "Dmitri", role: "technical director", tel: "+79128889900" },
      ],
      engineer: { name: "Vladimir", tel: "+79126663333" },
      helpers: [
        { name: "Ivan", tel: "+79998887777" },
        { name: "Elena", tel: "+79996665555" },
      ],
      id: "3",
    },
    {
      title: "Podcast Recording",
      dates: ["2023-08-25", "2023-08-26"],
      gearList: {
        "Rode PodMic": 3,
        "Behringer UMC22": 1,
        Headphones: 4,
        "Mic Arm Stand": 3,
        "Pop Filters": 3,
        "XLR Cables": 5,
      },
      priceList: {
        "Rode PodMic": 100,
        "Behringer UMC22": 60,
        Headphones: 30,
        "Mic Arm Stand": 40,
        "Pop Filters": 15,
        "XLR Cables": 10,
        "Podcast Host": 300,
        "Audio Editor (per episode)": 50,
      },
      notes: "Guest interview scheduled\nDiscussion topics provided",
      location: "Studio C, Audio Haven",
      contacts: [
        { name: "Sophia", role: "producer", tel: "+79121112233" },
        { name: "John", role: "sound engineer", tel: "+79123334455" },
      ],
      engineer: { name: "Emily", tel: "+79126669999" },
      helpers: [],
      id: "4",
    },
    {
      title: "Live Music Gig",
      dates: ["2023-08-25"],
      gearList: {
        "Soundcraft Si Impact": 1,
        "QSC K12.2 Speakers": 2,
        "Shure Beta 58A": 4,
        "In-Ear Monitor System": 1,
        "Guitar Amp": 2,
        "Drum Kit": 1,
        "Stage Lighting": 1,
      },
      priceList: {
        "Soundcraft Si Impact": 2500,
        "QSC K12.2 Speakers": 1200,
        "Shure Beta 58A": 150,
        "In-Ear Monitor System": 500,
        "Guitar Amp": 200,
        "Drum Kit": 500,
        "Stage Lighting": 800,
        "Sound Engineer": 800,
        "Stage Manager": 400,
      },
      notes: "Band's setlist received\nLoad-in time: 12:00 PM",
      location: "City Park Amphitheater",
      contacts: [
        { name: "David", role: "event coordinator", tel: "+79128887777" },
        { name: "Rachel", role: "band manager", tel: "+79129998888" },
      ],
      engineer: { name: "Alex", tel: "+79126663333" },
      helpers: [
        { name: "Mark", tel: "+79998887777" },
        { name: "Sarah", tel: "+79996665555" },
      ],
      id: "5",
    },
  ];
}
