export interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return <span className="text-tomato_400">{message}</span>;
}
