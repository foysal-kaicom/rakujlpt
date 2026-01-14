import { NewsItem } from "@/types/index.types";

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const newsService = {
  async list(): Promise<NewsItem[]> {
    const res = await axios.get(`${API_BASE}/news/list`);
    return res?.data?.data ?? [];
  },

  async details(slug: string): Promise<NewsItem | null> {
    const res = await axios.get(`${API_BASE}/news/${slug}`);
    return res?.data?.data ?? null;
  },
};
