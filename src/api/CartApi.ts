import axios from "axios";
import { ProductWithCountType } from "../types/types";

export class CartApi {
  static async sendInfo(data: {
    items: ProductWithCountType[];
    name: string;
    phone: string;
  }) {
    return fetch("https://app.aaccent.su/js/confirm.php/", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
