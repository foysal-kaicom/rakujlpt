"use client";

import { useState } from "react";
import { X, Copy, Check, Send, Gift, Info } from "lucide-react";
import { toast } from "sonner";

interface ReferralTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  userReferralCode: string;
  currentCoins: number;
  onTransferCoins: (receiverCode: string, amount: number) => Promise<void>;
}

export default function ReferralTransferModal({
  isOpen,
  onClose,
  userReferralCode,
  currentCoins,
  onTransferCoins,
}: ReferralTransferModalProps) {
  const [activeTab, setActiveTab] = useState<"referral" | "transfer">("referral");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [receiverCode, setReceiverCode] = useState("");
  const [coinAmount, setCoinAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const referralLink = `${typeof window !== "undefined" ? window.location.origin : ""}/registration?ref=${userReferralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransfer = async () => {
    if (!receiverCode.trim()) {
      toast.error("Please enter receiver's referral code");
      return;
    }

    if (!coinAmount || Number(coinAmount) <= 0) {
      toast.error("Please enter a valid coin amount");
      return;
    }

    if (Number(coinAmount) > currentCoins) {
      toast.error("Insufficient coins");
      return;
    }

    setIsTransferring(true);
    try {
      await onTransferCoins(receiverCode, Number(coinAmount));
      toast.success(`Successfully transferred ${coinAmount} coins!`);
      setReceiverCode("");
      setCoinAmount("");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Transfer failed");
    } finally {
      setIsTransferring(false);
    }
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
              Referral & Coin Transfer
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
                  Referral
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
                  Transfer Coins
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
                    Your Referral Link
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
                          <span className="hidden sm:inline">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" />
                          <span className="hidden sm:inline">Copy</span>
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
                        How Referral Works
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">1.</span>
                          <span>Share your referral link with friends</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">2.</span>
                          <span>They sign up using your referral link</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">3.</span>
                          <span>Both you and your friend can earn bonus coins!</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">4.</span>
                          <span>Use coins to unlock premium features and exams</span>
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
                    <div className="text-xs text-gray-600">Coins for You</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      50
                    </div>
                    <div className="text-xs text-gray-600">Coins for Friend</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Referral Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Referral Code
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
                  <div className="text-sm opacity-90 mb-1">Available Balance</div>
                  <div className="text-3xl font-bold">{currentCoins} Coins</div>
                </div>

                {/* Transfer Form */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Receiver's Referral Code
                  </label>
                  <input
                    type="text"
                    value={receiverCode}
                    onChange={(e) => setReceiverCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coin Amount
                  </label>
                  <input
                    type="number"
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(e.target.value)}
                    placeholder="Enter amount"
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
                      <p className="font-semibold mb-1">Important Notes:</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Coin transfers are instant and cannot be reversed</li>
                        <li>• Make sure to verify the receiver's referral code</li>
                        <li>• Minimum transfer amount is 1 coin</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transfer Button */}
                <button
                  onClick={handleTransfer}
                  disabled={isTransferring || !receiverCode || !coinAmount}
                  className="w-full bg-violet-600 text-white py-3.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isTransferring ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Transferring...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Transfer Coins
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}