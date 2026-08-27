import { MOCK_EQUIPMENT } from "@/lib/mock-data";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { Equipment } from "@/types/database";

const DATA_FILE = path.join(process.cwd(), "src", "data", "equipment.json");

export async function getLocalEquipment(): Promise<Equipment[]> {
  try {
    if (!existsSync(DATA_FILE)) {
      await saveLocalEquipment(MOCK_EQUIPMENT);
      return MOCK_EQUIPMENT;
    }
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data) as Equipment[];
  } catch (err) {
    console.error("Error reading local equipment:", err);
    return MOCK_EQUIPMENT;
  }
}

export async function saveLocalEquipment(list: Equipment[]): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}
