export interface TransactionModelType {
  createAt: Date;
  lastUpdate?: Date;
  description?: string;
  type: "buy" | "pix" | "other" | "investment";
  userID: string;
  value: number;
  fromID?: string;
  toID?: string;
  items: any;
}

//bonfire-api version: 1.3.9