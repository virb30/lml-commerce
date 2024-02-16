import { Email } from "../../@shared/Domain/ValueObject/Email";

export interface OrdersQuery {
  findByEmail(email: Email, page: number, limit: number): Promise<FindByEmailOutput>;
}

export type OrderDTO = {
  id: string;
  code: string;
  total: number;
  date: Date;
  email: string;
};

export type FindByEmailOutput = {
  orders: OrderDTO[];
};
