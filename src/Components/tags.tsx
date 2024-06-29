import { TagsPropsDTO } from "@/dto/food.dto";

export interface TagsProps {
  tags: TagsPropsDTO[];
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="flex items-center gap-2">
      {tags &&
        tags.map((tag) => (
          <div className="w-min gap-6 rounded-md bg-dark_950 p-2">
            <span key={tag.id} className="block">
              {tag.title}
            </span>
          </div>
        ))}
    </div>
  );
}
