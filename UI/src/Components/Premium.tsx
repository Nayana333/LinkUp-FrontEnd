import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllTransactions, initiateCheckout } from "../services/api/user/apiMethods";
import { Spinner } from "flowbite-react";
import { toast } from "sonner";
import { differenceInDays, parseISO } from "date-fns"; 

interface Transaction {
  _id: string;
  userId: string;
  amount: string;
  transactionId: string;
  startDate: string;
  expiryDate: string;
}

function Premium() {
  const [_latestTransactions, setLatestTransaction] = useState<Transaction | {}>({});
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51P2lOoSGck1zxwUlgof9TiU1LL1UbU9UwOQvfYzGOvhJUUGL467yRorloU9iiia4QPj45N34VPsSXodvwmiitfGw00KIwbAsdM");

    try {
      setLoading(true);
      const response :any= await initiateCheckout({ userId });

      if (response.data.success) {
        const stripeId = response.data.id;
        localStorage.setItem('sessionId', stripeId);
        const result = await stripe?.redirectToCheckout({ sessionId: stripeId });

        if (result?.error) {
          toast.error(result.error.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while initiating checkout.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response:any= await getAllTransactions({ userId });

        if (response.data.success) {
          const latestTransactionData = response.data.latestPremiumUser;

          if (latestTransactionData) {
            setLatestTransaction(latestTransactionData);
            const expiryDate = parseISO(latestTransactionData.expiryDate);
            const today = new Date();
            const remainingDays = differenceInDays(expiryDate, today);
            setDaysRemaining(remainingDays);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        localStorage.removeItem('sessionId');
        console.error(error);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <>
      {user.isPremium === false && (
        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">₹ 249</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/mo</span>
            </p>
            <a onClick={makePayment} className="mt-10 block w-full rounded-md bg-green-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {loading && (
                <Spinner className="me-2" color="success" aria-label="Medium sized spinner example" size="md" />
              )}
              Get access
            </a>
            <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
          </div>
        </div>
      )}

      {user.isPremium === true && (
        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">Premium membership is <span className="text-green-600">Active</span></p>
            <p className="mt-6 items-baseline justify-center gap-x-2 p-7">
              <span className="text-5xl font-bold tracking-tight text-gray-900">{daysRemaining}</span>
              <p className="text-sm font-semibold leading-6 tracking-wide text-gray-600">Days Remaining</p>
            </p>
            <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Premium;
