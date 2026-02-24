export interface TagsProps {
  tags: string[];
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags &&
        tags.map((tag) => (
          <div key={`${tag}`} className="gap-6 rounded-md bg-dark_950 p-2">
            <span className="block">{tag}</span>
          </div>
        ))}
    </div>
  );
}
