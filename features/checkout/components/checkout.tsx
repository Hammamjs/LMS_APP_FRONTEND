'use client';

import { useState, Suspense, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CreditCard,
  Lock,
  Shield,
  Tag,
  ChevronLeft,
  CheckCircle,
  Building2,
  Copy,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
} from '@/shared/ui';
import { useGetCourseByIdQuery } from '@/features/courses/hooks';
import { calcDiscount } from '@/features/courses/lib/calc-price';
import { usePaymentMutation } from '../hooks/use.payment.mutation';
import { PaymentMethod, PaymentRequest } from '../types/types';

const BANK_DETAILS = {
  bankName: 'LearnHub International Bank',
  accountName: 'LearnHub LLC',
  accountNumber: '1234 5678 9012 3456',
  iban: 'US12 3456 7890 1234 5678',
  swift: 'LRNHUS33',
};

export function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');
  const { course } = useGetCourseByIdQuery(courseId as string);

  const [method, setMethod] = useState<PaymentMethod>('STRIPE');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Stripe fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Bank fields
  const [transferRef, setTransferRef] = useState('');
  const [senderName, setSenderName] = useState('');

  if (!course) return null;

  const { pay, isLoading, isSuccess, data } = usePaymentMutation();

  useEffect(() => {
    console.log(data);
  }, [isLoading, isSuccess]);

  const finalPrice = calcDiscount(course.originalPrice, course.discountPrice);

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '').slice(0, 16);

    // Add space every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '').slice(0, 4);

    // Format MM/YY
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return digits;
  };

  const formatCVC = (value: string) => {
    // Only numbers, max 4 digits
    return value.replace(/\D/g, '').slice(0, 4);
  };

  if (finalPrice === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold">No course selected</h2>
        <p className="text-muted-foreground">
          Please select a course to purchase.
        </p>
        <Link href="/courses" className="text-primary underline">
          Browse Courses
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'learn20') setCouponApplied(true);
  };

  const copy = (txt: string) => navigator.clipboard?.writeText(txt);

  const handlePurchase = async () => {
    const payload: PaymentRequest = {
      amount: finalPrice,
      courseId: course.id,
      currency: 'USD',
      provider: method,
      source:
        method === 'STRIPE'
          ? 'pm_card_visa' // cardNumber.replace(/\s+/g, '')
          : transferRef || senderName,
    };

    try {
      await pay(payload);

      router.push(`/checkout/success?courseId=${course.id}`);
    } catch (err) {
      console.log(err);
      await pay(payload);

      router.push(`/checkout/failed?courseId=${course.id}`);
    }
  };

  const canSubmit =
    method === 'STRIPE'
      ? cardName && cardNumber && expiry && cvc
      : senderName && transferRef;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to course
        </Link>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment method selector */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('STRIPE')}
                  className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${
                    method === 'STRIPE'
                      ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Credit / Debit Card</div>
                    <div className="text-xs text-muted-foreground">
                      Powered by Stripe
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('BANK')}
                  className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${
                    method === 'BANK'
                      ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-xs text-muted-foreground">
                      Manual confirmation
                    </div>
                  </div>
                </button>
              </CardContent>
            </Card>

            {/* Stripe form */}
            {method === 'STRIPE' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Card Details
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label>Name on Card</Label>

                    <Input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label>Card Number</Label>

                    <Input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiry */}
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>

                      <Input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiryDate(e.target.value))
                        }
                        placeholder="MM/YY"
                      />
                    </div>

                    {/* CVC */}
                    <div className="space-y-2">
                      <Label>CVC</Label>

                      <Input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        value={cvc}
                        onChange={(e) => setCvc(formatCVC(e.target.value))}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bank instructions */}
            {method === 'BANK' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Bank Transfer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Transfer the total amount to the account below. Your
                    enrollment will activate after payment confirmation (usually
                    1–2 business days).
                  </p>

                  <div className="rounded-lg border bg-muted/40 divide-y">
                    {Object.entries({
                      Bank: BANK_DETAILS.bankName,
                      'Account Name': BANK_DETAILS.accountName,
                      'Account Number': BANK_DETAILS.accountNumber,
                      IBAN: BANK_DETAILS.iban,
                      SWIFT: BANK_DETAILS.swift,
                    }).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between p-3 text-sm"
                      >
                        <span className="text-muted-foreground">{k}</span>
                        <span className="flex items-center gap-2 font-medium">
                          {v}
                          <button
                            onClick={() => copy(v)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Sender Name</Label>
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Name used in transfer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Transfer Reference / Transaction ID</Label>
                    <Input
                      value={transferRef}
                      onChange={(e) => setTransferRef(e.target.value)}
                      placeholder="e.g. TRX-9381245"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Coupon */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Have a Coupon?
                </CardTitle>
              </CardHeader>
              <CardContent>
                {couponApplied ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Coupon "LEARN20" applied – 20% off!
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                    />
                    <Button onClick={handleApplyCoupon}>Apply</Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Try "LEARN20" for 20% off
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> 30-day guarantee
              </span>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="relative h-16 w-24 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={course.image || '/placeholder.svg'}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium line-clamp-2">
                      {course.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      By {course.instructor.username}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Original Price
                    </span>
                    <span>${course.originalPrice.toFixed(2)}</span>
                  </div>
                  {course.discountPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>-{course.discountPrice}%</span>
                    </div>
                  )}
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon (20%)</span>
                      <span>-20%</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalPrice.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={isLoading || !canSubmit}
                  onClick={handlePurchase}
                >
                  {isLoading
                    ? 'Processing...'
                    : method === 'BANK'
                      ? `Confirm Bank Transfer - $${finalPrice.toFixed(2)}`
                      : `Pay with Card - $${finalPrice.toFixed(2)}`}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By completing your purchase you agree to our{' '}
                  <Link href="/terms" className="underline">
                    Terms of Service
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
