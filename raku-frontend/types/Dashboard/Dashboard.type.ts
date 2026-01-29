interface PracticeProgress {
  module_name: string;
  complete: number;
}

interface Report {
  exam_taken: number;
  avg_score: number;
  accuracy: string;
  weak_area: string;
}

interface MockTest {
  id: number;
  exam_id: number;
  exam_name: string;
  total_correct: number;
  total_wrong: number;
  total_answered: number;
  score: number;
  per_question_mark: number;
  created_at: string;
}

type SubscriptionStatus = "confirmed" | "pending" | "cancelled";
type PaymentStatus = "success" | "failed" | "pending";

interface Subscription {
  package_name: string;
  start_date: string;
  price: number;
  status: SubscriptionStatus;
  payment_status: PaymentStatus;
}

type WalletTransactionType = "credit" | "debit";

interface WalletTransaction {
  type: WalletTransactionType;
  points: number;
  reference: string | null;
  remarks: string;
  created_at: string;
}

export interface DashboardResponse {
  practice_progress: PracticeProgress[];
  report: Report;
  last_three_mock_tests: MockTest[];
  last_three_subscriptions: Subscription[];
  last_three_wallet_transactions: WalletTransaction[];
}