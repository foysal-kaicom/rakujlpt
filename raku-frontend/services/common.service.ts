import type { TeamMember, FAQ , feature , Partner , Testimonial ,ContactPayload , ContactResponse } from "@/types/index.types";

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const homePageService = {
  async getFeatureList(): Promise<feature[]> {
    const res = await axios.get(`${API_BASE}/feature/list`);
    return res?.data?.data ?? [];
  },
  async getPartnerList(): Promise<Partner[]> {
    const res = await axios.get(`${API_BASE}/partner/list`);
    return res?.data?.data ?? [];
  },
  async getReviewList(): Promise<Testimonial[]> {
    const res = await axios.get(`${API_BASE}/review/list`);
    return res?.data?.data ?? [];
  },
};

export const ourTeamService = {
  async getTeamList(): Promise<TeamMember[]> {
    const res = await axios.get(`${API_BASE}/our-member/list`);
    const members: TeamMember[] = res?.data?.data ?? [];
    return members.sort((a, b) => (a.serial_no ?? 0) - (b.serial_no ?? 0));
  },
};

export const FAQService = {
  async getFaqList(): Promise<FAQ[]> {
    const res = await axios.get(`${API_BASE}/faq/list`);
    return res?.data?.data ?? [];
  },
};

export const newsletterService = {
  async subscribe(email: string): Promise<{ success: boolean; message?: string }> {
    if (!email) throw new Error("Email is required");

    const form = new FormData();
    form.append("email", email);

    const res = await axios.post(`${API_BASE}/news-letter-subscribe`, form);
    return res.data;
  },
};

export const contactService = {
  async sendQuery(payload: ContactPayload): Promise<ContactResponse> {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-query-mail`,
      payload
    );

    return data;
  },
};
