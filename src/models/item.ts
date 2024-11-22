export interface Item {
  id?: string;
  name: string;
  url: string;
  camelUrl?: string | null;
  purchased: boolean;
  details: string;
}