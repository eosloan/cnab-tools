import { expect, it, describe } from "vitest";
import {
  generate,
  generateRemessa,
  parse,
  parseRemessa,
  parseRetorno,
  calculateDacAgenciaConta,
  calculateDacNossoNumero,
  calculateDueFactor,
  generateCodigoBarras,
  generateLinhaDigitavel,
  parseRemessaHeader,
  parseRemessaDetail1,
  parseRetornoHeader,
  parseRetornoDetail1,
} from "../../src/bradesco-400";
import {
  InvalidRecordTypeError,
  LineLengthError,
  UnsupportedLayoutError,
} from "../../src/utils/errors";
import type {
  BradescoCnab400RemessaHeader,
  BradescoCnab400RemessaDetail1,
  BradescoCnab400RetornoHeader,
  BradescoCnab400RetornoDetail1,
} from "../../src/bradesco-400";

describe("bradesco-400", () => {
  describe("DAC calculations", () => {
    it("calculates DAC agencia conta correctly", () => {
      expect(calculateDacAgenciaConta("1234", "56789")).toBe("7");
      expect(calculateDacAgenciaConta("0000", "00000")).toBe("0");
      expect(calculateDacAgenciaConta("0001", "12345")).toBe("4");
    });

    it("calculates DAC nosso numero correctly", () => {
      // Test regular carteira
      expect(calculateDacNossoNumero("1234", "56789", "109", "12345678")).toBe(
        "4",
      );

      // Test special carteira 126
      expect(calculateDacNossoNumero("1234", "56789", "126", "12345678")).toBe(
        "5",
      );

      // Test special carteira 131
      expect(calculateDacNossoNumero("1234", "56789", "131", "12345678")).toBe(
        "5",
      );
    });
  });

  describe("Due factor calculation", () => {
    it.each([
      { date: new Date("2000-07-03"), expected: "1000" },
      { date: new Date("2000-07-04"), expected: "1001" },
      { date: new Date("2000-07-05"), expected: "1002" },
      { date: new Date("2025-02-21"), expected: "9999" },
      { date: new Date("2025-02-22"), expected: "1000" },
    ])("should calculate due factor for date $date", ({ date, expected }) => {
      expect(calculateDueFactor(date)).toBe(expected);
    });
  });

  describe("Barcode and typeable line generation", () => {
    it("generates barcode correctly", () => {
      const barcode = generateCodigoBarras(
        "109",
        "12345678",
        "1234",
        "56789",
        "10000",
        new Date("2000-07-03"),
      );
      expect(barcode).toHaveLength(44);
      // Bradesco bank code should be 237
      expect(barcode.substring(0, 3)).toBe("237");
    });

    it("generates typeable line correctly", () => {
      const barcode = generateCodigoBarras(
        "109",
        "00004460",
        "0001",
        "12345",
        "87777",
        new Date("2025-09-17"),
      );
      const typeableLine = generateLinhaDigitavel(barcode);
      expect(typeableLine.replace(/[^0-9]/g, "")).toHaveLength(47);
      expect(typeableLine).toMatch(
        /^\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d{1} \d{14}$/,
      );
    });
  });

  describe("Parse function", () => {
    it("should throw error for empty input", () => {
      expect(() => parse("")).toThrow(UnsupportedLayoutError);
    });

    it("should throw error for wrong layout length", () => {
      const shortLine = "0".repeat(200);
      expect(() => parse(shortLine)).toThrow(UnsupportedLayoutError);
    });

    it("should throw error for invalid record type", () => {
      const invalidLine = "X" + "1".repeat(399);
      expect(() => parse(invalidLine)).toThrow(InvalidRecordTypeError);
    });

    it("should throw error for invalid operation code", () => {
      const invalidLine = "0" + "X" + "0".repeat(398);
      expect(() => parse(invalidLine)).toThrow(InvalidRecordTypeError);
    });

    it("should parse remessa file (operation code 1)", () => {
      const remessaHeader = createValidRemessaHeader();
      const remessaTrailer = createValidRemessaTrailer();
      const cnabContent = remessaHeader + "\n" + remessaTrailer;

      const result = parse(cnabContent);
      expect(result.type).toBe("REMESSA");
      expect(result.layout).toBe("400");
      expect(result.entries).toHaveLength(2);
    });

    it("should parse retorno file (operation code 2)", () => {
      const retornoHeader = createValidRetornoHeader();
      const retornoTrailer = createValidRetornoTrailer();
      const cnabContent = retornoHeader + "\n" + retornoTrailer;

      const result = parse(cnabContent);
      expect(result.type).toBe("RETORNO");
      expect(result.layout).toBe("400");
      expect(result.entries).toHaveLength(2);
    });
  });

  describe("ParseRemessa function", () => {
    it("should parse complete remessa file", () => {
      const lines = [
        createValidRemessaHeader(),
        createValidRemessaDetail1(),
        createValidRemessaTrailer(),
      ];

      const result = parseRemessa(lines, 400);
      expect(result.type).toBe("REMESSA");
      expect(result.entries).toHaveLength(3);
      expect(result.entries[0].recordType).toBe("0");
      expect(result.entries[1].recordType).toBe("1");
      expect(result.entries[2].recordType).toBe("9");
    });

    it("should throw error for invalid line length", () => {
      const lines = [
        createValidRemessaHeader(),
        "1" + "0".repeat(300), // Invalid length
        createValidRemessaTrailer(),
      ];

      expect(() => parseRemessa(lines, 400)).toThrow(LineLengthError);
    });

    it("should throw error for invalid record type", () => {
      const lines = [
        createValidRemessaHeader(),
        "X" + "0".repeat(399), // Invalid record type
        createValidRemessaTrailer(),
      ];

      expect(() => parseRemessa(lines, 400)).toThrow(InvalidRecordTypeError);
    });
  });

  describe("ParseRetorno function", () => {
    it("should parse complete retorno file", () => {
      const lines = [
        createValidRetornoHeader(),
        createValidRetornoDetail1(),
        createValidRetornoTrailer(),
      ];

      const result = parseRetorno(lines, 400);
      expect(result.type).toBe("RETORNO");
      expect(result.layout).toBe("400");
      expect(result.entries).toHaveLength(3);
      expect(result.entries[0].recordType).toBe("0");
      expect(result.entries[1].recordType).toBe("1");
      expect(result.entries[2].recordType).toBe("9");
    });

    it("should throw error for invalid line length in retorno", () => {
      const lines = [
        createValidRetornoHeader(),
        "1" + "0".repeat(300), // Invalid length
        createValidRetornoTrailer(),
      ];

      expect(() => parseRetorno(lines, 400)).toThrow(LineLengthError);
    });

    it("should throw error for invalid record type in retorno", () => {
      const lines = [
        createValidRetornoHeader(),
        "X" + "0".repeat(399), // Invalid record type
        createValidRetornoTrailer(),
      ];

      expect(() => parseRetorno(lines, 400)).toThrow(InvalidRecordTypeError);
    });

    it("should handle retorno file with only header and trailer", () => {
      const lines = [createValidRetornoHeader(), createValidRetornoTrailer()];

      const result = parseRetorno(lines, 400);
      expect(result.type).toBe("RETORNO");
      expect(result.entries).toHaveLength(2);
      expect(result.entries[0].recordType).toBe("0");
      expect(result.entries[1].recordType).toBe("9");
    });

    it("should handle retorno file with multiple detail records", () => {
      const lines = [
        createValidRetornoHeader(),
        createValidRetornoDetail1(),
        createValidRetornoDetail1(), // Multiple details
        createValidRetornoDetail1(),
        createValidRetornoTrailer(),
      ];

      const result = parseRetorno(lines, 400);
      expect(result.type).toBe("RETORNO");
      expect(result.entries).toHaveLength(5);

      // Check all details are parsed correctly
      expect(result.entries[1].recordType).toBe("1");
      expect(result.entries[2].recordType).toBe("1");
      expect(result.entries[3].recordType).toBe("1");
    });

    it("should maintain correct line numbering in error messages", () => {
      const lines = [
        createValidRetornoHeader(),
        createValidRetornoDetail1(),
        "X" + "0".repeat(399), // Invalid record type at line 3
        createValidRetornoTrailer(),
      ];

      try {
        parseRetorno(lines, 400);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidRecordTypeError);
        expect((error as InvalidRecordTypeError).lineNumber).toBe(3);
      }
    });
  });

  describe("GenerateRemessa function", () => {
    const sampleRemessaData = {
      header: {
        agency: "1234",
        account: "56789",
        dac: "0",
        companyName: "EMPRESA TESTE LTDA",
        generationDate: "240924", // 24/09/2024
      },
      details: [
        {
          beneficiaryTaxIdType: "02",
          beneficiaryTaxId: "12345678000123",
          agency: "1234",
          account: "56789",
          dac: "0",
          yourNumber: "DOC001",
          ourNumber: "12345678",
          walletNumber: "109",
          walletCode: "I",
          occurrenceCode: "01",
          documentNumber: "DOC001",
          dueDate: "241224", // 24/12/2024
          amount: "0000000010000", // R$ 100,00
          payerTaxIdType: "01",
          payerTaxId: "12345678901",
          payerName: "PAGADOR TESTE",
          payerAddress: "RUA EXEMPLO, 123",
          payerNeighborhood: "CENTRO",
          payerZipCode: "01234567",
          payerCity: "SAO PAULO",
          payerState: "SP",
        },
      ],
    };

    it("should generate basic remessa file with header, details and trailer", () => {
      const result = generateRemessa(sampleRemessaData);

      // Split into lines and verify structure
      const lines = result.split("\n").filter((line) => line.length > 0);
      expect(lines).toHaveLength(3); // header + 1 detail + trailer

      // Verify each line has exactly 400 characters
      lines.forEach((line) => {
        expect(line.length).toBe(400);
      });

      // Check header (first line)
      expect(lines[0][0]).toBe("0"); // Record type
      expect(lines[0][1]).toBe("1"); // Operation type (remessa)
      expect(lines[0].substring(2, 9)).toBe("REMESSA"); // Literal
      expect(lines[0].substring(76, 79)).toBe("237"); // Bank code

      // Check detail (line 1)
      expect(lines[1][0]).toBe("1"); // Record type

      // Check trailer (last line)
      expect(lines[2][0]).toBe("9"); // Record type
    });

    it("should generate parseable remessa (roundtrip test)", () => {
      const result = generateRemessa(sampleRemessaData);

      // The generated content should be parseable
      const parsed = parse(result);
      expect(parsed.type).toBe("REMESSA");
      expect(parsed.layout).toBe("400");

      // Should have header + 1 detail + trailer = 3 entries
      expect(parsed.entries).toHaveLength(3);

      // Check entry types
      expect(parsed.entries[0].recordType).toBe("0"); // Header
      expect(parsed.entries[1].recordType).toBe("1"); // Detail
      expect(parsed.entries[2].recordType).toBe("9"); // Trailer
    });

    it("should generate remessa with optional detail2 records (multa)", () => {
      const dataWithFine = {
        ...sampleRemessaData,
        detail2Records: [
          {
            fineCode: "1",
            fineDate: "25092024", // 25/09/2024
            fineAmount: "0000000000500", // R$ 5,00
          },
        ],
      };

      const result = generateRemessa(dataWithFine);
      const lines = result.split("\n").filter((line) => line.length > 0);

      // Should have header + 1 detail + 1 detail2 + trailer = 4 lines
      expect(lines).toHaveLength(4);

      // Check that detail2 record exists
      const detail2Line = lines.find((line) => line[0] === "2");
      expect(detail2Line).toBeDefined();
      expect(detail2Line![0]).toBe("2"); // Record type
      expect(detail2Line!.length).toBe(400);
    });

    it("should handle default values correctly", () => {
      const minimalData = {
        header: {
          agency: "0001",
          account: "12345",
          dac: "6",
          companyName: "MINIMAL COMPANY",
          generationDate: "240924",
        },
        details: [
          {
            beneficiaryTaxIdType: "02",
            beneficiaryTaxId: "12345678000123",
            agency: "0001",
            account: "12345",
            dac: "6",
            yourNumber: "MINIMAL001",
            ourNumber: "12345678",
            walletNumber: "109",
            walletCode: "I",
            occurrenceCode: "01",
            documentNumber: "MIN001",
            dueDate: "311224",
            amount: "0000000001000", // R$ 10,00
            payerTaxIdType: "01",
            payerTaxId: "12345678901",
            payerName: "MINIMAL PAYER",
            payerAddress: "MINIMAL ADDRESS",
            payerNeighborhood: "MINIMAL HOOD",
            payerZipCode: "12345678",
            payerCity: "MINIMAL CITY",
            payerState: "SP",
          },
        ],
      };

      const result = generateRemessa(minimalData);
      const lines = result.split("\n").filter((line) => line.length > 0);

      expect(lines).toHaveLength(3); // header + 1 detail + trailer
      lines.forEach((line) => {
        expect(line.length).toBe(400);
      });

      // Should be parseable
      const parsed = parse(result);
      expect(parsed.type).toBe("REMESSA");
    });
  });

  describe("Real CNAB file tests", () => {
    it("can parse remessa file without error", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, "REMESSA_SAMPLE.REM");
      const original = await fs.readFile(remPath, "utf8");

      const result = parse(original);
      expect(result.type).toBe("REMESSA");
      expect(result.layout).toBe("400");
      expect(result.entries.length).toBeGreaterThan(0);

      // Check header
      const header = result.entries[0];
      expect(header.recordType).toBe("0");
      expect((header as BradescoCnab400RemessaHeader).operation).toBe("1");

      // Check trailer
      const trailer = result.entries[result.entries.length - 1];
      expect(trailer.recordType).toBe("9");
    });

    it("can parse retorno file without error", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const retPath = path.resolve(__dirname, "RETORNO_SAMPLE.RET");
      const original = await fs.readFile(retPath, "utf8");

      const result = parse(original);
      expect(result.type).toBe("RETORNO");
      expect(result.layout).toBe("400");
      expect(result.entries.length).toBeGreaterThan(0);

      // Check header
      const header = result.entries[0];
      expect(header.recordType).toBe("0");
      expect((header as BradescoCnab400RetornoHeader).returnCode).toBe("2");

      // Check trailer
      const trailer = result.entries[result.entries.length - 1];
      expect(trailer.recordType).toBe("9");
    });

    it("remessa roundtrip test (parse and generate)", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, "REMESSA_SAMPLE.REM");
      const original = await fs.readFile(remPath, "utf8");

      // Parse the original file
      const { entries: parsed } = parse(original);

      // Generate from parsed entries
      const generated = generate(parsed);

      // Normalize both to CRLF and trim trailing newlines for comparison
      const normalize = (s: string) =>
        s.replace(/\r?\n/g, "\r\n").replace(/(\r\n)+$/g, "");

      // The generated content should match the original structure
      expect(normalize(generated).split("\r\n")).toHaveLength(
        normalize(original).split("\r\n").length,
      );

      // Check that all lines have correct length (400 characters)
      const generatedLines = generated
        .split(/\r?\n/)
        .filter((line) => line.length > 0);
      generatedLines.forEach((line) => {
        expect(line.length).toBe(400);
      });
    });

    it("should parse remessa file and extract specific data correctly", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, "REMESSA_SAMPLE.REM");
      const original = await fs.readFile(remPath, "utf8");

      const result = parse(original);

      // Find detail records
      const details = result.entries.filter(
        (entry) => entry.recordType === "1",
      );
      expect(details.length).toBeGreaterThanOrEqual(3);

      // Check first detail
      const firstDetail = details[0] as BradescoCnab400RemessaDetail1;
      expect(firstDetail.documentNumber).toContain("DOC001");
      expect(firstDetail.payerName).toContain("PAGADOR FICTICIO");
      expect(firstDetail.bankCode).toBe("237");
    });

    it("should parse retorno file and extract specific data correctly", async () => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const retPath = path.resolve(__dirname, "RETORNO_SAMPLE.RET");
      const original = await fs.readFile(retPath, "utf8");

      const result = parse(original);

      // Find detail records
      const details = result.entries.filter(
        (entry) => entry.recordType === "1",
      );
      expect(details.length).toBeGreaterThanOrEqual(3);

      // Check first detail
      const firstDetail = details[0] as BradescoCnab400RetornoDetail1;
      expect(firstDetail.documentNumber).toContain("DOC001");
      expect(firstDetail.payerName).toContain("PAGADOR FICTICIO");
      expect(firstDetail.bankCode).toBe("237");
    });
  });

  describe("Specific record parsing", () => {
    it("should parse remessa header correctly", () => {
      const line = createValidRemessaHeader();
      const result = parseRemessaHeader(line);

      expect(result.recordType).toBe("0");
      expect(result.operation).toBe("1");
      expect(result.remessaLiteral).toBe("REMESSA");
      expect(result.serviceCode).toBe("01");
      expect(result.serviceLiteral).toBe("COBRANCA");
      expect(result.bankCode).toBe("237");
      expect(result.bankName).toBe("BANCO BRADESCO");
    });

    it("should parse remessa detail 1 correctly", () => {
      const line = createValidRemessaDetail1();
      const result = parseRemessaDetail1(line);

      expect(result.recordType).toBe("1");
      expect(result.beneficiaryTaxIdType).toBe("02");
      expect(result.agency).toBe("1234");
      expect(result.account).toBe("56789");
      expect(result.bankCode).toBe("237");
    });

    it("should parse retorno header correctly", () => {
      const line = createValidRetornoHeader();
      const result = parseRetornoHeader(line);

      expect(result.recordType).toBe("0");
      expect(result.returnCode).toBe("2");
      expect(result.returnLiteral).toBe("RETORNO");
    });

    it("should parse retorno detail 1 correctly", () => {
      const line = createValidRetornoDetail1();
      const result = parseRetornoDetail1(line);

      expect(result.recordType).toBe("1");
      expect(result.payerTaxIdType).toBe("01");
      expect(result.agency).toBe("1234");
      expect(result.bankCode).toBe("237");
    });
  });
});

// Helper functions to create valid CNAB lines
function createValidRemessaHeader(): string {
  // Record type (1) + Operation (1) + REMESSA (7) + Service Code (2) + COBRANCA (15) + Agency (4) + 00 (2) + Account (5) + DAC (1) + Blanks (8) + Company Name (30) + Bank Code (3) + Bank Name (15) + Date (6) + Blanks (294) + Sequential (6)
  return (
    "0" + // Record Type
    "1" + // Operation (Remessa)
    "REMESSA" + // Literal
    "01" + // Service Code
    "COBRANCA".padEnd(15) + // Service Literal
    "1234" + // Agency
    "00" + // Zeros
    "56789" + // Account
    "0" + // DAC
    "".padEnd(8) + // Blanks
    "EMPRESA TESTE".padEnd(30) + // Company Name
    "237" + // Bank Code
    "BANCO BRADESCO".padEnd(15) + // Bank Name
    "240924" + // Generation Date
    "".padEnd(294) + // Blanks
    "000001"
  ); // Sequential Number
}

function createValidRemessaDetail1(): string {
  // Build a valid 400-character detail record type 1
  return (
    "1" + // Record Type
    "02" + // Beneficiary Tax ID Type
    "12345678000123".padStart(14, "0") + // Beneficiary Tax ID
    "1234" + // Agency
    "00" + // Zeros
    "56789" + // Account
    "0" + // DAC
    "".padEnd(4) + // Blanks
    "0001" + // Instruction
    "DOC123".padEnd(25) + // Your Number
    "12345678" + // Our Number
    "0".padStart(13, "0") + // Currency Quantity
    "109" + // Wallet Number
    "".padEnd(21) + // Bank Use
    "I" + // Wallet Code
    "01" + // Occurrence Code
    "DOC123".padEnd(10) + // Document Number
    "301224" + // Due Date
    "0000000010000" + // Amount (R$ 100.00)
    "237" + // Bank Code
    "00000" + // Charging Agency
    "01" + // Species
    "N" + // Acceptance
    "240924" + // Issue Date
    "00" + // Instruction 1
    "00" + // Instruction 2
    "0".padStart(13, "0") + // Daily Interest
    "000000" + // Discount Date
    "0".padStart(13, "0") + // Discount Amount
    "0".padStart(13, "0") + // IOF Amount
    "0".padStart(13, "0") + // Rebate Amount
    "01" + // Payer Tax ID Type
    "12345678901234".padStart(14, "0") + // Payer Tax ID
    "PAGADOR TESTE".padEnd(30) + // Payer Name
    "".padEnd(10) + // Blanks
    "RUA TESTE 123".padEnd(40) + // Payer Address
    "CENTRO".padEnd(12) + // Payer Neighborhood
    "01234567" + // Payer Zip Code
    "SAO PAULO".padEnd(15) + // Payer City
    "SP" + // Payer State
    "".padEnd(30) + // Drawer Guarantor
    "".padEnd(4) + // Blanks
    "000000" + // Interest Start Date
    "00" + // Protest Days
    " " + // Blank
    "000001"
  ); // Sequential Number
}

function createValidRemessaTrailer(): string {
  return (
    "9" + // Record Type
    "".padEnd(393) + // Blanks
    "000001"
  ); // Sequential Number
}

function createValidRetornoHeader(): string {
  // Build a valid 400-character retorno header record
  let line = "";

  // Position 0: Record Type
  line += "0";

  // Position 1: Return Code
  line += "2";

  // Position 2-8: RETORNO literal
  line += "RETORNO";

  // Fill the rest to reach exactly 400 characters
  const currentLength = line.length;
  const remaining = 400 - currentLength - 6; // Reserve 6 for sequential number
  line += "".padEnd(remaining);

  // Position 394-399: Sequential Number (6 chars)
  line += "000001";

  return line;
}

function createValidRetornoDetail1(): string {
  // Build a valid 400-character retorno detail record according to the parsing positions
  let line = "";

  // Position 0: Record Type
  line += "1";

  // Position 1-2: Payer Tax ID Type
  line += "01";

  // Position 3-16: Payer Tax ID (14 chars)
  line += "12345678901234";

  // Position 17-20: Agency (4 chars)
  line += "1234";

  // Position 21-22: Fill to get to account position 23-27
  line += "00";

  // Position 23-27: Account (5 chars)
  line += "56789";

  // Position 28: DAC
  line += "0";

  // Position 29-36: Fill to get to yourNumber position 37-61
  line += "".padEnd(8);

  // Position 37-61: Your Number (25 chars)
  line += "DOC123".padEnd(25);

  // Position 62-69: Our Number (8 chars)
  line += "12345678";

  // Position 70-81: Fill to get to wallet position 82-84
  line += "".padEnd(12);

  // Position 82-84: Wallet Number (3 chars)
  line += "109";

  // Position 85-92: Fill to get to DAC our number position 93
  line += "".padEnd(8);

  // Position 93: DAC Our Number
  line += "0";

  // Position 94-107: Fill to get to occurrence code position 108-109
  line += "".padEnd(14);

  // Position 108-109: Occurrence Code
  line += "06";

  // Position 110-115: Occurrence Date
  line += "240924";

  // Position 116-125: Document Number (10 chars)
  line += "DOC123".padEnd(10);

  // Position 126-145: Fill to get to due date position 146-151
  line += "".padEnd(20);

  // Position 146-151: Due Date
  line += "301224";

  // Position 152-164: Amount (13 chars)
  line += "0000000010000";

  // Position 165-167: Bank Code (3 chars) - This is the critical position
  line += "237";

  // Fill the rest to reach 400 characters
  const currentLength = line.length;
  const remaining = 400 - currentLength - 6; // Reserve 6 for sequential number
  line += "".padEnd(remaining);

  // Position 394-399: Sequential Number (6 chars)
  line += "000001";

  return line;
}

function createValidRetornoTrailer(): string {
  // Build a valid 400-character retorno trailer record
  let line = "";

  // Position 0: Record Type
  line += "9";

  // Position 1: Return Code
  line += "2";

  // Position 2-3: Service Code
  line += "01";

  // Position 4-6: Bank Code
  line += "237";

  // Fill the rest to reach exactly 400 characters
  const currentLength = line.length;
  const remaining = 400 - currentLength - 6; // Reserve 6 for sequential number
  line += "".padEnd(remaining);

  // Position 394-399: Sequential Number (6 chars)
  line += "000001";

  return line;
}
