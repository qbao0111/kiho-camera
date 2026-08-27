import { MOCK_EQUIPMENT } from "@/lib/mock-data";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { Equipment } from "@/types/database";

const EQUIPMENT_DATA_FILE = path.join(process.cwd(), "src", "data", "equipment.json");
const REQUESTS_DATA_FILE = path.join(process.cwd(), "src", "data", "rental-requests.json");

export async function getLocalEquipment(): Promise<Equipment[]> {
  try {
    if (!existsSync(EQUIPMENT_DATA_FILE)) {
      await saveLocalEquipment(MOCK_EQUIPMENT);
      return MOCK_EQUIPMENT;
    }
    const data = await readFile(EQUIPMENT_DATA_FILE, "utf-8");
    return JSON.parse(data) as Equipment[];
  } catch (err) {
    console.error("Error reading local equipment:", err);
    return MOCK_EQUIPMENT;
  }
}

export async function saveLocalEquipment(list: Equipment[]): Promise<void> {
  const dir = path.dirname(EQUIPMENT_DATA_FILE);
  await mkdir(dir, { recursive: true });
  await writeFile(EQUIPMENT_DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export interface RentalRequestLead {
  id: string;
  customerName: string;
  phone: string;
  equipmentId?: string;
  equipmentName: string;
  rentalDate: string;
  returnDate: string;
  note?: string;
  source?: string;
  submittedAt: string;
  status?: string;
}

export async function getLocalRentalRequests(): Promise<RentalRequestLead[]> {
  try {
    if (!existsSync(REQUESTS_DATA_FILE)) {
      return [];
    }
    const data = await readFile(REQUESTS_DATA_FILE, "utf-8");
    return JSON.parse(data) as RentalRequestLead[];
  } catch (err) {
    console.error("Error reading local rental requests:", err);
    return [];
  }
}

export async function saveLocalRentalRequest(request: RentalRequestLead): Promise<void> {
  try {
    const list = await getLocalRentalRequests();
    list.unshift(request);
    const dir = path.dirname(REQUESTS_DATA_FILE);
    await mkdir(dir, { recursive: true });
    await writeFile(REQUESTS_DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local rental request:", err);
  }
}
