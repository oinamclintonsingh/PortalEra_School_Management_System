// import Announcements from "@/components/Announcements";
// import BigCalendar from "@/components/BigCalender";
// import EventCalendar from "@/components/EventCalendar";

// const StudentPage = () => {
//   return (
//     <div className="p-4 flex gap-4 flex-col xl:flex-row">
//       {/* LEFT */}
//       <div className="w-full xl:w-2/3">
//         <div className="lg:h-screen sm:h-full md:h-full bg-white p-4 rounded-md">
//           <h1 className="text-xl font-semibold">Schedule (4A)</h1>
//           <BigCalendar />
//         </div>
//       </div>
//       {/* RIGHT */}
//       <div className="w-full xl:w-1/3 flex flex-col gap-8">
//         <EventCalendar />
//         <Announcements />
//       </div>
//     </div>
//   );
// };

// export default StudentPage;

// 20241129_01==============================================================================

import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/utils";

const StudentPage = async () => {
  const userId = await getCurrentUserId(); // Now await can be used

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  console.log(classItem);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          {classItem && classItem.length > 0 ? (
            <BigCalendarContainer type="classId" id={classItem[0].id} />
          ) : (
            <p>No class schedule available.</p>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
