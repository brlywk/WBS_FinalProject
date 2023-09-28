const ALL_GREETINGS = {
  morning: ["Good Morning"],
  afternoon: ["Good Afternoon", "Hello", "Hello there", "Hi"],
  evening: ["Good evening"],
  night: ["Go to bed"],
};

export default function getGreeting(name) {
  const currentHour = new Date().getHours();

  let timeOfDay = "";

  if (currentHour >= 6 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour <= 18) {
    timeOfDay = "afternoon";
  } else if (currentHour > 18 && currentHour <= 22) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  const greetings = ALL_GREETINGS[timeOfDay];
  const phrase = greetings[Math.floor(Math.random() * greetings.length)];

  return `${phrase}, ${name}`;
}
