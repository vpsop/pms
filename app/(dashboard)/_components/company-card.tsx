/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

interface CompanyCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
};

export const CompanyCard = ({
  id,
  title,
  imageUrl,
  category
}: CompanyCardProps) => {

  const router = useRouter();
  return (
      <div className="group hover:shadow-md cursor-pointer transition overflow-hidden border rounded-lg p-3 h-full w-[200px]" onClick={() => {
        router.push(`/company/${id}`)
      }}>
        <div className="relative w-full aspect-video rounded-sm overflow-hidden">
          <img
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
        </div>
      </div>
  )
}