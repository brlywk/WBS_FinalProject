  export const SubscriptionsComponent = ({ subscriptions }) => {
    // Check if subscriptions is not undefined before mapping over it
    // This is like checking if a box is empty before trying to take something out of it
    // If we don't do this, we'll get an error when trying to take something out of an empty box
    const subscriptionCards = subscriptions ? subscriptions.map(sub => (
      <SubscriptionCard 
        key={sub.id}
        title={sub.title}
        price={sub.price}
        status={sub.status} 
      />
    )) : null; // If subscriptions is undefined, we set subscriptionCards to null
    
    return (
      <div className="bg-transparent flex justify-center w-full dashboard">
        {/* rest of your code... */}
        <main className="bg-white/40 flex flex-col gap-y-6">
          <div className="subscription-cards">
            {subscriptionCards}
          </div>
        </main>
      </div>
    );
  }

