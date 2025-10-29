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
  dateOfBirth?: string | Date;
  firstName?: string;
  lastName?: string;
  eMail?: string;
  role?: string;
  houseNumber?: string;
  employeeNumber?: string;
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

  constructor(data?: UserData) {
    if (data) {
      this.firstName = data.firstName ?? '';
      this.lastName = data.lastName ?? '';
      this.role = data.role ?? '';
      this.eMail = data.eMail ?? '';
      if (data.address) {
        const match = data.address.match(/^(.+?)\s?(\d+\s?[a-zA-Z]?)$/);
        if (match) {
          this.address = match[1].trim();
          this.houseNumber = match[2].trim();
        } else {
          this.address = data.address;
          this.houseNumber = '';
        }
      } else {
        this.address = '';
        this.houseNumber = '';
      }
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
