import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Roadmap {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
  total_stages: string;
  is_free: number;
  unlock_coins: number;
}

export function ConfirmUnlockModal({
  isOpen,
  onClose,
  onConfirm,
  selectedRoadmap,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedRoadmap: Roadmap | null;
}) {
  if (!isOpen) return null;
  const { t } = useTranslation("common");
  return (
    <div className="fixed inset-0 bg-opacity backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full py-6">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("practicePage.unlock_now")}?
          </h2>
          <p className="text-gray-600">
            {t("practicePage.are_you_sure")}{" "}
            <span className="font-semibold text-gray-900">
              "{selectedRoadmap?.title}"
            </span>
            ?
          </p>

          {/* Coin Cost */}
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full">
            <span className="text-2xl">🪙</span>
            <span className="font-bold text-gray-900">
              {selectedRoadmap?.unlock_coins} {t("practicePage.coins")}
            </span>
            <span className="text-gray-600">
              {t("practicePage.will_deduct")}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {t("pricing.modal.cancel")}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer shadow-md hover:shadow-lg"
          >
            {t("wallet.ui.unlock")}
          </button>
        </div>
      </div>
    </div>
  );
}
