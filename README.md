# =======================================================

> > to start runnning this program till here You have to
> > Rune the Docker First
> > run the Nme: postgres Port(s) 5432:5432

    >>Run the prisma studio to contect the data from the backend.
        >>npx prisma studio

    >>Then run the project
        >>npm run dev

# Lama Dev School Management Dashboard

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Lama Dev Youtube Channel](https://youtube.com/lamadev)
- [Next.js](https://nextjs.org/learn)

======================================================

npm i recharts

======================================================

npm i react-calendar

======================================================

npm i react-big-calendar

======================================================

npm i moment

======================================================

@types/react-big-calendar

======================================================

1:28

======================================================

npm install react-hook-form

======================================================

npm i zod @hookform/resolvers

======================================================
3:27

=======================================================

npx prisma

npx prisma init

=======================================================

POSTGRES_USER clintono
POSTGRES_PASSWORD clinton2024
POSTGRES_DB school

=======================================================

npx prisma migrate dev --name init

=======================================================

To check the local host database no.

npx prisma studio

=======================================================
// at the package.json
"prisma": {
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},

=======================================================

npm i -d ts-node

# =======================================================

npm install @prisma/client

# =======================================================

npx prisma db seed

# =======================================================

if you need to reset if there is any mistake

npx prisma migrate reset

y

# =======================================================

> > If we change anything in Schema.prisma or in database to update use the code

npx prisma db push --force-reset

> > and use the seed again

npx prisma db seed

and run the code to check on studio

npx prisma studio

# =======================================================

full 1:30

# =======================================================

1:26
1:35

# =======================================================

2:8

# =======================================================

for authentication

npm install @clerk/nextjs

# =======================================================

for custom authentication link to user

npm install @clerk/elements

# =======================================================

2:38

# =======================================================

change in utils.ts

import { auth } from "@clerk/nextjs/server";

export const getRole = async () => {
const { sessionClaims } = await auth();
return (sessionClaims?.metadata as { role?: string })?.role;
};

# =======================================================

chnage in announmenta

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils"; // Updated to getRole
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";

type AnnouncementList = Announcement & { class: Class };

const AnnouncementListPage = async ({
searchParams,
}: {
searchParams: { [key: string]: string | undefined };
}) => {
const role = await getRole(); // Fetch role dynamically

const columns = [
{ header: "Title", accessor: "title" },
{ header: "Class", accessor: "class" },
{ header: "Date", accessor: "date", className: "hidden md:table-cell" },
...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
];

const renderRow = (item: AnnouncementList) => (

<tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
<td className="flex items-center gap-4 p-4">{item.title}</td>
<td>{item.class.name}</td>
<td className="hidden md:table-cell">
{new Intl.DateTimeFormat("en-IN").format(item.date)}
</td>
<td>
<div className="flex items-center gap-2">
{role === "admin" && (
<>
<FormModal table="announcement" type="update" data={item} />
<FormModal table="announcement" type="delete" id={item.id} />
</>
)}
</div>
</td>
</tr>
);

// Handle pagination and filtering based on query params
const { page, ...queryParams } = searchParams;
const p = page ? parseInt(page) : 1;

const query: Prisma.AnnouncementWhereInput = {};

if (queryParams) {
for (const [key, value] of Object.entries(queryParams)) {
if (value !== undefined) {
switch (key) {
case "search":
query.title = { contains: value, mode: "insensitive" };
break;
default:
break;
}
}
}
}

// Fetch data and count using Prisma transactions
const [data, count] = await prisma.$transaction([
prisma.announcement.findMany({
where: query,
include: { class: true },
take: ITEM_PER_PAGE,
skip: ITEM_PER_PAGE * (p - 1),
}),
prisma.announcement.count({ where: query }),
]);

return (

<div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
{/_ TOP _/}
<div className="flex items-center justify-between">
<h1 className="hidden md:block text-lg font-semibold">
All Announcements
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
{role === "admin" && (
<FormModal table="announcement" type="create" />
)}
</div>
</div>
</div>
{/_ LIST _/}
<Table columns={columns} renderRow={renderRow} data={data} />
{/_ PAGINATION _/}
<Pagination page={p} count={count} />
</div>
);
};

export default AnnouncementListPage;

# =======================================================

change in assignment

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type AssignmentList = Assignment & {
lesson: {
subject: Subject;
class: Class;
teacher: Teacher;
};
};

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
{
header: "Actions",
accessor: "action",
},
];

const renderRow = async (item: AssignmentList) => {
const role = await getRole();

return (

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
<td>
<div className="flex items-center gap-2">
{role === "admin" || role === "teacher" ? (
<>
<FormModal table="exam" type="update" data={item} />
<FormModal table="exam" type="delete" id={item.id} />
</>
) : null}
</div>
</td>
</tr>
);
};

const AssignmentListPage = async ({
searchParams,
}: {
searchParams: { [key: string]: string | undefined };
}) => {
const { page, ...queryParams } = searchParams;
const p = page ? parseInt(page) : 1;

// URL PARAMS CONDITION

const query: Prisma.AssignmentWhereInput = {};

if (queryParams) {
for (const [key, value] of Object.entries(queryParams)) {
if (value !== undefined) {
switch (key) {
case "classId":
query.lesson = { classId: parseInt(value) };
break;
case "teacherId":
query.lesson = {
teacherId: value,
};
break;
case "search":
query.lesson = {
subject: {
name: { contains: value, mode: "insensitive" },
},
};
break;
default:
break;
}
}
}
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

const role = await getRole(); // Fetch role here to use in JSX

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

# =======================================================

# =======================================================

2:44

# =======================================================

2:41 till now no problem

# =======================================================

3:17

# =======================================================

3:30

# =======================================================

3:48
there is a problem in techer page

# =======================================================

4:05

# =======================================================

npm i react-toastify

# =======================================================

4:29:11

# =======================================================

4:36

# =======================================================

4:09

# =======================================================

Update available 5.22.0 -> 6.5.0 │  
│ │  
│ This is a major update - please follow the guide at │  
│ https://pris.ly/d/major-version-upgrade │  
│ │  
│ Run the following to update │  
│ npm i --save-dev prisma@latest │  
│ npm i @prisma/client@latest

# =======================================================

4:38-39
TypeError: relatedData is undefined

# =======================================================

4:47
class se "class 10 oibada grade C haina hekta kaka"

# =======================================================

npm install next-cloudinary

# =======================================================

5:03
problem lei Action pagesta "users" ge matangda

# =======================================================

npx prisma migrate dev
y
addbirthday

# =======================================================

tomba
tombapassword

# =======================================================

5:17

# =======================================================

5:42

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================

# =======================================================
