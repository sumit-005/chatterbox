export interface data {
  id: string;
  text: string;
  disabled?: boolean;
  children?: Array<data>;
  additional?: any;
}

