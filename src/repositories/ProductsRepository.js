import Product from "../models/Product.js";

export default class ProductsRepository {
  //   /** @param {(input: RequestInfo, init?: RequestInit) => Promise<Response>} fetcher */
  constructor(fetcher = window.fetch.bind(window)) {
    this.fetcher = fetcher; // DI — легко мокати
  }

  async #fetchRaw() {
    const res = await this.fetcher("/products.json");
    if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
    return res.json(); // -> DTO[]
  }

  /** Повертає масив екземплярів Product */
  async getAll() {
    const raw = await this.#fetchRaw();
    return raw.map((dto) => new Product(dto));
  }

  /** Повертає один Product або undefined */
  async getById(id) {
    const list = await this.getAll();
    return list.find((p) => p.id === id);
  }

  // save/update/delete — не потрібні в завданні, але можна додати пізніше
}
