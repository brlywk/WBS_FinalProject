import { useEffect } from "react";
import useSubscription from "../hooks/useSubscription";

export default function ApiTest() {
  const {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  } = useSubscription();

  useEffect(() => {
    const abortController = new AbortController();

    // GET ALL SUBSCRIPTIONS
    // This construct here is a nameless function that immediately gets executed
    (async function () {
      try {
        // IMPORTAT: To avoid pending requests if the user navigates away, ALL requests
        // require an abortController (see above) as the last argument
        const subs = await getAllSubscriptions(abortController);
        console.log("Subs", subs);
      } catch (error) {
        console.log(error);
      }
    })();

    // GET SINGLE SUBSCRIPTION
    // (async function () {
    //   try {
    //     const sub = await getSubscriptionById(
    //       "65085093ae0d34a75257a626",
    //       abortController,
    //     );
    //     console.log("fetchSubscriptionById", sub);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();

    // CREATE SUBSCRIPTION
    // (async function () {
    //   try {
    //     const subscription = {
    //       name: "FlatNix",
    //       price: 100,
    //       interval: "monthly",
    //     };
    //
    //     // Note: This returns the location of the newly created object!
    //     const sub = await createSubscription(subscription, abortController);
    //     console.log("ApiTest - createSubscription", sub);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();

    // UPDATE SUBSCRIPTION
    // (async function () {
    //   try {
    //     const updatedSub = {
    //       _id: "6509a971290ff801fa54b8ed",
    //       name: "Dusnay Minus",
    //       price: 20,
    //       interval: "monthly",
    //     };
    //
    //     const changedSub = await updateSubscription(
    //       updatedSub,
    //       abortController,
    //     );
    //     console.log("ApiTest - updateSubscription", changedSub);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();

    // DELETE SUBSCRIPTION
    // (async function () {
    //   try {
    //     const deleteId = "6509ab6ff0abc109fea58f36";
    //
    //     const deletionResult = await deleteSubscription(
    //       deleteId,
    //       abortController,
    //     );
    //     console.log(deletionResult);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();

    // All useEffect calls to the backend need this cleanup function which cancels
    // all running fetch requests
    return () => abortController.abort();
  }, []);

  return <div>ApiTest</div>;
}
