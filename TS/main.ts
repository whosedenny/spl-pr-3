let professors: Array<Professor> = [];
let classrooms: Array<Classroom> = [];
let courses: Array<Course> = [];
let schedule: Array<Lesson> = [];

function addProfessor (professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    for (const lessonFromSchedule of schedule) {
        if (
            lessonFromSchedule.professorId === lesson.professorId &&
            lessonFromSchedule.dayOfWeek === lesson.dayOfWeek &&
            lessonFromSchedule.timeSlot === lesson.timeSlot
        ) {
            console.log("Викладач вже має заняття на цей час та день");
            return false; 
        }

        if (
            lessonFromSchedule.classroomNumber === lesson.classroomNumber &&
            lessonFromSchedule.dayOfWeek === lesson.dayOfWeek &&
            lessonFromSchedule.timeSlot === lesson.timeSlot
        ) {
            console.log("Цей клас занятий на цей час та день");
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