import {
  averageCoveredChargesColumn, averageMedicarePaymentsColumn,
  dataTypeToQuerySyntax,
  fieldToDef,
  ProvidersQueryParams, providerStateColumn,
  tableServiceName,
  totalDischargesColumn
} from "./interfaces";

export const rangeQuery = (fieldName: string, minVal, maxVal) => {
  if (!fieldToDef[fieldName]) {
    return "";
  }

  const querySyntax = dataTypeToQuerySyntax[fieldToDef[fieldName].dataType];
  if (minVal !== undefined && maxVal !== undefined) {
    return `${fieldName} BETWEEN ${querySyntax}${minVal}${querySyntax} AND ${querySyntax}${maxVal}${querySyntax}`;
  } else if (minVal !== undefined) {
    return `${fieldName} >= ${querySyntax}${minVal}${querySyntax}`;
  } else if (maxVal !== undefined) {
    return `${fieldName} <= ${querySyntax}${maxVal}${querySyntax}`;
  }

  return "";
};

export const equalsQuery = (fieldName: string, value) => {
  if (value === undefined || !fieldToDef[fieldName]) {
    return "";
  }
  const querySyntax = dataTypeToQuerySyntax[fieldToDef[fieldName].dataType];
  return `${fieldName} = ${querySyntax}${value}${querySyntax}`;
};

export const queryConcat = (queryParts: string[]) => {
  const queryConcat = queryParts.reduce((queryConcat, part) => {
    if (!part) {
      return queryConcat;
    }

    return queryConcat + `${part} AND `;
  }, "");

  return queryConcat.slice(0, queryConcat.length - 5); // remove last " AND " string
};

export const extractFields = (fieldsStr: string | undefined) => {
  if (!fieldsStr) {
    return "*";
  }

  // current format is delimited with ',' so currently no extract is needed
  return fieldsStr;
};

export const queryBuilder = (queryParams: ProvidersQueryParams) => {
  const dischargesQuery = rangeQuery(`${tableServiceName}.${totalDischargesColumn}`, queryParams.min_discharges, queryParams.max_discharges);
  const averageCoveredChargesQuery = rangeQuery(`${tableServiceName}.${averageCoveredChargesColumn}`, queryParams.min_average_covered_charges, queryParams.max_average_covered_charges);
  const averageMedicarePaymentsQuery = rangeQuery(`${tableServiceName}.${averageMedicarePaymentsColumn}`, queryParams.min_average_medicare_payments, queryParams.max_average_medicare_payments);
  const stateQuery = equalsQuery(`${tableServiceName}.${providerStateColumn}`, queryParams.state);

  const wherePart = queryConcat([dischargesQuery, averageCoveredChargesQuery, averageMedicarePaymentsQuery, stateQuery]);

  const selectPart = `SELECT ${extractFields(queryParams.fields)} FROM public.${tableServiceName} as ${tableServiceName}`;
  return !!wherePart ? `${selectPart} WHERE ${wherePart}` : selectPart;
};
