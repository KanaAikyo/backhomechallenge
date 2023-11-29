import { skipPartiallyEmittedExpressions } from "typescript";
import fs from "fs/promises";
// import * as data from './data.json'
interface ModifiedData {
  blockNum: number;
  mark: string;
}
//class function i am not sure what is the perpous to use them
async function main() {
  printMap();
  console.log("---End of Map---");
}
async function mappoing(cityName: any) {
  try {
    const fileData = await fs.readFile("data.json", "utf-8");
    const parsedData = JSON.parse(fileData);

    const modifiedHouseholds = parsedData.city[cityName].households.map(
      (household: any) => {
        const isAnyNotVaccinated = household.inhabitants.some(
          (inhabitant: any) => !inhabitant.isVaccinated
        );

        return {
          blockNum: household.blockNum,
          mark: isAnyNotVaccinated ? "H" : "F",
        } as ModifiedData;
      }
    );
    const modifiedClinic = parsedData.city.Burnaby.clinics.map((c: any) => {
      return { blockNum: c.blockNum, mark: "C" } as ModifiedData;
    });
    const combinesObject = [...modifiedClinic, ...modifiedHouseholds];
    const sorted = combinesObject.sort((a, b) => a.blockNum - b.blockNum);
    const Maps = sorted.map((s) => s.mark);
    return Maps;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

async function printMap() {
  const Burnaby = await mappoing("Burnaby");
  const Vancouver = await mappoing("Vancouver");
  const Richmond = await mappoing("Richmond");

  while (Burnaby.length < 6) {
    Burnaby.push("X");
  }
  while (Vancouver.length < 6) {
    Vancouver.push("X");
  }
  while (Richmond.length < 6) {
    Richmond.push("X");
  }

  // // Combine the maps and print them in groups of 6
  const combinedMaps = [...Burnaby, ...Vancouver, ...Richmond];

  for (let i = 0; i < combinedMaps.length; i += 6) {
    const currentArray = combinedMaps.slice(i, i + 6).join(", ");
    console.log(currentArray);
  }
}

// map.registerForShots();
// const report = new ReportMaker(new ComplexReport(map));
// report.printDetails();
// console.log("---End of Report---")
// map.printMap();

main();

// main();

//   Clinic
//   Person
//   Household
