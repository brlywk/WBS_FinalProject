export default class ApiEndpoints {
  static _endpoints = null;

  static _generateEndpoints() {
    const { VITE_API_HOST, VITE_API_PORT, VITE_API_BASE } = import.meta.env;

    const adjustedHost = `${VITE_API_HOST}${
      VITE_API_PORT ? `:${VITE_API_PORT}` : ""
    }`;
    const baseUrl = new URL(VITE_API_BASE, adjustedHost);

    if (!baseUrl) {
      throw new Error("Unable to generate API endpoints.");
    }

    return {
      subscriptions: `${baseUrl.href}/subscriptions`,
      categories: `${baseUrl.href}/categories`,
      usage: `${baseUrl.href}/usage`,
      subscriptionUsage: `${baseUrl.href}/subscriptionUsage`,
      dashboard: `${baseUrl.href}/dashboard`,
    };
  }

  static get endpoints() {
    if (!this._endpoints) {
      this._endpoints = this._generateEndpoints();
    }

    return this._endpoints;
  }

  // ---- API endpoints ----
  static get subscriptions() {
    return this.endpoints.subscriptions;
  }

  static get categories() {
    return this.endpoints.categories;
  }

  static get usage() {
    return this.endpoints.usage;
  }

  static get subscriptionUsage() {
    return this.endpoints.subscriptionUsage;
  }

  static get dashboard() {
    return this.endpoints.dashboard;
  }

  // ---- API endpoints with params ----
  static subscription(id) {
    return `${this.subscriptions}/${id}`;
  }

  static category(id) {
    return `${this.categories}/${id}`;
  }

  static usageById(id) {
    return `${this.usage}/${id}`;
  }

  static subscriptionUsageById(id) {
    return `${this.subscriptionUsage}/${id}`;
  }

  static get mostUsedSubscription() {
    return `${this.dashboard}/mostUsed`;
  }

  static get potentialMonthlySavings() {
    return `${this.dashboard}/savings`;
  }

  static get totalMonthlyCost() {
    return `${this.dashboard}/totalCost`;
  }
}