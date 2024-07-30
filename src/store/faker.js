import faker from "@faker-js/faker";

const createData = (name, price, qty, med_type, schedule_type, img) => {
  return {
    name,
    price,
    qty,
    med_type,
    schedule_type,
    img,
  };
};

const generateMedicineData = (count) => {
  const medicineTypes = ["Tablet", "Syrup", "Capsule", "Injection", "Cream"];
  const scheduleTypes = ["Morning", "Evening", "Before Meal", "After Meal"];

  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(
      createData(
        faker.commerce.productName(),
        faker.commerce.price(),
        faker.random.number({ min: 1, max: 100 }),
        medicineTypes[
          faker.random.number({ min: 0, max: medicineTypes.length - 1 })
        ],
        scheduleTypes[
          faker.random.number({ min: 0, max: scheduleTypes.length - 1 })
        ],
        // Replace with actual image handling or placeholder
        `https://picsum.photos/200/200?random=${i}` // Placeholder image
      )
    );
  }
  return data;
};

const MedsrowsData = generateMedicineData(20);
debugger;
console.log(MedsrowsData);

export default MedsrowsData;
