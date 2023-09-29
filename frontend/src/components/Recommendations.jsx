import { useDataContext } from "../contexts/dataContext";
import StatsCard from "./StatsCard";

export default function Recommendations() {
  const { dashboardData, subscriptions } = useDataContext();

  const BarelyUsed = (
    <div className="">
      <span className="font-bold">
        {dashboardData?.barelyUsedMostExpensive.name}
      </span>{" "}
      <span className="font-normal">
        is low usage and high cost. Perhaps consider cancelling{" "}
        {dashboardData?.barelyUsedMostExpensive.name}.
      </span>
    </div>
  );

  const leastUsedSubs = subscriptions
    ?.filter((s) => s.score !== 0)
    .sort((a, b) => (a.score >= b.score ? 1 : -1))
    .splice(0, 4);
  const LeastUsed = (
    <div>
      {leastUsedSubs?.length > 0 &&
        leastUsedSubs?.map((lu) => (
          <div key={lu._id}>
            {lu.name} ({lu.score.toFixed(2)})
          </div>
        ))}
    </div>
  );

  return (
    <div className="flex h-full flex-row gap-4 pt-4">
      <StatsCard
        title={
          <div className="text-center font-bold text-red-300 text-uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-300">
              <path fillRule="evenodd" d="M14.78 5.22a.75.75 0 00-1.06 0L6.5 12.44V6.75a.75.75 0 00-1.5 0v7.5c0 .414.336.75.75.75h7.5a.75.75 0 000-1.5H7.56l7.22-7.22a.75.75 0 000-1.06z" clipRule="evenodd" />
            </svg>
            EXPENSIVE & BARELY USED
          </div>
        }
        value={BarelyUsed}
        width="w-1/2"
        height="h-1/3"
      />
      <StatsCard
        title={
          <div className="text-center font-bold text-red-300 text-uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-300">
              <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
            TOP 3 LEAST USED SUBSCRIPTIONS
          </div>
        }
        value={leastUsedSubs?.map((lu, index) => (
          <div key={lu._id}>
            {index + 1}. {lu.name} ({lu.score.toFixed(2)})
          </div>
        ))} />
    </div>
  );
}
