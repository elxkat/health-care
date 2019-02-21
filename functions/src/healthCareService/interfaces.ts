

export interface ProvidersQueryParams {
  min_discharges?: number;
  max_discharges?: number;
  min_average_covered_charges?: number;
  max_average_covered_charges?: number;
  min_average_medicare_payments?: number;
  max_average_medicare_payments?: number;
  state?: string;
  fields?: string;
}

export const tableServiceName = 'providers';
export const totalDischargesColumn = '"Total Discharges"';
export const averageCoveredChargesColumn = '"Average Covered Charges"';
export const averageMedicarePaymentsColumn = '"Average Medicare Payments"';
export const providerStateColumn = '"Provider State"';

export const fieldToDef: {
  [fieldName: string]: { dataType: string }
} = {
  [`${tableServiceName}.${totalDischargesColumn}`]: { dataType: "int" },
  [`${tableServiceName}.${averageCoveredChargesColumn}`]: { dataType: "money" },
  [`${tableServiceName}.${averageMedicarePaymentsColumn}`]: { dataType: "money" },
  [`${tableServiceName}.${providerStateColumn}`]: { dataType: "text" }
};

export const dataTypeToQuerySyntax = {
  int: "",
  money: "'",
  text: "'"
};