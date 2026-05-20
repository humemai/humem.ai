import { redirect } from "next/navigation";

type Params = {
  page: string;
};

export default async function ProjectsPaginationPage({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    redirect("/projects");
  }

  redirect(`/projects?page=${pageNumber}`);
}