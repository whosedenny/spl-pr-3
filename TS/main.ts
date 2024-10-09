let professors: Array<Professor> = [];
let classrooms: Array<Classroom> = [];
let courses: Array<Course> = [];
let schedule: Array<Lesson> = [];

function addProfessor (professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    for (const lessonFromSchedule of schedule) {
        const conflictChecker: null | ScheduleConflict = validateLesson(lesson);
        if(conflictChecker != null){
            console.log("Конфлікт з уроком: " + conflictChecker.lessonDetails);
            console.log("Тип конфлікту: " + conflictChecker.type);
            return false;
        }
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
    
    if (
            lesson.professorId === lesson.professorId &&
            lesson.dayOfWeek === lesson.dayOfWeek &&
            lesson.timeSlot === lesson.timeSlot
        ) {
            schedulConflict.type = "ProfessorConflict";
            return schedulConflict; 
        }

        if (
            lesson.classroomNumber === lesson.classroomNumber &&
            lesson.dayOfWeek === lesson.dayOfWeek &&
            lesson.timeSlot === lesson.timeSlot
        ) {
            schedulConflict.type = "ClassroomConflict";
            return schedulConflict;
        }
        
    return null;
}