/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

interface OpeningTileProps {
  id: string;
  company: string;
  companyImageURL: string
  jobDescription: string;
  location: string;
  position: string;
};

export const OpeningTile = ({
  id,
  company,
  companyImageURL,
  jobDescription,
  location,
  position
}: OpeningTileProps) => {

  const router = useRouter();
  return (
    <div className="group hover:shadow-md cursor-pointer border rounded-lg p-3 w-full" onClick={() => {
      router.push(`/opening/${id}`)
    }}>
      <div className="flex gap-5">
        <div className="w-20 aspect-video rounded-sm overflow-hidden">
          <img className="object-cover" src={companyImageURL} alt={company} />
        </div>
        <div className="flex flex-col">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {company}
          </div>
          <p className="text-xs text-muted-foreground">
            {position}
          </p>
        </div>
      </div>
    </div>
  )
}