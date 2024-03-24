export interface INote {
  id: string;
  content: string;
  userId: string;
  updatedAt: string; // Now expecting an ISO string
}
