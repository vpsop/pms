"use client";

import { BarChart, List, ListTodo, Notebook, NotebookPen, PlusSquare, UserRoundPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
  {
    icon: PlusSquare,
    label: "Add Company",
    href: "/admin/add-company",
  },
  {
    icon: ListTodo,
    label: "List Companies",
    href: "/admin/list-companies",
  },
  {
    icon: NotebookPen,
    label: "Add Opening",
    href: "/admin/add-opening",
  },
  {
    icon: Notebook,
    label: "List Openings",
    href: "/admin/list-openings",
  },
  {
    icon: UserRoundPlus,
    label: "Create Accounts",
    href: "/admin/create-student-accounts",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : adminRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}