export interface NoteDto {
  id?: number;
  title: string;
  description: string;
  color?: string;
  image?: string;
  reminder?: string | null;
  isArchive?: boolean;
  isTrash?: boolean;
  isPinned?: boolean;
}
