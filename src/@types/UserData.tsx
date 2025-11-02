export interface UserData {
  address?: string;
  phoneNumber?: string;
  matriculationNumber?: string;
  degreeProgram?: string;
  semester?: number;
  studyStatus?: string;
  cohort?: string;
  title?: string;
  fieldChair?: string;
  employmentStatus?: string;
  department?: string;
  officeNumber?: string;
  workingTimeModel?: string;
  dateOfBirth?: string | Date | null;
  firstName?: string;
  lastName?: string;
  eMail?: string;
  role?: string;
  houseNumber?: string;
  employeeNumber?: string;
  city?: string;
  postalCode?: string;
}

export class User {
  firstName: string = '';
  lastName: string = '';
  eMail: string = '';
  dateOfBirth: Date | null = null;
  address: string = '';
  phoneNumber: string = '';
  role: string = '';
  houseNumber: string = '';
  city: string = '';
  postalCode: string = '';

  constructor(data?: UserData) {
    if (data) {
      this.firstName = data.firstName ?? '';
      this.lastName = data.lastName ?? '';
      this.role = data.role ?? '';
      this.eMail = data.eMail ?? '';
      const parsedAddress = parseAddress(data.address);
      this.address = parsedAddress?.street ?? '';
      this.houseNumber = parsedAddress?.houseNumber ?? '';
      this.city = parsedAddress?.city ?? '';
      this.postalCode = parsedAddress?.postalCode ?? '';
      this.phoneNumber = data.phoneNumber ?? '';
      if (data.dateOfBirth) {
        this.dateOfBirth =
          typeof data.dateOfBirth === 'string'
            ? new Date(data.dateOfBirth)
            : data.dateOfBirth;
      }
    }
  }
}

export class Student extends User {
  matriculationNumber: string = '';
  degreeProgram: string = '';
  semester: number = 0;
  studyStatus: string = '';
  cohort: string = '';

  constructor(data?: UserData) {
    super(data);
    if (data) {
      this.matriculationNumber = data.matriculationNumber ?? '';
      this.degreeProgram = data.degreeProgram ?? '';
      this.semester = data.semester ?? 0;
      this.studyStatus = data.studyStatus ?? '';
      this.cohort = data.cohort ?? '';
    }
  }
}

export class Lecturer extends User {
  title: string = '';
  fieldChair: string = '';
  employmentStatus: string = '';

  constructor(data?: UserData) {
    super(data);
    if (data) {
      this.title = data.title ?? '';
      this.fieldChair = data.fieldChair ?? '';
      this.employmentStatus = data.employmentStatus ?? '';
    }
  }
}

export class Employee extends User {
  department: string = '';
  officeNumber: string = '';
  workingTimeModel: string = '';
  employeeNumber: string = '';

  constructor(data?: UserData) {
    super(data);
    if (data) {
      this.department = data.department ?? '';
      this.officeNumber = data.officeNumber ?? '';
      this.workingTimeModel = data.workingTimeModel ?? '';
      this.employeeNumber = data.employeeNumber ?? '';
    }
  }
}

export function parseAddress(text: string | undefined): {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
} | null {
  if (!text) return null;

  // Normalize dashes and trim
  const cleaned = text.replace(/[—–]/g, "-").trim();

  // Use single-line regex strings (no literal newlines!)
  // If your runtime supports Unicode property escapes, \p{L}\p{N} is robust with the 'u' flag.
  const patterns: RegExp[] = [
    // Full address: "Street HouseNumber, PostalCode City"
    new RegExp(
      "^\\s*(?<street>[\\p{L}\\p{N}.'\\- ]+?)\\s+(?<houseNumber>\\d+[a-zA-Z]?(?:\\s*[-–]\\s*\\d+[a-zA-Z]?)?)\\s*[,;–—]?\\s*(?<postalCode>\\d{5})\\s+(?<city>[^\\n,]+?)\\s*$",
      "iu"
    ),
    // Line-break variant between house number and postal code
    new RegExp(
      "^\\s*(?<street>[\\p{L}\\p{N}.'\\- ]+?)\\s+(?<houseNumber>\\d+[a-zA-Z]?(?:\\s*[-–]\\s*\\d+[a-zA-Z]?)?)\\s*[,;]?\\s*(?:\\n|\\r\\n|\\r)+\\s*(?<postalCode>\\d{5})\\s+(?<city>[^\\n,]+?)\\s*$",
      "iu"
    ),
    // Fallback: only "Street HouseNumber"
    new RegExp(
      "^\\s*(?<street>[\\p{L}\\p{N}.'\\- ]+?)\\s+(?<houseNumber>\\d+[a-zA-Z]?(?:\\s*[-–]\\s*\\d+[a-zA-Z]?)?)\\s*$",
      "iu"
    ),
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);
    if (match && match.groups) {
      const street = normalizeStreet(match.groups.street ?? "");
      const houseNumber = (match.groups.houseNumber ?? "").replace(/\s+/g, "");
      const postalCode = match.groups.postalCode ?? "";
      const city = match.groups.city ? normalizeCity(match.groups.city) : "";
      // console.log("Parsed:", { street, houseNumber, postalCode, city });
      return { street, houseNumber, postalCode, city };
    }
  }

  return null;
}

function normalizeStreet(value: string): string {
  // Keep German street names; only tidy spacing and expand common "Str." abbreviation
  return value.replace(/\bstr\.\b/gi, "Straße").replace(/\s{2,}/g, " ").trim();
}

function normalizeCity(value: string): string {
  return value.replace(/\s{2,}/g, " ").trim();
}

console.log(parseAddress("Test Address 2"));
// { street: "Test Address", houseNumber: "2", postalCode: "", city: "" }

console.log(parseAddress("Musterstraße 12, 12345 Berlin"));
// { street: "Musterstraße", houseNumber: "12", postalCode: "12345", city: "Berlin" }

console.log(parseAddress("Am Markt 5-7\n12345 Hamburg"));
// { street: "Am Markt", houseNumber: "5-7", postalCode: "12345", city: "Hamburg" }