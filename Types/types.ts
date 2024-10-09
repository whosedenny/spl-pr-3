type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type TimeSlot = "8:30-10:00" | "10:15-11:45" |  "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
    id : number,
    name : string,
    department: string
}

type Classroom = {
    number: string,
    capasity: string,
    hasProfessor: boolean
}

