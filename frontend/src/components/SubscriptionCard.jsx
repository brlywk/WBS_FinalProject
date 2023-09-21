// SubscriptionCard.jsx

export default function SubscriptionCard({ title, price, status }) {
    return (
      <div className="stats flex justify-center mb-4 ml-6 p-4 rounded-lg bg-gray-100"> {/* Adjusted ml-10 to ml-6 to decrease the gap next to each card by 20px */}
        <div className="flex items-center">

          <div className="bg-gray-400 rounded-full p-1"> {/* This div will create a grey circle around the icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <div>
                      <h3 className="text-lg font-medium">{title}</h3>
                      <p className="text-gray-600">{status}</p>
                      <p className="text-lg font-semibold">{price}</p>
                    </div>
                  </div>
                </div>
              );
            }