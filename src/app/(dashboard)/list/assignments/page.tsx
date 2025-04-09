// import FormModal from "@/components/FormModal";
// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { role } from "@/lib/utils";
// import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
// import Image from "next/image";
// // import Link from "next/link";

// type AssignmentList = Assignment & {
//   lesson: {
//     subject: Subject;
//     class: Class;
//     teacher: Teacher;
//   };
// };

// const columns = [
//   {
//     header: "Subject Name",
//     accessor: "name",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//   },
//   {
//     header: "Teacher",
//     accessor: "teacher",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Due Date",
//     accessor: "dueDate",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

// const renderRow = (item: AssignmentList) => (
//   <tr
//     key={item.id}
//     className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//   >
//     <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
//     <td>{item.lesson.class.name}</td>
//     <td className="hidden md:table-cell">
//       {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
//     </td>
//     <td className="hidden md:table-cell">
//       {new Intl.DateTimeFormat("en-IN").format(item.dueDate)}
//     </td>
//     <td>
//       <div className="flex items-center gap-2">
//         {/* <Link href={/list/teachers/${item.id}}>
//           <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
//             <Image src="/edit.png" alt="" width={16} height={16} />
//           </button>
//         </Link> */}
//         {(role === "admin" || role === "teacher") && (
//           <>
//             <FormModal table="exam" type="update" data={item} />
//             <FormModal table="exam" type="delete" id={item.id} />
//           </>
//         )}
//       </div>
//     </td>
//   </tr>
// );

// const AssignmentListPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//   const { page, ...queryParams } = searchParams;
//   const p = page ? parseInt(page) : 1;

//   //URL PARAMS CONDITON

//   const query: Prisma.AssignmentWhereInput = {};

//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "classId":
//             query.lesson = { classId: parseInt(value) };
//             break;
//           case "teacherId":
//             query.lesson = {
//               teacherId: value,
//             };
//             break;
//           case "search":
//             query.lesson = {
//               subject: {
//                 name: { contains: value, mode: "insensitive" },
//               },
//             };
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.assignment.findMany({
//       where: query,
//       include: {
//         lesson: {
//           select: {
//             subject: { select: { name: true } },
//             teacher: { select: { name: true, surname: true } },
//             class: { select: { name: true } },
//           },
//         },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (p - 1),
//     }),
//     prisma.assignment.count({ where: query }),
//   ]);

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       {/* TOP */}
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">
//           All Assignments
//         </h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {/* {role === "admin" && (
//               <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//                 <Image src="/plus.png" alt="" width={14} height={14} />
//               </button>
//               // <FormModal table="teacher" type="create" />
//             )} */}
//             {role === "admin" ||
//               (role === "teacher" && <FormModal table="exam" type="create" />)}
//           </div>
//         </div>
//       </div>
//       {/* LIST */}
//       <Table columns={columns} renderRow={renderRow} data={data} />
//       {/* PAGINATION */}
//       <Pagination page={p} count={count} />
//     </div>
//   );
// };

// export default AssignmentListPage;

// =======================================================================

// import FormModal from "@/components/FormModal";
// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import prisma from "@/lib/prisma";
// import { ITEM_PER_PAGE } from "@/lib/settings";
// import { getCurrentUserId, getRole } from "@/lib/utils";
// import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
// import { cookies } from "next/headers";
// import Image from "next/image";

// type AssignmentList = Assignment & {
//   lesson: {
//     subject: Subject;
//     class: Class;
//     teacher: Teacher;
//   };
// };

// const columns = [
//   {
//     header: "Subject Name",
//     accessor: "name",
//   },
//   {
//     header: "Class",
//     accessor: "class",
//   },
//   {
//     header: "Teacher",
//     accessor: "teacher",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Due Date",
//     accessor: "dueDate",
//     className: "hidden md:table-cell",
//   },
//   {
//     header: "Actions",
//     accessor: "action",
//   },
// ];

// const renderRow = async (item: AssignmentList) => {
//   const role = await getRole();

//   return (
//     <tr
//       key={item.id}
//       className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//     >
//       <td className="flex items-center gap-4 p-4">
//         {item.lesson.subject.name}
//       </td>
//       <td>{item.lesson.class.name}</td>
//       <td className="hidden md:table-cell">
//         {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
//       </td>
//       <td className="hidden md:table-cell">
//         {new Intl.DateTimeFormat("en-IN").format(item.dueDate)}
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           {role === "admin" || role === "teacher" ? (
//             <>
//               <FormModal table="exam" type="update" data={item} />
//               <FormModal table="exam" type="delete" id={item.id} />
//             </>
//           ) : null}
//         </div>
//       </td>
//     </tr>
//   );
// };

// const AssignmentListPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) => {
//   const { page, ...queryParams } = searchParams;
//   const p = page ? parseInt(page) : 1;

//   const role = await getRole(); // Fetch role here to use in JSX
//   const currentUserId = await getCurrentUserId();

//   // URL PARAMS CONDITION

//   const query: Prisma.AssignmentWhereInput = {};
//   query.lesson = {};

//   if (queryParams) {
//     for (const [key, value] of Object.entries(queryParams)) {
//       if (value !== undefined) {
//         switch (key) {
//           case "classId":
//             query.lesson.classId = parseInt(value);
//             break;
//           case "teacherId":
//             query.lesson.teacherId = value;
//             break;
//           case "search":
//             query.lesson.subject = {
//               name: { contains: value, mode: "insensitive" },
//             };
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   // ROLE CONDITIONS

//   switch (role) {
//     case "admin":
//       break;
//     case "teacher":
//       query.lesson.teacherId = currentUserId!;
//       break;
//     case "student":
//       query.lesson.class = {
//         students: {
//           some: {
//             id: currentUserId!,
//           },
//         },
//       };
//       break;
//     case "parent":
//       query.lesson.class = {
//         students: {
//           some: {
//             parentId: currentUserId!,
//           },
//         },
//       };
//       break;
//     default:
//       break;
//   }

//   const [data, count] = await prisma.$transaction([
//     prisma.assignment.findMany({
//       where: query,
//       include: {
//         lesson: {
//           select: {
//             subject: { select: { name: true } },
//             teacher: { select: { name: true, surname: true } },
//             class: { select: { name: true } },
//           },
//         },
//       },
//       take: ITEM_PER_PAGE,
//       skip: ITEM_PER_PAGE * (p - 1),
//     }),
//     prisma.assignment.count({ where: query }),
//   ]);

//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       <div className="flex items-center justify-between">
//         <h1 className="hidden md:block text-lg font-semibold">
//           All Assignments
//         </h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/filter.png" alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
//               <Image src="/sort.png" alt="" width={14} height={14} />
//             </button>
//             {role === "admin" || role === "teacher" ? (
//               <FormModal table="exam" type="create" />
//             ) : null}
//           </div>
//         </div>
//       </div>
//       <Table columns={columns} renderRow={renderRow} data={data} />
//       <Pagination page={p} count={count} />
//     </div>
//   );
// };

// export default AssignmentListPage;

// 20241121=========================================================================================================================

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getCurrentUserId, getRole } from "@/lib/utils";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // Fetch role and user ID
  const role = await getRole();
  const currentUserId = await getCurrentUserId();

  // Dynamically define columns based on the role
  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  // URL PARAMS CONDITION
  const query: Prisma.AssignmentWhereInput = {};
  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: currentUserId!,
          },
        },
      };
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  // Dynamically render rows based on data and role
  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-IN").format(item.dueDate)}
      </td>
      {role === "admin" || role === "teacher" ? (
        <td>
          <div className="flex items-center gap-2">
            <FormModal table="exam" type="update" data={item} />
            <FormModal table="exam" type="delete" id={item.id} />
          </div>
        </td>
      ) : null}
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" ? (
              <FormModal table="exam" type="create" />
            ) : null}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AssignmentListPage;
