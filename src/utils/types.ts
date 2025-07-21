export type Cnab<T> = {
  type: "REMESSA" | "RETORNO";
  layout: string;
  entries: T[];
};
