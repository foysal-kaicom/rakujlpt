export type Plan = {
  id: number;
  name: string;
  price: string;
  description: string;
  short_description: string;
  is_popular?: boolean;
  is_active: number;
  is_free: boolean;
  is_home: boolean;
}

export type Coupon = {
  id: number;
  coupon_code: string;
  description: string;
  type: string;
  discount_value: number;
  max_discount: string | number;
  end_date: string;
}