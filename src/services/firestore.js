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
  return dummyData;
}

const dummyData = [
  {
    title: "Interview scene",
    dates: ["2023-08-15"],
    details: {
      notes: "Don't forget batteries\nPassport is required!",
      location: "Bolshaya Novodmitrovskaya, 2",
      contacts: [
        { name: "Oleg", role: "producer", tel: "+79121234567" },
        { role: "admin", tel: "+79121234567" },
      ],
      engineer: { name: "Mikhail" },
      helpers: [
        { name: "Zhenya", tel: "+79998463971" },
        { name: "Zhenya", tel: "+79998463971" },
      ],
    },
    gearList: [
      {
        model: "Sennheiser EW 122P-G3 (rx)",
        type: "wireless",
        priceday: 400,
        qty: 4,
        id: "VMQGWB0Wjcek6n72xMhj",
      },
      {
        model: "Sennheiser EW 122P-G3 (tx)",
        type: "wireless",
        priceday: 400,
        qty: 4,
        id: "ZJKF1jXMQgFdzbJ75xcD",
      },
      {
        model: "Sennheiser MKE-2 Gold",
        type: "lavalier mic",
        priceday: 650,
        qty: 3,
        id: "on6BJWf0ykE1nH93KSRZ",
      },
      {
        model: "Zoom F8",
        type: "field recorder",
        priceday: 1700,
        qty: 4,
        id: "r2XGcN1FbqMkuyP5hEHT",
      },
    ],
    extras: [
      {
        name: "Engineer",
        price: 8000,
      },
      {
        name: "Lighting equipment",
        qty: 2,
        price: 1000,
      },
    ],
    id: "12345",
  },
  {
    title: "Studio Interview",
    dates: ["2023-08-20"],
    details: {
      notes: "Bring backup camera\nPrepare interview questions",
      location: "Studio 4A, SoundStage Studios",
      contacts: [
        { name: "Emily", role: "producer", tel: "+79127654321" },
        { role: "admin", tel: "+79127654321" },
      ],
      engineer: { name: "Alex" },
      helpers: [{ name: "Sarah", tel: "+79995551234" }],
    },
    gearList: [
      {
        model: "Canon EOS R5",
        type: "camera",
        priceday: 1200,
        qty: 1,
        id: "abcd12345",
      },
      {
        model: "Rode NTG3",
        type: "shotgun mic",
        priceday: 350,
        qty: 1,
        id: "efgh67890",
      },
      {
        model: "Manfrotto 504HD",
        type: "tripod",
        priceday: 200,
        qty: 2,
        id: "ijkl13579",
      },
    ],
    extras: [
      {
        name: "Makeup Artist",
        price: 500,
      },
      {
        name: "Backdrop",
        qty: 1,
        price: 300,
      },
    ],
    id: "67890",
  },
  {
    title: "Outdoor Interview",
    dates: ["2023-08-18"],
    details: {
      notes: "Check weather forecast\nBring sunshades",
      location: "Riverside Park",
      contacts: [
        { name: "David", role: "producer", tel: "+79123456789" },
        { role: "admin", tel: "+79123456789" },
      ],
      engineer: { name: "Olivia" },
      helpers: [{ name: "Jake", tel: "+79998887777" }],
    },
    gearList: [
      {
        model: "Sony A7S III",
        type: "camera",
        priceday: 1400,
        qty: 1,
        id: "mnop54321",
      },
      {
        model: "Rode Wireless Go II",
        type: "wireless mic",
        priceday: 300,
        qty: 2,
        id: "qrst23456",
      },
      {
        model: "Manfrotto Befree",
        type: "tripod",
        priceday: 150,
        qty: 3,
        id: "uvwx56789",
      },
    ],
    extras: [
      {
        name: "Catering",
        price: 800,
      },
      {
        name: "Canopy Tent",
        qty: 1,
        price: 250,
      },
    ],
    id: "24680",
  },
  {
    title: "Virtual Interview",
    dates: ["2023-08-25"],
    details: {
      notes:
        "Test video conferencing software\nEnsure stable internet connection",
      location: "Online",
      contacts: [
        { name: "Sophia", role: "producer", tel: "+79187654321" },
        { role: "admin", tel: "+79187654321" },
      ],
      engineer: { name: "Ethan" },
      helpers: [],
    },
    gearList: [
      {
        model: "Logitech Brio",
        type: "webcam",
        priceday: 100,
        qty: 1,
        id: "abef78654",
      },
      {
        model: "Blue Yeti X",
        type: "USB microphone",
        priceday: 150,
        qty: 1,
        id: "cdgh98765",
      },
    ],
    extras: [
      {
        name: "Video Editor",
        price: 600,
      },
    ],
    id: "13579",
  },
  {
    title: "Documentary Interview",
    dates: ["2023-08-22"],
    details: {
      notes: "Prepare release forms\nReview interviewee's background",
      location: "Historical Museum",
      contacts: [
        { name: "Liam", role: "producer", tel: "+79154321678" },
        { role: "admin", tel: "+79154321678" },
      ],
      helpers: [],
    },
    gearList: [
      {
        model: "Blackmagic URSA Mini Pro 12K",
        type: "camera",
        priceday: 2000,
        qty: 1,
        id: "pjhg12345",
      },
      {
        model: "Sennheiser MKH 416",
        type: "shotgun mic",
        priceday: 400,
        qty: 1,
        id: "kilo23456",
      },
    ],
    extras: [
      {
        name: "Historical Props",
        qty: 3,
        price: 300,
      },
    ],
    id: "24601",
  },
  {
    title: "Roundtable Interview",
    dates: ["2023-08-28"],
    details: {
      notes: "Prepare release forms\nReview interviewee's background",
      location: "Historical Museum",
      contacts: [
        { name: "Liam", role: "producer", tel: "+79154321678" },
        { role: "admin", tel: "+79154321678" },
      ],
      engineer: { name: "Natalie", tel: "+79992223344" },
      helpers: [{ name: "Aiden", tel: "+79991112233" }],
    },
    gearList: [],
    extras: [],
    id: "98765",
  },
];
