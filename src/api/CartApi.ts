import axios from "axios";
import { ProductWithCountType } from "../types/types";

export class CartApi {
  static async sendInfo(data: {
    items: ProductWithCountType[];
    name: string;
    phone: string;
  }) {
    const res = await axios.post(
      "https://app.aaccent.su/js/confirm.php/",
      data,
      {
        transformRequest: (data, headers) => {
          delete headers["Content-Type"];
          return data;
        },
      }
    );

    return res.data;
  }
}
