import { useEffect } from "react";
import useSubscription from "../hooks/useSubscription";

export default function ApiTest() {
  const { getAllSubscriptions, getSubscriptionById } = useSubscription();

  useEffect(() => {
    const abortController = new AbortController();

    // (async function fetchSubscriptions() {
    //   try {
    //     const subs = await getAllSubscriptions(abortController);
    //     console.log("Subs", subs);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
    (async function fetchSubscriptionById() {
      try {
        const sub = await getSubscriptionById(
          "65085093ae0d34a75257a626",
          abortController,
        );
        console.log("Sub", sub);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => abortController.abort();
  }, []);

  return <div>ApiTest</div>;
}
