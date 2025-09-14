import { expect, it, describe } from "vitest";
import {
  generate,
  parse,
  calculateDacAgenciaConta,
  parseRetornoDetail1,
  generateCodigoBarras,
  calculateDueFactor,
  generateLinhaDigitavel,
} from "../../src/itau-400";

describe("itau-400", () => {
  it("calculates DAC agencia conta correctly", () => {
    expect(calculateDacAgenciaConta("1234", "56789")).toBe("7");
    expect(calculateDacAgenciaConta("", "")).toBe("0");
  });

  it.each(["VALID.txt", "VALID2.txt"])(
    "generate output matches original %s file (roundtrip snapshot)",
    async (file) => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, file);
      const original = await fs.readFile(remPath, "utf8");

      // Parse and then generate
      const { entries: parsed } = parse(original);
      const generated = generate(parsed);

      // Normalize both to CRLF and trim trailing newlines for strict comparison
      const normalize = (s: string) =>
        s.replace(/\r?\n/g, "\r\n").replace(/(\r\n)+$/g, "");

      // console.log(diffs);
      expect(normalize(generated)).toBe(normalize(original));
    },
  );

  it("parse retorno detail 1", () => {
    const line =
      "102cnpjcnpj0001cnaaaa00ccccc0        273027745738             25011768            109250117688             I092407252730277   25011768            26032500000001591453417788315000000000013500000000000000000000000000000000000000000000000000000000000000000000000000013500000000000000000000000000         00000000000000000000000NOME DO PAGADOR                                                       000003";
    expect(parseRetornoDetail1(line)).toStrictEqual({
      account: "ccccc",
      agency: "aaaa",
      amount: "0000000159145",
      bankCode: "341",
      bankslipDDA: " ",
      cancelledInstructionCode: "0000",
      chargingAgency: "7788",
      chargingAgencyDac: "3",
      chargingCost: "0000000000135",
      creditDate: "      ",
      dac: "0",
      dacOurNumber: "8",
      discountAmount: "0000000000000",
      documentNumber: "2730277   ",
      downPaymentAmount: "0000000000000",
      dueDate: "260325",
      errorCodes: "        ",
      iofAmount: "0000000000000",
      liquidationCode: "  ",
      moraAmount: "0000000000000",
      occurrenceCode: "09",
      occurrenceDate: "240725",
      otherCreditAmount: "0000000000000",
      ourNumber: "25011768",
      payerName: "NOME DO PAGADOR               ",
      payerTaxId: "cnpjcnpj0001cn",
      payerTaxIdType: "02",
      principalAmount: "0000000000135",
      recordType: "1",
      sequentialNumber: "000003",
      species: "15",
      walletNumber: "109",
      yourNumber: "273027745738             ",
    });
  });

  it("can parse retorno without error", async () => {
    const fs = await import("fs/promises");
    const path = await import("path");
    const retPath = path.resolve(__dirname, "RETORNO.RET");
    const original = await fs.readFile(retPath, "utf8");

    parse(original);
  });

  it.each([
    { date: new Date("2000-07-03"), expected: "1000" },
    { date: new Date("2000-07-04"), expected: "1001" },
    { date: new Date("2000-07-05"), expected: "1002" },
    { date: new Date("2000-07-06"), expected: "1003" },
    { date: new Date("2000-07-07"), expected: "1004" },
    { date: new Date("2002-05-01"), expected: "1667" },
    { date: new Date("2010-11-17"), expected: "4789" },
    { date: new Date("2025-02-21"), expected: "9999" },
    { date: new Date("2025-02-22"), expected: "1000" },
    { date: new Date("2025-02-23"), expected: "1001" },
  ])("should calculate due factor for date $date", ({ date, expected }) => {
    expect(calculateDueFactor(date)).toBe(expected);
  });

  it("generate barcode", () => {
    const barcode = generateCodigoBarras(
      "109",
      "12345678",
      "1234",
      "56789",
      "10000",
      new Date("2000-07-03"),
    );
    expect(barcode).toHaveLength(44);
    expect(barcode).toBe("34194100000000100001091234567841234567897000");
  });

  it("generate typeable line", () => {
    const barcode = generateCodigoBarras(
      "109",
      "00004460",
      "0000",
      "00000",
      "87777",
      new Date("2025-09-17"),
    );
    const typeableLine = generateLinhaDigitavel(barcode);
    expect(typeableLine.replace(/[^0-9]/g, "")).toHaveLength(47);
    expect(typeableLine).toBe(
      "34191.09008 00446.010001 00000.000000 5 12070000087777",
    );
  });
});
