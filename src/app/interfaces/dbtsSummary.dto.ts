export interface DebtsSummary {
  "debt-free-properties": number;
  "debt-properties": number;
}

export interface Debt {
  category: string;
  "debt-free-properties": number;
  "debt-properties": number;
}

export interface ApiResponse {
  "debts-summary": DebtsSummary;
  debts: Debt[];
}
