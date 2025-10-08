import { describe, it, expect } from "vitest";
import {
  parse,
  generate,
  type SantanderCnab240RemessaFileHeader,
  type SantanderCnab240RemessaBatchHeader,
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
  });
});
