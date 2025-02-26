export interface Item {
  name: string;
  url: string;
  camelUrl?: string | null;
  purchased: boolean;
  details: string;
}