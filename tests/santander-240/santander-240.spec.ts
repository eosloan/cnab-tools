import { describe, it, expect } from "vitest";
import {
  parse,
  generate,
  type SantanderCnab240RemessaFileHeader,
  type SantanderCnab240RemessaBatchHeader,
  generateCodigoBarras,
  generateLinhaDigitavel,
  calculateDueFactor,
} from "../../src/santander-240";

describe("santander-240", () => {
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

  describe("generate", () => {
    it("generate remessa file header", () => {
      const header: SantanderCnab240RemessaFileHeader = {
        recordType: "0",
        bankCode: "033",
        batchNumber: "0",
        fileType: "REMESSA",
        filler1: "",
        companyTaxIdTypeCode: "2",
        companyTaxId: "99999999000199",
        transmissionCode: "227100000449167",
        filler2: "",
        companyName: "EOS FUNDO DE INVESTIMENTO EM DIREITOS CREDITORIOS",
        bankName: "BANCO SANTANDER",
        filler3: "",
        fileTypeCode: "1",
        creationDate: "16092025",
        filler4: "",
        fileSequenceNumber: "207",
        layoutVersion: "040",
        filler5: "",
      };
      const generated = generate([header]).split("\r\n")[0];
      expect(generated).toBe(
        "03300000        2099999999000199227100000449167                         EOS FUNDO DE INVESTIMENTO EM DBANCO SANTANDER                         116092025      000207040                                                                          ",
      );
    });

    it("generate remessa batch header", () => {
      const header: SantanderCnab240RemessaBatchHeader = {
        recordType: "1",
        bankCode: "033",
        batchNumber: "1",
        fileType: "REMESSA",
        operationTypeCode: "R",
        serviceTypeCode: "01",
        filler1: "",
        batchVersion: "",
        filler2: "",
        companyTaxIdTypeCode: "2",
        companyTaxId: "99999999000199",
        filler3: "",
        transmissionCode: "227100000449167",
        filler4: "",
        companyName: "EOS FUNDO DE INVESTIMENTO EM DIREITOS CREDITORIOS",
        message1: "",
        message2: "",
        operationNumber: "606",
        creationDate: "16092025",
        filler5: "",
      };
      const generated = generate([header]).split("\r\n")[0];
      expect(generated).toBe(
        "03300011R01  030 2099999999000199                    227100000449167     EOS FUNDO DE INVESTIMENTO EM D                                                                                0000060616092025                                         ",
      );
    });

    it("parse retorno without errors", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const retPath = path.resolve(__dirname, "MINI.RET");
      const ret = await fs.readFile(retPath, "utf8");

      parse(ret);
    });

    it.each([
      { date: new Date("2000-07-03"), expected: "1000" },
      { date: new Date("2000-07-04"), expected: "1001" },
      { date: new Date("2000-07-05"), expected: "1002" },
      { date: new Date("2002-05-01"), expected: "1667" },
      { date: new Date("2010-11-17"), expected: "4789" },
      { date: new Date("2025-02-21"), expected: "9999" },
      { date: new Date("2025-02-22"), expected: "1000" },
      { date: new Date("2025-02-23"), expected: "1001" },
      { date: new Date("2025-02-24"), expected: "1002" },
    ])("should calculate due factor for date $date", ({ date, expected }) => {
      expect(calculateDueFactor(date)).toBe(expected);
    });

    it("generates barcode correctly", () => {
      const barcode = generateCodigoBarras(
        "227100000449167",
        "378933",
        "5",
        "37751",
        new Date("2032-10-01"),
      );
      expect(barcode).toBe("03394377800000377519044916700000003789330101");
    });

    it("generates typeableline correctly", () => {
      const barcode = generateCodigoBarras(
        "227100000449167",
        "378933",
        "5",
        "37751",
        new Date("2032-10-01"),
      );
      const typeableline = generateLinhaDigitavel(barcode);
      expect(typeableline).toBe(
        "03399.04492 16700.000009 37893.301012 4 37780000037751",
      );
    });
  });
});
