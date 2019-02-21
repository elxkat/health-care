import {equalsQuery, extractFields, queryBuilder, queryConcat, rangeQuery} from "../impl";
import {averageCoveredChargesColumn, providerStateColumn, tableServiceName, totalDischargesColumn} from "../interfaces";


describe("healthCareService", () => {

  ///// rangeQuery
  it("rangeQuery - returns empty string for non-exist field name", () => {
    expect(rangeQuery("non-exist", 20, 30)).toBe("");
  });

  it("rangeQuery - supports both min and max values", () => {
    expect(rangeQuery(`${tableServiceName}.${totalDischargesColumn}`, 20, 30))
      .toBe(`${tableServiceName}.${totalDischargesColumn} BETWEEN 20 AND 30`);
  });

  it("rangeQuery - supports min value only", () => {
    expect(rangeQuery(`${tableServiceName}.${totalDischargesColumn}`, 20, undefined))
      .toBe(`${tableServiceName}.${totalDischargesColumn} >= 20`);
  });

  it("rangeQuery - supports max value only", () => {
    expect(rangeQuery(`${tableServiceName}.${totalDischargesColumn}`, undefined, 30))
      .toBe(`${tableServiceName}.${totalDischargesColumn} <= 30`);
  });

  it("rangeQuery - supports money data type column", () => {
    expect(rangeQuery(`${tableServiceName}.${averageCoveredChargesColumn}`, undefined, 30000))
      .toBe(`${tableServiceName}.${averageCoveredChargesColumn} <= '30000'`);
  });


  ///// equalsQuery
  it("equalsQuery - supports string data type", () => {
    expect(equalsQuery(`${tableServiceName}.${providerStateColumn}`, "GA"))
      .toBe(`${tableServiceName}.${providerStateColumn} = 'GA'`);
  });

  it("equalsQuery - returns empty string for non-exist field name", () => {
    expect(equalsQuery(`non-exist`, 30)).toBe("");
  });


  ///// queryConcat
  it("queryConcat - empty array", () => {
    expect(queryConcat([])).toBe("");
  });

  it("queryConcat - one item array", () => {
    expect(queryConcat(["AAA"])).toBe("AAA");
  });

  it("queryConcat - multi items array", () => {
    expect(queryConcat(["AAA", "BBB", "CCC"])).toBe("AAA AND BBB AND CCC");
  });

  ////// extractFields
  it("extractFields - returns * for no fields", () => {
    expect(extractFields(undefined)).toBe("*");
  });

  it("extractFields - returns fields string for fields", () => {
    expect(extractFields('"Provider State","Provider Id"')).toBe('"Provider State","Provider Id"');
  });

  //// queryBuilder
  it("queryBuilder - supports no params", () => {
    expect(queryBuilder({})).toBe("SELECT * FROM public.providers as providers");
  });

  it("queryBuilder - one field", () => {
    expect(queryBuilder({
      min_discharges: 20,
      max_discharges: 50
    })).toBe("SELECT * FROM public.providers as providers WHERE providers.\"Total Discharges\" BETWEEN 20 AND 50");
  });

  it("queryBuilder - combination multi data types", () => {
    expect(queryBuilder({
      state: "AB",
      min_discharges: 50,
      max_average_medicare_payments: 50000
    })).toBe("SELECT * FROM public.providers as providers WHERE providers.\"Total Discharges\" >= 50 AND providers.\"Average Medicare Payments\" <= '50000' AND providers.\"Provider State\" = 'AB'");
  });

  it("queryBuilder - combination all fields all ranges", () => {
    expect(queryBuilder({
      state: "AB",
      min_discharges: 50,
      max_discharges: 100,
      min_average_medicare_payments: 20000,
      max_average_medicare_payments: 50000,
      min_average_covered_charges: 10000,
      max_average_covered_charges: 70000
    })).toBe("SELECT * FROM public.providers as providers WHERE providers.\"Total Discharges\" BETWEEN 50 AND 100 AND providers.\"Average Covered Charges\" BETWEEN '10000' AND '70000' AND providers.\"Average Medicare Payments\" BETWEEN '20000' AND '50000' AND providers.\"Provider State\" = 'AB'");
  });

  it("queryBuilder - just fields selection", () => {
    expect(queryBuilder({
      fields: '"Provider State","Provider Id"'
    })).toBe("SELECT \"Provider State\",\"Provider Id\" FROM public.providers as providers");
  });

  it("queryBuilder - combination filters and fields selection", () => {
    expect(queryBuilder({
      state: "AB",
      min_discharges: 50,
      max_discharges: 100,
      min_average_medicare_payments: 20000,
      max_average_medicare_payments: 50000,
      min_average_covered_charges: 10000,
      max_average_covered_charges: 70000,
      fields: '"Provider State","Provider Id"'
    })).toBe("SELECT \"Provider State\",\"Provider Id\" FROM public.providers as providers WHERE providers.\"Total Discharges\" BETWEEN 50 AND 100 AND providers.\"Average Covered Charges\" BETWEEN '10000' AND '70000' AND providers.\"Average Medicare Payments\" BETWEEN '20000' AND '50000' AND providers.\"Provider State\" = 'AB'");
  });
});