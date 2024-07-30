import dummyImg from "./../assets/meds/dummy_med.jfif";
import { createContext, useReducer } from "react";

export const MedList = createContext({
  medList: [],
  addPost: () => {},
  deletePost: () => {},
});

const medListReducer = (currMedList, action) => {
  let newMedList = currMedList;
  if (action.type === "DELETE_POST") {
    newMedList = currMedList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newMedList = [action.payload, ...currMedList];
  }
  return newMedList;
};

export const createData = (
  name,
  price,
  qty,
  med_type,
  schedule_type,
  img = newMedsList
) => {
  return {
    name,
    price,
    qty,
    med_type,
    schedule_type,
    img,
  };
};

const dummyMedList = [
  createData("Paracelmol", 159, 6.0, "tablet", "Earnly Morning", dummyImg),
  createData("Calpol-500", 15, 1.0, "tablet", "Earnly Morning", dummyImg),
  createData(
    "diprean",
    237,
    9.0,
    "tablet",
    "Morning After Breakfast",
    dummyImg
  ),
  createData("vitamin-e", 262, 16.0, "tablet", "Evening", dummyImg),
  createData(
    "tosex syruo",
    305,
    3.7,
    "syrup",
    "Night before sleeping",
    dummyImg
  ),
  createData("vicks", 356, 16.0, "ointment", "any time", dummyImg),
];

const MedListProvider = ({ children }) => {
  const [medList, dispatchMedList] = useReducer(medListReducer, dummyMedList);

  const addMed = (name, price, qty, med_type, schedule_type, img) => {
    dispatchMedList({
      type: "ADD_MED",
      payload: createData(name, price, qty, med_type, schedule_type, img),
    });
  };

  const deleteMed = (medId) => {
    dispatchMedList({
      type: "DELETE_MED",
      payload: {
        medId,
      },
    });
  };

  return (
    <MedList.Provider value={{ medList, addMed, deleteMed }}>
      {children}
    </MedList.Provider>
  );
};

export default MedListProvider;
