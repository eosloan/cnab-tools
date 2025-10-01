import { expect, it, describe } from "vitest";
import {
  generate,
  calculateDacAgenciaConta,
  calculateDacNossoNumero,
  calculateDueFactor,
  generateCodigoBarras,
  generateLinhaDigitavel,
  parse,
} from "../../src/bradesco-400";
import type {
  BradescoCnab400RemessaHeader,
  BradescoCnab400RemessaDetail1,
  BradescoCnab400RemessaTrailer,
} from "../../src/bradesco-400";

describe("bradesco-400", () => {
  describe("DAC calculations", () => {
    it("calculates DAC agencia conta correctly", () => {
      expect(calculateDacAgenciaConta("1234", "56789")).toBe("6");
      expect(calculateDacAgenciaConta("0000", "00000")).toBe("0");
      expect(calculateDacAgenciaConta("0001", "12345")).toBe("2");
    });

    it("calculates DAC nosso numero correctly", () => {
      expect(calculateDacNossoNumero("19", "00000000002")).toBe("8");
      expect(calculateDacNossoNumero("19", "00000000001")).toBe("P");
      expect(calculateDacNossoNumero("19", "00000000006")).toBe("0");
    });
  });

  describe("Due factor calculation", () => {
    it.each([
      { date: new Date("2000-07-03"), expected: "1000" },
      { date: new Date("2000-07-04"), expected: "1001" },
      { date: new Date("2000-07-05"), expected: "1002" },
      { date: new Date("2002-05-01"), expected: "1667" },
      { date: new Date("2010-11-17"), expected: "4789" },
      { date: new Date("2025-02-21"), expected: "9999" },
      { date: new Date("2025-02-22"), expected: "1000" },
      { date: new Date("2025-02-23"), expected: "1001" },
    ])("should calculate due factor for date $date", ({ date, expected }) => {
      expect(calculateDueFactor(date)).toBe(expected);
    });
  });

  describe("Barcode and typeable line generation", () => {
    it("generates barcode correctly", () => {
      const barcode = generateCodigoBarras(
        "9",
        "63353260084",
        "3396",
        "7007",
        "74743",
        new Date("2032-10-27"),
      );
      expect(barcode).toBe("23792380400000747433396096335326008400070070");
    });

    it("generates typeable line correctly", () => {
      const barcode = generateCodigoBarras(
        "9",
        "63353260084",
        "3396",
        "7007",
        "74743",
        new Date("2032-10-27"),
      );
      const typeableLine = generateLinhaDigitavel(barcode);
      expect(typeableLine).toBe(
        "23793.39605 96335.326003 84000.700702 2 38040000074743",
      );
    });
  });

  describe("GenerateRemessa function", () => {
    it("Generates header correctly", () => {
      const header: BradescoCnab400RemessaHeader = {
        bankCode: "237",
        bankName: "BRADESCO",
        companyCode: "6026019",
        companyName:
          "EOS FINANCIAMENTO FUNDO DE INVESTIMENTO EM DIREITOS CREDITORIOS",
        generationDate: "190925",
        remessaSequential: "000001",
        sequentialNumber: "000001",
        recordType: "0",
        fileId: "1",
        systemId: "MX",
        blanks1: "",
        blanks2: "",
        remessaLiteral: "REMESSA",
        serviceCode: "01",
        serviceLiteral: "COBRANCA",
      };
      const line = generate([header]).split("\n")[0];
      expect(line).toBe(
        "01REMESSA01COBRANCA       00000000000006026019EOS FINANCIAMENTO FUNDO DE INV237BRADESCO       190925        MX0000001                                                                                                                                                                                                                                                                                     000001",
      );
    });

    it("Generates detail 1 correctly", () => {
      const detail1: BradescoCnab400RemessaDetail1 = {
        recordType: "1",
        debitAgency: "",
        debitAgencyDigit: "",
        accountReason: "",
        debitAccount: "",
        debitAccountDigit: "",
        companyIdentification: "00090339600070076",
        yourNumber: "0000000272000100000003474",
        bankCode: "237",
        penaltyField: "2",
        penaltyPercentage: "200",
        ourNumber: "62769979001",
        ourNumberDac: "5",
        dailyBonusDiscount: "0000000000",
        bankslipEmissionCondition: "2",
        debitAutoBankslip: "N",
        bankOperationId: "",
        creditSplitIndicator: "",
        debitAutoNoticeAddress: "2",
        paymentsQuantity: "",
        occurrenceCode: "01",
        documentNumber: "6276997901",
        dueDate: "181025",
        amount: "88120",
        chargingBank: "000",
        depositoryAgency: "00000",
        species: "01",
        identification: "N",
        issueDate: "190925",
        instruction1: "",
        instruction2: "",
        dailyLateFee: "234",
        discountDate: "",
        discountAmount: "",
        iofAmount: "",
        rebateAmount: "",
        payerTaxIdType: "01",
        payerTaxId: "12345678901",
        payerName: "GEOVANI XXXXX XXXXXXXXX XXXXXX DOS REIS",
        payerAddress: "RUA TESTE 123 CENTRO",
        firstMessage: "",
        payerZipCode: "15808",
        payerZipSuffix: "999",
        finalBeneficiaryOrSecondMessage: "",
        sequentialNumber: "000002",
      };
      const line = generate([detail1]).split("\n")[0];
      expect(line).toBe(
        "100000000000000000000009033960007007600000002720001000000034742372020062769979001500000000002N           2  01627699790118102500000000881200000000001N190925000000000000002340000000000000000000000000000000000000000000000100012345678901GEOVANI XXXXX XXXXXXXXX XXXXXX DOS REIS RUA TESTE 123 CENTRO                                15808999                                                            000002",
      );
    });

    it("Generates trailer correctly", () => {
      const trailer: BradescoCnab400RemessaTrailer = {
        recordType: "9",
        blanks1: "",
        sequentialNumber: "938",
      };
      const line = generate([trailer]).split("\n")[0];
      expect(line).toBe(
        "9                                                                                                                                                                                                                                                                                                                                                                                                         000938",
      );
    });
  });

  describe("Parse remessa function", () => {
    it("parse remessa correctly", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, "MINI.REM");
      const original = await fs.readFile(remPath, "utf8");

      const { type, layout, entries } = parse(original);

      expect(type).toBe("REMESSA");
      expect(layout).toBe("400");
      expect(entries.length).toBe(3);

      expect(entries).toStrictEqual([
        {
          bankCode: "237",
          bankName: "BRADESCO",
          blanks1: " ".repeat(8),
          blanks2: " ".repeat(277),
          companyCode: "00000000000006026019",
          companyName: "EOS FINANCIAMENTO FUNDO DE INV",
          fileId: "1",
          generationDate: "190925",
          recordType: "0",
          remessaLiteral: "REMESSA",
          remessaSequential: "0000016",
          sequentialNumber: "000001",
          serviceCode: "01",
          serviceLiteral: "COBRANCA",
          systemId: "MX",
        },
        {
          accountReason: "00000",
          amount: "0000000088120",
          bankCode: "237",
          bankOperationId: "          ",
          bankslipEmissionCondition: "2",
          chargingBank: "000",
          companyIdentification: "00090339600070076",
          creditSplitIndicator: " ",
          dailyBonusDiscount: "0000000000",
          dailyLateFee: "0000000000234",
          debitAccount: "0000000",
          debitAccountDigit: "0",
          debitAgency: "00000",
          debitAgencyDigit: "0",
          debitAutoBankslip: "N",
          debitAutoNoticeAddress: "2",
          depositoryAgency: "00000",
          discountAmount: "0000000000000",
          discountDate: "000000",
          documentNumber: "6276997901",
          dueDate: "181025",
          finalBeneficiaryOrSecondMessage:
            "                                                            ",
          firstMessage: "            ",
          identification: "N",
          instruction1: "00",
          instruction2: "00",
          iofAmount: "0000000000000",
          issueDate: "190925",
          occurrenceCode: "01",
          ourNumber: "62769979001",
          ourNumberDac: "5",
          payerAddress: "ARCHIMEDES PEREIRA LIMA 999 SANT        ",
          payerName: "GEOVANI XXXXX XXXXXXXXX XXXXXX DOS REIS ",
          payerTaxId: "00012345678901",
          payerTaxIdType: "01",
          payerZipCode: "15808",
          payerZipSuffix: "999",
          paymentsQuantity: "  ",
          penaltyField: "2",
          penaltyPercentage: "0200",
          rebateAmount: "0000000000000",
          recordType: "1",
          sequentialNumber: "000002",
          species: "01",
          yourNumber: "0000000272000100000003474",
        },
        {
          blanks1:
            "                                                                                                                                                                                                                                                                                                                                                                                                         ",
          recordType: "9",
          sequentialNumber: "000003",
        },
      ]);
    });

    it.each(["MINI.REM"])(
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
  });

  describe("Parse retorno function", () => {
    it("parse retorno correctly", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, "MINI.RET");
      const original = await fs.readFile(remPath, "utf8");

      const { type, layout, entries } = parse(original);

      expect(type).toBe("RETORNO");
      expect(layout).toBe("400");
      expect(entries.length).toBe(3);

      expect(entries).toStrictEqual([
        {
          bankCode: "237",
          bankName: "BRADESCO",
          bankNoticeNumber: "00001",
          blanks1: " ".repeat(266),
          blanks2: " ".repeat(9),
          companyCode: "00000000000006026019",
          companyName: "EOS FINANCIAMENTO FUNDO DE INV",
          creditDate: "170925",
          fileId: "2",
          generationDate: "170925",
          recordType: "0",
          recordingDensity: "01600000",
          returnLiteral: "RETORNO",
          sequentialNumber: "000001",
          serviceCode: "01",
          serviceLiteral: "COBRANCA",
        },
        {
          amount: "0000000098784",
          bankUse1: "0000000000",
          bankUse2: "000000000000",
          beneficiaryTaxId: "61145490000109",
          beneficiaryTaxIdType: "02",
          blanks1: "  ",
          blanks2: "          ",
          blanks3: "                                        ",
          blanks4: "              ",
          chargingCost: "0000000000115",
          checkBankCode: "    ",
          collectorAgency: "04452",
          collectorBank: "237",
          companyIdentification: "00090339600070076",
          creditDate: "      ",
          creditSplitIndicator: "0",
          discountAmount: "0000000000000",
          documentNumber: "6342775501",
          dueDate: "261125",
          iofAmount: "0000000000000",
          lateInterest: "0000000000000",
          lateOperationInterest: "0000000000000",
          notaryNumber: "  ",
          occurrenceCode: "02",
          occurrenceDate: "170925",
          occurrenceReason: " ",
          otherCosts: "0000000000000",
          otherCredits: "0000000000000",
          ourNumber: "63427755001",
          ourNumberWithDac: "00000000634277550018",
          paidAmount: "0000000000000",
          partialPayment: "00",
          paymentOrigin: "   ",
          protocolNumber: "          ",
          rebateAmount: "0000000000000",
          recordType: "1",
          rejectionReasons: "7600000000",
          sequentialNumber: "000002",
          species: "  ",
          wallet: "9",
          yourNumber: "0000000272000100000000485",
          zeros1: "000",
          zeros2: "00000000",
        },
        {
          bankCode: "237",
          bankNoticeNumber: "00000001",
          blanks1: "          ",
          blanks2: "          ",
          blanks3:
            "                                                                                                                                                                              ",
          blanks4: "         ",
          occurrence02BankNotice: "00000000",
          occurrence02Qty: "00060000",
          occurrence02Value: "00592704000000",
          occurrence06BankNotice: "00000000",
          occurrence06Qty: "00000000",
          occurrence06Value: "00000000000000",
          occurrence09Qty: "00000000",
          occurrence09Value: "00000000000000",
          occurrence10Qty: "00000000",
          occurrence10Value: "00000000000000",
          occurrence12Qty: "        ",
          occurrence12Value: "              ",
          occurrence13Qty: "00000000",
          occurrence13Value: "00000000000000",
          occurrence14Qty: "00000   ",
          occurrence14Value: "              ",
          occurrence19Qty: "        ",
          occurrence19Value: "              ",
          recordType: "9",
          recordTypeId: "01",
          returnId: "2",
          sequentialNumber: "000003",
          titlesInCollectionQty: "00000060",
          titlesInCollectionValue: "00000005927040",
          totalSplitsQty: "00000000",
          totalSplitsValue: "000000000000000",
        },
      ]);
    });
  });
});
