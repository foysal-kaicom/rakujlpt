"use client";

import { useState } from "react";
import { X, Copy, Check, Send, Gift, Info, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { toast } from "raku-toast-react";
import { useTranslation } from "react-i18next";

interface ReceiverInfo {
  first_name: string;
  last_name: string;
  candidate_code: string;
  photo: string;
}

interface ReferralTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  userReferralCode: string;
  currentCoins: number;
  onTransferCoins: (receiverCode: string, amount: number, password: string) => Promise<void>;
  onVerifyReceiver: (receiverCode: string) => Promise<ReceiverInfo>;
}

export default function ReferralTransferModal({
  isOpen,
  onClose,
  userReferralCode,
  currentCoins,
  onTransferCoins,
  onVerifyReceiver,
}: ReferralTransferModalProps) {
  const [activeTab, setActiveTab] = useState<"referral" | "transfer">("referral");
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [receiverCode, setReceiverCode] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  
  // Confirmation dialog states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [receiverInfo, setReceiverInfo] = useState<ReceiverInfo | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const referralLink = `${typeof window !== "undefined" ? window.location.origin : ""}/registration?ref=${userReferralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    toast.success(t("referral_modal.toasts.link_copied"));
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopied(true);
    toast.success(t("referral_modal.toasts.code_copied"));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransferClick = async () => {
    // Initial validations
    if (!receiverCode.trim()) {
      toast.error(t("referral_modal.errors.receiver_code_required"));
      return;
    }

    if (receiverCode.trim() === userReferralCode) {
      toast.error(t("referral_modal.errors.self_transfer"));
      return;
    }

    if (!coinAmount || Number(coinAmount) <= 0) {
      toast.error(t("referral_modal.errors.invalid_amount"));
      return;
    }

    if (Number(coinAmount) > currentCoins) {
      toast.error(t("referral_modal.errors.insufficient_coins"));
      return;
    }

    // Verify receiver and show confirmation dialog
    setIsVerifying(true);
    try {
      const info = await onVerifyReceiver(receiverCode.trim());
      setReceiverInfo(info);
      setShowConfirmation(true);
    } catch (error: any) {
      toast.error(error.message || t("referral_modal.errors.receiver_not_found"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleConfirmTransfer = async () => {
    if (!password.trim()) {
      toast.error(t("referral_modal.errors.password_required"));
      return;
    }

    setIsTransferring(true);
    try {
      // Proceed with transfer
      await onTransferCoins(receiverCode, Number(coinAmount), password);
      
      // Reset states
      setReceiverCode("");
      setCoinAmount("");
      setPassword("");
      setShowConfirmation(false);
      setReceiverInfo(null);
    } catch (error: any) {
      toast.error(error.message || t("referral_modal.errors.transfer_failed"));
    } finally {
      setIsTransferring(false);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setPassword("");
    setShowPassword(false);
    setReceiverInfo(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {t("referral_modal.header_title")}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("referral")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative cursor-pointer ${
                  activeTab === "referral"
                    ? "text-violet-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Gift className="h-4 w-4" />
                  {t("referral_modal.tabs.referral")}
                </div>
                {activeTab === "referral" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("transfer")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative cursor-pointer ${
                  activeTab === "transfer"
                    ? "text-violet-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  {t("referral_modal.tabs.transfer_coins")}
                </div>
                {activeTab === "transfer" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {activeTab === "referral" ? (
              <div className="space-y-6">
                {/* Referral Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("referral_modal.referral_tab.your_link_label")}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      {linkCopied ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span className="hidden sm:inline">{t("referral_modal.common.copied")}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" />
                          <span className="hidden sm:inline">{t("referral_modal.common.copy")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* How it Works */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        {t("referral_modal.referral_tab.how_it_works.title")}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">
                            1.
                          </span>
                          <span>{t("referral_modal.referral_tab.how_it_works.step_1")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">
                            2.
                          </span>
                          <span>{t("referral_modal.referral_tab.how_it_works.step_2")}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">
                            3.
                          </span>
                          <span>
                            {t("referral_modal.referral_tab.how_it_works.step_3")}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">
                            4.
                          </span>
                          <span>
                            {t("referral_modal.referral_tab.how_it_works.step_4")}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Rewards Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-violet-600 mb-1">
                      50
                    </div>
                    <div className="text-xs text-gray-600">{t("referral_modal.referral_tab.rewards.coins_for_you")}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      50
                    </div>
                    <div className="text-xs text-gray-600">
                      {t("referral_modal.referral_tab.rewards.coins_for_friend")}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Referral Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("referral_modal.transfer_tab.your_code_label")}
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-violet-50 border border-violet-200 rounded-xl text-lg font-bold text-violet-700 text-center">
                      {userReferralCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Current Balance */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-5 text-white">
                  <div className="text-sm opacity-90 mb-1">
                    {t("referral_modal.transfer_tab.available_balance")}
                  </div>
                  <div className="text-3xl font-bold">{currentCoins} {t("referral_modal.common.coins")}</div>
                </div>

                {/* Transfer Form */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("referral_modal.transfer_tab.receiver_code_label")}
                  </label>
                  <input
                    type="text"
                    value={receiverCode}
                    onChange={(e) =>
                      setReceiverCode(e.target.value.toUpperCase())
                    }
                    placeholder={t("referral_modal.transfer_tab.receiver_code_placeholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("referral_modal.transfer_tab.coin_amount_label")}
                  </label>
                  <input
                    type="number"
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(e.target.value)}
                    placeholder={t("referral_modal.transfer_tab.coin_amount_placeholder")}
                    min="1"
                    max={currentCoins}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <div className="mt-2 flex gap-2">
                    {[25, 50, 100].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setCoinAmount(amount.toString())}
                        disabled={amount > currentCoins}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          amount > currentCoins
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                      <Info className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-1">{t("referral_modal.transfer_tab.important_notes.title")}</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          • {t("referral_modal.transfer_tab.important_notes.note_1")}
                        </li>
                        <li>
                          • {t("referral_modal.transfer_tab.important_notes.note_2")}
                        </li>
                        <li>• {t("referral_modal.transfer_tab.important_notes.note_3")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transfer Button */}
                <button
                  onClick={handleTransferClick}
                  disabled={isVerifying || !receiverCode || !coinAmount}
                  className="w-full bg-violet-600 text-white py-3.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t("referral_modal.transfer_tab.button.verifying")}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t("referral_modal.transfer_tab.button.continue")}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && receiverInfo && (
        <>
          {/* Confirmation Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={handleCancelConfirmation}
          />

          {/* Confirmation Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confirmation Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {t("referral_modal.confirmation.title")}
                </h3>
                <button
                  onClick={handleCancelConfirmation}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                  disabled={isTransferring}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Confirmation Content */}
              <div className="p-6 space-y-5">
                {/* Receiver Information */}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-violet-200 flex-shrink-0">
                      {receiverInfo.photo ? (
                        <img
                          src={receiverInfo.photo}
                          alt={`${receiverInfo.first_name} ${receiverInfo.last_name}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-violet-600 font-bold text-2xl">
                          {receiverInfo.first_name.charAt(0)}
                          {receiverInfo.last_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {receiverInfo.first_name} {receiverInfo.last_name}
                      </h4>
                      <p className="text-sm text-violet-700 font-semibold">
                        {receiverInfo.candidate_code}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transfer Details */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t("referral_modal.confirmation.transfer_amount_label")}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {coinAmount} {t("referral_modal.common.coins")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t("referral_modal.confirmation.balance_after_label")}</span>
                    <span className="text-lg font-bold text-violet-600">
                      {currentCoins - Number(coinAmount)} {t("referral_modal.common.coins")}
                    </span>
                  </div>
                </div>

                {/* Critical Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-red-900 mb-1">
                        {t("referral_modal.confirmation.warning.title")}
                      </p>
                      <ul className="space-y-1 text-red-700 text-xs">
                        <li>• {t("referral_modal.confirmation.warning.item_1")}</li>
                        <li>• {t("referral_modal.confirmation.warning.item_2")}</li>
                        <li>• {t("referral_modal.confirmation.warning.item_3")}</li>
                        <li>• {t("referral_modal.confirmation.warning.item_4")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Password Verification */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("referral_modal.confirmation.password_label")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("referral_modal.confirmation.password_placeholder")}
                      disabled={isTransferring}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && password.trim()) {
                          handleConfirmTransfer();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isTransferring}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCancelConfirmation}
                    disabled={isTransferring}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {t("referral_modal.common.cancel")}
                  </button>
                  <button
                    onClick={handleConfirmTransfer}
                    disabled={isTransferring || !password.trim()}
                    className="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isTransferring ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("referral_modal.common.processing")}
                      </>
                    ) : (
                      <>
                        <Check className="h-5 w-5" />
                        {t("referral_modal.confirmation.button_confirm")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}