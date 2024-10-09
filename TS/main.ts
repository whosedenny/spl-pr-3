let professors: Array<Professor> = [];
let classrooms: Array<Classroom> = [];
let courses: Array<Course> = [];
let schedule: Array<Lesson> = [];

function addProfessor (professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    const conflictChecker: null | ScheduleConflict = validateLesson(lesson);
    
    if(conflictChecker != null){
        console.log("Конфлікт з уроком: " + conflictChecker.lessonDetails);
        console.log("Тип конфлікту: " + conflictChecker.type);
        return false;
    }

    schedule.push(lesson);
    return true; 
}

function findAvailableClassrooms (timeSlot: TimeSlot, dayOfWeek: DayOfWeek) : Array<string>{
    const res: Array<string> = [];

    for (const classroom of classrooms) {
        let isAvailable = true;

        for (const lesson of schedule) {
            if (
                lesson.classroomNumber === classroom.number &&
                lesson.dayOfWeek === dayOfWeek &&
                lesson.timeSlot === timeSlot
            ) {
                isAvailable = false; 
                break;
            }
        }

        if (isAvailable) {
            res.push(classroom.number);
        }
    }

    return res;
}

function getProfessorSchedule(professorId: number) : Array<Lesson>{
    const res: Array<Lesson> = [];

    for(const lesson of schedule){
         if(lesson.professorId === professorId){
            res.push(lesson);
         }
    }

    return res;
}

function validateLesson(lesson: Lesson): ScheduleConflict | null{
   let schedulConflict: ScheduleConflict = {
        type: "ProfessorConflict",
        lessonDetails: lesson
    };
    for (const lessonFromSchedule of schedule) {
        if (
            lesson.professorId === lessonFromSchedule.professorId &&
            lesson.dayOfWeek === lessonFromSchedule.dayOfWeek &&
            lesson.timeSlot === lessonFromSchedule.timeSlot
        ) {
            schedulConflict.type = "ProfessorConflict";
            return schedulConflict; 
        }

        if (
            lesson.classroomNumber === lessonFromSchedule.classroomNumber &&
            lesson.dayOfWeek === lessonFromSchedule.dayOfWeek &&
            lesson.timeSlot === lessonFromSchedule.timeSlot
        ) {
            schedulConflict.type = "ClassroomConflict";
            return schedulConflict;
        }
    }
    return null;
}

function getClassroomUtilization(classroomNumber: string): number{
    let countTimeSlotUse: number = 0;

    for (const lesson of schedule) {
        if (lesson.classroomNumber === classroomNumber) {
            countTimeSlotUse++;
        }
    }

    const res = (countTimeSlotUse / 25) * 100; // Тут 25 це максимальне можливе навантаження на класну кімнату(5 днів * на 5 можливих проміжков часу)

    return res;
}